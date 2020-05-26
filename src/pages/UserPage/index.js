import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
  RightOutlined
} from '@ant-design/icons';
import { Logo } from '../../assets/img';
const { Header, Content, Sider } = Layout;

export const UserProfile = () => {
  const [isCollapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout id='user__profile' style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint='md'
        collapsedWidth='80'
        trigger={null}
        collapsed={isCollapsed}
        onBreakpoint={(...a) => {
          console.log(a) || setCollapsed(false)
        }}
        >
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='vertical-left'>
          <Menu.Item className='pl-2'>
              <img src={Logo} alt='khandemy logo' width={isCollapsed ? 160 : 60} />
          </Menu.Item>
          <Menu.Item key='1' icon={<UserOutlined />}>
            Thông tin cá nhân
          </Menu.Item>
          <Menu.Item key='2' icon={<PieChartOutlined />}>
            Khóa học của tôi
          </Menu.Item>
          <Menu.Item disabled className='mt-5'>
            <hr className='bg-light' />
          </Menu.Item>
          <Menu.Item className='mt-5' icon={<LogoutOutlined />}>
            Đăng xuất
          </Menu.Item>
          <Menu.Item className='mt-5' icon={<RightOutlined />}>
          <Button className='trigger' />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
