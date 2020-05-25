import React, { useContext, useEffect, useCallback } from 'react';
import { Form, Input, notification } from 'antd';
import { rules, DANG_NHAP, DANG_KY } from '../Util';
import { GlobalContext } from '../../global';
import axios from 'axios';
const LoginForm = (props) => {
  const [form] = Form.useForm();
  const { dispatch, isAuth } = useContext(GlobalContext);
  const { isLogin, history } = props;
  const route = isLogin ? 'dangKy' : 'dangNhap';
  const callAPI = useCallback((isLogin = false, values) => {
    const { taiKhoan, matKhau, hoTen, email, soDT } = values;
    return isLogin
      ? axios.post(DANG_NHAP, { taiKhoan, matKhau })
      : axios.post(DANG_KY, {
          taiKhoan,
          matKhau,
          hoTen,
          email,
          maNhom: 'GP08',
          maLoaiNguoiDung: 'HV',
          soDT: soDT || '',
        });
  }, []);
  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        callAPI(isLogin, values)
          .then((r) => {
            const { taiKhoan, accessToken } = r.data;
            localStorage.setItem(
              'tokenKhandemy',
              JSON.stringify({ taiKhoan, accessToken })
            );
            dispatch({ type: 'login', payload: true });
          })
          .catch((errorRes) =>
            form.setFields([
              {
                name: 'matKhau',
                errors: [errorRes.response.data],
              },
            ])
          );
      })
      .catch(() =>
        notification.error({
          message: 'Một số trường bị sai định dạng, vui lòng kiểm tra lại ',
          placement: 'bottomRight',
        })
      );
  };
  useEffect(() => {
    isAuth && history.push('/thongTinTaiKhoan');
  }, [isAuth]);
  return (
    <Form form={form} layout='vertical' labelCol={{ span: 24 }}>
      <Form.Item label='Tài khoản' name='taiKhoan'>
        <Input placeholder='Please input your username' />
      </Form.Item>
      <Form.Item label='Mật khẩu' name='matKhau'>
        <Input placeholder='Please input your password' type='password' />
      </Form.Item>
      {isLogin ? null : (
        <>
          <Form.Item
            label='Nhập lại mật khẩu'
            name='kiemTraMatKhau'
            type='password'
            rules={rules.password}>
            <Input placeholder='Retype your password' />
          </Form.Item>
          <Form.Item label='Họ tên' name='hoTen'>
            <Input placeholder='Please input your full name' />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input placeholder='Please input your email' />
          </Form.Item>
          <Form.Item label='Số điện thoại' name='soDT'>
            <Input placeholder='Please input your phone number' />
          </Form.Item>
        </>
      )}
      <div className='d-flex justify-content-around mb-5'>
        <button className='btn btn-primary' onClick={handleSubmit}>
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </button>
        <button className='btn btn-danger' onClick={() => history.push(route)}>
          {isLogin ? 'Đăng ký' : 'Đăng nhập'}
        </button>
      </div>
    </Form>
  );
};
export default LoginForm;
