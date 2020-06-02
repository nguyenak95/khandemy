import React, { useState, useEffect, useContext } from 'react';
import { Modal, Form, Select, Button } from 'antd';
import axios from 'axios';
import {
  POST_ADMIN_GHI_DANH_KHOA_HOC,
  POST_KHOA_HOC_CHUA_GHI_DANH,
  POST_KHOA_HOC_DA_GHI_DANH,
  POST_KHOA_HOC_CHO_XET_DUYET,
  POST_HUY_DANG_KY,
  successBar,
  errorBar,
} from '../Util';
import { GlobalContext } from '../../global';
import TableCourse from '../ModalTableCourse';
import './index.scss';

const RegisterCourseModal = ({ taiKhoan, visible, closeModal }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState({
    chuaGhiDanh: [],
    daGhiDanh: [],
    choXetDuyet: [],
  });
  const { reqOptions, isAuth } = useContext(GlobalContext);
  const { resetFields, getFieldValue } = form;
  const { chuaGhiDanh, daGhiDanh, choXetDuyet } = data;
  const deleteCourse = (maKhoaHoc) => {
    axios
      .post(
        POST_HUY_DANG_KY,
        {
          taiKhoan,
          maKhoaHoc,
        },
        reqOptions
      )
      .then(({ data }) => successBar(data) || layData())
      .catch(({ response }) => errorBar(response.data));
  };
  const layData = () => {
    return Promise.all([
      axios.post(
        POST_KHOA_HOC_CHUA_GHI_DANH,
        {
          TaiKhoan: taiKhoan,
        },
        reqOptions
      ),
      axios.post(
        POST_KHOA_HOC_DA_GHI_DANH,
        {
          TaiKhoan: taiKhoan,
        },
        reqOptions
      ),
      axios.post(
        POST_KHOA_HOC_CHO_XET_DUYET,
        {
          TaiKhoan: taiKhoan,
        },
        reqOptions
      ),
    ])
      .then(
        ([
          { data: khoaHocChuaGhiDanh },
          { data: khoaHocDaGhiDanh },
          { data: khoaHocChoXetDuyet },
        ]) => {
          const dataDaGhiDanh = khoaHocDaGhiDanh.map((it) => it.maKhoaHoc);
          const dataChuaGhiDanh = khoaHocChuaGhiDanh.filter(
            (it) => !dataDaGhiDanh.includes(it.maKhoaHoc)
          );
          resetFields();
          setData({
            chuaGhiDanh: dataChuaGhiDanh.map((it, idx) => ({
              ...it,
              key: idx + 1,
            })),
            daGhiDanh: khoaHocDaGhiDanh.map((it, idx) => ({
              ...it,
              key: idx + 1,
            })),
            choXetDuyet: khoaHocChoXetDuyet.map((it, idx) => ({
              ...it,
              key: idx + 1,
            })),
          });
        }
      )
      .catch((r) => errorBar(r.message));
  };
  const handleRegister = (maKhoaHoc) =>
    axios
      .post(
        POST_ADMIN_GHI_DANH_KHOA_HOC,
        {
          taiKhoan,
          maKhoaHoc,
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
  }, [taiKhoan, isAuth]);
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
        <Form.Item label='Chọn khóa học'>
          <Form.Item
            name='maKhoaHoc'
            style={{ display: 'inline-block', width: 'calc(70% - 8px)' }}>
            <Select size='middle'>
              {chuaGhiDanh.map((course, idx) => (
                <Select.Option key={idx} value={course.maKhoaHoc}>
                  {course.tenKhoaHoc}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className='ml-1'
            style={{ display: 'inline-block', width: 'calc(30% - 8px)' }}>
            <button
              className='btn ml-1 btn-sm btn-warning'
              onClick={() => handleRegister(getFieldValue('maKhoaHoc'))}>
              Ghi danh
            </button>
          </Form.Item>
        </Form.Item>
        <TableCourse
          getFieldValue={getFieldValue}
          verifyCourse={handleRegister}
          deleteCourse={deleteCourse}
          dataSource={choXetDuyet}
          isWaitingTable
        />
        <TableCourse
          getFieldValue={getFieldValue}
          deleteCourse={deleteCourse}
          dataSource={daGhiDanh}
        />
      </Form>
    </Modal>
  );
};

export default React.memo(RegisterCourseModal);
