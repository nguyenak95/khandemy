import React from 'react';
import { PageHeader, Input } from 'antd';
const EditCourse = () => {
  return (
    <>
      <PageHeader
        title='Khóa học của tôi'
        // className='site-page-header'
        // subTitle='This is a subtitle'
        // tags={<Input.Search />}
        extra={[<Input.Search />]}
      />
    </>
  );
};

export default EditCourse;
