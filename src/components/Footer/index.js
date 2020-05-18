import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, GooglePlay, AppleStore } from '../../assets/img';
const Footer = () => {
  return (
    <div className='container-fluid'>
      <div className='row d-flex justify-content-around linearColor text-white'>
        <div className='col-md-6 col-lg-3'>
          <Link to='/'>
            <img src={Logo} alt='site logo' width='100%' />
          </Link>
          <ul>
            <li>
              <i className='fa fa-map-marker' aria-hidden='true' />
              <span style={{ color: 'white' }}>
                19-25 Nguyễn Huệ, Q1, TP HCM
              </span>
            </li>
            <li>
              <i className='fa fa-phone' aria-hidden='true' />
              <Link to='tel:0904886095'>0945008068</Link>
            </li>
            <li>
              <i className='fa fa-envelope-o' aria-hidden='true' />
              <span style={{ color: 'white' }}>cskh@khandemy.vn </span>
            </li>
            <li>
              <i className='fa fa-clock-o' aria-hidden='true' />
              <span style={{ color: 'white' }}>24/24</span>
            </li>
          </ul>
        </div>
        <div className='col-md-6 col-lg-3'>
          <h4>Về Khandemy</h4>
          <ul>
            <li>
              <Link to='/gioiThieu'>Giới thiệu về Khandemy</Link>
            </li>
            <li>
              <Link to='/faq'>Câu hỏi thường gặp</Link>
            </li>
            <li>
              <Link to='/dieuKhoanDichVu'>Điều khoản dịch vụ</Link>
            </li>
            <li>
              <Link to='/huongDanThanhToan'>Hướng dẫn thanh toán</Link>
            </li>
          </ul>
        </div>
        <div className='col-md-6 col-lg-3'>
          <h4>Hợp tác liên kết</h4>
          <ul>
            <li>
              <Link to='/teacher'>Đăng ký giảng viên</Link>
            </li>
            <li>
              <Link to='/daily'>Đăng ký đại lý</Link>
            </li>
            <li>
              <Link to='/doanhNghiep' target='_blank'>
                Đào tạo doanh nghiệp
              </Link>
            </li>
            <li>
              <Link to='/tuyenDung' target='_blank' rel='nofollow'>
                Tuyển dụng nhân tài
              </Link>
            </li>
            <li>
              <Link to='/affiliate'>Affiliate</Link>
            </li>
          </ul>
        </div>
        <div className='col-md-6 col-lg-3'>
          <span className='app-connect'>
            <h4>Tải app Khandemy</h4>
            <ul>
              <li>
                <Link to='/404'>
                  <img alt='Khandemy on App Store' src={AppleStore} />
                </Link>
              </li>
              <li>
                <Link
                  to='/404'
                  href='https://play.google.com/store/apps/details?id=com.inet.Learning'
                  rel='nofollow'>
                  <img alt='Khandemy on Google Play' src={GooglePlay} />
                </Link>
              </li>
            </ul>
          </span>
          <span className='social-connect'>
            <p>Kết nối với Khandemy</p>
            <ul>
              <li>
                <Link
                  href='https://www.facebook.com/Khandemy.vn'
                  rel='nofollow'
                  data-bg-color='#3B5998'
                  style={{ background: 'rgb(59, 89, 152) !important' }}>
                  <i className='fa fa-facebook' />
                </Link>
              </li>
              <li>
                <Link
                  href='https://www.youtube.com/channel/UCrQoGDajCBs91atwgV8H6gw'
                  rel='nofollow'
                  data-bg-color='#C22E2A'
                  style={{ background: 'rgb(194, 46, 42) !important' }}>
                  <i className='fa fa-youtube' />
                </Link>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
