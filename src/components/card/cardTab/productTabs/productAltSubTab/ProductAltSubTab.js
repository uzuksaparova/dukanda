import React from 'react';
import './productAltSubTab.scss';
import ProductCardComponent from '../../../../productCardComponent/ProductCardComponent';
import EmptyComponent from '../../../../emptyComponent/EmptyComponent';

function ProductAltSubTab(props) {
    const { TabContainer, products } = props;
    return (
        <TabContainer>
            <div className="product-items-scroll">
                {products.length ? (
                    products.map((card, i) => {
                        return <ProductCardComponent card={card} kry={i} />;
                    })
                ) : (
                    <EmptyComponent />
                )}
            </div>
        </TabContainer>
    );
}

export default ProductAltSubTab;
