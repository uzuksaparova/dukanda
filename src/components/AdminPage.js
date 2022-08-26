import React from 'react';
import './adminPage.scss';
import image from '../images/admin.jpg';

function AdminPage() {
    return (
        <div className="admin-page">
            <div className="admin-image">
                <img src={image} alt="admin" />
                <span className="message">Dükanda sahypasyna hoş geldiňiz</span>
            </div>
        </div>
    );
}

export default AdminPage;
