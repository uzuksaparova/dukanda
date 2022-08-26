import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FaTimes } from 'react-icons/fa';
import '../sort.scss';
import {
    setIsFilterOpen,
    setIsSortOpen,
} from '../../../../redux/actions/sidebarActions';
import {
    setBannersData,
    setBannerSendInfo,
} from '../../../../redux/actions/bannerActions';
import { connect } from 'react-redux';
import { fetchBannersInfo } from '../../../../functions';
import { bannersData } from '../../../../redux/reducers/bannerReducer';

function BannerSort(props) {
    const {
        setIsSortOpen,
        setBannerSendInfo,
        bannerSendInfo,
        setBannersData,
        setIsFilterOpen,
    } = props;

    const [sortNameControl, setSortNameControl] = useState(
        bannerSendInfo.sortName ? bannerSendInfo.sortName : 'name'
    );

    const [sortOrderControl, setSortOrderControl] = useState(
        bannerSendInfo.sortOrder ? bannerSendInfo.sortOrder : 'asc'
    );

    const handleSortNameChange = (event) => {
        setSortNameControl(event.target.value);
        setBannerSendInfo({
            ...bannerSendInfo,
            sortName: event.target.value,
        });
    };

    useEffect(() => {
        setIsFilterOpen(false);
        // eslint-disable-next-line
    }, []);

    const handleSortOrderControl = (e) => {
        setSortOrderControl(e.target.value);
        setBannerSendInfo({
            ...bannerSendInfo,
            sortOrder: e.target.value,
        });
    };

    const handleOkButton = () => {
        setBannersData({ ...bannersData, data: [] });
        var temp = bannerSendInfo;
        temp.offset = 0;
        setBannerSendInfo(temp);
        setIsSortOpen(false);
        fetchBannersInfo(true, temp);
    };

    return (
        <div className="admin-page-sort">
            <span className="close">
                <FaTimes onClick={() => setIsSortOpen(false)} />
            </span>
            <div className="one-row">
                <div className="left">
                    <FormControl className="form-control">
                        <Select
                            code="demo-simple-select-outlined"
                            value={sortNameControl}
                            displayEmpty
                            onChange={(e) => handleSortNameChange(e)}
                            label="Ady"
                            placeholder="Ady"
                        >
                            <MenuItem value={'name'}>Ady</MenuItem>
                            <MenuItem value={'startDate'}>
                                Başlanýan wagty
                            </MenuItem>
                            <MenuItem value={'endDate'}>
                                Gutarýan wagty
                            </MenuItem>
                            <MenuItem value={'priority'}>Onemlilik</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="right">
                    <FormControl className="form-control">
                        <Select
                            code="demo-simple-select-outlined"
                            value={sortOrderControl}
                            displayEmpty
                            onChange={(e) => handleSortOrderControl(e)}
                            label="Artýan"
                            placeholder="Artýan"
                        >
                            <MenuItem value={'asc'}>Artýan</MenuItem>
                            <MenuItem value={'desc'}>Kemelýän</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="buttons">
                <Button
                    variant="contained"
                    className="ok-button"
                    onClick={handleOkButton}
                >
                    ok
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        bannerSendInfo: state.bannerSendInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsSortOpen: (open) => dispatch(setIsSortOpen(open)),
        setBannerSendInfo: (info) => dispatch(setBannerSendInfo(info)),
        setBannersData: (data) => dispatch(setBannersData(data)),
        setIsFilterOpen: (open) => dispatch(setIsFilterOpen(open)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerSort);
