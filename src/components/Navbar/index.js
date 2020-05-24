import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { Logo } from '../../assets/img';
import { getCourseCategoryAPI } from '../Util';
import { Link, withRouter } from 'react-router-dom';
import DropDown from '../MenuDropDown';
import SearchBar from '../SearchBar';
import './index.scss'

const Navbar = (props) => {
  const [danhMucKhoaHoc, setDanhMucKhoaHoc] = useState([]);
  const { history } = props;
  const handleRegister = () => history.push('/dangKy');
  const handleLogin = () => history.push('/dangNhap');

  useEffect(() => {
    getCourseCategoryAPI()
      .then((rs) => setDanhMucKhoaHoc(rs.data))
      .catch((err) => notification.error({ message: err.message }));
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
        <div className='d-flex justify-content-between ml-auto'>
          <Link to='/dangNhap' className='mr-1'>
            <button className='btn btn-primary nav-item' onClick={handleLogin}>
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
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
