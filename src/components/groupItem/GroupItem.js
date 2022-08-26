import React, { useEffect, useState } from 'react';
import './groupItem.scss';
import { useParams, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
    BACKEND_URL,
    fetchForAdminWithUpdateToast,
    fetchForAdmin,
} from '../../functions';
import { setGroupsData, setGroupData } from '../../redux/actions/groupActions';
import { connect } from 'react-redux';
import GroupTab from './groupTabs/GroupTab';
import TopButtons from '../topButtons/TopButtons';

function GroupsItem(props) {
    const { id } = useParams();
    const useeLocation = useLocation();
    const pathname = useeLocation.pathname.includes('subgroups')
        ? 'subgroup'
        : 'mainGroups';
    const [groupChangeInfo, setGroupChangeInfo] = useState({});
    const [groupActive, setGroupActive] = useState(true);
    const [groupImage, setGroupImage] = useState({});
    const {
        groupData,
        setGroupData,
        isSidebarOpen,
        groupsData,
        setGroupsData,
    } = props;

    const fetchGroupItemInfo = (id) => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/${
                    pathname === 'subgroup' ? 'lastGroups' : pathname
                }/${id}`,
                method: 'GET',
            },
            (data) => {
                setGroupActive(data?.active);
                setGroupData(data);
                setGroupImage({ local: false, image: data.image, send: '' });
                setGroupChangeInfo({
                    keywords: data?.keywords,
                    nameSingularTm: data?.nameSingularTm
                        ? data?.nameSingularTm
                        : '',
                    nameSingularEng: data?.nameSingularEng
                        ? data?.nameSingularEng
                        : '',
                    nameSingularTr: data?.nameSingularTr
                        ? data?.nameSingularTr
                        : '',
                    nameSingularRu: data?.nameSingularRu
                        ? data?.nameSingularRu
                        : '',
                    namePluralTm: data?.namePluralTm ? data?.namePluralTm : '',
                    namePluralEng: data?.namePluralEng
                        ? data?.namePluralEng
                        : '',
                    namePluralTr: data?.namePluralTr ? data?.namePluralTr : '',
                    namePluralRu: data?.namePluralRu ? data?.namePluralRu : '',
                    priority: data?.priority,
                });
                var temp = groupsData.data;
                temp = temp.map((g, i) => {
                    if (g.id === Number(id)) {
                        return data;
                    } else {
                        return g;
                    }
                });
                setGroupsData({ ...groupsData, data: temp });
            }
        );
    };
    useEffect(() => {
        setGroupChangeInfo('');
        setGroupData('');
        fetchGroupItemInfo(id);

        // eslint-disable-next-line
    }, []);

    const handleResetClick = () => {
        fetchGroupItemInfo(id);
    };

    const onSaveButtonClick = () => {
        const formData = new FormData();
        formData.append('active', groupActive);
        if (groupImage.local) {
            formData.append('image', groupImage.image);
        }
        for (var key in groupChangeInfo) {
            if (groupChangeInfo[key] !== null) {
                if (key === 'keywords') {
                    formData.append(
                        key,
                        groupChangeInfo.keywords
                            ? JSON.stringify(groupChangeInfo[key])
                            : ''
                    );
                } else {
                    formData.append(key, groupChangeInfo[key]);
                }
            }
        }

        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/${
                    pathname === 'subgroup' ? 'lastGroups' : pathname
                }/${id}`,
                method: 'PUT',
                body: formData,
                notifyMessage: 'Saving ...',
                updateMessage: 'Saved',
            },
            (data) => {
                fetchGroupItemInfo(id);
            }
        );
    };

    const handleSyncClick = () => {
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/sync/${
                    pathname === 'subgroup' ? 'lastGroups' : pathname
                }`,
                method: 'POST',
                notifyMessage: 'Güncelleniyor lütfen bekleyiniz...',
                updateMessage: 'Başarıyla güncellendi',
                params: { id },
            },
            (data) => {
                fetchGroupItemInfo(id);
            }
        );
    };

    return (
        <div
            className={
                isSidebarOpen ? ' sidebar-open group-info' : 'group-info'
            }
        >
            <div className="top">
                <div className="left">
                    <div className="tiger-name">
                        {groupData?.name} ({groupData?.code})
                    </div>
                </div>
                <TopButtons
                    disabledValue="updateGroup"
                    handleSaveButton={onSaveButtonClick}
                    handleResetButton={handleResetClick}
                    cancelPath={`/groups/${pathname}`}
                    sync={true}
                    handleSyncClick={handleSyncClick}
                />
            </div>
            <div className="bottom">
                <GroupTab
                    fetchGroupItemInfo={fetchGroupItemInfo}
                    groupChangeInfo={groupChangeInfo}
                    groupActive={groupActive}
                    setGroupActive={setGroupActive}
                    setGroupChangeInfo={setGroupChangeInfo}
                    groupImage={groupImage}
                    setGroupImage={setGroupImage}
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
        groupsData: state.groupsData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        groupData: state.groupData.groupData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setGroupData: (data) => dispatch(setGroupData(data)),
        setGroupsData: (data) => dispatch(setGroupsData(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GroupsItem);
