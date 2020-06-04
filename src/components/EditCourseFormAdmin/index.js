import React, { useEffect, useContext, useState } from 'react';
import {
  PageHeader,
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
  notification,
  DatePicker,
  Upload,
} from 'antd';
import { PUT_SUA_NGUOI_DUNG, POST_THEM_NGUOI_DUNG, rules } from '../Util';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GlobalContext } from '../../global';

const EditUserFormAdmin = ({ courseData, handleExitEdit }) => {
  const [form] = Form.useForm();
  const [listMaDanhMuc, setListDanhMuc] = useState([]);
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
        if (taiKhoan !== courseData.taiKhoan) {
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
  useEffect(
    () => courseData && courseData.maKhoaHoc && form.setFieldsValue(courseData)
  );
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
      <Form
        name='addCourse'
        layout='vertical'
        form={form}
        labelCol={{ span: 8 }}>
        <Row className='justify-content-between' gutter={8}>
          <Col sm={24} md={10}>
            <Form.Item
              label='Mã khóa học'
              name='maKhoaHoc'
              rules={rules.required}>
              <Input disabled={!!courseData.taiKhoan} />
            </Form.Item>
            <Form.Item
              label='Tên khóa học'
              name='tenKhoaHoc'
              rules={rules.required}>
              <Input />
            </Form.Item>
            <Form.Item
              label='Danh mục khóa học'
              name='maDanhMucKhoaHoc'
              rules={rules.required}>
              <Select>
                {listMaDanhMuc.map((danhMuc, idx) => (
                  <Select.Option key={idx} value={danhMuc.maDanhMuc}>
                    {danhMuc.tenDanhMuc}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='Ngày tạo' name='ngayTao' rules={rules.required}>
              <DatePicker format='dd/MM/yyyy' />
            </Form.Item>
          </Col>
          <Col sm={24} md={10}>
            <Form.Item label='Đánh giá' name='danhGia'>
              <Input />
            </Form.Item>
            <Form.Item label='Lượt xem' name='luotXem'>
              <Input />
            </Form.Item>
            <Form.Item label='Người tạo' name='taiKhoanNguoiTao'>
              <Select>
                <Select.Option value='HV'>Học viên</Select.Option>
                <Select.Option value='GV'>Giáo vụ</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Hình ảnh' name='hinhAnh'>
              <Upload />
            </Form.Item>
            <Form.Item>
              {courseData.taiKhoan ? (
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
        <CKEditor
          editor={ClassicEditor}
          onInit={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(aa,editor) => {
            const data = editor.getData();
            console.log(data);
          }}
          config={{
            enterMode:CKEditor.ENTER_BR
          }}
        />
      </Form>
    </>
  );
};

export default EditUserFormAdmin;
