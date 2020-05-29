import React from 'react';
import CourseWide from '../CourseWide';
import { Skeleton } from 'antd';
import { generateRandomStar } from '../Util';

const CourseWideList = (props) => {
  const { items } = props;
  return items[0] ? (
    <div className='container pb-5'>
      {items.map((item, idx) => (
        <div className='row'>
          <CourseWide data={item} key={idx} numberStar={generateRandomStar()} />
        </div>
      ))}
    </div>
  ) : (
    <Skeleton />
  );
};

export default CourseWideList;
