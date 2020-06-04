import React, { useState, useEffect, useContext } from 'react';
import { Modal, Form, Select } from 'antd';
import axios from 'axios';
import {
  POST_ADMIN_GHI_DANH_KHOA_HOC,
  POST_NGUOI_DUNG_CHUA_GHI_DANH,
  POST_DANH_SACH_HV_CHO_XET_DUYET,
  POST_DANH_SACH_HOC_VIEN_KHOA_HOC,
  POST_HUY_DANG_KY,
  successBar,
  errorBar,
} from '../Util';
import { GlobalContext } from '../../global';
import './index.scss';
import ModalTableUser from '../ModalTableUser';

const RegisterCourseByCourseModal = ({ maKhoaHoc, visible, closeModal }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState({
    chuaGhiDanh: [],
    daGhiDanh: [],
    choXetDuyet: [],
  });
  const { reqOptions, isAuth } = useContext(GlobalContext);
  const { resetFields, getFieldValue } = form;
  const { chuaGhiDanh, daGhiDanh, choXetDuyet } = data;
  const deleteUser = (taiKhoan) => {
    axios
      .post(
        POST_HUY_DANG_KY,
        {
          taiKhoan,
          maKhoaHoc: maKhoaHoc || '',
        },
        reqOptions
      )
      .then(({ data }) => successBar(data) || layData())
      .catch(({ response }) => errorBar(response.data));
  };
  const layData = () => {
    return Promise.all([
      axios.post(
        POST_NGUOI_DUNG_CHUA_GHI_DANH,
        {
          MaKhoaHoc: maKhoaHoc || '',
        },
        reqOptions
      ),
      axios.post(
        POST_DANH_SACH_HOC_VIEN_KHOA_HOC,
        {
          MaKhoaHoc: maKhoaHoc || '',
        },
        reqOptions
      ),
      axios.post(
        POST_DANH_SACH_HV_CHO_XET_DUYET,
        {
          MaKhoaHoc: maKhoaHoc || '',
        },
        reqOptions
      ),
    ])
      .then(
        ([
          { data: nguoiDungChuaGhiDanh },
          { data: nguoiDungDaGhiDanh },
          { data: nguoiDungChoXetDuyet },
        ]) => {
          const dataDaGhiDanh = nguoiDungDaGhiDanh.map((it) => it.taiKhoan);
          const dataChuaGhiDanh = nguoiDungChuaGhiDanh.filter(
            (it) => !dataDaGhiDanh.includes(it.taiKhoan)
          );
          setData({
            chuaGhiDanh: dataChuaGhiDanh.map((it, idx) => ({
              ...it,
              key: idx + 1,
            })),
            daGhiDanh: nguoiDungDaGhiDanh.map((it, idx) => ({
              ...it,
              key: idx + 1,
            })),
            choXetDuyet: nguoiDungChoXetDuyet.map((it, idx) => ({
              ...it,
              key: idx + 1,
            })),
          });
        }
      )
      .catch((r) => errorBar(r.message));
  };
  const handleRegister = (taiKhoan) =>
    axios
      .post(
        POST_ADMIN_GHI_DANH_KHOA_HOC,
        {
          taiKhoan,
          maKhoaHoc: maKhoaHoc || '',
        },
        reqOptions
      )
      .then(() => successBar('Ghi danh khóa học thành công') || layData())
      .catch((e) => errorBar(e.message));
  useEffect(() => {
    if (isAuth) {
      const callAPI = async () => await layData();
      callAPI();
    }
  }, [maKhoaHoc, isAuth]);
  return (
    <Modal
      centered
      onCancel={() => resetFields() || closeModal()}
      visible={visible}
      closable
      maskClosable
      footer={null}>
      <Form
        size='small'
        name='registerCourse'
        layout='vertical'
        form={form}
        labelCol={{ span: 8 }}>
        <Form.Item label='Chọn người dùng'>
          <Form.Item
            name='taiKhoan'
            style={{ display: 'inline-block', width: 'calc(70% - 8px)' }}>
            <Select size='middle'>
              {chuaGhiDanh.map((user, idx) => (
                <Select.Option key={idx} value={user.taiKhoan}>
                  {user.hoTen}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className='ml-1'
            style={{ display: 'inline-block', width: 'calc(30% - 8px)' }}>
            <button
              className='btn ml-1 btn-sm btn-warning'
              onClick={() => handleRegister(getFieldValue('taiKhoan'))}>
              Ghi danh
            </button>
          </Form.Item>
        </Form.Item>
        <ModalTableUser
          getFieldValue={getFieldValue}
          verifyUser={handleRegister}
          deleteUser={deleteUser}
          dataSource={choXetDuyet}
          isWaitingTable
        />
        <ModalTableUser
          getFieldValue={getFieldValue}
          deleteUser={deleteUser}
          dataSource={daGhiDanh}
        />
      </Form>
    </Modal>
  );
};

export default React.memo(RegisterCourseByCourseModal);
