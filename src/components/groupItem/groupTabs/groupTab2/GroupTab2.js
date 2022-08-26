import React from 'react';
import './groupTab2.scss';
import { useMediaQuery } from 'react-responsive';

function GroupTab2(props) {
    const { TabContainer, groupChangeInfo, setGroupChangeInfo } = props;
    const onInputGroupNameChange = (e) => {
        setGroupChangeInfo({
            ...groupChangeInfo,
            [e.target.name]: e.target.value,
        });
    };
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });

    const groupTab2RowDesktop = (leftName, lan) => {
        return (
            <div className="group-tab2-one-row">
                <div className="left">
                    <span> {leftName} </span>
                </div>
                <div className="right">
                    <div className="right-1">
                        <input
                            type="text"
                            value={groupChangeInfo[`nameSingular${lan}`]}
                            name={`nameSingular${lan}`}
                            onChange={(e) => onInputGroupNameChange(e)}
                        />
                    </div>
                    <div className="right-2">
                        <input
                            type="text"
                            value={groupChangeInfo[`namePlural${lan}`]}
                            name={`namePlural${lan}`}
                            onChange={(e) => onInputGroupNameChange(e)}
                        />
                    </div>
                </div>
            </div>
        );
    };
    const groupTab2RowMobile = (topName, lan) => {
        return (
            <div className="group-tab2-one-row">
                <div className="top">
                    <span> {topName} </span>
                </div>
                <div className="bottom-one-row">
                    <div className="left">Birligi</div>
                    <div className="right">
                        <input
                            type="text"
                            value={groupChangeInfo[`nameSingular${lan}`]}
                            name={`nameSingular${lan}`}
                            onChange={(e) => onInputGroupNameChange(e)}
                        />
                    </div>
                </div>
                <div className="bottom-one-row">
                    <div className="left">Köplügi</div>
                    <div className="right">
                        <input
                            type="text"
                            value={groupChangeInfo[`namePlural${lan}`]}
                            name={`namePlural${lan}`}
                            onChange={(e) => onInputGroupNameChange(e)}
                        />
                    </div>
                </div>
            </div>
        );
    };
    const GroupTab2Desktop = () => {
        return (
            <div className="group-tab2">
                <div className="right name-type">
                    <div className="single">Birligi</div>
                    <div className="single" style={{ marginLeft: '2%' }}>
                        Köplügi
                    </div>
                </div>
                {groupTab2RowDesktop('Türkmen', 'Tm')}
                {groupTab2RowDesktop('Rus', 'Ru')}
                {/* {groupTab2RowDesktop('Türk', 'Tr')}
                {groupTab2RowDesktop('Iňlis', 'Eng')} */}
            </div>
        );
    };
    const GroupTab2Mobile = () => {
        return (
            <div className="group-tab2">
                {groupTab2RowMobile('Türkmen', 'Tm')}
                {groupTab2RowMobile('Rus', 'Ru')}
                {/* {groupTab2RowMobile('Türk', 'Tr')}
                {groupTab2RowMobile('Iňlis', 'Eng')} */}
            </div>
        );
    };
    return (
        <TabContainer>
            {isMobileScreen ? <GroupTab2Mobile /> : <GroupTab2Desktop />}
        </TabContainer>
    );
}

export default GroupTab2;
