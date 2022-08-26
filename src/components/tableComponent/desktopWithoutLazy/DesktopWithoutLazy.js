import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../tableComponentDesktop/tableComponentDesktop.scss';
import { connect } from 'react-redux';
import './desktopWithoutLazy.scss';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const DesktopWithoutLazy = (props) => {
    const {
        columns,
        data,
        handleRowValue,
        buttonExist,
        tableButton,
        isSidebarOpen,
        items,
        rowPath,
        handleRowClick,
        isRowClickable,
        inTab,
    } = props;

    const dataToMap = items.length
        ? items
        : Array.isArray(data)
        ? data
        : data.data;
    return (
        <div
            className={`desktop-without-lazy ${
                isSidebarOpen && !inTab ? 'sidebar-open' : ''
            }`}
        >
            <Paper sx={{ width: '100%' }}>
                <TableContainer id="table-scroll">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={uuidv4()}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                {buttonExist ? <TableCell> </TableCell> : null}
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ height: '100%', overflowY: 'scroll' }}>
                            {dataToMap.map((row, i) => {
                                return (
                                    <TableRow
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={uuidv4()}
                                        hover={!!rowPath || isRowClickable}
                                        component={rowPath ? Link : ''}
                                        to={`/${rowPath}/${row.id}`}
                                        onClick={(e) => handleRowClick(e, row)}
                                    >
                                        {columns.map((column, index) => {
                                            const value = handleRowValue(
                                                column,
                                                row,
                                                i
                                            );

                                            return (
                                                <TableCell
                                                    align={column.align}
                                                    key={uuidv4()}
                                                    sx={{
                                                        color:
                                                            row.active ||
                                                            !row.hasOwnProperty(
                                                                'active'
                                                            )
                                                                ? '#000'
                                                                : 'rgb(165, 162, 162)',
                                                    }}
                                                >
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                        {buttonExist ? (
                                            <TableCell>
                                                {tableButton(row)}
                                            </TableCell>
                                        ) : null}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
    };
};

export default connect(mapStateToProps)(DesktopWithoutLazy);
