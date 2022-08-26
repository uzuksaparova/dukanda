import React from 'react';
import './unitTab1.scss';

function UnitTab1(props) {
    const { unitInfoSend, setUnitInfoSend } = props;

    const unitRow = (leftName, type) => {
        return (
            <div className="unit-tab1-one-row-section">
                <div className="unit-tab1-left">
                    <span>{leftName}</span>
                </div>
                <div className="unit-tab1-right">
                    <input
                        type="text"
                        value={unitInfoSend[type]}
                        onChange={(e) =>
                            setUnitInfoSend({
                                ...unitInfoSend,
                                [type]: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        );
    };
    return (
        <div className="unit-tab1">
            <div className="unit-tab1-one-row">
                {unitRow('Türkmen ady', 'nameTm')}
                {unitRow('Türkmen kody', 'codeTm')}
            </div>
            {/* <div className="unit-tab1-one-row">
                {unitRow('Türkçe ady', 'nameTr')}
                {unitRow('Türkçe kody', 'codeTr')}
            </div> */}
            <div className="unit-tab1-one-row">
                {unitRow('Rusça ady', 'nameRu')}
                {unitRow('Rusça kody', 'codeRu')}
            </div>
            {/* <div className="unit-tab1-one-row">
                {unitRow('Iňlis ady', 'nameEng')}
                {unitRow('Iňlis kody', 'codeEng')}
            </div> */}
        </div>
    );
}

export default UnitTab1;
