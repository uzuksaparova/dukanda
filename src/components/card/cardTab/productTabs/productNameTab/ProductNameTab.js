import React, { useEffect, useState } from 'react';
import { BiRename } from 'react-icons/bi';
import { HiDocumentText } from 'react-icons/hi';
import { RichTextField } from 'mui-quill';
import { connect } from 'react-redux';
import './productNameTab.scss';

import { setProductItemSendInfo } from '../../../../../redux/actions/productActions';

function ProductNameTab(props) {
    const { lan, productItemSendInfo, setProductItemSendInfo, TabContainer } =
        props;
    const [nameInput, setNameInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [changed, setChanged] = useState(false);

    let name = `name${lan}`;
    let info = `info${lan}`;

    useEffect(() => {
        setNameInput(productItemSendInfo[name]);
        setDescriptionInput(productItemSendInfo[info]);
    }, [productItemSendInfo]);

    useEffect(() => {
        if (changed) {
            setProductItemSendInfo({
                ...productItemSendInfo,
                [name]: nameInput,
                [info]: descriptionInput,
            });
        }
    }, [nameInput, descriptionInput]);

    return (
        <TabContainer>
            <div className="product-name-tab">
                <div className="one-row tab-container">
                    <div className="left">
                        <BiRename />
                        <span> Ady </span>
                    </div>
                    <div className="right">
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => {
                                setNameInput(e.target.value);
                                setChanged(true);
                            }}
                        />
                    </div>
                </div>
                <div className="tab-container">
                    <div className="left">
                        <HiDocumentText />
                        <span> Haryt Maglumaty</span>
                    </div>
                    <div className="right">
                        <RichTextField
                            value={productItemSendInfo[info]}
                            onChange={(e) => {
                                setDescriptionInput(e);
                                setChanged(true);
                            }}
                            variant="outlined"
                            options={{
                                toolbar: true,
                            }}
                        />
                    </div>
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductNameTab);
