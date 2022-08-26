import React from 'react';
import { brandSendInfo } from '../../../../redux/reducers/brandReducer';
import ProductCardComponent from '../../../productCardComponent/ProductCardComponent';
import SearchComponent from '../../../searchComponent/SearchComponent';
import InfiniteScroll from 'react-infinite-scroll-component';
import EmptyComponent from '../../../emptyComponent/EmptyComponent';
import ErrorComponent from '../../../errorComponent/ErrorComponent';
import Loading from '../../../Loading';
import { connect } from 'react-redux';

function BrandTab2(props) {
    const {
        setBrandSendInfo,
        setBrandItems,
        brandItems,
        fetchBrandWithItem,
        isError,
        brandItemsData,
    } = props;
    const onBrandItemSearchChange = (e) => {
        setBrandSendInfo({
            ...brandSendInfo,
            search: e.target.value,
            offset: 0,
        });
    };
    const onSearchIconClick = async () => {
        setBrandItems({ ...brandItems, data: [] });
        fetchBrandWithItem(true);
    };
    return (
        <div>
            <div className="brand-items-header">
                <SearchComponent
                    searchValue={brandSendInfo.search}
                    handleInputChange={onBrandItemSearchChange}
                    onSearchIconClick={onSearchIconClick}
                />
            </div>
            <div id="brand-items">
                {brandItemsData.length ? (
                    <InfiniteScroll
                        dataLength={brandItemsData.length}
                        next={fetchBrandWithItem}
                        scrollableTarget="brand-items"
                        hasMore={!brandItems.isEnd}
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
                        <div className="brand-items-scroll">
                            {brandItemsData.map((card, i) => {
                                return (
                                    <ProductCardComponent
                                        card={card}
                                        key={i}
                                        image="image"
                                    />
                                );
                            })}
                        </div>
                    </InfiniteScroll>
                ) : brandItems.isEnd ? (
                    <EmptyComponent />
                ) : isError ? (
                    <ErrorComponent />
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        isError: state.isError.isError,
    };
};

export default connect(mapStateToProps)(BrandTab2);
