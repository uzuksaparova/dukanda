import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './clientsItemTab.scss';
import { useParams } from 'react-router-dom';
import ClientsCommentModal from '../clientsCommentModal/ClientsCommentModal';
import { BACKEND_URL, fetchForAdmin } from '../../../functions';
import { connect } from 'react-redux';
import {
    setClientData,
    setClientDivisionData,
    setClientItemSendInfo,
    setClientsData,
} from '../../../redux/actions/clientActions';
import ClientTab1 from './clientTabs/clientTab1/ClientTab1';
import ClientTab2 from './clientTabs/clientTab2/ClientTab2';
import ClientTab3 from './clientTabs/clientTab3/ClientTab3';
import ClientCardsTab from './clientTabs/clientCardsTab/ClientCardsTab';
import CardImageModal from '../../cardImageModal/CardImageModal';

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function ClientsItemTab(props) {
    const { id } = useParams();
    const { clientImage, setClientImage } = props;
    const {
        clientData,
        clientItemSendInfo,
        setClientItemSendInfo,
        setClientDivisionData,
        decodedToken,
    } = props;

    const [clientTabValue, setClientTabValue] = useState(0);
    const [isClientsCommentModalOpen, setIsClientsCommentModalOpen] =
        useState(false);

    useEffect(() => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/divisions`,
                method: 'GET',
            },
            (data) => {
                setClientDivisionData(data);
            }
        );
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setClientItemSendInfo({
            ...clientItemSendInfo,
            active: clientData.active,
            userName: clientData.userName,
            division: clientData.division,
            divisionId: clientData.divisionId ? clientData.divisionId : ' ',
            fixedDivision: !!clientData.fixedDivision,
            saleComplect: !!clientData.saleComplect,
        });
        // eslint-disable-next-line
    }, [clientData]);

    const handleClientTabChange = (event, value) => {
        setClientTabValue(value);
    };

    return (
        <div className="client-tab">
            <AppBar position="static" color="default">
                <Tabs
                    value={clientTabValue}
                    onChange={handleClientTabChange}
                    scrollButtons="auto"
                    textColor="secondary"
                    variant="scrollable"
                >
                    <Tab label={<span>Maglumat</span>} />
                    <Tab
                        label={<span>Profil</span>}
                        disabled={decodedToken.role === 'picker'}
                    />
                    <Tab label={<span>Bellik</span>} />
                    <Tab label={<span>Kartlar</span>} />
                </Tabs>
            </AppBar>
            {clientTabValue === 0 && (
                <TabContainer>
                    <ClientTab1 clientData={clientData} />
                </TabContainer>
            )}
            {clientTabValue === 1 && (
                <TabContainer>
                    <ClientTab2
                        clientImage={clientImage}
                        setClientImage={setClientImage}
                    />
                </TabContainer>
            )}
            {clientTabValue === 2 && (
                <TabContainer>
                    <ClientTab3
                        setIsClientsCommentModalOpen={
                            setIsClientsCommentModalOpen
                        }
                    />
                    <ClientsCommentModal
                        isClientsCommentModalOpen={isClientsCommentModalOpen}
                        setIsClientsCommentModalOpen={
                            setIsClientsCommentModalOpen
                        }
                    />
                </TabContainer>
            )}

            {clientTabValue === 3 && (
                <TabContainer>
                    <ClientCardsTab />
                </TabContainer>
            )}
            <CardImageModal />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        clientsData: state.clientsData,
        clientItemSendInfo: state.clientItemSendInfo,
        decodedToken: state.decodedToken.decodedToken,
        clientDivisionData: state.clientDivisionData.clientDivisionData,
        clientData: state.clientData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setClientData: (data) => dispatch(setClientData(data)),
        setClientsData: (data) => dispatch(setClientsData(data)),
        setClientItemSendInfo: (data) => dispatch(setClientItemSendInfo(data)),
        setClientDivisionData: (data) => dispatch(setClientDivisionData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientsItemTab);
