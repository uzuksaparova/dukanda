import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Loading';
import './clientCard.scss';
import { BACKEND_URL, fetchWithParams } from '../../functions';
import ProductCardComponent from '../productCardComponent/ProductCardComponent';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';

function ClientCard(props) {
    const [isError, setIsError] = useState();
    const limit = 10;
    const [cards, setCards] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isCardsEnd, setIsCardsEnd] = useState(false);
    const [noCards, setNoCards] = useState(false);

    useEffect(() => {
        fetchWithParams(
            {
                url: `${BACKEND_URL}/admin${props.url}`,
                params: { limit, offset: 0 },
            },
            (data) => {
                data.length ? setNoCards(false) : setNoCards(true);
                data.length < limit
                    ? setIsCardsEnd(true)
                    : setIsCardsEnd(false);
                setIsError(false);
                setCards([...data]);
            },
            setIsError
        );
        // eslint-disable-next-line
    }, []);

    const fetchCardsOffset = () => {
        fetchWithParams(
            {
                url: `${BACKEND_URL}/admin${props.url}`,
                params: {
                    limit,
                    offset: offset + limit,
                },
            },
            (data) => {
                setIsError(false);
                !data.length ? setIsCardsEnd(true) : setIsCardsEnd(false);
                setCards([...cards, ...data]);
            },
            setIsError
        );
        setOffset(offset + limit);
    };

    return (
        <div>
            <div className="client-card-scroll" id="card-scroll">
                {!cards.length ? (
                    isError ? (
                        <ErrorComponent />
                    ) : noCards ? (
                        <EmptyComponent />
                    ) : (
                        <Loading />
                    )
                ) : (
                    <InfiniteScroll
                        dataLength={cards.length}
                        next={fetchCardsOffset}
                        scrollableTarget="card-scroll"
                        hasMore={!isCardsEnd}
                        loader={
                            <p style={{ textAlign: 'center', opacity: '0.5' }}>
                                Ýüklenilýär...
                            </p>
                        }
                        endMessage={
                            <p style={{ textAlign: 'center', opacity: '0.5' }}>
                                Şulardan ybarat
                            </p>
                        }
                    >
                        {cards.map((card, i) => {
                            return (
                                <ProductCardComponent
                                    key={i}
                                    card={card.item}
                                />
                            );
                        })}
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
}

export default ClientCard;
