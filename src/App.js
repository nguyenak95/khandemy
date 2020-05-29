import React, { useReducer } from 'react';
import 'antd/dist/antd.css';
import './index.scss';
import { BrowserRouter, Switch } from 'react-router-dom';
import { HomeTemplate } from './templates/templateHome';
import { LoginTemplate } from './templates/templateLogin';
import { UserTemplate } from './templates/templateUser';
import { AdminTemplate } from './templates/templateAdmin';
import DanhMucKhoaHoc from './components/DanhMucKhoaHoc';
import TrangChu from './components/TrangChu';
import NotFound from './components/NotFound';
import ChiTiet from './components/ChiTiet';
import Login from './components/Login';
import Register from './components/Register';
import { rootReducer, GlobalContext } from './global';
import ManageUserPage from './pages/ManageUserPage';

function App() {
  const [globalState, dispatch] = useReducer(rootReducer, {
    isAuth: !!localStorage.getItem('tokenKhandemy'),
    userData: null,
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
          <LoginTemplate exact path='/dangNhap' Component={Login} />
          <LoginTemplate exact path='/dangKy' Component={Register} />
          <AdminTemplate
            exact
            path='/admin/quanLyNguoiDung'
            Component={ManageUserPage}
          />
          <AdminTemplate exact path='/admin' Component={NotFound} />
          <HomeTemplate exact path='/' Component={TrangChu} />
          <HomeTemplate Component={NotFound} />
        </Switch>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
