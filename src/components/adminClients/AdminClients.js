import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import './adminClients.scss';
import Loading from '../Loading';
import { activeCell, BACKEND_URL, fetchClientsInfo } from '../../functions';
import { connect } from 'react-redux';
import { setSidebarSearchValue } from '../../redux/actions/sidebarActions';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import TableComponent from '../tableComponent/TableComponent';
import { setClientData } from '../../redux/actions/clientActions';

const columns = [
    { id: 'image', label: 'Avatar', minWidth: 50 },

    {
        id: 'userName',
        label: 'Ulanyjy ady',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'name',
        label: 'Ady',
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
        id: 'code',
        label: 'Kody',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'phoneNumber',
        label: 'Telefon',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'birthDate',
        label: 'Doglan güni',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'active',
        label: 'Aktiw',
        minWidth: 170,
        align: 'left',
    },
];

function AdminClients(props) {
    const { setSidebarSearchValue, clientsData, isError, isSidebarOpen } =
        props;
    const { data, noData, isEnd } = clientsData;

    useEffect(() => {
        setSidebarSearchValue('');
        if (!data.length) {
            fetchClientsInfo(true);
        }
        // eslint-disable-next-line
    }, []);

    const avatarCell = (row) => {
        return (
            <Avatar
                sx={{
                    bgcolor: deepOrange[500],
                    width: 15,
                    height: 15,
                }}
                alt={row?.name?.toUpperCase()}
                src={`${BACKEND_URL}/images/clients/${row?.image}`}
            />
        );
    };

    const handleRowValue = (column, row, i) => {
        return column.id === 'division' && row?.division
            ? row[column.id].name
            : column.id === 'image'
            ? avatarCell(row)
            : column.id === 'active'
            ? activeCell(row)
            : row[column.id];
    };
    const handleFetchMore = () => {
        fetchClientsInfo();
    };
    const handleRowClick = () => {
        setClientData({
            userName: '',
            password: '',
            image: null,
            divisionId: '',
            comments: [],
            devices: [],
            clientCards: [],
        });
    };

    return (
        <div className="clients">
            {!data.length ? (
                isError ? (
                    <ErrorComponent />
                ) : noData ? (
                    <EmptyComponent />
                ) : (
                    <Loading />
                )
            ) : (
                <TableComponent
                    handleRowValue={handleRowValue}
                    handleFetchMore={handleFetchMore}
                    columns={columns}
                    data={clientsData}
                    rowPath={'clients'}
                    handleRowClick={handleRowClick}
                />
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        clientsData: state.clientsData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        isError: state.isError.isError,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSidebarSearchValue: (value) =>
            dispatch(setSidebarSearchValue(value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminClients);
