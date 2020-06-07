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
} from 'antd';
import {
  rules,
  LAY_DANH_MUC_KHOA_HOC,
  TIM_KIEM_NGUOI_DUNG,
  THEM_KHOA_HOC,
  CAP_NHAT_KHOA_HOC,
} from '../Util';
import axios from 'axios';
import CKEditor from 'ckeditor4-react';
import { GlobalContext } from '../../global';
import moment from 'moment';

const EditUserFormAdmin = ({ courseData, handleExitEdit }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState({
    listMaDanhMuc: [],
    listGV: [],
    moTa: '',
  });
  const [file,setFile] = useState(null)
  const { listMaDanhMuc, listGV, moTa } = data;
  const { reqOptions } = useContext(GlobalContext);
  const { setFields, validateFields, setFieldsValue, resetFields } = form;
  useEffect(() => {
    axios
      .all([axios.get(LAY_DANH_MUC_KHOA_HOC), axios.get(TIM_KIEM_NGUOI_DUNG)])
      .then(
        axios.spread(({ data: listDanhMuc }, { data: listNguoiDung }) => {
          setData({
            listMaDanhMuc: listDanhMuc,
            listGV: listNguoiDung.filter((p) => p.maLoaiNguoiDung === 'GV'),
            moTa: courseData ? courseData.moTa : '',
          });
        })
      );
  }, []);
  const handleAddCourse = (e) => {
    e.preventDefault();
    validateFields()
      .then((values) => {
        const {
          maKhoaHoc,
          tenKhoaHoc,
          maDanhMucKhoaHoc,
          ngayTao,
          taiKhoanNguoiTao,
        } = values;
        axios
          .post(
            THEM_KHOA_HOC,
            {
              maKhoaHoc,
              tenKhoaHoc,
              maDanhMucKhoaHoc,
              hinhAnh: file.name,
              taiKhoanNguoiTao,
              moTa,
              ngayTao: moment(ngayTao).format('DD/MM/YYYY'),
              luotXem: 0,
              danhGia: 0,
              maNhom: 'GP08',
            },
            reqOptions
          )
          .then(
            (r) =>
              console.log(r.data) ||
              notification.success({
                message: 'Thêm khóa học thành công',
                placement: 'bottomRight',
              }) ||
              resetFields()
          )
          .catch(({ response }) =>
            notification.error({
              message: response.data,
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

  const handleEditCourse = () => {
    validateFields()
      .then((values) => {
        const { maKhoaHoc, luotXem } = values;
        if (maKhoaHoc !== courseData.maKhoaHoc) {
          setFields([
            {
              name: 'maKhoaHoc',
              errors: ['Không được thay đổi mã khóa học'],
            },
          ]);
        } else if (luotXem !== courseData.luotXem) {
          setFields([
            {
              name: 'luotXem',
              errors: ['Không được thay đổi số lượt xem'],
            },
          ]);
        } else {
          setFields([
            {
              name: 'maKhoaHoc',
              errors: [],
            },
            {
              name: 'luotXem',
              errors: [],
            },
          ]);
          const {
            tenKhoaHoc,
            maDanhMucKhoaHoc,
            ngayTao,
            luotXem,
            danhGia,
            taiKhoanNguoiTao,
            hinhAnh,
          } = values;
          axios
            .put(
              CAP_NHAT_KHOA_HOC,
              {
                maKhoaHoc,
                biDanh: 'redux',
                tenKhoaHoc,
                maDanhMucKhoaHoc,
                luotXem,
                danhGia,
                taiKhoanNguoiTao,
                hinhAnh,
                moTa,
                maNhom: 'GP08',
                ngayTao: moment(ngayTao).format('DD/MM/YYYY'),
              },
              reqOptions
            )
            .then(
              (r) =>
                notification.success({
                  message: 'Chỉnh sửa thông tin khóa học thành công',
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
  return (
    <>
      <PageHeader
        title='Thêm khóa học'
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
        labelCol={{ span: 8 }}
        initialValues={{
          maKhoaHoc: courseData?.maKhoaHoc || '',
          tenKhoaHoc: courseData?.tenKhoaHoc || '',
          maDanhMucKhoaHoc: courseData?.danhMucKhoaHoc?.maDanhMucKhoaHoc || '',
          ngayTao: courseData ? moment(courseData.ngayTao) : null,
          danhGia: 0,
          luotXem: courseData?.luotXem || 0,
        }}>
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
              <Select allowClear>
                {listMaDanhMuc.map((danhMuc, idx) => (
                  <Select.Option key={idx} value={danhMuc.maDanhMuc}>
                    {danhMuc.tenDanhMuc}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='Ngày tạo' name='ngayTao' rules={rules.required}>
              <DatePicker format='DD/MM/YYYY' />
            </Form.Item>
          </Col>
          <Col sm={24} md={10}>
            <Form.Item label='Đánh giá' name='danhGia'>
              <Input type='number' disabled={!!courseData} />
            </Form.Item>
            <Form.Item label='Lượt xem' name='luotXem'>
              <Input type='number' disabled={!!courseData} />
            </Form.Item>
            <Form.Item
              label='Người tạo'
              name='taiKhoanNguoiTao'
              rules={rules.required}>
              <Select>
                {listGV.map((gv, idx) => (
                  <Select.Option key={idx} value={gv.taiKhoan}>
                    {gv.hoTen}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='Hình ảnh' valuePropName='fileList'>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                name='hinhAnh'>
                <Input disabled />
              </Form.Item>
              <Form.Item
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  marginLeft: '8px',
                }}>
                <input type='file' onChange={(e) => setFile(e.target.files[0])}/>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              {courseData.maKhoaHoc ? (
                <Button onClick={handleEditCourse} type='primary'>
                  Lưu
                </Button>
              ) : (
                <Button onClick={handleAddCourse} type='primary'>
                  Thêm
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label='Mô tả'>
          <CKEditor
            data={courseData}
            onChange={(e) =>
              setData((s) => ({ ...s, moTa: e.editor.getData() }))
            }
            config={{ autoParagraph: false }}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUserFormAdmin;
