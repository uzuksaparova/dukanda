import React, { useEffect, useState } from 'react';
import './divisionItem.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DivisionClientModal from './divisionClientModal/DivisionClientModal';
import {
    BACKEND_URL,
    fetchForAdmin,
    fetchDivisionsInfo,
} from '../../functions';
import {
    setDivisionData,
    setDivisionItemSendInfo,
    setEmptyValues,
} from '../../redux/actions/divisionActions';
import { connect } from 'react-redux';
import DivisionTab1 from './tabs/AddressTab';
import EntegrasyonTab from './tabs/entegrasyonTab/EntegrasyonTab';
import DivisionTop from './divisionTop/DivisionTop';
import DivisionQrTab from './tabs/divisionQrTab/DivisionQrTab';
import { Badge } from '@mui/material';

function DivisionItem(props) {
    const { id } = useParams();
    const {
        setDivisionData,
        divisionsData,
        isSidebarOpen,
        setDivisionItemSendInfo,
        emptyValues,
        setEmptyValues,
    } = props;

    const { data } = divisionsData;

    const [clientChip, setClientChip] = useState('');
    const [divisionImage, setDivisionImage] = useState('');
    const [divisionTabValue, setDivisionTabValue] = useState(0);

    function TabContainer(props) {
        return <Typography component="div">{props.children}</Typography>;
    }

    const handleDivisionTabChange = (event, value) => {
        setDivisionTabValue(value);
    };
    const fetchDivisionId = (iddd = id) => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/divisions/${iddd}`,
                method: 'GET',
            },
            (data) => {
                setDivisionData({ ...data });
                setDivisionImage({ local: false, image: data.image, send: '' });
                setClientChip(data?.client?.name);
                const {
                    active,
                    code,
                    name,
                    address,
                    nr,
                    clientId,
                    QRLocalServerUrl,
                    firmUUID,
                    client,
                } = data;
                setDivisionItemSendInfo({
                    active,
                    code,
                    name,
                    address,
                    nr,
                    clientId,
                    QRLocalServerUrl,
                    firmUUID,
                    client,
                    longitude: '156.35',
                    latitude: '841.564',
                });
            }
        );
    };

    useEffect(() => {
        setDivisionData({});
        id && id !== '0' && fetchDivisionId();
        !data.length && fetchDivisionsInfo(true);

        return () => {
            setEmptyValues([]);
        };

        // eslint-disable-next-line
    }, []);
    const badgeHandler = (checkValues, name) => {
        let show = emptyValues.some((a) => checkValues.includes(a));
        return show ? (
            <Badge
                color="error"
                variant="dot"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {name}
            </Badge>
        ) : (
            <span>{name}</span>
        );
    };

    return (
        <div className={`division-item ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <DivisionTop
                divisionImage={divisionImage}
                setDivisionImage={setDivisionImage}
                fetchDivisionId={fetchDivisionId}
            />
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={divisionTabValue}
                        onChange={handleDivisionTabChange}
                        scrollButtons="auto"
                        textColor="secondary"
                        variant="scrollable"
                    >
                        <Tab
                            label={badgeHandler(
                                ['code', 'name', 'address'],
                                'Salgy'
                            )}
                        />
                        <Tab
                            label={badgeHandler(
                                ['nr', 'clientId'],
                                'Entegrasyon'
                            )}
                        />
                        <Tab label={<span>QR maglumaty</span>} />
                    </Tabs>
                </AppBar>

                <div className="division-body">
                    {divisionTabValue === 0 && (
                        <TabContainer>
                            <DivisionTab1 />
                        </TabContainer>
                    )}

                    {divisionTabValue === 1 && (
                        <TabContainer>
                            <EntegrasyonTab clientChip={clientChip} />
                        </TabContainer>
                    )}
                    {divisionTabValue === 2 && (
                        <TabContainer>
                            <DivisionQrTab />
                        </TabContainer>
                    )}
                </div>
            </div>
            <DivisionClientModal setClientChip={setClientChip} />

            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        divisionData: state.divisionData.divisionData,
        divisionsData: state.divisionsData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        emptyValues: state.emptyValues.emptyValues,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDivisionData: (data) => dispatch(setDivisionData(data)),
        setDivisionItemSendInfo: (item) =>
            dispatch(setDivisionItemSendInfo(item)),
        setEmptyValues: (item) => dispatch(setEmptyValues(item)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DivisionItem);
