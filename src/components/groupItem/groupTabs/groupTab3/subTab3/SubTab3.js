import React from 'react';
import { FiSearch } from 'react-icons/fi';
import InfiniteScroll from 'react-infinite-scroll-component';

import EmptyComponent from '../../../../emptyComponent/EmptyComponent';
import './subTab3.scss';
import ProductCardComponent from '../../../../productCardComponent/ProductCardComponent';
import SearchComponent from '../../../../searchComponent/SearchComponent';

function SubTab3(props) {
    const {
        tab3SendInfo,
        tab3Data,
        setTab3SendInfo,
        setTab3Data,
        fetchTab3Data,
    } = props;
    const onSubgroupItemSearchChange = (e) => {
        setTab3SendInfo({
            ...tab3SendInfo,
            search: e.target.value,
            offset: 0,
        });
    };
    const onSearchIconClick = async () => {
        setTab3Data({ ...tab3Data, data: [] });
        fetchTab3Data(true);
    };

    return (
        <div className="subgroup-items-tab">
            <SearchComponent
                searchValue={tab3SendInfo?.search}
                handleInputChange={onSubgroupItemSearchChange}
                onSearchIconClick={onSearchIconClick}
            />

            <div id="sub-tab3-items" className="sub-tab3-items">
                {tab3Data.data.length ? (
                    <InfiniteScroll
                        dataLength={tab3Data.data.length}
                        next={fetchTab3Data}
                        scrollableTarget="sub-tab3-items"
                        hasMore={!tab3Data.isEnd}
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
                        <div className="sub-tab3-items-scroll">
                            {tab3Data.data.map((card, i) => {
                                return (
                                    <ProductCardComponent key={i} card={card} />
                                );
                            })}
                        </div>
                    </InfiniteScroll>
                ) : (
                    <EmptyComponent />
                )}
            </div>
        </div>
    );
}

export default SubTab3;
