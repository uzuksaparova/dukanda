import { Checkbox, FormControlLabel } from '@mui/material';
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

function EmployeeTab2(props) {
    const {
        stockPermissions,
        stockPermissionsEvents,
        setStockPermissionsEvents,
        setStockPermissions,
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

    const handleAccessChange = (e, row) => {
        e.stopPropagation();
        let tempAfterSearchDeposData = afterSearch;
        let tempDeposData = stockPermissions;

        if (e.target.name === 'access') {
            if (e.target.checked) {
                tempDeposData = tempDeposData.map((depo) => {
                    if (depo.id === row.id) {
                        return { ...row, type: 'available' };
                    }
                    return depo;
                });
                tempAfterSearchDeposData = tempAfterSearchDeposData.map(
                    (depo) => {
                        if (depo.id === row.id) {
                            return { ...row, type: 'available' };
                        }
                        return depo;
                    }
                );
            } else {
                tempDeposData = tempDeposData.map((depo) => {
                    if (depo.id === row.id) {
                        return { ...row, type: '' };
                    }
                    return depo;
                });
                tempAfterSearchDeposData = tempAfterSearchDeposData.map(
                    (depo) => {
                        if (depo.id === row.id) {
                            return { ...row, type: '' };
                        }
                        return depo;
                    }
                );
            }
        } else {
            if (e.target.checked) {
                tempAfterSearchDeposData = tempAfterSearchDeposData.map(
                    (depo) => {
                        if (depo.id === row.id) {
                            return { ...row, type: 'amount' };
                        }
                        return depo;
                    }
                );
                tempDeposData = tempDeposData.map((depo) => {
                    if (depo.id === row.id) {
                        return { ...row, type: 'amount' };
                    }
                    return depo;
                });
            } else {
                tempDeposData = tempDeposData.map((depo) => {
                    if (depo.id === row.id) {
                        return { ...row, type: 'available' };
                    }
                    return depo;
                });
                tempAfterSearchDeposData = tempAfterSearchDeposData.map(
                    (depo) => {
                        if (depo.id === row.id) {
                            return { ...row, type: 'available' };
                        }
                        return depo;
                    }
                );
            }
        }

        setStockPermissions([...tempDeposData]);
        setAfterSearch([...tempAfterSearchDeposData]);
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

    return (
        <div className="employee-tab2">
            <SearchComponent
                searchValue={searchValue}
                handleInputChange={handleInputChange}
                onSearchIconClick={onSearchIconClick}
            />
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTab2);
