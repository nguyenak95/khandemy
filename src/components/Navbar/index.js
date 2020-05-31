import React, { useEffect, useState, useContext, useMemo } from 'react';
import { notification, Modal } from 'antd';
import { Logo, Avatar } from '../../assets/img';
import { LAY_DANH_MUC_KHOA_HOC, LAY_THONG_TIN_CA_NHAN } from '../Util';
import { Link, withRouter } from 'react-router-dom';
import DropDown from '../MenuDropDown';
import SearchBar from '../SearchBar';
import './index.scss';
import { GlobalContext } from '../../global';
import axios from 'axios';

const Navbar = ({ history }) => {
  const [danhMucKhoaHoc, setDanhMucKhoaHoc] = useState([]);
  const { dispatch, isAuth, userData } = useContext(GlobalContext);
  const callback = useMemo(
    () => ({
      handleRegister: () => history.push('/dangKy'),
      handleLogin: () => history.push('/dangNhap'),
      handleLogout: () => dispatch({ type: 'logout' }),
    }),
    [history, dispatch]
  );
  const { handleRegister, handleLogin, handleLogout } = callback;
  useEffect(() => {
    const store = localStorage.getItem('tokenKhandemy');
    const { taiKhoan, accessToken } = JSON.parse(store || '{}');
    Promise.all([
      axios
        .get(LAY_DANH_MUC_KHOA_HOC)
        .then((rs) => setDanhMucKhoaHoc(rs.data))
        .catch((err) =>
          notification.error({ message: err.message, placement: 'bottomRight' })
        ),
      isAuth && !userData
        ? axios
            .post(
              LAY_THONG_TIN_CA_NHAN,
              { taiKhoan },
              {
                headers: {
                  Authorization: 'Bearer ' + accessToken,
                },
              }
            )
            .then(({ data }) =>
              dispatch({ type: 'setUserData', payload: data })
            )
            .catch(
              () =>
                notification.error({
                  message: 'Token hết hạn, vui lòng đăng nhập lại',
                }) ||
                Modal.confirm({
                  maskClosable: true,
                  title: 'Xác nhận',
                  content: 'Bạn có muốn chuyển về trang đăng nhập ?',
                  okText: 'Đến trang đăng nhập',
                  cancelText: 'Hủy',
                })
            )
        : null,
    ]);
  }, []);
  return (
    <nav className='navbar navbar-expand-lg' id='navbar'>
      <Link className='nav-brand' to='/'>
        <img src={Logo} alt='Khandemy' height={40} />
      </Link>

      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'>
        <i className='fa fa-bars' />
      </button>
      <div
        className='collapse justify-content-between navbar-collapse'
        id='navbarSupportedContent'>
        <DropDown danhMucKhoaHoc={danhMucKhoaHoc} />
        <SearchBar />

        {isAuth ? (
          <div className='dropdown'>
            <span className='mr-1'>
              Chào {userData && userData.hoTen.split(' ').pop()}!
            </span>
            <span
              className='dropdown-toggle'
              type='button'
              id='dropdownMenuButton'
              data-toggle='dropdown'>
              <img src={Avatar} alt='Avatar' className='avatar' />
            </span>
            <div className='dropdown-menu'>
              <span
                className='dropdown-item'
                onClick={() => history.push('/thongTinTaiKhoan')}>
                Cập nhật thông tin
              </span>
              <span className='dropdown-item' onClick={handleLogout}>
                Đăng xuất
              </span>
            </div>
          </div>
        ) : (
          <div className='mt-1'>
            <Link to='/dangNhap' className='mr-1'>
              <button
                className='btn btn-primary nav-item'
                onClick={handleLogin}>
                Đăng nhập
              </button>
            </Link>
            <Link to='/dangKy'>
              <button
                className='btn btn-danger nav-item'
                onClick={handleRegister}>
                Đăng ký
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
