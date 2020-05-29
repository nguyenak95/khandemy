import React, { useState, useEffect } from 'react';
import { Button, PageHeader, Input, notification } from 'antd';
import { TIM_KIEM_NGUOI_DUNG } from '../components/Util';
import axios from 'axios';
import UserList from '../components/UserList';

const ManageUserPage = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    axios
      .get(TIM_KIEM_NGUOI_DUNG)
      .then((r) =>
        setUserList(r.data.map((item, idx) => ({ ...item, STT: idx + 1 })))
      )
      .catch((e) =>
        notification.error({
          message: e.message,
        })
      );
  }, []);
  const handleAdd = () => setIsAdd(true);
  const handleInputSearch = ({ target }) => setSearchTerm(target.value);
  const handleSearch = () => {
    axios
      .get(`${TIM_KIEM_NGUOI_DUNG}${searchTerm ? `&tuKhoa=${searchTerm}` : ''}`)
      .then((r) => console.log(r.data) || setUserList(r.data))
      .catch((e) =>
        notification.error({
          message: e.message,
        })
      );
  };
  return (
    <>
      <PageHeader
        title='Quản lý người dùng'
        extra={<Button onClick={handleAdd}>Thêm</Button>}
      />
      <Input.Search
        onChange={handleInputSearch}
        placeholder='Nhập vào tài khoản hoặc họ tên người dùng'
      />
      <Button onClick={handleSearch}>Tìm</Button>
      <UserList dataSource={userList} loading={false} />
    </>
  );
};

export default ManageUserPage;
