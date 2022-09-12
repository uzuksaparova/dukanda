import React, { useEffect, useState } from 'react';
import './scalingSystems.scss';
import Loading from '../Loading';
import { ToastContainer } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { BACKEND_URL, deleteForAdmin, fetchForAdmin } from '../../functions';
import { connect } from 'react-redux';

import { setSidebarSearchValue } from '../../redux/actions/sidebarActions';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import TableButtonsComponent from '../tableButtonsComponent/TableButtonsComponent';
import AddItemComponent from '../addItemComponent/AddItemComponent';
import TableComponent from '../tableComponent/TableComponent';
import {
    setScalingSystemItemSendInfo,
    setScalingSystemsData,
} from '../../redux/actions/scalingSystemActions';
import ScalingSytemModal from '../scalingSystemModal/ScalingSytemModal';

const columns = [
    {
        id: 'barcodePrefix',
        label: 'Ön basamak',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'productIdentityLength',
        label: 'Ürün belirti uzunluğu ',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'scalingLength',
        label: 'Miktar hane',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'divider',
        label: 'Ondalık hane',
        minWidth: 100,
        align: 'center',
    },
];

function ScalingSystems(props) {
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

    const {
        setSidebarSearchValue,
        scalingSystemsData,
        setScalingSystemsData,
        isError,
        setScalingSystemItemSendInfo,
    } = props;

    const [isScalingSystemModalOpen, setIsScalingSystemModalOpen] =
        useState(false);
    const [noData, setNoData] = useState(false);
    useEffect(() => {
        setSidebarSearchValue('');
        fetchScalingSystemsInfo();
        // eslint-disable-next-line
    }, []);

    const fetchScalingSystemsInfo = () => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/barcodeScaleSystems`,
                method: 'GET',
            },
            (data) => {
                if (!data.length) {
                    setNoData(true);
                }
                setScalingSystemsData(data);
            }
        );
    };

    const handleSystemAdd = () => {
        setScalingSystemItemSendInfo({
            barcodePrefix: '',
            productIdentityLength: '',
            scalingLength: '',
            divider: '',
            id: '',
        });
        setIsScalingSystemModalOpen(true);
    };

    const handleRowValue = (column, row) => {
        return row[column.id];
    };
    const tableButton = (row) => {
        return (
            <TableButtonsComponent
                disabledValue="updateDukandaVersionControl"
                row={row}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
            />
        );
    };

    const handleEditClick = (row) => {
        setScalingSystemItemSendInfo({
            barcodePrefix: row.barcodePrefix,
            productIdentityLength: row.productIdentityLength,
            scalingLength: row.scalingLength,
            divider: row.divider,
            id: row.id,
        });
        setIsScalingSystemModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/barcodeScaleSystems/${id}`,
                notifyMessage: 'Pozulýar',
                updateMessage: 'Pozuldy',
            },
            (data) => {
                let tempScalingSystemData = scalingSystemsData;
                tempScalingSystemData = tempScalingSystemData.filter(
                    (temp) => temp.id !== id
                );
                if (!tempScalingSystemData.length) {
                    setNoData(true);
                }

                setScalingSystemsData([...tempScalingSystemData]);
            }
        );
    };

    return (
        <div className="scaling-systems">
            {!scalingSystemsData.length ? (
                isError ? (
                    <ErrorComponent />
                ) : noData ? (
                    <EmptyComponent />
                ) : (
                    <Loading />
                )
            ) : (
                <TableComponent
                    columns={columns}
                    data={scalingSystemsData}
                    handleRowValue={handleRowValue}
                    buttonExist={true}
                    tableButton={tableButton}
                    lazy={false}
                />
            )}
            <AddItemComponent onClickHandler={handleSystemAdd} />
            <ScalingSytemModal
                isScalingSystemModalOpen={isScalingSystemModalOpen}
                setIsScalingSystemModalOpen={setIsScalingSystemModalOpen}
                fetchScalingSystemsInfo={fetchScalingSystemsInfo}
            />
            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        scalingSystemsData: state.scalingSystemsData.scalingSystemsData,
        isError: state.isError.isError,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSidebarSearchValue: (value) =>
            dispatch(setSidebarSearchValue(value)),
        setScalingSystemsData: (value) =>
            dispatch(setScalingSystemsData(value)),
        setScalingSystemItemSendInfo: (value) =>
            dispatch(setScalingSystemItemSendInfo(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScalingSystems);
