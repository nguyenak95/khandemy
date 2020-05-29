import React, { useCallback, useState } from 'react';
import { Route } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import { Layout, Menu } from 'antd';
import { UsergroupAddOutlined, BookOutlined } from '@ant-design/icons';
const { Sider, Content } = Layout;

const AdminLayout = ({ history, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapsed = useCallback(() => setIsCollapsed((s) => !s), []);
  const toManageUser = useCallback(() => history.push('admin/quanLyNguoiDung'), []);
  const toManageCourse = useCallback(() => history.push('admin/quanLyKhoaHoc'), []);

  return (
    <>
      <AdminNavbar history={history} toggleCollapsed={toggleCollapsed} />
      <Layout id='admin__pannel' style={{ minHeight: '100vh' }}>
        <Sider
          theme='light'
          breakpoint='md'
          collapsedWidth='80'
          collapsible
          trigger={null}
          collapsed={isCollapsed}
          onBreakpoint={toggleCollapsed}>
          <Menu defaultSelectedKeys={['1']} theme='light' mode='inline'>
            <Menu.Item
              key='1'
              onClick={toManageUser}
              icon={<UsergroupAddOutlined />}>
              Quản lý người dùng
            </Menu.Item>
            <Menu.Item key='2' onClick={toManageCourse} icon={<BookOutlined />}>
              Quản lý khóa học
            </Menu.Item>
            <Menu.Item disabled className='mt-5'>
              <hr />
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ position: 'relative', margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </>
  );
};

export const AdminTemplate = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <AdminLayout history={props.history}>
            <Component {...props} />
          </AdminLayout>
        );
      }}
    />
  );
};
