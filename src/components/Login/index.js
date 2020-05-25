import React, { useCallback } from 'react';
import './index.scss';
import LoginForm from '../LoginForm';
import DropDown from '../MenuDropDown';
import axios from 'axios';
import { DANG_NHAP } from '../Util';

const Login = (props) => {
  return (
    <>
      <div className='login__container'>
        <div className='text-center d-flex flex-column login__form col-lg-4 col-md-5 col-sm-12'>
          <h2> Nền tảng giáo dục trực tuyến lớn nhất Đông Lào </h2>
          <h3> ĐĂNG NHẬP </h3>
            <LoginForm
              isLogin={true}
              className='mt-2 bg-primary'
              history={props.history}
            />
        </div>
      </div>
    </>
  );
};

export default Login;
