import React, { useRef } from 'react';
import { connect } from 'react-redux';
import {
    BACKEND_URL,
    deleteForAdmin,
    fetchForAdminWithUpdateToast,
    notification,
} from '../../../functions';
import {
    setDivisionData,
    setDivisionItemSendInfo,
    setDivisionsData,
} from '../../../redux/actions/divisionActions';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './divisionTop.scss';
import TopButtons from '../../topButtons/TopButtons';

var token = Cookies.get('admin_token');
var bearer = 'Bearer ' + token;

function DivisionTop(props) {
    const { id } = useParams();

    const {
        divisionImage,
        setDivisionImage,
        divisionItemSendInfo,
        divisionsData,
        fetchDivisionId,
        divisionData,
        setDivisionItemSendInfo,
        setDivisionsData,
    } = props;
    const divisionImageRef = useRef(null);

    const divisionImageChange = (e, id) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setDivisionImage({
                local: true,
                send: url,
                image: file,
            });
        }
    };
    const handleDivisionImageDeleteButton = () => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/admin/division/image/${divisionItemSendInfo.id}`,
                notifyMessage: 'Ulanyjy suraty pozulýar',
                updateMessage: 'Ulanyjy suraty pozuldy',
            },
            (data) => {
                var tempo = divisionImage;
                tempo.image = '';
                setDivisionImage({ local: false, image: data.image, send: '' });

                var tempAdminDivisionInfo = data;
                tempAdminDivisionInfo.forEach((div, i) => {
                    if (div.id === divisionItemSendInfo.id) {
                        tempAdminDivisionInfo[i]['image'] = null;
                    }
                });
                setDivisionsData({
                    ...divisionsData,
                    data: tempAdminDivisionInfo,
                });
            }
        );
    };
    const addDivisionImageClickReferencing = () => {
        divisionImageRef.current.click();
    };
    const emptyTranslate = (emptyValue) => {
        switch (emptyValue) {
            case 'code':
                return 'Kody';
            case 'name':
                return 'Ady';
            case 'address':
                return 'Adres';

            case 'clientId':
                return 'Torba Cari';
            default:
                return emptyValue;
        }
    };

    const onDivisionSaveClick = () => {
        let emptyArrVal = ['code', 'nr', 'name', 'address', 'clientId'];
        emptyArrVal = emptyArrVal.filter(
            (val) => divisionItemSendInfo[val] === ''
        );

        if (emptyArrVal.length) {
            notification(
                `Boş ýerleri dolduruň : ${emptyArrVal
                    .map((v) => emptyTranslate(v))
                    .join(', ')}`
            );
        } else {
            const formData = new FormData();
            if (divisionImage.local) {
                formData.append('image', divisionImage.image);
            }
            for (var key in divisionItemSendInfo) {
                if (key !== 'client') {
                    if (!divisionItemSendInfo.id) {
                        if (key !== 'id') {
                            formData.append(key, divisionItemSendInfo[key]);
                        }
                    } else {
                        formData.append(key, divisionItemSendInfo[key]);
                    }
                }
            }

            fetchForAdminWithUpdateToast(
                {
                    url: `${BACKEND_URL}/admin/divisions/${
                        id === '0' ? '' : id
                    }`,
                    method: id === '0' ? 'POST' : 'PUT',
                    notifyMessage: 'Saving...',
                    updateMessage: 'Saved',
                    body: formData,
                    headers: {
                        Authorization: bearer,
                    },
                },
                (data) => {
                    if (data !== 'err') {
                        if (!divisionItemSendInfo.id) {
                            var dataa = divisionItemSendInfo;
                            dataa.image = data.data?.image;
                            let tempDivisionsData = divisionsData;
                            tempDivisionsData.data.push(data.data);
                            setDivisionsData(tempDivisionsData);
                            fetchDivisionId(data.data.id);
                        } else {
                            var tempAdminDivisionInfo = divisionsData.data;

                            tempAdminDivisionInfo.forEach((div, i) => {
                                if (
                                    Number(div.id) ===
                                    Number(divisionItemSendInfo.id)
                                ) {
                                    tempAdminDivisionInfo[i] =
                                        divisionItemSendInfo;
                                    if (data.data.image) {
                                        tempAdminDivisionInfo[i]['image'] =
                                            data.data.image;
                                    } else {
                                        tempAdminDivisionInfo[i]['image'] =
                                            div.image;
                                    }
                                }
                            });
                            setDivisionsData({
                                ...divisionsData,
                                data: tempAdminDivisionInfo,
                            });
                            fetchDivisionId(divisionItemSendInfo.id);
                        }
                    }
                }
            );
        }
    };
    const handleResetClick = () => {
        if (divisionItemSendInfo.id) {
            fetchDivisionId(divisionItemSendInfo.id);
        } else {
            setDivisionItemSendInfo({
                active: false,
                address: '',
                clientId: '',
                code: '',
                id: '',
                image: '',
                name: '',
                nr: '',
            });
        }
    };
    return (
        <div className="division-header">
            {/* <CircleImageComponent
                imageObj={divisionImage}
                handleImageChange={divisionImageChange}
                handleImageDeletion={handleDivisionImageDeleteButton}
                handleButtonClick={addDivisionImageClickReferencing}
                disabledValue={'updateDivision'}
                imageRef={divisionImageRef}
                type="divisions"
            /> */}
            <div className="right-header">
                <div className="top">{divisionData.name}</div>
                <TopButtons
                    disabledValue="updateDivision"
                    handleSaveButton={onDivisionSaveClick}
                    handleResetButton={handleResetClick}
                    cancelPath="/divisions"
                    resetEnable={true}
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        divisionItemSendInfo: state.divisionItemSendInfo,
        divisionData: state.divisionData.divisionData,
        divisionsData: state.divisionsData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setDivisionItemSendInfo: (info) =>
            dispatch(setDivisionItemSendInfo(info)),
        setDivisionsData: (data) => dispatch(setDivisionsData(data)),
        setDivisionData: (data) => dispatch(setDivisionData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DivisionTop);
