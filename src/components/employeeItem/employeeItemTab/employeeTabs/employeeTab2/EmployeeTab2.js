import { Button, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    setStockPermissions,
    setStockPermissionsEvents,
} from '../../../../../redux/actions/employeeActions';
import EmptyComponent from '../../../../emptyComponent/EmptyComponent';
import ErrorComponent from '../../../../errorComponent/ErrorComponent';
import Loading from '../../../../Loading';
import SearchComponent from '../../../../searchComponent/SearchComponent';
import TableComponent from '../../../../tableComponent/TableComponent';
import './employeeTab2.scss';
import DraggableTable from '../../../../draggableTable/DraggableTable';
import { useMediaQuery } from 'react-responsive';
import {
    BACKEND_URL,
    fetchForAdminWithUpdateToast,
} from '../../../../../functions';
import { useParams } from 'react-router-dom';
import { setIsEmployeeModalOpen } from '../../../../../redux/actions';

function EmployeeTab2(props) {
    const { id } = useParams();

    const {
        stockPermissions,
        stockPermissionsEvents,
        setStockPermissionsEvents,
        setStockPermissions,
        fetchStockPermissions,
        setIsEmployeeModalOpen,
    } = props;
    const [afterSearch, setAfterSearch] = useState(stockPermissions);
    const [firstTime, setFirstTime] = useState(true);
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });

    const [searchValue, setSearchValue] = useState('');

    // const [noData, setNoData] = useState(false);
    const { isError, noData } = stockPermissionsEvents;
    useEffect(() => {
        if (firstTime && stockPermissions.length) {
            setAfterSearch(stockPermissions);
            setFirstTime(false);
        }
    }, [stockPermissions]);

    const dragColumns = [
        { accessor: 'name', Header: 'Depo ady', minWidth: 100 },

        {
            accessor: 'nr',
            Header: 'Depo NR',
            minWidth: 100,
            align: 'left',
        },
        {
            accessor: 'access',
            Header: 'Yetki',
            minWidth: 50,
            align: 'left',
        },
        {
            accessor: 'amount',
            Header: 'Miktar yetki',
            minWidth: 50,
            align: 'left',
        },
    ];
    const columns = [
        { id: 'name', label: 'Depo ady', minWidth: 100 },

        {
            id: 'nr',
            label: 'Depo NR',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'access',
            label: 'Yetki',
            minWidth: 50,
            align: 'left',
        },
        {
            id: 'amount',
            label: 'Miktar yetki',
            minWidth: 50,
            align: 'left',
        },
    ];

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        let tempDepoData = stockPermissions;
        tempDepoData = stockPermissions.filter((depo) => {
            return (
                depo.nr.toString().includes(e.target.value) ||
                depo.name.toLowerCase().includes(e.target.value)
            );
        });
        setAfterSearch(tempDepoData);
        setStockPermissionsEvents({
            ...stockPermissionsEvents,
            noData: tempDepoData.length ? false : true,
        });
    };
    const onSearchIconClick = () => {
        console.log('searched');
    };

    const handleAccessChangeEach = (row, checked, type) => {
        let tempAfterSearchDeposData = afterSearch;
        let tempDeposData = stockPermissions;
        console.log(
            row,
            checked,
            type,
            !checked && type === 'access' ? '' : type
        );

        tempDeposData = tempDeposData.map((depo) => {
            if (depo.id === row.id) {
                return {
                    ...row,
                    type:
                        !checked && type === 'access'
                            ? ''
                            : type === 'access'
                            ? 'available'
                            : type,
                };
            }
            return depo;
        });
        tempAfterSearchDeposData = tempAfterSearchDeposData.map((depo) => {
            if (depo.id === row.id) {
                return {
                    ...row,
                    type:
                        !checked && type === 'access'
                            ? ''
                            : type === 'access'
                            ? 'available'
                            : type,
                };
            }
            return depo;
        });
        setStockPermissions([...tempDeposData]);
        setAfterSearch([...tempAfterSearchDeposData]);
    };

    const handleAccessChange = (e, row) => {
        e.stopPropagation();

        if (e.target.name === 'access') {
            handleAccessChangeEach(row, e.target.checked, 'access');
        } else {
            if (e.target.checked) {
                handleAccessChangeEach(row, e.target.checked, 'amount');
            } else {
                handleAccessChangeEach(row, e.target.checked, 'available');
            }
        }
    };

    const handleDragRowValue = (cell) => {
        const { column, row } = cell;
        return column.id === 'access' ? (
            <FormControlLabel
                sx={{ height: '15px !important' }}
                control={
                    <Checkbox
                        checked={
                            row.original.type === 'amount' ||
                            row.original.type === 'available'
                        }
                        onChange={(e) => handleAccessChange(e, row.original)}
                        name="access"
                    />
                }
                label={`${
                    row.original.type === 'amount' ||
                    row.original.type === 'available'
                        ? 'Bar'
                        : 'Ýok'
                }`}
            />
        ) : column.id === 'amount' ? (
            <FormControlLabel
                sx={{ height: '15px !important' }}
                control={
                    <Checkbox
                        checked={row.original.type === 'amount'}
                        onChange={(e) => handleAccessChange(e, row.original)}
                        name="amount"
                    />
                }
                label={`${row.original.type === 'amount' ? 'Bar' : 'Ýok'}`}
            />
        ) : (
            cell.render('Cell')
        );
    };
    const handleRowValue = (column, row) => {
        return column.id === 'access' ? (
            <FormControlLabel
                sx={{ height: '15px !important' }}
                control={
                    <Checkbox
                        checked={
                            row.type === 'amount' || row.type === 'available'
                        }
                        onChange={(e) => handleAccessChange(e, row)}
                        name="access"
                    />
                }
                label={`${
                    row.type === 'amount' || row.type === 'available'
                        ? 'Bar'
                        : 'Ýok'
                }`}
            />
        ) : column.id === 'amount' ? (
            <FormControlLabel
                sx={{ height: '15px !important' }}
                control={
                    <Checkbox
                        checked={row.type === 'amount'}
                        onChange={(e) => handleAccessChange(e, row)}
                        name="amount"
                    />
                }
                label={`${row.type === 'amount' ? 'Bar' : 'Ýok'}`}
            />
        ) : (
            row[column.id]
        );
    };

    const handleClearAll = () => {
        const depoSend = [];
        stockPermissions.forEach((stock, i) => {
            depoSend.push({ nr: stock.nr, type: '', priority: i + 1 });
        });
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/employees/${id}/stockPermission`,
                notifyMessage: 'Arassalanyar...',
                updateMessage: 'Arassalandy',
                body: depoSend,

                method: 'PUT',
            },
            (data) => {
                fetchStockPermissions();
            }
        );
    };

    return (
        <div className="employee-tab2">
            <div className="employee-tab2-top">
                <div className="employee-tab2-top-buttons">
                    <Button variant="contained" onClick={handleClearAll}>
                        Arassala
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setIsEmployeeModalOpen(true)}
                    >
                        Kopyala
                    </Button>
                </div>
                <SearchComponent
                    searchValue={searchValue}
                    handleInputChange={handleInputChange}
                    onSearchIconClick={onSearchIconClick}
                />
            </div>
            {!afterSearch.length && !stockPermissions.length ? (
                isError ? (
                    <ErrorComponent />
                ) : noData ? (
                    <EmptyComponent />
                ) : (
                    <Loading />
                )
            ) : searchValue || isMobileScreen ? (
                <TableComponent
                    columns={columns}
                    data={afterSearch}
                    handleRowValue={handleRowValue}
                    lazy={false}
                    inTab={true}
                />
            ) : (
                <DraggableTable
                    columns={dragColumns}
                    handleRowValue={handleDragRowValue}
                />
            )}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        stockPermissions: state.stockPermissions.stockPermissions,
        stockPermissionsEvents: state.stockPermissionsEvents,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setStockPermissionsEvents: (data) =>
            dispatch(setStockPermissionsEvents(data)),
        setStockPermissions: (data) => dispatch(setStockPermissions(data)),
        setIsEmployeeModalOpen: (data) =>
            dispatch(setIsEmployeeModalOpen(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTab2);
