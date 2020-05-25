import React, { useEffect, useContext, useState } from 'react';
import { notification, Tabs } from 'antd';
import { GlobalContext } from '../../global';
import axios from 'axios';
import './index.scss'

const { TabPane } = Tabs;
const ThongTinTaiKhoan = (props) => {
  const { isAuth } = useContext(GlobalContext);
  const [user, setUser] = useState(null)
  const { history } = props;
  useEffect(() => {
    if (!isAuth) {
      notification.error({
        message: 'Vui lòng đăng nhập để tiếp tục',
        placement: 'bottomRight'
      });
      history.push('/dangNhap');
    } else {
      const localStore = JSON.parse(localStorage.getItem('tokenKhandemy'));
      axios
        .post(
          'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan',
          { taiKhoan: localStore.taiKhoan },
          {
            headers: { Authorization: `Bearer ` + localStore.accessToken },
          }
        )
        .then((r) => setUser(r.data))
        .catch((e) => notification.error({
          message: e.message,
          placement: 'bottomRight'
        }));
    }
  }, []);
  return user ? (
    <div id='user__profile'>
    <Tabs defaultActiveKey='1' size='large' className='user__tab'>
      <TabPane tab='Thoong' key='1'>
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab='Tab 2' key='2'>
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
    </div>
  ) : null
};

export default ThongTinTaiKhoan;
