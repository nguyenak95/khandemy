import React from 'react';
import { Table, Button } from 'antd';
import { POST_XOA_KHOA_HOC, errorBar, successBar } from '../Util';
import axios from 'axios';

const CourseTable = ({
  loading,
  dataSource,
  handleSearch,
  handleEdit,
  openModal,
}) => {
  const pagination = {
    pageSize: 7,
  };
  const { accessToken } = JSON.parse(
    localStorage.getItem('tokenKhandemy') || '{}'
  );
  const handleDeleteCourse = (maKhoaHoc) =>
    axios
      .delete(`${POST_XOA_KHOA_HOC}${maKhoaHoc}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(
        () =>
          successBar(`Xóa khóa học ${maKhoaHoc} thành công`) || handleSearch()
      )
      .catch((e) => errorBar(e.response.data));
  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT',
      width: 20,
      fixed: 'left',
    },
    {
      title: 'Mã khóa học',
      dataIndex: 'maKhoaHoc',
      key: 'maKhoaHoc',
      width: 60,
      fixed: 'left',
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'tenKhoaHoc',
      key: 'tenKhoaHoc',
      ellipsis: 'enable',
      width: 120,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      width: 60,
      render: (data) => (
        <a href={data} target='_blank' rel='noopener noreferrer'>
          {data}
        </a>
      ),
      ellipsis: 'enable',
    },
    {
      title: 'Lượt xem',
      dataIndex: 'luotXem',
      key: 'luotXem',
      width: 40,
    },
    {
      title: 'Người tạo',
      dataIndex: 'nguoiTao',
      key: 'nguoiTao',
      width: 100,
      ellipsis: 'enable',
      render: (data) => data.hoTen,
    },
    {
      title: 'Thao tác',
      key: 'thaoTac',
      width: 120,
      fixed: 'right',
      render: (a) => (
        <Button.Group>
          <button
            className='btn btn-sm btn-dark mr-1'
            onClick={() => openModal(a.maKhoaHoc)}>
            Ghi danh
          </button>
          <button
            className='btn btn-sm btn-warning mr-1'
            onClick={() => handleEdit(a)}>
            Sửa
          </button>
          <button
            onClick={() => handleDeleteCourse(a.maKhoaHoc)}
            className='btn btn-sm btn-danger mr-1'>
            X
          </button>
        </Button.Group>
      ),
    },
  ];
  return (
    <Table
      id='course__list'
      bordered
      scroll={{ x: '100vw' }}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      size='small'
    />
  );
};

export default CourseTable;
