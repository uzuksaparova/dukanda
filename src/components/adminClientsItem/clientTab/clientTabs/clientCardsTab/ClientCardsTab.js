import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    activeCell,
    BACKEND_URL,
    fetchForAdminWithUpdateToast,
    notification,
} from '../../../../../functions';
import {
    setQrDevicesData,
    setQrDeviceSendInfo,
} from '../../../../../redux/actions/qrDeviceActions';
import { setSidebarSearchValue } from '../../../../../redux/actions/sidebarActions';
import EmptyComponent from '../../../../emptyComponent/EmptyComponent';
import TableButtonsComponent from '../../../../tableButtonsComponent/TableButtonsComponent';
import TableComponent from '../../../../tableComponent/TableComponent';
import ClientCardCounterModal from './clientCardCounterModal/ClientCardCounterModal';
import ClientQrModal from './clientQrModal/ClientQrModal';

function ClientCardsTab(props) {
    const {
        clientData,
        setSidebarSearchValue,
        setQrDeviceSendInfo,
        setQrDevicesData,
        qrDeviceSendInfo,
        qrDevicesData,
        decodedToken,
    } = props;
    const [isClientQrModalOpen, setIsClientQrModalOpen] = useState(false);
    const [qrObject, setQrObject] = useState({});
    const [isClientCardCounterModalOpen, setIsClientCardCounterModalOpen] =
        useState(false);

    const [cardInfo, setCardInfo] = useState({ qrCardDevices: [] });
    const [clickedRow, setClickedRow] = useState({});

    const columns = [
        { id: 'cardNo', label: 'Kart No', minWidth: 170 },
        { id: 'groupCode', label: 'Grup kody', minWidth: 170 },

        {
            id: 'discount',
            label: 'Arzanladyş',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'cardLimit',
            label: 'Limit',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'specode',
            label: 'Spekod',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'active',
            label: 'Aktiwlylyk',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'deviceCount',
            label: 'Enjam sany',
            minWidth: 170,
            align: 'left',
        },
    ];

    const handleRowValue = (column, row, i) => {
        return column.id === 'deviceCount'
            ? row.qrCardDevices.length
            : column.id === 'active'
            ? activeCell(row)
            : row[column.id];
    };

    const handleDevicesClick = (row) => {
        setSidebarSearchValue(row.cardNo);

        setQrDevicesData({ ...qrDevicesData, data: [] });
        let menuSend = qrDeviceSendInfo;
        menuSend.search = row.cardNo;
        menuSend.offset = 0;
        setQrDeviceSendInfo(menuSend);
    };
    const handleQrClick = (row) => {
        setClickedRow(row);
        if (row.qrCardDevices.length === 1 || row.qrCardDevices.length > 1) {
            setIsClientCardCounterModalOpen(true);
        } else {
            qrGenerator(row);
        }
    };

    const qrGenerator = (row = false) => {
        row ? setCardInfo(row) : setCardInfo(clickedRow);
        let bodySend = {};
        if (row) {
            bodySend = {
                employeeId: decodedToken.id,
                cardNo: row?.cardNo,
                clientId: row?.clientId,
                clientCardId: row?.id,
                firmUUID: clientData?.firmUUID,
            };
        } else {
            bodySend = {
                employeeId: decodedToken.id,
                cardNo: clickedRow?.cardNo,
                clientId: clickedRow?.clientId,
                clientCardId: clickedRow?.id,
                firmUUID: clientData?.firmUUID,
            };
        }
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/clients/qrDevice/qrGenerate`,
                body: bodySend,
            },
            (data) => {
                if (data !== 'err') {
                    setQrObject(data.qrData);
                    if (clientData.active) {
                        setIsClientQrModalOpen(true);
                    } else {
                        notification('Müşderiniň bu hasaby ulanylmaýar');
                    }
                } else {
                    notification('QR kodynda näsazlyk döredi');
                }
            }
        );
    };
    const tableButton = (row) => {
        return (
            <TableButtonsComponent
                disabledValue="updateClient"
                handleDevicesClick={handleDevicesClick}
                handleQrClick={handleQrClick}
                row={row}
            />
        );
    };
    return (
        <>
            {clientData?.clientCards.length ? (
                <TableComponent
                    columns={columns}
                    items={clientData?.clientCards}
                    handleRowValue={handleRowValue}
                    buttonExist={true}
                    tableButton={tableButton}
                    lazy={false}
                    inTab={true}
                />
            ) : (
                <EmptyComponent />
            )}
            <ClientQrModal
                qrObject={qrObject}
                cardInfo={cardInfo}
                isClientQrModalOpen={isClientQrModalOpen}
                setIsClientQrModalOpen={setIsClientQrModalOpen}
            />
            <ClientCardCounterModal
                isClientCardCounterModalOpen={isClientCardCounterModalOpen}
                setIsClientCardCounterModalOpen={
                    setIsClientCardCounterModalOpen
                }
                clickedRow={clickedRow}
                qrGenerator={qrGenerator}
            />
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        clientData: state.clientData,
        qrDevicesData: state.qrDevicesData,
        qrDeviceSendInfo: state.qrDeviceSendInfo,
        decodedToken: state.decodedToken.decodedToken,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSidebarSearchValue: (value) =>
            dispatch(setSidebarSearchValue(value)),
        setQrDevicesData: (value) => dispatch(setQrDevicesData(value)),
        setQrDeviceSendInfo: (value) => dispatch(setQrDeviceSendInfo(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientCardsTab);
