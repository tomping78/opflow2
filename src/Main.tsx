import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/pages/Home';
import Boards from './components/pages/Boards';
import { Layout, Menu, PageHeader } from 'antd';
import React, { useState } from 'react';
import {
  NodeIndexOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import PageNotFound from './components/pages/Errors/PageNotFound';
import Notices from './components/pages/Notices';

const { Content: AntdContent, Footer: AntdFooter, Sider: AntdSider } = Layout;

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
        <AntdContent
          style={{
            width: '100%',
            height: '90vh',
            background: '#fff',
          }}
        >
          <Content />
        </AntdContent>
        <Footer />
      </Layout>
    </Layout>
  );
}

function Header() {
  return (
    <PageHeader
      className="site-page-header"
      style={{
        border: '1px solid rgb(235, 237, 240)',
        background: '#fff',
        paddingTop: 0,
        paddingBottom: 0,
      }}
      onBack={() => null}
      title="Title"
      subTitle="This is a subtitle"
    />
  );
}

/**
 * TODO: Need to change selection display when navigation back or forward
 * @constructor
 */
function Sider() {
  const [collapsed, toggle] = useState(true);
  const { pathname } = useLocation();

  return (
    <AntdSider
      onMouseOver={() => toggle(false)}
      onMouseOut={() => toggle(true)}
      collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
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
    <AntdFooter
      style={{ textAlign: 'center', height: '5vh', background: '#fff' }}
    >
      Copyright © 2022 KIMIDS Co.,Ltd. All rights reserved.
    </AntdFooter>
  );
}

export default Main;
