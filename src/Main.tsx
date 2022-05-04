import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/pages/Home';
import Boards from './components/pages/Boards';
import { Layout, Menu } from 'antd';
import React from 'react';
import {
  FormOutlined,
  HomeOutlined,
  NotificationOutlined,
  RadiusSettingOutlined,
} from '@ant-design/icons';
import PageNotFound from './components/pages/Errors/PageNotFound';
import Notices from './components/pages/Notices';
import Matrix from './components/pages/Matrix';

const {
  Header: AntdHeader,
  Content: AntdContent,
  Footer: AntdFooter,
  Sider: AntdSider,
} = Layout;

/**
 * 진입점
 * @constructor
 */
function Main() {
  return (
    <Layout hasSider>
      <Sider />
      <Layout className='site-layout'>
        <Header />
        <AntdContent>
          <Content />
        </AntdContent>
        <Footer />
      </Layout>
    </Layout>
  );
}

/**
 * GNB
 * @constructor
 */
function Header() {
  return (
    <AntdHeader className='header'>
      <div className='logo' />
    </AntdHeader>
  );
}

/**
 * LNB
 * @constructor
 */
function Sider() {
  const { pathname } = useLocation();

  return (
    <AntdSider collapsed={true}>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[pathname]}
        selectedKeys={[pathname]}>
        <Menu.Item
          key='/'
          icon={<HomeOutlined />}>
          <Link to='/'>홈</Link>
        </Menu.Item>
        <Menu.Item
          key='/boards'
          icon={<FormOutlined />}>
          <Link to='boards'>게시판</Link>
        </Menu.Item>
        <Menu.Item
          key='/notices'
          icon={<NotificationOutlined />}>
          <Link to='notices'>공지사항</Link>
        </Menu.Item>
        <Menu.Item
          key='/matrix'
          icon={<RadiusSettingOutlined />}>
          <Link to='matrix'>매트릭스</Link>
        </Menu.Item>
      </Menu>
    </AntdSider>
  );
}

/**
 * Content
 * @constructor
 */
function Content() {
  return (
    <React.Suspense fallback>
      <Routes>
        <Route path='/'>
          <Route
            index
            element={<Home />}
          />
          <Route
            path={'/boards'}
            element={<Boards />}
          />
          <Route
            path={'/notices'}
            element={<Notices />}
          />
          <Route
            path={'/matrix'}
            element={<Matrix />}
          />
        </Route>
        <Route
          path='*'
          element={<PageNotFound />}
        />
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
