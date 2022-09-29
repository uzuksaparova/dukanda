import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { BACKEND_URL, fetchWithParams } from '../../functions';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import SearchComponent from '../searchComponent/SearchComponent';
import TableComponent from '../tableComponent/TableComponent';

const columns = [
    { id: 'nr', label: 'NR', minWidth: 100 },
    { id: 'name', label: 'Ady', minWidth: 100 },

    { id: 'onhand', label: 'Bar bolan', minWidth: 100 },

    {
        id: 'reserved',
        label: 'Rezerwda',
        minWidth: 100,
        align: 'left',
    },
];

function ProductStock(props) {
    const { id, renderedIn } = props;

    const [searchValue, setSearchValue] = useState('');
    const [noProductStock, setNoProductStock] = useState(false);
    const [productStockInfo, setProductStockInfo] = useState([]);
    const [isError, setIsError] = useState(false);

    const fetchProductStock = () => {
        fetchWithParams(
            {
                url: `${BACKEND_URL}/admin/items/${id}/warehouses`,
                params: { search: searchValue },
            },
            (data) => {
                setIsError(false);
                !data.length
                    ? setNoProductStock(true)
                    : setNoProductStock(false);
                setProductStockInfo([...data]);
            },
            setIsError
        );
    };
    useEffect(() => {
        fetchProductStock();
        // eslint-disable-next-line
    }, []);

    const onProductStockSearchChange = (e) => {
        setSearchValue(e.target.value);
    };
    const onSearchIconClick = async () => {
        setProductStockInfo([]);
        fetchProductStock();
    };
    const handleKeypress = (e) => {
        if (e.charCode === 13) {
            onSearchIconClick();
        }
    };

    const handleRowValue = (column, row) => {
        return column.id === 'onhand'
            ? row?.permissionType === 'amount'
                ? row[column.id]
                : row?.onhand > 0
                ? 'Bar'
                : 'Yok'
            : column.id === 'reserved'
            ? row?.permissionType === 'amount'
                ? row[column.id]
                : row?.reserved > 0
                ? 'Bar'
                : 'Yok'
            : row[column.id];
    };
    return (
        <div style={{ minHeight: '500px' }}>
            <SearchComponent
                searchValue={searchValue}
                handleInputChange={onProductStockSearchChange}
                onSearchIconClick={onSearchIconClick}
            />

            {!productStockInfo.length ? (
                isError ? (
                    <ErrorComponent />
                ) : noProductStock ? (
                    <EmptyComponent />
                ) : (
                    <Loading />
                )
            ) : (
                <TableComponent
                    columns={columns}
                    data={productStockInfo}
                    handleRowValue={handleRowValue}
                    lazy={false}
                    inTab={
                        renderedIn === 'productTab' || renderedIn === 'products'
                            ? true
                            : false
                    }
                />
            )}
        </div>
    );
}

export default ProductStock;
