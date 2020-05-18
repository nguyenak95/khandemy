import React from 'react';
import './index.scss';
import LoginForm from '../LoginForm';
const LoginTemplate = (props) => {
  return (
    <div className='login__container container-fluid p-0'>
        <div className='text-center pt-2 login__form col-lg-4 col-md-5 col-sm-12'>
          <h2> Nền tảng giáo dục trực tuyến lớn nhất Đông Lào</h2>
          <h3> ĐĂNG KÝ </h3>
          <LoginForm isLogin={false} className='mt-2 bg-primary'/>
          {props.isLogin ? (
            <div>
              <p>Hoặc đăng ký với: </p>
            </div>
          ) : null}
          </div>
        </div>
  );
};

export default LoginTemplate;
