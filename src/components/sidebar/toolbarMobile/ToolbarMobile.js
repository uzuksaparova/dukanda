import React from 'react';
import ProfileDropdown from '../../profileDropdown/ProfileDropdown';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumb from '../../breadcrumb/Breadcrumb';
import './toolbarMobile.scss';
import { connect } from 'react-redux';

function ToolbarMobile(props) {
    const { sidebarSearchComponent, sidebarMenu, isSidebarOpen } = props;
    return (
        <Toolbar className="toolbar-mobile">
            <div
                className="toolbar-top"
                style={{
                    justifyContent: isSidebarOpen
                        ? 'flex-end'
                        : 'space-between',
                }}
            >
                {sidebarMenu()}
                {sidebarSearchComponent()}
                <ProfileDropdown />
            </div>
            <div className="toolbar-bottom">
                <Breadcrumb />
            </div>
        </Toolbar>
    );
}
const mapStateToProps = (state) => {
    return {
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
    };
};

export default connect(mapStateToProps)(ToolbarMobile);
