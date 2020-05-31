import React, { useEffect, useState, useCallback } from 'react';
import { Carousel, notification } from 'antd';
import { Img01, Img02, Img03, Img04 } from '../../assets/img';
import { LAY_KHOA_HOC_PHAN_TRANG } from '../Util';
import CourseList from '../CourseList';

const TrangChu = () => {
  const [data, setData] = useState({
    items: [],
  });
  const { items } = data;

  const handleChangePage = useCallback(
    (page = 1) => {
      data.page !== page &&
        fetch(`${LAY_KHOA_HOC_PHAN_TRANG}page=${page}`)
          .then((r) =>
            r.json().then((data) =>
              setData({
                items: data.items,
                page,
                totalCount: data.totalCount,
              })
            )
          )
          .catch((err) => notification.error({
            message: err,
            placement: "bottomRight"
          }));
    },
    [data.page]
  );

  useEffect(() => {
    handleChangePage();
  }, []);

  return (
    <>
      <section style={{ paddingTop: '60px'}}>
        <Carousel autoplay dotPosition='left'>
          <img src={Img01} alt='Carousel1' className='carousel__img'/>
          <img src={Img02} alt='Carousel2' className='carousel__img'/>
          <img src={Img03} alt='Carousel3' className='carousel__img'/>
          <img src={Img04} alt='Carousel4' className='carousel__img'/>
        </Carousel>
      </section>
      <h1 className='text-center mt-5 font__dancing' id='header__newest'>
        Các khóa học mới nhất
      </h1>
      <CourseList items={items} />
    </>
  );
};

export default React.memo(TrangChu);
