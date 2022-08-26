import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import { BACKEND_URL, fetchWithParams } from '../../functions';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import TableComponent from '../tableComponent/TableComponent';
import './productPrice.scss';

const columns = [
    { id: 'price', label: 'Baha', minWidth: 100 },
    { id: 'currencyId', label: 'Pul birligi', minWidth: 100 },
    { id: 'priority', label: 'Öňdeligi', minWidth: 100 },
    { id: 'beginDate', label: 'Başlaýan wagty', minWidth: 100 },
    { id: 'endDate', label: 'Gutarýan wagty', minWidth: 100 },
    { id: 'clentCode', label: 'Cari kody', minWidth: 100 },
    { id: 'clcyphcode', label: 'Cari yetki kody', minWidth: 100 },
    { id: 'clspecode', label: 'Cari ozel kodlar', minWidth: 100 },
    { id: 'active', label: 'Aktiw', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
];

function ProductPrice(params) {
    const { id } = useParams();
    const [productPriceInfo, setProductPriceInfo] = useState([]);
    const [isError, setIsError] = useState(false);
    const [noProductPrice, setNoProductPrice] = useState(false);

    const fetchProductPrice = () => {
        fetchWithParams(
            {
                url: `${BACKEND_URL}/admin/items/${id ? id : params.id}/prices`,
            },
            (data) => {
                setIsError(false);
                !data.length
                    ? setNoProductPrice(true)
                    : setNoProductPrice(false);

                data.forEach((d) => {
                    if (d.beginDate) {
                        d.beginDate = dateFormat(
                            d.beginDate,
                            'yyyy-mm-dd HH:MM'
                        );
                    }
                    if (d.endDate) {
                        d.endDate = dateFormat(d.endDate, 'yyyy-mm-dd HH:MM');
                    }
                    let dataSpecode = [];
                    dataSpecode.push(d.clspecode);
                    dataSpecode.push(d.clspecode1);
                    dataSpecode.push(d.clspecode2);
                    dataSpecode.push(d.clspecode3);
                    dataSpecode.push(d.clspecode4);
                    dataSpecode.push(d.clspecode5);
                    d.clspecode = [...dataSpecode];
                });
                setProductPriceInfo([...data]);
            },
            setIsError
        );
    };
    useEffect(() => {
        fetchProductPrice();
        // eslint-disable-next-line
    }, []);

    const handleRowValue = (column, row) => {
        return column.id === 'active' ? (
            <div
                className="paretto"
                style={{
                    backgroundColor: `${
                        row.active
                            ? 'rgba(0, 135, 107, 0.5)'
                            : 'rgba(255, 0, 26, 0.5)'
                    }`,
                }}
            >
                <span>{row.active ? 'aktiw' : 'passiw'}</span>
            </div>
        ) : column.id === 'status' ? (
            <div
                className="paretto"
                style={{
                    backgroundColor: `${
                        row.status
                            ? 'rgba(0, 135, 107, 0.5)'
                            : 'rgba(255, 0, 26, 0.5)'
                    }`,
                }}
            >
                <span>{row.status ? 'aktiw' : 'passiw'}</span>
            </div>
        ) : column.id === 'clspecode' ? (
            row.clspecode.map((spec, i) => {
                return `${spec && i !== 0 ? ', ' : ''}${spec ? spec : ''} `;
            })
        ) : (
            row[column.id]
        );
    };

    return (
        <div className="product-price">
            {!productPriceInfo.length ? (
                isError ? (
                    <ErrorComponent />
                ) : noProductPrice ? (
                    <EmptyComponent />
                ) : (
                    <Loading />
                )
            ) : (
                <TableComponent
                    columns={columns}
                    data={productPriceInfo}
                    handleRowValue={handleRowValue}
                    lazy={false}
                    items={productPriceInfo}
                    inTab={true}
                />
            )}
        </div>
    );
}

export default ProductPrice;
