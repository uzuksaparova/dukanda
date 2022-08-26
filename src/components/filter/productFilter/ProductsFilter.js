import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../filter.scss';
import { BsCardImage } from 'react-icons/bs';
import { FaLayerGroup, FaTimes } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import { GiBowlSpiral } from 'react-icons/gi';
import Button from '@material-ui/core/Button';
import { AiFillHome, AiOutlineSlack } from 'react-icons/ai';
import { Divider } from '@material-ui/core';
import {
    setProductsData,
    setProductSendInfo,
} from '../../../redux/actions/productActions';
import { setMaingroup, setSubgroup } from '../../../redux/actions/groupActions';
import { setParettoInfoo } from '../../../redux/actions';
import {
    setIsFilterOpen,
    setIsSortOpen,
} from '../../../redux/actions/sidebarActions';
import {
    fetchProductsInfo,
    handleProductResetButton,
    parettoInfo,
} from '../../../functions';
import { connect } from 'react-redux';

function ProductsFilter(props) {
    const [allGroupCheck, setAllGroupCheck] = useState(true);
    const filterNameLanguages = [
        { name: 'Turkmen', code: 'nameTm' },
        // { name: 'Turkish', code: 'nameTr' },
        { name: 'Russian', code: 'nameRu' },
        // { name: 'English', code: 'nameEng' },
    ];

    const filterInfoLanguages = [
        { name: 'Turkmen', code: 'infoTm' },
        // { name: 'Turkish', code: 'infoTr' },
        { name: 'Russian', code: 'infoRu' },
        // { name: 'English', code: 'infoEng' },
    ];

    const {
        setIsFilterOpen,
        productSendInfo,
        setProductSendInfo,
        productsData,
        setProductsData,
        groups,
        subgroup,
        setSubgroup,
        maingroup,
        setMaingroup,
        parettoInfoo,
        setParettoInfoo,
    } = props;

    // if there is any change in
    //subgroup,maingroup,paretto
    //updates the filter info sent to backend

    useEffect(() => {
        var menuSend = productSendInfo;
        menuSend.lastGroup = [];
        menuSend.paretto = [];
        var keys = Object.keys(subgroup);
        var send = [];
        var trues = Object.keys(subgroup).filter((k) => subgroup[k]);
        trues.forEach((t) => {
            groups?.forEach((g) => {
                g.lastGroups.forEach((l) => {
                    if (t === l.code) send.push(l.id);
                });
            });
        });
        if (send.length !== keys.length) {
            menuSend.lastGroup.push(...send);
        }
        var par = Object.keys(parettoInfoo).filter((k) => parettoInfoo[k]);
        par = par.length === 3 ? [] : par;
        menuSend.paretto.push(...par);

        setProductSendInfo(menuSend);

        // eslint-disable-next-line
    }, [subgroup, maingroup, parettoInfoo]);

    //handles alt grup checkbox changes
    const handleSubgroupChangeCheckbox = async (event) => {
        await setSubgroup({
            ...subgroup,
            [event.target.name]: event.target.checked,
        });
    };

    //handles both main grup checkbox changes and alt grup belonging to this main grup checkbox changes
    const handleMaingroupChangeCheckbox = async (event) => {
        await setMaingroup({
            ...maingroup,
            [event.target.name]: event.target.checked,
        });
        var keys = Object.keys(subgroup);
        var belonging = [];

        belonging = keys.filter((key) => key.startsWith(event.target.name));
        var temporarySubgroup = { ...subgroup };
        for (var i = 0; i < belonging.length; i++) {
            temporarySubgroup[belonging[i]] = event.target.checked;
        }
        setSubgroup(temporarySubgroup);
    };

    //handles paretto checkbox changes
    const handleParettoChangeCheckbox = (event) => {
        setParettoInfoo({
            ...parettoInfoo,
            [event.target.name]: event.target.checked,
        });
    };

    const handleSelectChange = (e) => {
        setProductSendInfo({
            ...productSendInfo,
            [e.target.name]: e.target.value,
        });
    };

    //combines all filter change information and fetches new cards
    const handleOkButton = () => {
        setIsFilterOpen(false);
        var menuSend = productSendInfo;
        menuSend.offset = 0;
        setProductSendInfo(menuSend);
        setProductsData({ ...productsData, data: [] });
        setIsFilterOpen(false);
        if (!productsData.error) {
            fetchProductsInfo(true);
        }
    };

    //reset all filter changes

    // handles filter toggles
    const handleCloseFilter = () => {
        setIsFilterOpen(false);
    };

    const handleAllGroupsChange = (e) => {
        setAllGroupCheck(e.target.checked);
        var tempSub = subgroup;
        var tempMain = maingroup;

        for (const key in tempSub) {
            tempSub[key] = e.target.checked;
        }
        for (const key in tempMain) {
            tempMain[key] = e.target.checked;
        }
        setSubgroup(tempSub);
        setMaingroup(tempMain);
    };

    const productFilterRow = (leftIcon, leftName, selectOptions, type) => {
        return (
            <div className="one-row" key={leftName}>
                <div className="left">
                    {leftIcon}
                    <span>{leftName} :</span>
                </div>
                <div className="right">
                    <FormControl className="form-control">
                        <Select
                            code="demo-simple-select-outlined"
                            value={productSendInfo[type]}
                            displayEmpty
                            onChange={(e) => handleSelectChange(e)}
                            label="Suratly"
                            placeholder="Hemmesi"
                            name={type}
                        >
                            {selectOptions.map((option) => {
                                return (
                                    <MenuItem
                                        value={option.value}
                                        key={option.value}
                                    >
                                        {option.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
        );
    };
    const imageOptions = [
        { name: 'Suratly', value: 'with' },
        { name: 'Suratsyz', value: 'without' },
        { name: 'Hemmesi', value: 'all' },
    ];
    const activeOptions = [
        { name: 'Aktiw', value: true },
        { name: 'Passiw', value: false },
    ];
    const stockOptions = [
        { name: 'Diňe stogy barlar', value: true },
        { name: 'Stogy ýoklar', value: false },
        { name: 'Hemmesi', value: '' },
    ];

    const nameOptions = [
        {
            name: 'Atly',
            value: 'with',
        },
        {
            name: 'Atsyz',
            value: 'without',
        },
        {
            name: 'Hemmesi',
            value: 'all',
        },
    ];

    return (
        <div className="admin-page-filter">
            <div className="filterr">
                <div className="close">
                    <FaTimes onClick={handleCloseFilter} />
                </div>
                <div className="middle-filter">
                    {productFilterRow(
                        <BsCardImage className="filter-icon" />,
                        'Suratly Harytlar',
                        imageOptions,
                        'image'
                    )}
                    {productFilterRow(
                        <AiOutlineSlack className="filter-icon" />,
                        'Aktiw',
                        activeOptions,
                        'active'
                    )}
                    {productFilterRow(
                        <AiFillHome className="filter-icon" />,
                        'Stok',
                        stockOptions,
                        'onlyInStock'
                    )}

                    <div className="one-row">
                        <div className="left">
                            <FaLayerGroup className="filter-icon" />
                            <span>Gruplar :</span>
                        </div>
                        <div className="right">
                            <FormControl className="form-control">
                                <Select
                                    multiple
                                    code="demo-simple-select-outlined"
                                    value={['Alt Gruplar']}
                                    displayEmpty
                                    label="Categories"
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>Placeholder</em>;
                                        }
                                        return selected.join(', ');
                                    }}
                                >
                                    <MenuItem>
                                        <FormControlLabel
                                            id="group"
                                            control={
                                                <Checkbox
                                                    className="main-group"
                                                    onChange={
                                                        handleAllGroupsChange
                                                    }
                                                    checked={allGroupCheck}
                                                    defaultValue={true}
                                                />
                                            }
                                            label={'Hemmesi'}
                                        />
                                    </MenuItem>
                                    <Divider />
                                    {groups.length ? (
                                        groups.map((grup, i) => {
                                            return (
                                                <div
                                                    className="one-group"
                                                    key={i}
                                                >
                                                    <MenuItem>
                                                        <FormControlLabel
                                                            id="group"
                                                            control={
                                                                <Checkbox
                                                                    className="main-group"
                                                                    onChange={
                                                                        handleMaingroupChangeCheckbox
                                                                    }
                                                                    checked={
                                                                        maingroup[
                                                                            grup
                                                                                .code
                                                                        ]
                                                                            ? maingroup[
                                                                                  grup
                                                                                      .code
                                                                              ]
                                                                            : false
                                                                    }
                                                                    defaultValue={
                                                                        maingroup[1]
                                                                    }
                                                                    name={
                                                                        grup.code
                                                                    }
                                                                />
                                                            }
                                                            label={grup.name}
                                                        />
                                                    </MenuItem>
                                                    {grup.lastGroups?.map(
                                                        (subgrup, j) => {
                                                            return (
                                                                <MenuItem
                                                                    key={j}
                                                                    id="group"
                                                                >
                                                                    <FormControlLabel
                                                                        className="subgroups"
                                                                        control={
                                                                            <Checkbox
                                                                                onChange={
                                                                                    handleSubgroupChangeCheckbox
                                                                                }
                                                                                checked={
                                                                                    subgroup[
                                                                                        subgrup
                                                                                            .code
                                                                                    ]
                                                                                        ? subgroup[
                                                                                              subgrup
                                                                                                  .code
                                                                                          ]
                                                                                        : false
                                                                                }
                                                                                name={
                                                                                    subgrup.code
                                                                                }
                                                                            />
                                                                        }
                                                                        label={
                                                                            subgrup.name
                                                                        }
                                                                    />
                                                                </MenuItem>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div>loading</div>
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="one-row">
                        <div className="left">
                            <GiBowlSpiral className="filter-icon" />
                            <span>Paretto :</span>
                        </div>
                        <div className="right">
                            <FormControl className="form-control">
                                <Select
                                    multiple
                                    code="demo-simple-select-outlined"
                                    value={['Paretto']}
                                    displayEmpty
                                    onChange={handleParettoChangeCheckbox}
                                    label="Categories"
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>Placeholder</em>;
                                        }
                                        return selected.join(', ');
                                    }}
                                >
                                    {parettoInfo?.map((show, i) => {
                                        return (
                                            <MenuItem key={i}>
                                                <FormControlLabel
                                                    id="third"
                                                    control={
                                                        <Checkbox
                                                            onChange={
                                                                handleParettoChangeCheckbox
                                                            }
                                                            checked={
                                                                parettoInfoo[
                                                                    show.code
                                                                ]
                                                                    ? parettoInfoo[
                                                                          show
                                                                              .code
                                                                      ]
                                                                    : false
                                                            }
                                                            name={show.code}
                                                        />
                                                    }
                                                    label={show.name}
                                                />
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div>
                        <div className="section-name">
                            <span> Haryt adynyn dilleri</span>
                        </div>
                        {filterNameLanguages?.map((lang) => {
                            return productFilterRow(
                                <GoPrimitiveDot className="filter-icon" />,
                                lang.name,
                                nameOptions,
                                lang.code
                            );
                        })}
                    </div>
                    <div>
                        <div className="section-name">
                            <span> Haryt Maglumatynyn dilleri</span>
                        </div>
                        {filterInfoLanguages?.map((lang) => {
                            return productFilterRow(
                                <GoPrimitiveDot className="filter-icon" />,
                                lang.name,
                                nameOptions,
                                lang.code
                            );
                        })}
                    </div>
                </div>
                <div className="filter-buttons">
                    <Button
                        variant="contained"
                        className="first-button"
                        onClick={handleOkButton}
                    >
                        ok
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleProductResetButton(false)}
                    >
                        Sıfırla
                    </Button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        productSendInfo: state.productSendInfo,
        productsData: state.productsData,
        groups: state.groups.groups,
        subgroup: state.subgroup.subgroup,
        maingroup: state.maingroup.maingroup,
        parettoInfoo: state.parettoInfoo.parettoInfoo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsSortOpen: (open) => dispatch(setIsSortOpen(open)),
        setIsFilterOpen: (open) => dispatch(setIsFilterOpen(open)),
        setProductSendInfo: (info) => dispatch(setProductSendInfo(info)),
        setProductsData: (data) => dispatch(setProductsData(data)),
        setSubgroup: (open) => dispatch(setSubgroup(open)),
        setMaingroup: (open) => dispatch(setMaingroup(open)),
        setParettoInfoo: (open) => dispatch(setParettoInfoo(open)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilter);
