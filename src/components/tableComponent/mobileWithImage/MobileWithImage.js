import React from 'react';
import './mobileWithImage.scss';
import { v4 as uuidv4 } from 'uuid';
import { FaInfo } from 'react-icons/fa';
import { Fab } from '@mui/material';

const MobileWithImage = (props) => {
    const {
        columns,
        data,
        handleRowValue,
        items = [],
        handleImageCell,
        handleRowClick,
    } = props;

    const dataToMap = items.length ? items : data.data;

    const oneRow = (leftValue, rightValue) => {
        return (
            <div className="one-row">
                <div className="left">{leftValue}</div>
                <div className="right">{rightValue}</div>
            </div>
        );
    };

    return (
        <div className="mobile-with-image">
            {dataToMap.map((item) => {
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
                        <div className="table-edit-button">
                            <Fab
                                color="secondary"
                                aria-label="edit"
                                onClick={(e) => handleRowClick(e, item)}
                            >
                                <FaInfo />
                            </Fab>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MobileWithImage;
