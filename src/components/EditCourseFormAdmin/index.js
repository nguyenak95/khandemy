import React, { useEffect, useContext, useState } from 'react';
import {
  PageHeader,
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
} from 'antd';
import {
  rules,
  LAY_DANH_MUC_KHOA_HOC,
  TIM_KIEM_NGUOI_DUNG,
  THEM_KHOA_HOC,
  CAP_NHAT_KHOA_HOC,
  errorBar,
  successBar,
  UPLOAD_HINH,
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
  const [file, setFile] = useState(null);
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
        if (!file) throw Error('Bạn chưa chọn hình ảnh');
        axios
          .post(
            THEM_KHOA_HOC,
            {
              maKhoaHoc,
              tenKhoaHoc,
              maDanhMucKhoaHoc,
              taiKhoanNguoiTao,
              moTa,
              biDanh: tenKhoaHoc.toLowerCase().split(' ').join('-'),
              hinhAnh: file.name,
              ngayTao: moment(ngayTao).format('DD/MM/YYYY'),
              luotXem: 0,
              danhGia: 0,
              maNhom: 'GP08',
            },
            reqOptions
          )
          .then((r) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tenKhoaHoc', r.data.tenKhoaHoc);
            successBar('Thêm khóa học thành công') || resetFields()
            handleExitEdit()
            axios
              .post(UPLOAD_HINH, formData, reqOptions)
              .then((r) => successBar(r.data))
              .catch((e) => errorBar(e.response?.data || e));
          })
          .catch((e) => errorBar(e.response?.data || e));
      })
      .catch((e) =>
        errorBar(e.message || '1 số trường không phù hợp định dạng')
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
            danhGia,
            taiKhoanNguoiTao,
            hinhAnh,
          } = values;
          axios
            .put(
              CAP_NHAT_KHOA_HOC,
              {
                maKhoaHoc,
                tenKhoaHoc,
                maDanhMucKhoaHoc,
                luotXem: luotXem || courseData.luotXem,
                // danhGia:,
                taiKhoanNguoiTao,
                hinhAnh,
                moTa,
                biDanh: tenKhoaHoc.toLowerCase().split(' ').join('-'),
                maNhom: 'GP08',
                ngayTao: moment(ngayTao).format('DD/MM/YYYY'),
              },
              reqOptions
            )
            .then(
              (r) =>
                successBar('Chỉnh sửa thông tin khóa học thành công') ||
                setFieldsValue(r.data)
            )
            .catch(({ response }) => errorBar(response.data));
        }
      })
      .catch(() => errorBar('1 số trường không phù hợp định dạng'));
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
          maDanhMucKhoaHoc: courseData.maKhoaHoc
            ? courseData?.danhMucKhoaHoc?.maDanhMucKhoahoc
            : '',
          ngayTao: courseData.maKhoaHoc
            ? moment(courseData.ngayTao, 'DD/MM/YYYY')
            : null,
          danhGia: 0,
          luotXem: courseData?.luotXem || 0,
          taiKhoanNguoiTao: courseData.maKhoaHoc
            ? courseData?.nguoiTao?.taiKhoan
            : '',
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
            <Form.Item label='Hình ảnh'>
              <input type='file' onChange={(e) => setFile(e.target.files[0])} />
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
            data={courseData.moTa || ''}
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
