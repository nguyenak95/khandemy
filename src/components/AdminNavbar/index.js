import React, { useContext, useEffect } from 'react';
import { Avatar } from '../../assets/img';
import './index.scss';
import { MenuOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import { GlobalContext } from '../../global';
import axios from 'axios';
import { LAY_THONG_TIN_CA_NHAN } from '../Util';

const AdminNavbar = ({ toggleCollapsed, history }) => {
  const { isAuth, dispatch, userData } = useContext(GlobalContext);
  const handleLogout = () => {
    history.push('/dangNhap');
    dispatch({ type: 'logout' });
  };
  useEffect(() => {
    if (isAuth) {
      const store = localStorage.getItem('tokenKhandemy');
      const { taiKhoan, accessToken } = JSON.parse(store);
      axios
        .post(
          LAY_THONG_TIN_CA_NHAN,
          { taiKhoan },
          {
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          }
        )
        .then((r) => {
          dispatch({ type: 'setUserData', payload: r.data });
        })
        .catch(() =>
          notification.error({
            message: 'Token hết hạn, vui lòng đăng nhập lại',
          })
        );
    } else {
      history.push('/dangNhap');
    }
  }, [isAuth]);
  return userData ? (
    <header id='admin__navbar'>
      <Button
        onClick={toggleCollapsed}
        icon={<MenuOutlined />}
        id='btn__toggle'>
        DASHBOARD
      </Button>
      <div className='dropdown'>
        <span className='mr-5'>Chào {userData.hoTen.split(' ').pop()}!</span>
        <span
          className='dropdown-toggle'
          type='button'
          id='dropdownMenuButton'
          data-toggle='dropdown'>
          <img src={Avatar} alt='Avatar' className='avatar' />
        </span>
        <div className='dropdown-menu'>
          <span className='dropdown-item' onClick={() => console.log('clcik')}>
            Cập nhật thông tin
          </span>
          <span className='dropdown-item' onClick={handleLogout}>
            Đăng xuất
          </span>
        </div>
      </div>
    </header>
  ) : null;
};

export default AdminNavbar;
