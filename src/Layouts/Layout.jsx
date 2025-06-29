import React from 'react';
import { Outlet } from 'react-router';
import Header from '../pages/Shared/Header';
import Footer from '../pages/Shared/Footer';

const Layout = () => {
    return (
        <div>
            <div className="w-7xl mx-auto">
                 <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            </div>
        </div>
    );
};

export default Layout;