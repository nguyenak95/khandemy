import React, { useReducer } from 'react';
import 'antd/dist/antd.css';
import './index.scss';
import { BrowserRouter, Switch } from 'react-router-dom';
import { HomeTemplate } from './templates/templateHome';
import { LoginTemplate } from './templates/templateLogin';
import { UserTemplate } from './templates/templateUser';
import { AdminTemplate } from './templates/templateAdmin';
import ChiTiet from './components/ChiTiet';
import { rootReducer, GlobalContext } from './global';
import ManageUserPage from './pages/ManageUserPage';
import ManageCoursePage from './pages/ManageCoursePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DanhMucKhoaHoc from './pages/DanhMucKhoaHoc';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

function App() {
  const [globalState, dispatch] = useReducer(rootReducer, {}, () => {
    const store = localStorage.getItem('tokenKhandemy');
    const { accessToken } = JSON.parse(store || '{}');
    return {
      isAuth: !!store,
      userData: null,
      reqOptions: {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : null,
        },
      },
    };
  });
  return (
    <GlobalContext.Provider value={{ ...globalState, dispatch }}>
      <BrowserRouter>
        <Switch>
          <HomeTemplate
            exact
            path='/DanhMucKhoaHoc/:maDanhMuc?/:maNhom?'
            Component={DanhMucKhoaHoc}
          />
          <HomeTemplate exact path='/Chitiet/:maKhoaHoc' Component={ChiTiet} />
          <UserTemplate exact path='/thongTinTaiKhoan' />
          <LoginTemplate exact path='/dangNhap' Component={LoginPage} />
          <LoginTemplate exact path='/dangKy' Component={RegisterPage} />
          <AdminTemplate
            exact
            path='/admin/quanLyNguoiDung'
            Component={ManageUserPage}
          />
          <AdminTemplate
            exact
            path='/admin/quanLyKhoaHoc'
            Component={ManageCoursePage}
          />
          <AdminTemplate exact path='/admin' Component={ManageUserPage} />
          <HomeTemplate exact path='/' Component={HomePage} />
          <HomeTemplate Component={NotFound} />
        </Switch>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
