import React, { useState, useContext, useEffect } from 'react';
import { Layout, Menu, notification } from 'antd';
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
import axios from 'axios';
import { LAY_THONG_TIN_CA_NHAN } from '../Util';
const { Content, Sider } = Layout;

const UserProfile = ({ history }) => {
  const [pageStatus, setPageStatus] = useState({
    isCollapsed: false,
    isEditProfile: true,
  });
  const { dispatch, isAuth, userData, reqOptions } = useContext(GlobalContext);
  const { isCollapsed, isEditProfile } = pageStatus;
  const toggleCollapsed = () =>
    setPageStatus((s) => ({ ...s, isCollapsed: !s.isCollapsed }));
  const hideSidebar = () => {
    !isCollapsed &&
      setPageStatus((s) => ({
        ...s,
        isCollapsed: false,
      }));
  };
  const toEditProfile = () =>
    !isEditProfile && setPageStatus((s) => ({ ...s, isEditProfile: true }));

  const toEditCourse = () =>
    isEditProfile && setPageStatus((s) => ({ ...s, isEditProfile: false }));
  const toHome = () => history.push('/');
  const handleLogout = () => dispatch({ type: 'logout' });
  const layThongTinCaNhan = () => {
    const { taiKhoan } = JSON.parse(
      localStorage.getItem('tokenKhandemy') || '{}'
    );

    axios
      .post(LAY_THONG_TIN_CA_NHAN, { taiKhoan }, reqOptions)
      .then(({ data }) => {
        dispatch({ type: 'setUserData', payload: data });
      })
      .catch(
        () =>
          notification.error({
            message: 'Token hết hạn, vui lòng đăng nhập lại',
          }) || dispatch({ type: 'logout' })
      );
  };
  useEffect(() => {
    isAuth ? userData || layThongTinCaNhan() : history.push('/dangNhap');
  }, [isAuth]);

  return isAuth ? (
    <Layout id='user__profile' style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint='md'
        collapsedWidth='80'
        collapsible
        collapsed={isCollapsed}
        onCollapse={toggleCollapsed}
        onBreakpoint={hideSidebar}>
        <Menu defaultSelectedKeys={['1']} theme='dark' mode='inline'>
          <Menu.Item className='pl-2' onClick={toHome}>
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
          {isEditProfile ? (
            <EditUserForm isAuth={isAuth} userData={userData} />
          ) : (
            <EditCourse
              userData={userData}
              layThongTinCaNhan={layThongTinCaNhan}
            />
          )}
        </div>
      </Content>
    </Layout>
  ) : null;
};

export default UserProfile;
