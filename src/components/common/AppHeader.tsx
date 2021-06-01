import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const AppHeader = () => (
    <Header className="header">
        <div className="logo" >ergast</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">F1</Menu.Item>
        </Menu>
    </Header>
);

export default AppHeader;
