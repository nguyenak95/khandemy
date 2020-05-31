import React from 'react';
import { Table, Button } from 'antd';

const TableCourse = ({
  dataSource,
  deleteCourse,
  verifyCourse,
  isWaitingTable = false,
}) => {
  const title = () =>
    isWaitingTable ? 'Khóa học chờ xác thực' : 'Khóa học đã ghi danh';
  const pagination = {
    pageSize: 2,
    position: ['topRight', 'none'],
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: 20,
    },
    {
      title: 'Tên Khóa học',
      dataIndex: 'tenKhoaHoc',
      key: 'tenKhoaHoc',
      width: 60,
    },
    {
      title: 'Chờ xác nhận',
      key: 'choXacNhan',
      width: 120,
      render: (a) => (
        <Button.Group className='d-flex'>
          {isWaitingTable ? (
            <button
              className='btn btn-dark mr-1'
              onClick={() => verifyCourse(a.maKhoaHoc)}>
              Xác thực
            </button>
          ) : null}
          <button
            onClick={() => deleteCourse(a.maKhoaHoc)}
            className='btn btn-danger mr-1'>
            Hủy
          </button>
        </Button.Group>
      ),
    },
  ];
  return (
    <Table
      title={title}
      bordered
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      size='small'
    />
  );
};

export default TableCourse;
