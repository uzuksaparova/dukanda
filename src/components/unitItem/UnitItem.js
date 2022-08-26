import React, { useEffect, useState } from 'react';
import './unitItem.scss';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UnitItemTab from './unitItemTab/UnitItemTab';
import {
    BACKEND_URL,
    fetchForAdmin,
    fetchForAdminWithUpdateToast,
    fetchUnitsInfo,
} from '../../functions';
import { setUnitData, setUnitsData } from '../../redux/actions/unitActions';
import { connect } from 'react-redux';
import TopButtons from '../topButtons/TopButtons';

function UnitItem(props) {
    const { unitsData, setUnitsData, unitData, isSidebarOpen, setUnitData } =
        props;
    const { id } = useParams();
    const [unitInfoSend, setUnitInfoSend] = useState({
        id: '',
        name: '',
        tm_code: '',
        tr_code: '',
        en_code: '',
        ru_code: '',
        tm_name: '',
        tr_name: '',
        ru_name: '',
        en_name: '',
    });
    const [isError, setIsError] = useState(false);

    const fetchUnitById = (iddd = id, add) => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/units/${iddd}`,
                method: 'GET',
            },
            (data) => {
                setUnitData({ ...data });
                const { id, name, codeTm, codeRu, nameTm, nameRu } = data;
                var tempSendInfo = {
                    id,
                    name,
                    codeTm: codeTm || '',
                    codeRu: codeRu || '',
                    nameTm: nameTm || '',
                    nameRu: nameRu || '',
                };
                setUnitInfoSend(tempSendInfo);
                if (add === 'update') {
                    var tempAdminUnitsInfo = unitsData.data;
                    tempAdminUnitsInfo = tempAdminUnitsInfo.map((unit) => {
                        if (unit.id === unitInfoSend.id) {
                            return data;
                        } else {
                            return unit;
                        }
                    });

                    setUnitsData({ ...unitsData, data: tempAdminUnitsInfo });
                }
            },
            setIsError
        );
    };

    useEffect(() => {
        setUnitInfoSend({
            id: '',
            name: '',
            codeTm: '',
            codeRu: '',
            nameTm: '',
            nameRu: '',
        });
        id && id !== '0' && fetchUnitById();
        if (!unitsData.data.length) {
            fetchUnitsInfo(true);
        }
        // eslint-disable-next-line
    }, []);

    const handleUnitSaveClick = () => {
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/units/${id}`,
                notifyMessage: 'Saving...',
                updateMessage: 'Saved',
                body: JSON.stringify(unitInfoSend),
                method: 'PUT',
            },
            (data) => {
                fetchUnitById(unitInfoSend.id, 'update');
            }
        );
    };

    const handleResetClick = () => {
        if (unitInfoSend.id) {
            fetchUnitById(unitInfoSend.id);
        } else {
            setUnitInfoSend({
                id: '',
                name: '',
                codeTm: '',
                codeTr: '',
                codeEng: '',
                codeRu: '',
                nameTm: '',
                nameTr: '',
                nameRu: '',
                nameEng: '',
            });
        }
    };

    const handleSyncClick = () => {
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/sync/units`,
                method: 'POST',
                notifyMessage: 'Güncelleniyor lütfen bekleyiniz...',
                updateMessage: 'Başarıyla güncellendi',
                params: { id },
            },
            (data) => {
                fetchUnitById();
            }
        );
    };

    return (
        <div className={`unit-info ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="top">
                <div className="left">
                    <div className="tiger-name">{unitData.name}</div>
                    <div className="tiger-code">{unitData.code}</div>
                </div>
                <TopButtons
                    disabledValue="updateUnit"
                    handleSaveButton={handleUnitSaveClick}
                    handleResetButton={handleResetClick}
                    cancelPath="/units"
                    sync={true}
                    handleSyncClick={handleSyncClick}
                    resetEnable={true}
                />
            </div>
            <div className="bottom">
                <UnitItemTab
                    unitInfoSend={unitInfoSend}
                    setUnitInfoSend={setUnitInfoSend}
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
        unitsData: state.unitsData,
        unitData: state.unitData.unitData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUnitData: (data) => dispatch(setUnitData(data)),
        setUnitsData: (data) => dispatch(setUnitsData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitItem);
