import React, { useState } from 'react';
import { connect } from 'react-redux';
import { activeCell, notification } from '../../../../../functions';
import {
    setQrDevicesData,
    setQrDeviceSendInfo,
} from '../../../../../redux/actions/qrDeviceActions';
import { setSidebarSearchValue } from '../../../../../redux/actions/sidebarActions';
import EmptyComponent from '../../../../emptyComponent/EmptyComponent';
import TableButtonsComponent from '../../../../tableButtonsComponent/TableButtonsComponent';
import TableComponent from '../../../../tableComponent/TableComponent';
import ClientQrModal from './clientQrModal/ClientQrModal';

function ClientCardsTab(props) {
    const {
        clientData,
        setSidebarSearchValue,
        setQrDeviceSendInfo,
        setQrDevicesData,
        qrDeviceSendInfo,
        qrDevicesData,
    } = props;
    const [isClientQrModalOpen, setIsClientQrModalOpen] = useState(false);

    const [cardInfo, setCardInfo] = useState({ qrCardDevices: [] });

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
        if (clientData.active) {
            setIsClientQrModalOpen(true);
            setCardInfo(row);
        } else {
            notification('Müşderiniň bu hasaby ulanylmaýar');
        }
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
                cardInfo={cardInfo}
                isClientQrModalOpen={isClientQrModalOpen}
                setIsClientQrModalOpen={setIsClientQrModalOpen}
            />
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        clientData: state.clientData,
        qrDevicesData: state.qrDevicesData,
        qrDeviceSendInfo: state.qrDeviceSendInfo,
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
