import React from 'react';
import '../tableComponentMobile/tableComponentMobile.scss';
import EditIcon from '@mui/icons-material/Edit';
import { Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const MobileWithoutLazy = (props) => {
    const {
        columns,
        data,
        handleRowValue,
        buttonExist,
        items = [],
        tableButton,
        rowPath,
    } = props;
    const dataToMap = items.length
        ? items
        : Array.isArray(data)
        ? data
        : data.data;
    const oneRow = (leftValue, rightValue) => {
        return (
            <div className="one-row">
                <div className="left">{leftValue}</div>
                <div className="right">{rightValue ? rightValue : '----'}</div>
            </div>
        );
    };

    return (
        <div className="table-component-mobile">
            {dataToMap.map((item) => {
                return (
                    <div className="item" key={uuidv4()}>
                        {columns.map((column, i) => {
                            return (
                                <div className="data-item" key={uuidv4()}>
                                    {oneRow(
                                        column.label,
                                        handleRowValue(column, item, i)
                                    )}
                                </div>
                            );
                        })}
                        {buttonExist ? (
                            <div className="table-button">
                                {tableButton(item)}
                            </div>
                        ) : null}
                        {rowPath ? (
                            <div className="table-edit-button">
                                <Fab
                                    color="secondary"
                                    aria-label="edit"
                                    component={Link}
                                    to={`/${rowPath}/${item.id}`}
                                >
                                    <EditIcon />
                                </Fab>
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};

export default MobileWithoutLazy;
