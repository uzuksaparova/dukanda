import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import EmptyComponent from '../../../../emptyComponent/EmptyComponent';
import './qrTab2.scss';
import ProductCardComponent from '../../../../productCardComponent/ProductCardComponent';

function QrTab2(props) {
    const { qrDeviceItemData, fetchQrDeviceItemInfo } = props;

    return (
        <div className="qr-tab2-items-tab">
            <div id="qr-tab2-items" className="qr-tab2-items">
                {qrDeviceItemData.data.length ? (
                    <InfiniteScroll
                        dataLength={qrDeviceItemData.data.length}
                        next={fetchQrDeviceItemInfo}
                        scrollableTarget="qr-tab2-items"
                        hasMore={!qrDeviceItemData.isEnd}
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
                        <div className="qr-tab2-items-scroll">
                            {qrDeviceItemData.data.map((card, i) => {
                                return (
                                    <ProductCardComponent
                                        key={i}
                                        card={card}
                                        inQrDevice={true}
                                    />
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

export default QrTab2;
