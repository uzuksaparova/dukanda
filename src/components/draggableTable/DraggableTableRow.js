import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandle } from './DragHandle';
import styled from 'styled-components';
import { TableCell, TableRow } from '@mui/material';

const DraggingRow = styled.td`
    background: rgba(127, 207, 250, 0.3);
`;

export const DraggableTableRow = ({ row, handleRowValue }) => {
    const {
        attributes,
        listeners,
        transform,
        transition,
        setNodeRef,
        isDragging,
    } = useSortable({
        id: row.original.id,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
    };
    return (
        <tr ref={setNodeRef} style={style} {...row.getRowProps()}>
            {isDragging ? (
                <TableRow colSpan={row.cells.length}>&nbsp;</TableRow>
            ) : (
                row.cells.map((cell, i) => {
                    if (i === 0) {
                        return (
                            <TableCell {...cell.getCellProps()}>
                                <DragHandle {...attributes} {...listeners} />
                                <span>{cell.render('Cell')}</span>
                            </TableCell>
                        );
                    }
                    return (
                        <TableCell {...cell.getCellProps()}>
                            {handleRowValue(cell)}
                        </TableCell>
                    );
                })
            )}
        </tr>
    );
};
