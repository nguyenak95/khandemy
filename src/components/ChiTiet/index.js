import React, { useEffect, useState, useContext } from 'react';
import {
  LAY_THONG_TIN_KHOA_HOC,
  DANG_KY_KHOA_HOC,
  LAY_THONG_TIN_CA_NHAN,
  generateRandomStar,
  errorBar,
  successBar,
} from '../Util';
import { Skeleton, notification, Modal } from 'antd';
import './index.scss';
import { loremIpsum } from 'lorem-ipsum';
import axios from 'axios';
import { GlobalContext } from '../../global';

const ChiTiet = ({ history, match: { params } }) => {
  const [data, setData] = useState();
  const { dispatch, isAuth, userData, reqOptions } = useContext(GlobalContext);
  const numberStar = generateRandomStar();
  const layThongTinCaNhan = () => {
    const { taiKhoan } = JSON.parse(
      localStorage.getItem('tokenKhandemy') || '{}'
    );

    axios
      .post(LAY_THONG_TIN_CA_NHAN, { taiKhoan }, reqOptions)
      .then(({ data }) => {
        dispatch({ type: 'setUserData', payload: data });
      })
      .catch(
        () =>
          notification.error({
            message: 'Token hết hạn, vui lòng đăng nhập lại',
          }) || dispatch({ type: 'logout' })
      );
  };
  const registerCourse = () => {
    if (!isAuth) {
      Modal.confirm({
        maskClosable: true,
        title: 'Xác nhận',
        content:
          'Vui lòng đăng nhập để ghi danh khóa học. Bạn có muốn chuyển về trang đăng nhập ?',
        okText: 'Đến trang đăng nhập',
        cancelText: 'Hủy',
        onOk: () => history.push('/dangNhap'),
      });
    } else {
      axios
        .post(
          DANG_KY_KHOA_HOC,
          {
            taiKhoan: userData.taiKhoan,
            maKhoaHoc: params.maKhoaHoc,
          },
          reqOptions
        )
        .then(({ data }) => successBar(data) || layThongTinCaNhan())
        .catch(({ response }) => errorBar(response.data));
    }
  };
  useEffect(() => {
    if (params.maKhoaHoc) {
      axios
        .get(`${LAY_THONG_TIN_KHOA_HOC}${params.maKhoaHoc}`)
        .then((r) => setData(r.data))
        .catch(
          (err) =>
            notification.error({
              message: err.message,
              placement: 'bottomRight',
            }) || history.push('/404')
        );
    } else {
      history.push('/404');
    }
  }, []);
  return data ? (
    <div id='course__page'>
      <div id='course__image'>
        <div>
          <img src={data.hinhAnh} alt='hinh anh khoa hoc' />
          <div id='overlay'></div>
        </div>
        <div id='course__rating'>
          <h6>{data.tenKhoaHoc.toUpperCase()}</h6>
          <p>
            Đánh giá khóa học:{' '}
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <i
                  key={i}
                  className={`fa fa-star ${
                    numberStar - i > 0 ? 'yellow' : ''
                  }`}></i>
              ))}
          </p>
          <button className='btn btn-outline-light' onClick={registerCourse}>
            Đăng ký
          </button>
        </div>
      </div>
      <div id='course__info' className='container pt-5 pb-5'>
        <h3>Giới thiệu khóa học</h3>
        <p>{data.moTa}</p>
        <p>{loremIpsum({ count: 10 })}</p>
        <p>{loremIpsum({ count: 7 })}</p>
        <p>{loremIpsum({ count: 5 })}</p>
        <p>{loremIpsum({ count: 3 })}</p>
        <p>{loremIpsum({ count: 5 })}</p>
      </div>
    </div>
  ) : (
    <Skeleton />
  );
};

export default ChiTiet;
