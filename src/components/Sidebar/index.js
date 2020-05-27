import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
  RightOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Logo } from '../../assets/img';
import { useHistory } from 'react-router-dom';
const { Content, Sider } = Layout;

const Sidebar = ({ children }) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const handleEditProfile = () =>
    history.push('/thongTinTaiKhoan/thongTinCaNhan');
  const handleEditCourse = () =>
    history.push('/thongTinTaiKhoan/khoaHocCuaToi');
  return (
    <Layout id='user__profile' style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint='md'
        collapsedWidth='80'
        trigger={null}
        collapsed={isCollapsed}
        onBreakpoint={(...a) => {
          console.log(a) || setCollapsed(false);
        }}>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='vertical-left'>
          <Menu.Item className='pl-2'>
            <img
              src={Logo}
              alt='khandemy logo'
              width={isCollapsed ? 160 : 60}
            />
          </Menu.Item>
          <Menu.Item
            key='1'
            onClick={handleEditProfile}
            icon={<UserOutlined />}>
            Thông tin cá nhân
          </Menu.Item>
          <Menu.Item
            key='2'
            onClick={handleEditCourse}
            icon={<PieChartOutlined />}>
            Khóa học của tôi
          </Menu.Item>
          <Menu.Item disabled className='mt-5'>
            <hr className='bg-light' />
          </Menu.Item>
          <Menu.Item className='mt-5' icon={<LogoutOutlined />}>
            Đăng xuất
          </Menu.Item>
          <Menu.Item className='mt-5' icon={<MenuOutlined />}></Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
