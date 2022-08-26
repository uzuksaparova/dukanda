import React from 'react';
import './tableComponentMobile.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import EditIcon from '@mui/icons-material/Edit';
import { Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const TableComponentMobile = (props) => {
    const {
        columns,
        data,
        handleRowValue,
        buttonExist,
        tableButton,
        handleFetchMore,
        rowPath,
        isRowClickable,
        handleRowClick,
        rowPathType,
    } = props;

    const oneRow = (leftValue, rightValue) => {
        return (
            <div className="one-row">
                <div className="left">{leftValue}</div>
                <div className="right">{rightValue ? rightValue : '----'}</div>
            </div>
        );
    };

    return (
        <div className="table-component-mobile" id="table-component-mobile">
            <InfiniteScroll
                dataLength={data.data.length}
                next={handleFetchMore}
                scrollableTarget="table-component-mobile"
                hasMore={!data.isEnd}
                loader={
                    <p
                        style={{
                            textAlign: 'center',
                            opacity: '0.5',
                        }}
                    >
                        Ýüklenilýär...
                    </p>
                }
                endMessage={
                    <p
                        style={{
                            textAlign: 'center',
                            opacity: '0.5',
                        }}
                    >
                        Şulardan ybarat
                    </p>
                }
            >
                {data.data.map((item) => {
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
                            {rowPath || isRowClickable ? (
                                <div className="table-edit-button">
                                    <Fab
                                        color="secondary"
                                        aria-label="edit"
                                        component={rowPath ? Link : ''}
                                        to={`/${rowPath}/${
                                            rowPathType
                                                ? item[rowPathType]
                                                : item.id
                                        }`}
                                        onClick={(e) => handleRowClick(e, item)}
                                    >
                                        <EditIcon />
                                    </Fab>
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </InfiniteScroll>
        </div>
    );
};

export default TableComponentMobile;
