import React, { useState } from 'react';
import ClientsDeviceInfoChangeModal from '../../../clientsDeviceInfoChangeModal/ClientsDeviceInfoChangeModal';
import { BACKEND_URL, deleteForAdmin } from '../../../../../functions';
import { setClientData } from '../../../../../redux/actions/clientActions';
import { connect } from 'react-redux';
import TableButtonsComponent from '../../../../tableButtonsComponent/TableButtonsComponent';
import TableComponent from '../../../../tableComponent/TableComponent';
import EmptyComponent from '../../../../emptyComponent/EmptyComponent';

function ClientTab4(props) {
    const { clientDivisionData, clientData, setClientData } = props;
    const [isClientDeviceModalOpen, setIsClientDeviceModalOpen] =
        useState(false);
    const [deviceId, setDeviceId] = useState('');

    const columns = [
        { id: 'deviceInfo', label: 'Enjam maglumat', minWidth: 170 },
        { id: 'fullName', label: 'Ady we familýasy', minWidth: 170 },

        {
            id: 'address',
            label: 'Adres',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'division',
            label: 'Bölüm',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'email',
            label: 'E-mail',
            minWidth: 170,
            align: 'left',
        },
        {
            id: 'phoneNumber',
            label: 'Telefon',
            minWidth: 170,
            align: 'left',
        },
    ];
    const handleEditClick = (row) => {
        setIsClientDeviceModalOpen(true);
        setDeviceId(row.id);
    };
    const handleDeviceDeletion = (iddd) => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/devices/${iddd}`,
                notifyMessage: 'Enjam pozulýar',
                updateMessage: 'Enjam pozuldy',
            },
            (data) => {
                var tempo = clientData.devices;
                var tempoFilter = tempo.filter((temp) => temp.id !== iddd);
                setClientData({
                    ...clientData,
                    devices: [...tempoFilter],
                });
            }
        );
    };
    const handleRowValue = (column, row, i) => {
        return column.id === 'deviceInfo'
            ? (row.deviceModel ? row.deviceModel : '') +
                  ' ' +
                  (row.deviceType ? row.deviceType : '') +
                  ' ' +
                  (row.osName ? row.osName : '') +
                  ' ' +
                  (row.osVersion ? row.osVersion : '')
            : column.id === 'fullName'
            ? (row.firstName ? row.firstName : '') +
              ' ' +
              (row.lastName ? row.lastName : '')
            : column.id === 'division'
            ? clientDivisionData.filter((div) => div.id === row.divisionId)[0]
                  ?.name
            : row[column.id];
    };
    const tableButton = (row) => {
        return (
            <TableButtonsComponent
                disabledValue="updateClient"
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeviceDeletion}
                row={row}
            />
        );
    };
    return (
        <>
            {clientData?.devices.length ? (
                <TableComponent
                    columns={columns}
                    items={clientData?.devices}
                    handleRowValue={handleRowValue}
                    buttonExist={true}
                    tableButton={tableButton}
                    lazy={false}
                    inTab={true}
                />
            ) : (
                <EmptyComponent />
            )}

            <ClientsDeviceInfoChangeModal
                deviceId={deviceId}
                isClientDeviceModalOpen={isClientDeviceModalOpen}
                setIsClientDeviceModalOpen={setIsClientDeviceModalOpen}
            />
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        clientDivisionData: state.clientDivisionData.clientDivisionData,
        clientData: state.clientData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setClientData: (data) => dispatch(setClientData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientTab4);
