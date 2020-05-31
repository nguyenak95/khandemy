import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { Img01, Img02, Img03, Img04 } from '../assets/img';
import { LAY_8_KHOA_MOI, errorBar } from '../components/Util';
import CourseList from '../components/CourseList';
import axios from 'axios';

const TrangChu = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios(LAY_8_KHOA_MOI)
      .then(({ data }) => setItems(data.slice(0,8)))
      .catch(({ response }) => errorBar(response.data));
  }, []);

  return (
    <>
      <section style={{ paddingTop: '60px' }}>
        <Carousel autoplay dotPosition='left'>
          <img src={Img01} alt='Carousel1' className='carousel__img' />
          <img src={Img02} alt='Carousel2' className='carousel__img' />
          <img src={Img03} alt='Carousel3' className='carousel__img' />
          <img src={Img04} alt='Carousel4' className='carousel__img' />
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
