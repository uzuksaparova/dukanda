import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import ClientsItemTab from './clientTab/ClientsItemTab';
import './adminClientsItem.scss';
import {
    fetchForAdminWithUpdateToast,
    notification,
    fetchForAdmin,
    BACKEND_URL,
    fetchClientsInfo,
} from '../../functions';
import { connect } from 'react-redux';
import {
    setClientData,
    setClientItemSendInfo,
    setClientsData,
} from '../../redux/actions/clientActions';
import TopButtons from '../topButtons/TopButtons';

function AdminClientsItem(props) {
    const {
        clientsData,
        clientData,
        isSidebarOpen,
        setClientsData,
        clientItemSendInfo,
        setClientItemSendInfo,
        setClientData,
    } = props;
    const { id } = useParams();
    const [clientImage, setClientImage] = useState({});

    const handleClientReset = () => {
        setClientItemSendInfo({
            ...clientItemSendInfo,
            userName: clientData.userName ? clientData.userName : '',
            division: clientData.division,
            divisionId: clientData.divisionId ? clientData.divisionId : '',
            password: '',
        });
    };

    const fetchClientById = () => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/clients/${id}`,
                method: 'GET',
            },
            (data) => {
                data.division = data?.division?.name;
                setClientData(data);
                setClientImage({ local: false, image: data.image, send: '' });
                var temp = clientsData.data;
                temp = temp.map((g, i) => {
                    if (g.id === Number(id)) {
                        return data;
                    } else {
                        return g;
                    }
                });
                setClientsData({ ...clientsData, data: temp });
            }
        );
    };

    useEffect(() => {
        setClientData({
            userName: '',
            password: '',
            image: null,
            divisionId: '',
            comments: [],
            devices: [],
            clientCards: [],
        });
        fetchClientById();
        !clientsData.data.length && fetchClientsInfo(true);
        // eslint-disable-next-line
    }, []);
    const handleSyncClick = () => {
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/sync/clients`,
                method: 'POST',
                notifyMessage: 'Güncelleniyor lütfen bekleyiniz...',
                updateMessage: 'Başarıyla güncellendi',
                params: { id },
            },
            (data) => {
                fetchClientById();
            }
        );
    };
    const onSaveButtonClick = () => {
        if (clientItemSendInfo.divisionId) {
            const formData = new FormData();
            if (clientImage.local) {
                formData.append('image', clientImage.image);
            }
            formData.append('userName', clientItemSendInfo.userName);
            formData.append('divisionId', clientItemSendInfo.divisionId);
            formData.append('active', clientItemSendInfo.active);
            formData.append('fixedDivision', clientItemSendInfo.fixedDivision);
            formData.append('saleComplect', clientItemSendInfo.saleComplect);

            if (clientItemSendInfo.password !== '') {
                formData.append('password', clientItemSendInfo.password);
            }
            fetchForAdminWithUpdateToast(
                {
                    url: `${BACKEND_URL}/admin/clients/${id}`,
                    method: 'PUT',
                    body: formData,
                    notifyMessage: 'Saving ...',
                    updateMessage: 'Saved',
                },
                (data) => {
                    fetchClientById();
                }
            );
        } else {
            notification('Bölümi saýlaň');
        }
    };

    return (
        <div className={`client-info ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="top">
                <div className="left">
                    <div className="tiger-name">{clientData?.name}</div>
                    <div className="tiger-code">{clientData?.code}</div>
                </div>
                <TopButtons
                    disabledValue="updateClient"
                    handleSaveButton={onSaveButtonClick}
                    handleResetButton={handleClientReset}
                    cancelPath="/clients"
                    sync={true}
                    handleSyncClick={handleSyncClick}
                />
            </div>
            <div className="bottom">
                <ClientsItemTab
                    clientImage={clientImage}
                    setClientImage={setClientImage}
                />
            </div>
            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        clientsData: state.clientsData,
        clientData: state.clientData,
        clientItemSendInfo: state.clientItemSendInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setClientData: (data) => dispatch(setClientData(data)),
        setClientsData: (data) => dispatch(setClientsData(data)),
        setClientItemSendInfo: (data) => dispatch(setClientItemSendInfo(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminClientsItem);
