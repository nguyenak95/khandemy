import React, { useEffect, useState, useContext, useMemo } from 'react';
import { notification } from 'antd';
import { Logo } from '../../assets/img';
import { LAY_DANH_MUC_KHOA_HOC } from '../Util';
import { Link, withRouter } from 'react-router-dom';
import DropDown from '../MenuDropDown';
import SearchBar from '../SearchBar';
import './index.scss';
import { GlobalContext } from '../../global';
import axios from 'axios';

const Navbar = ({ history }) => {
  const [danhMucKhoaHoc, setDanhMucKhoaHoc] = useState([]);
  const { dispatch, isAuth } = useContext(GlobalContext);
  const callback = useMemo(() => ({
    handleRegister: () => history.push('/dangKy'),
    handleLogin: () => history.push('/dangNhap'),
    handleLogout: () => dispatch({ type: 'logout' })
  }), [history, dispatch]);
  const { handleRegister, handleLogin, handleLogout } = callback
  useEffect(() => {
    axios
      .get(LAY_DANH_MUC_KHOA_HOC)
      .then((rs) => setDanhMucKhoaHoc(rs.data))
      .catch((err) =>
        notification.error({ message: err.message, placement: 'bottomRight' })
      );
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
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <DropDown danhMucKhoaHoc={danhMucKhoaHoc} />
        <SearchBar />

        {isAuth ? (
          <Link to='/dangNhap' className='mt-1'>
            <button
              className='btn btn-secondary nav-item'
              onClick={handleLogout}>
              Đăng xuất
            </button>
          </Link>
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
