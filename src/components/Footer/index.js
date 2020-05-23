import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, GooglePlay, AppleStore } from '../../assets/img';
import './index.scss';
const Footer = () => {
  return (
    <>
    <footer className='container-fluid'>
      <div className='row d-flex justify-content-around linearColor text-white'>
        <div className='col-md-6 col-lg-3 center__vertical'>
          <div>
            <div className=''>
              <Link to='/'>
                <img src={Logo} alt='site logo' className='footer__logo' />
              </Link>
            </div>
            <ul>
              <li>
                <i className='fa fa-map-marker' aria-hidden='true' />
                <span style={{ color: 'white' }}>19-25 Nguyễn Huệ, Q1</span>
              </li>
              <li>
                <i className='fa fa-phone' aria-hidden='true' />
                <Link to='tel:0904886095'>0945008068</Link>
              </li>
              <li>
                <i className='fa fa-envelope' aria-hidden='true' />
                <span style={{ color: 'white' }}>cskh@khandemy.vn </span>
              </li>
              <li>
                <i className='fa fa-clock' aria-hidden='true' />
                <span style={{ color: 'white' }}>24/24</span>
              </li>
            </ul>
            <div className='mb-2'>
              <p>Kết nối với Khandemy</p>
              <button className='btn btn-primary'>
                <a
                  href='https://www.youtube.com/channel/UCrQoGDajCBs91atwgV8H6gw'
                  rel='nofollow'>
                  <i className='fab fa-facebook-f'></i>
                  Facebook
                </a>
              </button>
              <button className='btn btn-danger ml-2'>
                <a
                  href='https://www.youtube.com/channel/UCrQoGDajCBs91atwgV8H6gw'
                  rel='nofollow'>
                  <i className='fab fa-google'></i>
                  Google
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className='col-md-6 col-lg-3 center__vertical'>
          <section>
            <h4>Về Khandemy</h4>
            <ul className='p-0'>
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
          </section>
        </div>
        <div className='col-md-6 col-lg-3 center__vertical'>
          <span>
            <h4>Hợp tác liên kết</h4>
            <ul className='p-0'>
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
          </span>
        </div>
        <div className='col-md-6 col-lg-3 center__vertical'>
          <section>
            <h4>Tải app Khandemy</h4>
            <ul className='p-0'>
              <li>
                <Link to='/404'>
                  <img
                    alt='Khandemy on App Store'
                    id='appstore'
                    src={AppleStore}
                  />
                </Link>
              </li>
              <li>
                <Link
                  to='/404'
                  href='https://play.google.com/store/apps/details?id=com.inet.Learning'
                  rel='nofollow'>
                  <img
                    alt='Khandemy on Google Play'
                    id='google'
                    src={GooglePlay}
                  />
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </footer>
      <div id='copyright' className='bg-dark container-fluid text-white'>
        Copyright © 2020 Khandemy, Inc.
      </div>
    </>
  );
};

export default Footer;
