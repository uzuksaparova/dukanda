import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FaTimes } from 'react-icons/fa';
import '../sort.scss';
import {
    setIsFilterOpen,
    setIsSortOpen,
} from '../../../redux/actions/sidebarActions';
import {
    setClientsData,
    setClientSendInfo,
} from '../../../redux/actions/clientActions';
import { connect } from 'react-redux';
import { fetchClientsInfo } from '../../../functions';

function ClientSort(props) {
    const {
        setIsSortOpen,
        clientSendInfo,
        setIsFilterOpen,
        setClientSendInfo,
        setClientsData,
        clientsData,
    } = props;

    const [sortNameControl, setSortNameControl] = useState(
        clientSendInfo.order ? clientSendInfo.order : 'userName'
    );

    const [sortOrderControl, setSortOrderControl] = useState(
        clientSendInfo.orderType ? clientSendInfo.orderType : 'asc'
    );

    const handleSortNameChange = (event) => {
        setSortNameControl(event.target.value);
        var sortCopy = clientSendInfo;
        sortCopy.order = event.target.value;
        setClientSendInfo({
            ...sortCopy,
        });
    };

    useEffect(() => {
        setIsFilterOpen(false);
        // eslint-disable-next-line
    }, []);

    const handleSortOrderControl = (e) => {
        setSortOrderControl(e.target.value);
        var sortCopy = clientSendInfo;
        sortCopy.orderType = e.target.value;
        setClientSendInfo({
            ...sortCopy,
        });
    };

    const handleOkButton = () => {
        setClientsData({ ...clientsData, data: [] });
        setIsSortOpen(false);
        fetchClientsInfo(true);
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
                            <MenuItem value={'userName'}>Ulanyjy ady</MenuItem>
                            <MenuItem value={'code'}>Kody</MenuItem>
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
        clientSendInfo: state.clientSendInfo,
        clientsData: state.clientsData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsSortOpen: (open) => dispatch(setIsSortOpen(open)),
        setIsFilterOpen: (open) => dispatch(setIsFilterOpen(open)),
        setClientSendInfo: (info) => dispatch(setClientSendInfo(info)),
        setClientsData: (data) => dispatch(setClientsData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientSort);
