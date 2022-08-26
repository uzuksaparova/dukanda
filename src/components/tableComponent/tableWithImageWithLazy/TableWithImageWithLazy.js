import React from 'react';
import './tableWithImageWithLazy.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import { Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

const TableWithImageWithLazy = (props) => {
    const {
        columns,
        data,
        handleRowValue,
        handleFetchMore,
        handleImageCell,
        buttonExist,
        tableButton,
        isRowClickable,
        rowPath,
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
        <div
            className="table-with-image-with-lazy"
            id="table-with-image-with-lazy"
        >
            <InfiniteScroll
                dataLength={data.data.length}
                next={handleFetchMore}
                scrollableTarget="table-with-image-with-lazy"
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
                        <div className="mobile-with-image-item" key={uuidv4()}>
                            <div className="image-section">
                                {handleImageCell(item)}
                            </div>
                            <div className="bottom-info">
                                {columns.map((column) => {
                                    if (column.id !== 'image') {
                                        return oneRow(
                                            column.label,
                                            handleRowValue(column, item)
                                        );
                                    }
                                    return null;
                                })}
                            </div>
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

export default TableWithImageWithLazy;
