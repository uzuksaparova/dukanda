import React, { useState, useEffect } from 'react';
import './divisionClientModal.scss';
import Loading from '../../Loading';
import Button from '@material-ui/core/Button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import {
    BACKEND_URL,
    fetchWithoutParams,
    fetchClientsInfo,
} from '../../../functions';
import { connect } from 'react-redux';
import {
    setClientsData,
    setClientSendInfo,
} from '../../../redux/actions/clientActions';
import {
    setDivisionItemSendInfo,
    setIsDivisionClientModalOpen,
    setEmptyValues,
} from '../../../redux/actions/divisionActions';

import {
    Backdrop,
    Box,
    Modal,
    Fade,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
import ClientFilter from '../../filter/clientFilter/ClientFilter';
import * as authorizationn from '../../authorization.json';
import SearchComponent from '../../searchComponent/SearchComponent';
import ErrorComponent from '../../errorComponent/ErrorComponent';
import EmptyComponent from '../../emptyComponent/EmptyComponent';
import { useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const authorization = authorizationn.default;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function DivisionClientModal(props) {
    const {
        divisionItemInfoSend,
        setDivisionItemSendInfo,
        setClientChip,
        setClient,
        orderId,
        valuee,
        isDivisionClientModalOpen,
        clientsData,
        isFilterOpen,
        clientSendInfo,
        setClientsData,
        setClientSendInfo,
        setIsDivisionClientModalOpen,
        isError,
        decodedToken,
        shouldFetch = true,
        emptyValues,
        setEmptyValues,
    } = props;

    const { data, noData, isEnd } = clientsData;
    const [clientId, setClientId] = useState(valuee ? valuee : '');
    const [searchValue, setSearchValue] = useState('');

    const useeLocation = useLocation();
    const pathname = useeLocation.pathname;

    useEffect(() => {
        !clientsData.data.length && shouldFetch && fetchClientsInfo(true);
        // eslint-disable-next-line
    }, []);

    const onSidebarSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const onSearchIconClick = () => {
        setClientsData({ ...clientsData, data: [] });
        let menuSend = clientSendInfo;
        menuSend.offset = 0;
        menuSend.search = searchValue;
        setClientSendInfo(menuSend);
        if (!isError && shouldFetch) {
            fetchClientsInfo(true, menuSend);
        }
    };

    const handleChange = (e) => {
        setClientId(e.target.value);

        if (pathname.includes('orders')) {
            setClient({ id: e.target.value, name: e.target.name });
        } else {
            setDivisionItemSendInfo({
                ...divisionItemInfoSend,
                clientId: e.target.value,
            });
            setClientChip(e.target.name);
            let tempEmptyValues = emptyValues;
            tempEmptyValues = tempEmptyValues.filter((v) => v !== 'clientId');
            setEmptyValues(tempEmptyValues);
        }
    };
    const handleOkButton = () => {
        var agreed = window.confirm(
            `Siz hakykatdan hem müşderini üýtgetmek isleýäňizmi?`
        );
        if (agreed) {
            setIsDivisionClientModalOpen(false);
            if (pathname.includes('orders')) {
                fetchWithoutParams(
                    {
                        url: `${BACKEND_URL}/admin/orders/${orderId}/client/${valuee}`,
                        method: 'PUT',
                    },
                    (data) => {
                        toast.success('Müşderi üýtgedildi', {
                            autoClose: 2000,
                        });
                    }
                );
            }
        }
    };

    return (
        <Modal
            className="device-modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isDivisionClientModalOpen}
            onClose={() => setIsDivisionClientModalOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isDivisionClientModalOpen}>
                <Box sx={style}>
                    <span className="close">
                        <FaTimes
                            onClick={() => setIsDivisionClientModalOpen(false)}
                        />
                    </span>
                    <SearchComponent
                        searchValue={searchValue}
                        handleInputChange={onSidebarSearchChange}
                        onSearchIconClick={onSearchIconClick}
                        filter={true}
                        filterComponent={<ClientFilter />}
                    />

                    <div className="modal-bottom" id="modal-bottom">
                        {!data.length ? (
                            isError ? (
                                <ErrorComponent />
                            ) : noData ? (
                                <EmptyComponent />
                            ) : (
                                <Loading />
                            )
                        ) : (
                            <InfiniteScroll
                                dataLength={data.length}
                                next={fetchClientsInfo}
                                scrollableTarget="modal-bottom"
                                hasMore={!isEnd}
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
                                <div>
                                    <FormControl
                                        component="fieldset"
                                        style={{
                                            zIndex: `${
                                                isFilterOpen ? '-1' : '1'
                                            }`,
                                        }}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <FormLabel component="legend">
                                            Müşderiler
                                        </FormLabel>
                                        <RadioGroup
                                            aria-label="gender"
                                            name="controlled-radio-buttons-group"
                                            value={Number(clientId)}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            {' '}
                                            {data?.map((client, i) => {
                                                return (
                                                    <FormControlLabel
                                                        key={client.id}
                                                        value={Number(
                                                            client.id
                                                        )}
                                                        control={<Radio />}
                                                        label={`${client.name}  (kody: ${client.code})`}
                                                        name={client.name}
                                                    />
                                                );
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </InfiniteScroll>
                        )}
                    </div>
                    <div className="buttons ">
                        <Button
                            onClick={handleOkButton}
                            className="save-button"
                            disabled={
                                authorization[decodedToken.role].includes(
                                    'updateDivision'
                                )
                                    ? false
                                    : true
                            }
                        >
                            OK
                        </Button>
                        <Button
                            onClick={(e) => {
                                setIsDivisionClientModalOpen(false);
                            }}
                            className="cancel-button"
                            variant="outlined"
                        >
                            Iptal
                        </Button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        divisionItemSendInfo: state.divisionItemSendInfo,

        isDivisionClientModalOpen:
            state.isDivisionClientModalOpen.isDivisionClientModalOpen,
        clientsData: state.clientsData,
        isFilterOpen: state.isFilterOpen.isFilterOpen,
        isError: state.isError.isError,
        clientSendInfo: state.clientSendInfo,
        decodedToken: state.decodedToken.decodedToken,
        emptyValues: state.emptyValues.emptyValues,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setClientsData: (data) => dispatch(setClientsData(data)),
        setClientSendInfo: (sendInfo) => dispatch(setClientSendInfo(sendInfo)),
        setIsDivisionClientModalOpen: (open) =>
            dispatch(setIsDivisionClientModalOpen(open)),
        setDivisionItemSendInfo: (info) =>
            dispatch(setDivisionItemSendInfo(info)),
        setEmptyValues: (info) => dispatch(setEmptyValues(info)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DivisionClientModal);
