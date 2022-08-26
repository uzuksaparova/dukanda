import React, { useEffect } from 'react';
import Cards from '../cards/Cards';
import './adminProducts.scss';
import { connect } from 'react-redux';
import { setSidebarSearchValue } from '../../redux/actions/sidebarActions';
import { fetchProductsInfo } from '../../functions';

function AdminProducts(props) {
    const {
        productsData,
        isSidebarOpen,
        setSidebarSearchValue,
        productSendInfo,
    } = props;

    useEffect(() => {
        setSidebarSearchValue('');
        if (!productsData.data.length) {
            fetchProductsInfo(true, {
                ...productSendInfo,
                image: 'all',
            });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div id="admin-page-products" className={'admin-page-products'}>
                <Cards />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        productsData: state.productsData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        productSendInfo: state.productSendInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSidebarSearchValue: (value) =>
            dispatch(setSidebarSearchValue(value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
