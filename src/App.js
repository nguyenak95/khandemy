import React from 'react';
import 'antd/dist/antd.css';
import './index.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomeTemplate } from './templates/templateHome';
import { LoginTemplate } from './templates/templateLogin';
import DanhMucKhoaHoc from './components/DanhMucKhoaHoc';
import TrangChu from './components/TrangChu';
import NotFound from './components/NotFound'
import ChiTiet from './components/ChiTiet';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <HomeTemplate exact path='/DanhMucKhoaHoc/:maDanhMuc?/:maNhom?' Component={DanhMucKhoaHoc} />
          <HomeTemplate exact path='/Chitiet/:maKhoaHoc' Component={ChiTiet} />
          <LoginTemplate exact path='/dangNhap' Component={Login} />
          <LoginTemplate exact path='/dangKy' Component={Register} />
          <HomeTemplate exact path='/' Component={TrangChu} />
          <HomeTemplate Component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
}

export default App;
