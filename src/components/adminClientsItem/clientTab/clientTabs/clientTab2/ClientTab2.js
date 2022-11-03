import React, { useState, useRef } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineSlack } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    Tooltip,
} from '@material-ui/core';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BiBox, BiRename } from 'react-icons/bi';
import { ImHome3 } from 'react-icons/im';
import { connect } from 'react-redux';
import CircleImageComponent from '../../../../circleImageComponent/CircleImageComponent';
import {
    setClientItemSendInfo,
    setClientsData,
} from '../../../../../redux/actions/clientActions';
import { BACKEND_URL, deleteForAdmin } from '../../../../../functions';
import { useParams } from 'react-router-dom';
import './clientTab2.scss';
import { useMediaQuery } from 'react-responsive';
import AddImageComponent from '../../../../addImageComponent/AddImageComponent';

function ClientTab2(props) {
    const {
        clientData,
        clientItemSendInfo,
        setClientItemSendInfo,
        clientDivisionData,
        clientsData,
        setClientImage,
        clientImage,
    } = props;
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });

    const clientImageRef = useRef(null);
    const { id } = useParams();
    const addClientImageClickReferencing = () => {
        clientImageRef.current.click();
    };
    const [showPassword, setShowPassword] = useState(false);
    const clientImageChange = (e, id) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setClientImage({
                local: true,
                send: url,
                image: file,
            });
        }
    };

    const handleClientImageDeleteButton = () => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/clients/image/${id}`,
                notifyMessage: 'Ulanyjy suraty pozulýar',
                updateMessage: 'Ulanyjy suraty pozuldy',
            },
            (data) => {
                var tempo = clientImage;
                tempo.image = '';
                setClientImage({ local: false, image: data.image, send: '' });

                var tempAdminClientsInfo = clientsData.data;
                tempAdminClientsInfo.forEach((div, i) => {
                    if (div.id === Number(id)) {
                        tempAdminClientsInfo[i]['image'] = null;
                    }
                });
                setClientsData({ ...clientsData, data: tempAdminClientsInfo });
            }
        );
    };

    return (
        <div className="client-tab2-info">
            <div className="header">
                {isMobileScreen ? (
                    <AddImageComponent
                        imageObj={clientImage}
                        handleImageChange={clientImageChange}
                        handleImageDeletion={handleClientImageDeleteButton}
                        handleButtonClick={addClientImageClickReferencing}
                        disabledValue="updateClient"
                        imageRef={clientImageRef}
                        type="clients"
                    />
                ) : (
                    <>
                        <CircleImageComponent
                            imageObj={clientImage}
                            handleImageChange={clientImageChange}
                            handleImageDeletion={handleClientImageDeleteButton}
                            imageRef={clientImageRef}
                            disabledValue="updateClient"
                            type="clients"
                            handleButtonClick={addClientImageClickReferencing}
                        />
                        <div className="right-header">
                            <div className="top">{clientData.name}</div>
                        </div>
                    </>
                )}
            </div>
            <div className="body">
                <div className="client-one-row">
                    <div className="left">
                        <AiOutlineSlack className="icon" />
                        <span>Aktiwlylyk :</span>
                    </div>
                    <div className="right password">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={clientItemSendInfo.active}
                                    onChange={(e) =>
                                        setClientItemSendInfo({
                                            ...clientItemSendInfo,
                                            active: e.target.checked,
                                        })
                                    }
                                    name="active"
                                />
                            }
                            label="Aktiw"
                        />
                    </div>
                </div>

                <div className="client-one-row">
                    <div className="left">
                        <BiRename className="icon" />
                        <span>Ady</span>
                    </div>
                    <div className="right password">
                        <input
                            type="text"
                            placeholder="Ady"
                            onChange={(e) =>
                                setClientItemSendInfo({
                                    ...clientItemSendInfo,
                                    userName: e.target.value,
                                })
                            }
                            value={clientItemSendInfo.userName}
                        />
                    </div>
                </div>
                <div className="client-one-row">
                    <div className="left">
                        <RiLockPasswordFill className="icon" />
                        <span>Açar sözi</span>
                    </div>
                    <div className="right password">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Açar sözi"
                            onChange={(e) =>
                                setClientItemSendInfo({
                                    ...clientItemSendInfo,
                                    password: e.target.value,
                                })
                            }
                            value={clientItemSendInfo.password}
                        />
                        {isMobileScreen ? null : (
                            <div className="info">
                                <IconButton
                                    onClick={() =>
                                        setShowPassword(
                                            showPassword ? false : true
                                        )
                                    }
                                    className="password-eye"
                                >
                                    {showPassword ? (
                                        <AiFillEyeInvisible />
                                    ) : (
                                        <AiFillEye />
                                    )}
                                </IconButton>
                                <Tooltip
                                    title="Parolynyzy girizmeseniz parolynyz uytgemez"
                                    placement="right"
                                    className="tooltip"
                                >
                                    <span>
                                        <BsFillInfoCircleFill />
                                    </span>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                </div>
                <div className="client-one-row">
                    <div className="left">
                        <ImHome3 className="icon" />
                        <span>Bölümi</span>
                    </div>
                    <div className="right">
                        {clientDivisionData.length && (
                            <FormControl className="form-control">
                                <Select
                                    code="demo-simple-select-outlined"
                                    value={clientItemSendInfo?.divisionId}
                                    onChange={(e) =>
                                        setClientItemSendInfo({
                                            ...clientItemSendInfo,
                                            divisionId: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value=" " disabled>
                                        Bölümi saýlaň
                                    </MenuItem>
                                    {clientDivisionData?.map((div) => {
                                        return (
                                            <MenuItem
                                                value={div.id}
                                                key={div.id}
                                            >
                                                {div.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        )}
                    </div>
                </div>
                <div className="client-one-row">
                    <div className="left">
                        <AiOutlineSlack className="icon" />
                        <span>Bölümi üýtgetmäge ygtyýary:</span>
                    </div>
                    <div className="right password">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={
                                        !!!clientItemSendInfo.fixedDivision
                                    }
                                    onChange={(e) => {
                                        setClientItemSendInfo({
                                            ...clientItemSendInfo,
                                            fixedDivision: !e.target.checked,
                                        });
                                    }}
                                    name="fixedDivision"
                                />
                            }
                            label={
                                !!clientItemSendInfo.fixedDivision
                                    ? 'Ýok'
                                    : 'Bar'
                            }
                        />
                    </div>
                </div>
                <div className="client-one-row last-row">
                    <div className="left">
                        <BiBox className="icon" />
                        <span>Komplekt alma ygtyýary:</span>
                    </div>
                    <div className="right password">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={clientItemSendInfo.saleComplect}
                                    onChange={(e) =>
                                        setClientItemSendInfo({
                                            ...clientItemSendInfo,
                                            saleComplect: e.target.checked,
                                        })
                                    }
                                    name="saleComplect"
                                />
                            }
                            label={
                                clientItemSendInfo.saleComplect ? 'Bar' : 'Ýok'
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        clientItemSendInfo: state.clientItemSendInfo,
        clientDivisionData: state.clientDivisionData.clientDivisionData,
        clientData: state.clientData,
        clientsData: state.clientsData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setClientItemSendInfo: (data) => dispatch(setClientItemSendInfo(data)),
        setClientsData: (data) => dispatch(setClientsData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientTab2);
