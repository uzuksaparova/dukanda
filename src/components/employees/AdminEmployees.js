import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import './adminEmployees.scss';
import Loading from '../Loading';
import { RiAdminFill, RiSuitcaseFill, RiUserVoiceFill } from 'react-icons/ri';
import { FaUserTie, FaCar, FaWarehouse } from 'react-icons/fa';
import {
    MdAutoFixHigh,
    MdDeveloperMode,
    MdOutlineAllInbox,
} from 'react-icons/md';
import { RiPriceTag3Fill } from 'react-icons/ri';
import { GiPalette } from 'react-icons/gi';
import { BACKEND_URL, fetchEmployeesInfo } from '../../functions';
import { connect } from 'react-redux';
import { setSidebarSearchValue } from '../../redux/actions/sidebarActions';
import { setEmployeeData } from '../../redux/actions/employeeActions';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import AddItemComponent from '../addItemComponent/AddItemComponent';
import TableComponent from '../tableComponent/TableComponent';

const columns = [
    { id: 'image', label: 'Avatar', minWidth: 50 },
    { id: 'fullName', label: 'Ady we familýasy', minWidth: 170 },

    {
        id: 'userName',
        label: 'Ulanyjy ady',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'role',
        label: 'Rol',
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
        id: 'phoneNumber',
        label: 'Telefon',
        minWidth: 170,
        align: 'left',
    },
];
function stringAvatar(name) {
    return {
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function AdminEmployees(props) {
    const {
        employeesData,
        setSidebarSearchValue,
        isSidebarOpen,
        setEmployeeData,
        isError,
    } = props;
    const { data, isEnd, noData } = employeesData;

    useEffect(() => {
        setSidebarSearchValue('');
        if (!data.length) {
            fetchEmployeesInfo(true);
        }
        // eslint-disable-next-line
    }, []);

    const handleEmployeeAdd = () => {
        setEmployeeData({
            id: '',
            role: '',
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            phoneNumber: '',
            divisions: '',
            active: true,
        });
    };

    const roleIdentifier = (role) => {
        let roleObj = roleObject(role);
        return (
            <div className="role">
                <div className="role-icon">{roleObj.icon}</div>
                <span>{roleObj.spanName}</span>
            </div>
        );
    };
    const roleObject = (role) => {
        switch (role) {
            case 'admin':
                return { icon: <RiAdminFill />, spanName: 'Admin' };

            case 'ceo':
                return { icon: <FaUserTie />, spanName: 'CEO' };

            case 'seller':
                return { icon: <RiPriceTag3Fill />, spanName: 'Satyjy' };

            case 'deliverer':
                return { icon: <FaCar />, spanName: 'Gowşuryjy' };

            case 'developer':
                return { icon: <MdDeveloperMode />, spanName: 'Programist' };

            case 'warehouseman':
                return { icon: <FaWarehouse />, spanName: 'Ammarcy' };

            case 'designer':
                return { icon: <GiPalette />, spanName: 'Dizayner' };

            case 'moderator':
                return { icon: <MdAutoFixHigh />, spanName: 'Moderator' };

            case 'operator':
                return { icon: <RiUserVoiceFill />, spanName: 'Operator' };

            case 'picker':
                return { icon: <MdOutlineAllInbox />, spanName: 'Ýygnaýjy' };

            default:
                return { icon: <RiSuitcaseFill />, spanName: role };
        }
    };

    const avatarIdentifier = (row) => {
        return (
            <Avatar
                sx={{
                    bgcolor: deepOrange[500],
                    width: 15,
                    height: 15,
                }}
                alt={row.userName.toUpperCase()}
                src={`${BACKEND_URL}/images/employees/${row.image}`}
                {...stringAvatar(`${row?.firstName} ${row?.lastName}`)}
            />
        );
    };
    const divisionIdentifier = (row) => {
        return row?.divisions?.map((d, i) => {
            return d?.name + (i === row?.divisions?.length - 1 ? '' : ', ');
        });
    };

    const handleRowValue = (column, row) => {
        return column.id === 'image'
            ? avatarIdentifier(row)
            : column.id === 'role'
            ? roleIdentifier(row[column.id])
            : column.id === 'division'
            ? divisionIdentifier(row)
            : row[column.id];
    };

    const handleFetchMore = () => {
        fetchEmployeesInfo();
    };

    return (
        <div className={'employees'}>
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
                    columns={columns}
                    data={employeesData}
                    handleRowValue={handleRowValue}
                    handleFetchMore={handleFetchMore}
                    rowPath="employees"
                    isRowClickable={true}
                />
            )}
            <AddItemComponent
                disabledValue="updateEmployee"
                onClickHandler={handleEmployeeAdd}
                pathname={`/employees/0`}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        employeesData: state.employeesData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        isError: state.isError.isError,
        decodedToken: state.decodedToken.decodedToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSidebarSearchValue: (value) =>
            dispatch(setSidebarSearchValue(value)),
        setEmployeeData: (value) => dispatch(setEmployeeData(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminEmployees);
