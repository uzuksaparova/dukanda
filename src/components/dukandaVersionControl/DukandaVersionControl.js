import React, { useEffect, useState } from 'react';
import './dukandaVersionControl.scss';
import Loading from '../Loading';
import { ToastContainer } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import {
    BACKEND_URL,
    deleteForAdmin,
    fetchDukandaVersionControlInfo,
    fetchWithoutParams,
} from '../../functions';
import { connect } from 'react-redux';

import { setSidebarSearchValue } from '../../redux/actions/sidebarActions';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import TableButtonsComponent from '../tableButtonsComponent/TableButtonsComponent';
import AddItemComponent from '../addItemComponent/AddItemComponent';
import TableComponent from '../tableComponent/TableComponent';
import { setDukandaVersionControlsData } from '../../redux/actions/dukandaVersionControlActions';
import DukandaVersionControlModal from '../dukandaVersionControlModal/DukandaVersionControlModal';

const columns = [
    {
        id: 'version',
        label: 'Wersiýasy',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'os',
        label: 'OS',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'createdAt',
        label: 'Ýüklenen wagty',
        minWidth: 100,
        align: 'center',
    },
];

function DukandaVersionControl(props) {
    const useStyles = makeStyles((theme) => ({
        mbutton: {
            '.MuiIconButton-root': {
                '& :hover': {
                    backgroundColor: 'unset !important',
                },
            },
        },
    }));
    const classes = useStyles();
    const [versionSendInfo, setVersionSendInfo] = useState({
        os: 'Android',
        version: '',
        file: '',
    });

    const {
        setSidebarSearchValue,
        dukandaVersionControlsData,
        setDukandaVersionControlsData,
        isError,
    } = props;

    const [isDvcItemModalOpen, setIsDvcItemModalOpen] = useState(false);
    useEffect(() => {
        setSidebarSearchValue('');
        if (!dukandaVersionControlsData.data.length) {
            fetchDukandaVersionControlInfo(true);
        }
        // eslint-disable-next-line
    }, []);

    const handleDeleteDvcItem = (id) => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/qrApp/${id}`,
                notifyMessage: 'Dükanda wersiýasy pozulýar',
                updateMessage: 'Dükanda wersiýasy pozuldy',
            },
            (data) => {
                var tempo = dukandaVersionControlsData.data;
                var tempoFilter = tempo.filter((temp) => temp.id !== id);
                if (tempoFilter.length === 0) {
                    console.log('in length 0');
                    setDukandaVersionControlsData({
                        ...dukandaVersionControlsData,
                        isEnd: true,
                        noData: true,
                    });
                }
                setDukandaVersionControlsData({
                    ...dukandaVersionControlsData,
                    data: tempoFilter,
                });
            }
        );
    };

    const handleDvcAdd = () => {
        setVersionSendInfo({});
        setIsDvcItemModalOpen(true);
    };

    const handleRowValue = (column, row) => {
        return row[column.id];
    };
    const tableButton = (row) => {
        return (
            <TableButtonsComponent
                disabledValue="updateDukandaVersionControl"
                handleDeleteClick={handleDeleteDvcItem}
                row={row}
                handleDownloadClick={handleDownloadClick}
            />
        );
    };

    const handleFetchMore = () => {
        fetchDukandaVersionControlInfo();
    };

    const handleDownloadClick = (row) => {
        fetchWithoutParams(
            {
                url: `https://timar.com.tm/api/app/${row?.fileName}`,
                method: 'GET',
            },
            (data) => console.log(data)
        );
    };

    return (
        <div className={`smart-sections`}>
            {console.log(dukandaVersionControlsData)}
            {!dukandaVersionControlsData.data.length ? (
                isError ? (
                    <ErrorComponent />
                ) : dukandaVersionControlsData.noData ? (
                    <EmptyComponent />
                ) : (
                    <Loading />
                )
            ) : (
                <TableComponent
                    columns={columns}
                    data={dukandaVersionControlsData}
                    handleRowValue={handleRowValue}
                    buttonExist={true}
                    tableButton={tableButton}
                    handleFetchMore={handleFetchMore}
                />
            )}
            <AddItemComponent
                disabledValue="updateSmartSection"
                onClickHandler={handleDvcAdd}
            />

            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
            <DukandaVersionControlModal
                versionSendInfo={versionSendInfo}
                setVersionSendInfo={setVersionSendInfo}
                isDvcItemModalOpen={isDvcItemModalOpen}
                setIsDvcItemModalOpen={setIsDvcItemModalOpen}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        dukandaVersionControlsData: state.dukandaVersionControlsData,
        isError: state.isError.isError,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSidebarSearchValue: (value) =>
            dispatch(setSidebarSearchValue(value)),
        setDukandaVersionControlsData: (value) =>
            dispatch(setDukandaVersionControlsData(value)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DukandaVersionControl);
