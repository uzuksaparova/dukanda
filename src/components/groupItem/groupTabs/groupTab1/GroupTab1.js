import React, { useRef } from 'react';
import { MdLowPriority } from 'react-icons/md';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { setGroupsData } from '../../../../redux/actions/groupActions';
import { BACKEND_URL, deleteForAdmin } from '../../../../functions';
import { useLocation, useParams } from 'react-router-dom';
import { AiOutlineSlack } from 'react-icons/ai';
import './groupTab1.scss';
import AddImageComponent from '../../../addImageComponent/AddImageComponent';

function GroupTab1(props) {
    const {
        TabContainer,
        setGroupActive,
        groupActive,
        groupImage,
        setGroupImage,
        groupsData,
        setGroupsData,
        fetchGroupItemInfo,
        groupChangeInfo,
        setGroupChangeInfo,
    } = props;
    const { id } = useParams();
    const iconRef = useRef(null);
    const useeLocation = useLocation();
    const pathname = useeLocation.pathname.includes('subgroups')
        ? 'subgroup'
        : 'mainGroup';

    const handleAddGroupImage = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setGroupImage({
                local: true,
                send: url,
                image: file,
            });
        }
    };
    const handleGroupImageDelete = () => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/${
                    pathname === 'subgroup' ? 'lastGroups' : 'mainGroups'
                }/${id}`,
                notifyMessage: 'Surat pozulýar',
                updateMessage: 'Surat pozuldy',
            },
            (data) => {
                var tempo = groupImage;
                tempo.image = '';
                setGroupImage({ local: false, image: data.image, send: '' });

                var tempAdminGroupInfo = groupsData.data;
                tempAdminGroupInfo.forEach((group, i) => {
                    if (group.id === id) {
                        tempAdminGroupInfo[i]['image'] = null;
                    }
                });
                setGroupsData({ ...groupsData, data: tempAdminGroupInfo });
                fetchGroupItemInfo(id);
            }
        );
    };

    const handleButtonClick = () => {
        iconRef.current.click();
    };
    return (
        <TabContainer className="group-tab1">
            <div className="group-tab1">
                <div className="group-tab1-one-row">
                    <div
                        className="left"
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <AiOutlineSlack
                            className="top-banner-item-icon"
                            style={{ marginRight: '5px' }}
                        />
                        <span>Aktiwlylyk :</span>
                    </div>
                    <div className="right">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={groupActive}
                                    onChange={(e) =>
                                        setGroupActive(e.target.checked)
                                    }
                                    name="active"
                                />
                            }
                            label="Aktiw"
                        />
                    </div>
                </div>
                <div className="group-tab1-one-row">
                    <div
                        className="left"
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <MdLowPriority
                            className="top-banner-item-icon"
                            style={{ marginRight: '5px' }}
                        />
                        <span>Görünüm önceliği :</span>
                    </div>
                    <div className="right">
                        <input
                            type="text"
                            value={groupChangeInfo?.priority}
                            name="priority"
                            style={{ width: 'auto' }}
                            onChange={(e) =>
                                setGroupChangeInfo({
                                    ...groupChangeInfo,
                                    priority: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <AddImageComponent
                    imageObj={groupImage}
                    handleImageChange={handleAddGroupImage}
                    handleImageDeletion={handleGroupImageDelete}
                    handleButtonClick={handleButtonClick}
                    disabledValue="updateGroup"
                    imageRef={iconRef}
                    type="groups"
                />
            </div>
        </TabContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        groupsData: state.groupsData,
        decodedToken: state.decodedToken.decodedToken,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setGroupsData: (data) => dispatch(setGroupsData(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GroupTab1);
