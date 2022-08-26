import React, { useState } from 'react';
import './cards.scss';
import Loading from '../Loading';
import defaultImage from '../../images/default.png';
import brokenImage from '../../images/brokenImage.png';
import CardImageModal from '../cardImageModal/CardImageModal';
import StockModal from './stockModal/StockModal';
import { BACKEND_URL, fetchProductsInfo } from '../../functions';
import { connect } from 'react-redux';
import {
    setIsProductImageModalOpen,
    setIsProductStockModalOpen,
    setProductImages,
} from '../../redux/actions/productActions';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import TableButtonsComponent from '../tableButtonsComponent/TableButtonsComponent';
import TableComponent from '../tableComponent/TableComponent';

const Cards = (props) => {
    const {
        productsData,
        setIsProductImageModalOpen,
        setIsProductStockModalOpen,
        setProductImages,
        isError,
    } = props;
    const { isEnd, noData, data } = productsData;

    const [stockId, setStockId] = useState('');

    const handleImagePreview = (images) => {
        if (images.length) {
            setProductImages(images);
            setIsProductImageModalOpen(true);
        }
    };

    const handleImageCell = (row) => {
        return row.images.length && row.images[0].mainImage ? (
            <img
                src={`${BACKEND_URL}/images/items/${row.images[0].mediumImg}`}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = brokenImage;
                }}
                alt="doorhandle"
                onClick={() => handleImagePreview(row.images)}
            />
        ) : (
            <img src={defaultImage} alt="doorhandle" />
        );
    };

    const handleParettoCell = (row) => {
        return (
            <div
                className="paretto"
                style={{
                    backgroundColor: `${
                        row.paretto === 'best'
                            ? 'rgba(0, 135, 107, 0.8)'
                            : row.paretto === 'middle'
                            ? 'rgba(0, 120, 223, 0.8)'
                            : 'rgba(255, 0, 26, 0.8)'
                    }`,
                }}
            >
                <span>
                    {row.paretto === 'best'
                        ? 'çok satan'
                        : row.paretto === 'middle'
                        ? 'orta satan'
                        : 'az satan'}
                </span>
            </div>
        );
    };
    const handleActiveCell = (row) => {
        if (!row.active || !row.eActive) {
            return (
                <div
                    className="paretto"
                    style={{ backgroundColor: '#9d00ffe6' }}
                >
                    <span>kullanım dışı</span>
                </div>
            );
        }
        return <span>kullanımda</span>;
    };

    const columns = [
        { id: 'image', label: 'Suraty', minWidth: 100, align: 'left' },
        { id: 'name', label: 'Ady', minWidth: 170, align: 'left' },
        { id: 'code', label: 'Kody', minWidth: 120, align: 'left' },
        { id: 'mainUnit', label: 'Birimi', minWidth: 120, align: 'left' },
        { id: 'group', label: 'Grupbasy', minWidth: 120, align: 'left' },
        { id: 'paretto', label: 'Paretto', minWidth: 120, align: 'left' },
        { id: 'active', label: 'Kullanımı', minWidth: 150, align: 'left' },
        { id: 'nameTm', label: 'Tm ady', minWidth: 150, align: 'left' },
        { id: 'nameRu', label: 'Ru ady', minWidth: 150, align: 'left' },
        // { id: 'nameTr', label: 'Tr ady', minWidth: 150, align: 'left' },
        // { id: 'nameEng', label: 'Eng ady', minWidth: 150, align: 'left' },
    ];

    const handleRowValue = (column, row, i) => {
        return column.id === 'image'
            ? handleImageCell(row)
            : column.id === 'group'
            ? row?.lastGroup.name
            : column.id === 'paretto'
            ? handleParettoCell(row)
            : column.id === 'active'
            ? handleActiveCell(row)
            : row[column.id] || '----';
    };

    const handleStockClick = (id) => {
        setStockId(id);
        setIsProductStockModalOpen(true);
    };

    const tableButton = (row) => {
        return (
            <TableButtonsComponent
                row={row}
                handleStockClick={handleStockClick}
                editPath={`/products/${row.id}`}
            />
        );
    };

    const handleFetchMore = () => {
        fetchProductsInfo();
    };

    return (
        <div className="cards">
            {!data.length ? (
                isError ? (
                    <ErrorComponent />
                ) : noData ? (
                    <EmptyComponent />
                ) : (
                    <Loading />
                )
            ) : (
                <TableComponent
                    columns={columns}
                    data={productsData}
                    handleRowValue={handleRowValue}
                    buttonExist={true}
                    tableButton={tableButton}
                    handleFetchMore={handleFetchMore}
                    withImage={true}
                    handleImagePreview={handleImagePreview}
                    handleImageCell={handleImageCell}
                />
            )}
            <StockModal stockId={stockId} />
            <CardImageModal />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        productsData: state.productsData,
        isError: state.isError.isError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsProductImageModalOpen: (open) =>
            dispatch(setIsProductImageModalOpen(open)),
        setIsProductStockModalOpen: (open) =>
            dispatch(setIsProductStockModalOpen(open)),
        setProductImages: (images) => dispatch(setProductImages(images)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cards);
