import React from 'react';
import ProfileDropdown from '../../profileDropdown/ProfileDropdown';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumb from '../../breadcrumb/Breadcrumb';
import './toolbarDesktop.scss';

function ToolbarDesktop(props) {
    const { sidebarSearchComponent, sidebarMenu } = props;
    return (
        <Toolbar className="toolbar-desktop">
            <div className="toolbar-left">
                {sidebarMenu()}
                <Breadcrumb />
            </div>
            <div className="toolbar-right">
                {sidebarSearchComponent()}
                <ProfileDropdown />
            </div>
        </Toolbar>
    );
}

export default ToolbarDesktop;
