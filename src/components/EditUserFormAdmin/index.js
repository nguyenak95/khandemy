import React, { useEffect, useContext } from 'react';
import {
  PageHeader,
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
  notification,
} from 'antd';
import { PUT_SUA_NGUOI_DUNG, POST_THEM_NGUOI_DUNG, rules } from '../Util';
import axios from 'axios';
import { GlobalContext } from '../../global';

const EditUserFormAdmin = ({ userData, handleExitEdit }) => {
  const [form] = Form.useForm();
  const { reqOptions } = useContext(GlobalContext);
  const { setFields, validateFields, setFieldsValue, resetFields } = form;
  const handleAddUser = () => {
    validateFields()
      .then((values) => {
        const {
          taiKhoan,
          matKhau,
          hoTen,
          soDT,
          email,
          maLoaiNguoiDung,
        } = values;
        axios
          .post(
            POST_THEM_NGUOI_DUNG,
            {
              taiKhoan,
              matKhau,
              hoTen,
              email,
              soDT: soDT || '',
              maLoaiNguoiDung,
              maNhom: 'GP08',
            },
            reqOptions
          )
          .then(
            (r) =>
              notification.success({
                message: 'Thêm người dùng thành công',
                placement: 'bottomRight',
              }) || resetFields()
          )
          .catch((e) =>
            notification.error({
              message: e.message,
              placement: 'bottomRight',
            })
          );
      })
      .catch((e) =>
        notification.error({
          message: e.message,
          placement: 'bottomRight',
        })
      );
  };

  const handleEditUser = () => {
    validateFields()
      .then((values) => {
        const { taiKhoan } = values;
        if (taiKhoan !== userData.taiKhoan) {
          setFields([
            {
              name: 'taiKhoan',
              errors: ['Không được thay đổi tên đăng nhập'],
            },
          ]);
        } else {
          setFields([
            {
              name: 'taiKhoan',
              errors: [],
            },
          ]);
          const { matKhau, hoTen, soDt, email, maLoaiNguoiDung } = values;
          axios
            .put(
              PUT_SUA_NGUOI_DUNG,
              {
                taiKhoan,
                matKhau,
                hoTen,
                email,
                soDT: soDt || '',
                maLoaiNguoiDung,
                maNhom: 'GP08',
              },
              reqOptions
            )
            .then(
              (r) =>
                notification.success({
                  message: 'Chỉnh sửa thông tin người dùng thành công',
                  placement: 'bottomRight',
                }) || setFieldsValue(r.data)
            )
            .catch((e) =>
              notification.error({
                message: e.message,
                placement: 'bottomRight',
              })
            );
        }
      })
      .catch((e) =>
        notification.error({
          message: e.message,
          placement: 'bottomRight',
        })
      );
  };
  useEffect(() => userData.taiKhoan && form.setFieldsValue(userData));
  return (
    <>
      <PageHeader
        title='Thêm người dùng'
        tags={
          <button className='btn btn-secondary' onClick={handleExitEdit}>
            {'<<<Trở lại'}
          </button>
        }
      />
      <Form name='addUser' layout='vertical' form={form} labelCol={{ span: 8 }}>
        <Row className='justify-content-between' gutter={8}>
          <Col sm={24} md={10}>
            <Form.Item label='Tài khoản' name='taiKhoan' rules={rules.required}>
              <Input disabled={!!userData.taiKhoan} />
            </Form.Item>
            <Form.Item label='Mật khẩu' name='matKhau' rules={rules.required}>
              <Input />
            </Form.Item>
            <Form.Item label='Họ tên' name='hoTen' rules={rules.required}>
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} md={10}>
            <Form.Item label='Email' name='email' rules={rules.required}>
              <Input />
            </Form.Item>
            <Form.Item label='Số điện thoại' name='soDt'>
              <Input />
            </Form.Item>
            <Form.Item
              initialValue='HV'
              label='Loại người dùng'
              name='maLoaiNguoiDung'>
              <Select>
                <Select.Option value='HV'>Học viên</Select.Option>
                <Select.Option value='GV'>Giáo vụ</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              {userData.taiKhoan ? (
                <Button onClick={handleEditUser} type='primary'>
                  Lưu
                </Button>
              ) : (
                <Button onClick={handleAddUser} type='primary'>
                  Thêm
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EditUserFormAdmin;
