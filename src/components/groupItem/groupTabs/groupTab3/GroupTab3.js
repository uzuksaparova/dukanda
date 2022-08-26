import React from 'react';
import SubTab3 from './subTab3/SubTab3';
import MainTab3 from './mainTab3/MainTab3';
import { useLocation } from 'react-router-dom';

function GroupTab3(props) {
    const {
        TabContainer,
        tab3Data,
        tab3SendInfo,
        fetchTab3Data,
        setTab3SendInfo,
        setTab3Data,
    } = props;
    const useeLocation = useLocation();
    const pathname = useeLocation.pathname.includes('subgroups')
        ? 'subgroup'
        : 'mainGroups';

    return (
        <TabContainer>
            <div>
                {pathname === 'subgroup' ? (
                    <SubTab3
                        tab3Data={tab3Data}
                        tab3SendInfo={tab3SendInfo}
                        setTab3SendInfo={setTab3SendInfo}
                        fetchTab3Data={fetchTab3Data}
                        setTab3Data={setTab3Data}
                    />
                ) : (
                    <MainTab3
                        tab3Data={tab3Data}
                        tab3SendInfo={tab3SendInfo}
                        fetchTab3Data={fetchTab3Data}
                    />
                )}
            </div>
        </TabContainer>
    );
}

export default GroupTab3;
