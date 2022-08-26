import { IconButton } from '@mui/material';
import React from 'react';
import { AiFillFilter, AiOutlineSortAscending } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import './searchComponent.scss';
import {
    setIsFilterOpen,
    setIsSortOpen,
} from '../../redux/actions/sidebarActions';
import { connect } from 'react-redux';

function SearchComponent(props) {
    const {
        searchValue,
        handleInputChange,
        onSearchIconClick,
        filter = false,
        isFilterOpen,
        sort = false,
        isSortOpen,
        setIsFilterOpen,
        setIsSortOpen,
        sortComponent,
        filterComponent,
    } = props;
    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            onSearchIconClick();
        }
    };

    return (
        <div className="search-component">
            <input
                type="text"
                className="search-input"
                placeholder="Gözle..."
                onChange={(e) => handleInputChange(e)}
                onKeyPress={handleKeyPress}
                value={searchValue}
            />
            <div className="search-icon-div" onClick={onSearchIconClick}>
                <FiSearch className="search-icon" />
            </div>
            {filter ? (
                <>
                    <IconButton
                        className="icon"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <AiFillFilter />
                    </IconButton>
                    {isFilterOpen ? filterComponent : null}
                </>
            ) : null}
            {sort ? (
                <>
                    <IconButton
                        className="icon sort-icon"
                        onClick={() => {
                            setIsSortOpen(!isSortOpen);
                        }}
                    >
                        <AiOutlineSortAscending />
                    </IconButton>
                    {isSortOpen ? sortComponent : null}
                </>
            ) : null}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        isFilterOpen: state.isFilterOpen.isFilterOpen,
        isSortOpen: state.isSortOpen.isSortOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsSortOpen: (open) => dispatch(setIsSortOpen(open)),
        setIsFilterOpen: (open) => dispatch(setIsFilterOpen(open)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
