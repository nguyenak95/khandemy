import React, { useEffect, useContext } from 'react';
import { notification, Tabs } from 'antd';
import { GlobalContext } from '../../global';
import axios from 'axios';

const { TabPane } = Tabs;
const ThongTinTaiKhoan = (props) => {
  const { isAuth } = useContext(GlobalContext);
  const { history } = props;
  useEffect(() => {
    if (!isAuth) {
      notification.error({
        message: 'Vui lòng đăng nhập để tiếp tục',
      });
      history.push('/dangNhap');
    } else {
      const localStore = JSON.parse(localStorage.getItem('tokenKhandemy'));
      axios
        .post(
          'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan',
          { taiKhoan: localStore.taiKhoan },
          {
            headers: { Authorization: `Bearer ` + localStore.token },
          }
        )
        .then((r) => console.log(r))
        .catch((e) => console.log(e));
    }
  }, []);
  return (
    <Tabs defaultActiveKey='1' className='pt-5'>
      <TabPane tab='Tab 1' key='1'>
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab='Tab 2' key='2'>
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab='Tab 3' key='3'>
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default ThongTinTaiKhoan;
