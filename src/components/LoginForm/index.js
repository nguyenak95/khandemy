import React from 'react';
import { Form, Input, Button } from 'antd';

const LoginForm = (props) => {
  const [form] = Form.useForm();
  const { isLogin } = props;
  return (
    <Form form={form} layout='horizontal' labelCol={{ span: 8 }}>
      <Form.Item label='Tài khoản'>
        <Input />
      </Form.Item>
      <Form.Item label='Mật khẩu'>
        <Input />
      </Form.Item>
      {isLogin ? null : (
        <>
          <Form.Item label='Nhập lại mật khẩu'>
            <Input />
          </Form.Item>
          <Form.Item label='Họ tên'>
            <Input />
          </Form.Item>
          <Form.Item label='Email'>
            <Input />
          </Form.Item>
          <Form.Item label='Số điện thoại'>
            <Input />
          </Form.Item>
        </>
      )}
      <div className='d-flex justify-content-around mb-5'>
        <button className='btn btn-primary'>
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </button>
        <button className='btn btn-dark'>
          {isLogin ? 'Reset' : 'Đăng nhập'}
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
