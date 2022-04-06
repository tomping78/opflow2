import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/pages/Home';
import Boards from './components/pages/Boards';
import { Layout, Menu } from 'antd';
import React from 'react';
import {
  NodeIndexOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import PageNotFound from './components/pages/Errors/PageNotFound';
import Notices from './components/pages/Notices';

const { Header:AntdHeader, Content: AntdContent, Footer: AntdFooter, Sider: AntdSider } = Layout;

/**
 * 진입점
 * @constructor
 */
function Main() {
  return (
    <Layout hasSider>
      <Sider />
      <Layout className="site-layout">
        <Header />
        <AntdContent>
          <Content />
        </AntdContent>
        <Footer />
      </Layout>
    </Layout>
  );
}

function Header() {
  return (
    <AntdHeader className="header">
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
  </AntdHeader>);
}

function Sider() {
  const { pathname } = useLocation();

  return (
    <AntdSider collapsed={false}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        selectedKeys={[pathname]}
      >
        <Menu.Item key="/" icon={<UserOutlined />}>
          <Link to="/">홈</Link>
        </Menu.Item>
        <Menu.Item key="/boards" icon={<VideoCameraOutlined />}>
          <Link to="boards">게시판</Link>
        </Menu.Item>
        <Menu.Item key="/notices" icon={<NodeIndexOutlined />}>
          <Link to="notices">공지사항</Link>
        </Menu.Item>
      </Menu>
    </AntdSider>
  );
}

function Content() {
  return (
    <React.Suspense fallback>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path={'/boards'} element={<Boards />} />
          <Route path={'/notices'} element={<Notices />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </React.Suspense>
  );
}

function Footer() {
  return (
    <AntdFooter>
      Copyright © 2022 KIMIDS Co.,Ltd. All rights reserved.
    </AntdFooter>
  );
}

export default Main;
