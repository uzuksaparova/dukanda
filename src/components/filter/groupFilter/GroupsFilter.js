import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../filter.scss';
import { BsCardImage } from 'react-icons/bs';
import { FaLayerGroup, FaTimes } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import Button from '@material-ui/core/Button';
import { AiOutlineSlack } from 'react-icons/ai';
import {
    setIsFilterOpen,
    setIsSortOpen,
} from '../../../redux/actions/sidebarActions';
import {
    setGroupsData,
    setGroupSendInfo,
    setMaingroup,
} from '../../../redux/actions/groupActions';
import { connect } from 'react-redux';
import { fetchGroupsInfo } from '../../../functions';
import { useLocation } from 'react-router-dom';

function GroupsFilter(props) {
    const pathname = useLocation().pathname;

    const filterNameLanguagesSingular = [
        { name: 'Turkmen', code: 'nameSingularTm' },
        { name: 'Turkish', code: 'nameSingularTr' },
        { name: 'Russian', code: 'nameSingularRu' },
        { name: 'English', code: 'nameSingularEng' },
    ];

    const filterNameLanguagesPlural = [
        { name: 'Turkmen', code: 'namePluralTm' },
        { name: 'Turkish', code: 'namePluralTr' },
        { name: 'Russian', code: 'namePluralRu' },
        { name: 'English', code: 'namePluralEng' },
    ];

    const {
        setIsFilterOpen,
        groupsData,
        groups,
        maingroup,
        setMaingroup,
        setGroupsData,
        groupSendInfo,
        setGroupSendInfo,
    } = props;

    useEffect(() => {
        var menuSend = groupSendInfo;
        if (pathname.includes('subgroups')) {
            var keys = Object.keys(maingroup);
            //   var send = [];
            var trues = Object.keys(maingroup).filter((k) => maingroup[k]);
            if (trues.length !== keys.length) {
                menuSend['mainGroups'] = trues;
            } else {
                menuSend['mainGroups'] = [];
            }
        }
        setGroupSendInfo(menuSend);
        // eslint-disable-next-line
    }, [maingroup]);

    const handleMaingroupChangeCheckbox = async (event) => {
        await setMaingroup({
            ...maingroup,
            [event.target.name]: event.target.checked,
        });
    };

    //handles product name language changes
    const handleSelectChange = (e) => {
        setGroupSendInfo({
            ...groupSendInfo,
            [e.target.name]: e.target.value,
        });
    };

    //combines all filter change information and fetches new cards
    const handleOkButton = () => {
        var menuSend = groupSendInfo;
        menuSend.offset = 0;
        setGroupSendInfo(menuSend);
        setGroupsData({ ...groupsData, data: [] });
        setGroupSendInfo({ ...groupSendInfo, offset: 0 });
        setIsFilterOpen(false);
        if (pathname.includes('subgroups')) {
            fetchGroupsInfo(true, '/admin/lastGroups');
        } else {
            fetchGroupsInfo(true, '/admin/mainGroups');
        }
    };

    // handles filter toggles
    const handleCloseFilter = () => {
        setIsFilterOpen(false);
    };

    return (
        <div className="admin-page-filter">
            <div className="filterr">
                <div className="close">
                    <FaTimes onClick={handleCloseFilter} />
                </div>
                <div className="middle-filter">
                    <div className="first one-row">
                        <div className="left">
                            <BsCardImage className="filter-icon" />
                            <span>Suratly Gruplar :</span>
                        </div>
                        <div className="right">
                            <FormControl className="form-control">
                                <Select
                                    code="demo-simple-select-outlined"
                                    value={groupSendInfo.image}
                                    displayEmpty
                                    onChange={(e) => handleSelectChange(e)}
                                    label="Suratly"
                                    placeholder="Hemmesi"
                                    name="image"
                                >
                                    <MenuItem value={'with'}>Suratly</MenuItem>
                                    <MenuItem value={'without'}>
                                        Suratsyz
                                    </MenuItem>
                                    <MenuItem value={'all'}>Hemmesi</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="first one-row">
                        <div className="left">
                            <AiOutlineSlack className="filter-icon" />
                            <span>Aktiw:</span>
                        </div>
                        <div className="right">
                            <FormControl className="form-control">
                                <Select
                                    code="demo-simple-select-outlined"
                                    value={groupSendInfo.active}
                                    displayEmpty
                                    onChange={(e) => handleSelectChange(e)}
                                    name="active"
                                >
                                    <MenuItem value={true}>Aktiw</MenuItem>
                                    <MenuItem value={false}>Passiw</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    {pathname.includes('subgroups') ? (
                        <div className="second one-row" id="second">
                            <div className="left">
                                <FaLayerGroup className="filter-icon" />
                                <span>Gruplar :</span>
                            </div>
                            <div className="right">
                                <FormControl className="form-control">
                                    <Select
                                        multiple
                                        code="demo-simple-select-outlined"
                                        value={['Ana Gruplar']}
                                        displayEmpty
                                        label="Categories"
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>Placeholder</em>;
                                            }
                                            return selected.join(', ');
                                        }}
                                    >
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
                                                                                    .id
                                                                            ]
                                                                                ? maingroup[
                                                                                      grup
                                                                                          .id
                                                                                  ]
                                                                                : false
                                                                        }
                                                                        defaultValue={
                                                                            maingroup[1]
                                                                        }
                                                                        name={
                                                                            grup.id
                                                                        }
                                                                    />
                                                                }
                                                                label={
                                                                    grup.name
                                                                }
                                                            />
                                                        </MenuItem>
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
                    ) : null}

                    <div className="product-name-language">
                        <div className="section-name">
                            <span> Grubyn birlik atlary</span>
                        </div>
                        {filterNameLanguagesSingular.map((lang) => {
                            return (
                                <div className="fourth one-row">
                                    <div className="left left-lang">
                                        <GoPrimitiveDot className="filter-icon" />
                                        <span>{lang.name}</span>
                                    </div>
                                    <div className="right">
                                        <FormControl className="form-control">
                                            <Select
                                                code="demo-simple-select-outlined"
                                                value={groupSendInfo[lang.code]}
                                                displayEmpty
                                                onChange={(e) =>
                                                    handleSelectChange(e)
                                                }
                                                name={lang.code}
                                            >
                                                <MenuItem value={'with'}>
                                                    Atly
                                                </MenuItem>
                                                <MenuItem value={'without'}>
                                                    Atsyz
                                                </MenuItem>
                                                <MenuItem value={'all'}>
                                                    Hemmesi
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="product-name-info">
                        <div className="section-name">
                            <span> Grubyn kopluk atlary</span>
                        </div>
                        {filterNameLanguagesPlural.map((lang) => {
                            return (
                                <div className="fourth one-row">
                                    <div className="left left-lang">
                                        <GoPrimitiveDot className="filter-icon" />
                                        <span>{lang.name}</span>
                                    </div>
                                    <div className="right">
                                        <FormControl className="form-control">
                                            <Select
                                                code="demo-simple-select-outlined"
                                                value={groupSendInfo[lang.code]}
                                                displayEmpty
                                                onChange={(e) =>
                                                    handleSelectChange(e)
                                                }
                                                name={lang.code}
                                            >
                                                <MenuItem value={'with'}>
                                                    Atly
                                                </MenuItem>
                                                <MenuItem value={'without'}>
                                                    Atsyz
                                                </MenuItem>
                                                <MenuItem value={'all'}>
                                                    Hemmesi
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
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
                    {/* <Button
                        variant="contained"
                        onClick={() =>
                            handleGroupResetButton(
                                pathname.includes('subgroups')
                                    ? '/admin/lastGroups'
                                    : '/admin/mainGroups'
                            )
                        }
                    >
                        Sıfırla
                    </Button> */}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        groupSendInfo: state.groupSendInfo,
        groupsData: state.groupsData,
        groups: state.groups.groups,
        maingroup: state.maingroup.maingroup,
        isError: state.isError.isError,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsSortOpen: (open) => dispatch(setIsSortOpen(open)),
        setIsFilterOpen: (open) => dispatch(setIsFilterOpen(open)),
        setGroupSendInfo: (info) => dispatch(setGroupSendInfo(info)),
        setGroupsData: (data) => dispatch(setGroupsData(data)),
        setMaingroup: (group) => dispatch(setMaingroup(group)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsFilter);
