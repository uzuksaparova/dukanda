import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './groupTab.scss';
import { useLocation, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { BACKEND_URL, fetchWithParams } from '../../../functions';
import GroupTab1 from './groupTab1/GroupTab1';
import GroupTab2 from './groupTab2/GroupTab2';
import GroupTab3 from './groupTab3/GroupTab3';
import GroupTab4 from './groupTab4/GroupTab4';

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function GroupTab(props) {
    const { id } = useParams();
    const {
        fetchGroupItemInfo,
        groupChangeInfo,
        setGroupChangeInfo,
        groupActive,
        setGroupActive,
        groupImage,
        setGroupImage,
    } = props;
    const useeLocation = useLocation();
    const pathname = useeLocation.pathname.includes('subgroups')
        ? 'subgroup'
        : 'mainGroups';

    const [groupTabValue, setGroupTabValue] = useState(0);
    const tab3ItemLimit = 35;
    const [tab3SendInfo, setTab3SendInfo] = useState({
        limit: 35,
        offset: 0,
    });
    const [tab3Data, setTab3Data] = useState({
        data: [],
        isEnd: false,
    });

    const fetchTab3Data = (firstTime = false) => {
        let url =
            pathname === 'subgroup'
                ? `${BACKEND_URL}/admin/lastGroups/${id}/items`
                : `${BACKEND_URL}/admin/mainGroups/${id}/lastGroups`;
        fetchWithParams(
            {
                url,
                params: firstTime
                    ? { ...tab3SendInfo, offset: 0 }
                    : { ...tab3SendInfo },
            },
            (data) => {
                let tempTab3Data = tab3Data;
                if (firstTime) {
                    tempTab3Data.data = data;
                    setTab3SendInfo({
                        ...tab3SendInfo,
                        offset: tab3SendInfo.limit,
                    });
                } else {
                    tempTab3Data.data = [...tempTab3Data.data, ...data];
                    setTab3SendInfo({
                        ...tab3SendInfo,
                        offset: tab3SendInfo.limit + tab3SendInfo.offset,
                    });
                }
                !data.length || data.length < tab3ItemLimit
                    ? (tempTab3Data.isEnd = true)
                    : (tempTab3Data.isEnd = false);

                setTab3Data(tempTab3Data);
            }
        );
    };

    useEffect(() => {
        fetchTab3Data(true);
        // eslint-disable-next-line
    }, []);

    const handleGroupTabChange = (event, value) => {
        setGroupTabValue(value);
    };

    return (
        <div className="group-tab">
            <AppBar position="static" color="default">
                <Tabs
                    value={groupTabValue}
                    onChange={handleGroupTabChange}
                    scrollButtons="auto"
                    textColor="secondary"
                    variant="scrollable"
                >
                    <Tab label={<span>Maglumat</span>} />
                    <Tab label={<span>Atlar</span>} />
                    <Tab
                        label={
                            <span>
                                {pathname === 'subgroup'
                                    ? 'Harytlar'
                                    : 'Alt gruplar'}
                            </span>
                        }
                    />
                    <Tab label={<span>Keywords</span>} />
                </Tabs>
            </AppBar>
            {groupTabValue === 0 && (
                <GroupTab1
                    TabContainer={TabContainer}
                    groupActive={groupActive}
                    setGroupActive={setGroupActive}
                    fetchGroupItemInfo={fetchGroupItemInfo}
                    groupImage={groupImage}
                    setGroupImage={setGroupImage}
                    groupChangeInfo={groupChangeInfo}
                    setGroupChangeInfo={setGroupChangeInfo}
                />
            )}
            {groupTabValue === 1 && (
                <GroupTab2
                    TabContainer={TabContainer}
                    groupChangeInfo={groupChangeInfo}
                    setGroupChangeInfo={setGroupChangeInfo}
                />
            )}
            {groupTabValue === 2 && (
                <GroupTab3
                    TabContainer={TabContainer}
                    tab3Data={tab3Data}
                    fetchTab3Data={fetchTab3Data}
                    tab3SendInfo={tab3SendInfo}
                    setTab3SendInfo={setTab3SendInfo}
                    setTab3Data={setTab3Data}
                />
            )}
            {groupTabValue === 3 && (
                <GroupTab4
                    TabContainer={TabContainer}
                    groupChangeInfo={groupChangeInfo}
                    setGroupChangeInfo={setGroupChangeInfo}
                />
            )}
        </div>
    );
}

export default GroupTab;
