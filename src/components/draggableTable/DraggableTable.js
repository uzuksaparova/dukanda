import React, { useMemo, useState, useEffect } from 'react';
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTable } from 'react-table';
import { DraggableTableRow } from './DraggableTableRow';
import { StaticTableRow } from './StaticTableRow';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { setStockPermissions } from '../../redux/actions/employeeActions';
import { connect } from 'react-redux';

const DraggableTable = ({
    columns,
    stockPermissions,
    setStockPermissions,
    handleRowValue,
}) => {
    const [activeId, setActiveId] = useState();
    const items = useMemo(() => {
        return stockPermissions?.map(({ id }) => id);
    }, [stockPermissions]);
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data: stockPermissions,
        });
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    );

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);

            const tempStockPermissions = arrayMove(
                stockPermissions,
                oldIndex,
                newIndex
            );
            setStockPermissions(tempStockPermissions);
        }

        setActiveId(null);
    }

    function handleDragCancel() {
        setActiveId(null);
    }

    const selectedRow = useMemo(() => {
        if (!activeId) {
            return null;
        }
        const row = rows.find(({ original }) => original.id === activeId);
        prepareRow(row);
        return row;
    }, [activeId, rows, prepareRow]);

    // Render the UI for your table
    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
        >
            <table {...getTableProps()} style={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                align={column.align}
                                style={{
                                    minWidth: column.minWidth,
                                }}
                            >
                                {column['Header']}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <tbody {...getTableBodyProps()}>
                    <SortableContext
                        items={items}
                        strategy={verticalListSortingStrategy}
                    >
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <DraggableTableRow
                                    key={row.original.id}
                                    row={row}
                                    handleRowValue={handleRowValue}
                                />
                            );
                        })}
                    </SortableContext>
                </tbody>
            </table>
            <DragOverlay>
                {activeId && (
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <StaticTableRow
                                row={selectedRow}
                                handleRowValue={handleRowValue}
                            />
                        </tbody>
                    </table>
                )}
            </DragOverlay>
        </DndContext>
    );
};

const mapStateToProps = (state) => {
    return {
        stockPermissions: state.stockPermissions.stockPermissions,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setStockPermissions: (data) => dispatch(setStockPermissions(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableTable);
