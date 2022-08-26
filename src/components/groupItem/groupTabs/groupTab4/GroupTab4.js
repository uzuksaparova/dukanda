import React, { useState } from 'react';
import './groupTab4.scss';
import KeywordComponent from '../../../keywordComponent/KeywordComponent';

function GroupTab4(props) {
    const { TabContainer, groupChangeInfo, setGroupChangeInfo } = props;
    const [keyword, setKeyword] = useState('');

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const addKeywordButton = () => {
        var tempKeyword = [];
        if (keyword !== '') {
            groupChangeInfo.keywords?.length
                ? (tempKeyword = [...groupChangeInfo.keywords, keyword])
                : tempKeyword.push(keyword);
            tempKeyword = Array.from(new Set(tempKeyword));
            setGroupChangeInfo({
                ...groupChangeInfo,
                keywords: tempKeyword,
            });
            setKeyword('');
        }
    };

    const handleKeywordDelete = (keyword) => {
        var tempKeyword = groupChangeInfo.keywords;
        var keywordIndex = tempKeyword.indexOf(keyword);
        tempKeyword.splice(keywordIndex, 1);
        setGroupChangeInfo({
            ...groupChangeInfo,
            keywords: tempKeyword,
        });
    };

    const handleKeypress = (e) => {
        if (e.charCode === 13) {
            addKeywordButton();
        }
    };
    return (
        <TabContainer>
            <KeywordComponent
                inputValue={keyword}
                handleInputChange={handleInputChange}
                handleKeypress={handleKeypress}
                addKeywordButton={addKeywordButton}
                keywords={groupChangeInfo.keywords}
                handleKeywordDelete={handleKeywordDelete}
            />
        </TabContainer>
    );
}

export default GroupTab4;
