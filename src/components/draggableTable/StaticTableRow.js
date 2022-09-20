import React from 'react';
import { DragHandle } from './DragHandle';
import styled from 'styled-components';

const StyledStaticData = styled.td`
    background: white;
    padding: 16px;
    align-items: center;
    font-size: 0.875rem;
    &:first-of-type {
        min-width: 20ch;
        display: flex;
    }
`;

const StyledStaticTableRow = styled.tr`
    box-shadow: rgb(0 0 0 / 10%) 0px 20px 25px -5px,
        rgb(0 0 0 / 30%) 0px 10px 10px -5px;
    outline: #e9601f solid 1px;
`;

export const StaticTableRow = ({ row, handleRowValue }) => {
    return (
        <StyledStaticTableRow {...row.getRowProps()}>
            {row.cells.map((cell, i) => {
                if (i === 0) {
                    return (
                        <StyledStaticData {...cell.getCellProps()}>
                            <DragHandle isDragging />
                            <span>{cell.render('Cell')}</span>
                        </StyledStaticData>
                    );
                }
                return (
                    <StyledStaticData
                        {...cell.getCellProps()}
                        sx={{ textAlign: cell.column.align }}
                    >
                        {handleRowValue(cell)}
                    </StyledStaticData>
                );
            })}
        </StyledStaticTableRow>
    );
};
