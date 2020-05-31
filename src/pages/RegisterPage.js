import React from 'react';
import LoginForm from '../components/LoginForm';
const RegisterPage = (props) => {
  return (
    <div className='login__container'>
      <div
        style={{ minHeight: '100vh' }}
        className='text-center d-flex flex-column login__form col-lg-4 col-md-5 col-sm-12'>
        <h2> Nền tảng giáo dục trực tuyến lớn nhất Đông Lào</h2>
        <h3> ĐĂNG KÝ </h3>
        <div>
          <LoginForm isLogin={false} history={props.history} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
