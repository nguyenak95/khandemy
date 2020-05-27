import React, { useState, useContext, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Logo } from '../../assets/img';
import './index.scss';
import EditCourse from '../EditCourse';
import { GlobalContext } from '../../global';
import EditUserForm from '../EditUserForm';
const { Content, Sider } = Layout;

const UserProfile = ({ history }) => {
  const [pageStatus, setPageStatus] = useState({
    isCollapsed: false,
    isEditProfile: true,
  });
  const { dispatch, isAuth } = useContext(GlobalContext);
  const { isCollapsed, isEditProfile } = pageStatus;

  const toggleCollapsed = () =>
    setPageStatus((s) => ({ ...s, isCollapsed: !s.isCollapsed }));

  const toEditProfile = () =>
    !isEditProfile && setPageStatus((s) => ({ ...s, isEditProfile: true }));

  const toEditCourse = () =>
    isEditProfile && setPageStatus((s) => ({ ...s, isEditProfile: false }));

  const handleLogout = () => {
    localStorage.removeItem('tokenKhandemy') || dispatch({ type: 'logout' });
  };

  useEffect(() => {
    !isAuth && history.push('dangNhap');
  }, [isAuth]);
  return (
    <Layout id='user__profile' style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint='md'
        collapsedWidth='80'
        collapsible
        collapsed={isCollapsed}
        onCollapse={toggleCollapsed}
        onBreakpoint={toggleCollapsed}>
        <Menu defaultSelectedKeys={['1']} theme='dark' mode='inline'>
          <Menu.Item className='pl-2'>
            <img
              src={Logo}
              alt='khandemy logo'
              width={isCollapsed ? 60 : 160}
            />
          </Menu.Item>
          <Menu.Item key='1' onClick={toEditProfile} icon={<UserOutlined />}>
            Thông tin cá nhân
          </Menu.Item>
          <Menu.Item key='2' onClick={toEditCourse} icon={<PieChartOutlined />}>
            Khóa học của tôi
          </Menu.Item>
          <Menu.Item disabled className='mt-5'>
            <hr className='bg-light' />
          </Menu.Item>
          <Menu.Item
            className='mt-5'
            onClick={handleLogout}
            icon={<LogoutOutlined />}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ position: 'relative', margin: '0 16px' }}>
        <div
          className='site-layout-background'
          style={{ padding: 24, minHeight: 360 }}>
          {isEditProfile ? <EditUserForm isAuth={isAuth} /> : <EditCourse />}
        </div>
      </Content>
    </Layout>
  );
};

export default UserProfile;
