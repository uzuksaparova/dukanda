import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setProductItemSendInfo } from '../../../../../redux/actions/productActions';
import KeywordComponent from '../../../../keywordComponent/KeywordComponent';

function ProductTab7(props) {
    const { TabContainer, setProductItemSendInfo, productItemSendInfo } = props;
    const [keyword, setKeyword] = useState('');

    //handles the keyword add button
    const addKeywordButton = () => {
        var tempKeyword = [];
        if (keyword !== '') {
            productItemSendInfo.keywords?.length
                ? (tempKeyword = [...productItemSendInfo.keywords, keyword])
                : tempKeyword.push(keyword);
            tempKeyword = Array.from(new Set(tempKeyword));
            setProductItemSendInfo({
                ...productItemSendInfo,
                keywords: tempKeyword,
            });
            setKeyword('');
        }
    };

    // handles the keyword deletion
    const handleKeywordDelete = (keyword) => {
        var tempKeyword = productItemSendInfo.keywords;
        var keywordIndex = tempKeyword.indexOf(keyword);
        tempKeyword.splice(keywordIndex, 1);
        setProductItemSendInfo({
            ...productItemSendInfo,
            keywords: tempKeyword,
        });
    };

    //handles the enter button for keyword
    const handleKeypress = (e) => {
        if (e.charCode === 13) {
            addKeywordButton();
        }
    };
    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };
    return (
        <TabContainer>
            <KeywordComponent
                inputValue={keyword}
                handleInputChange={handleInputChange}
                handleKeypress={handleKeypress}
                addKeywordButton={addKeywordButton}
                keywords={productItemSendInfo.keywords}
                handleKeywordDelete={handleKeywordDelete}
            />
        </TabContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        productItemSendInfo: state.productItemSendInfo.productItemSendInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setProductItemSendInfo: (info) =>
            dispatch(setProductItemSendInfo(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTab7);
