import axios from 'axios';
import { notification } from 'antd';


export const LAY_DANH_MUC_KHOA_HOC =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc';
export const LAY_KHOA_HOC_THEO_DANH_MUC =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc';
export const LAY_8_KHOA_MOI =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP08';
export const LAY_KHOA_HOC_PHAN_TRANG =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?MaNhom=GP08&pageSize=8&';
export const LAY_THONG_TIN_KHOA_HOC =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=';
export const DANG_NHAP =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap';
export const DANG_KY =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy';

export const generateRandomStar = () => Math.ceil(Math.random() * 5);
export const callLoginAPI = (input) =>
  axios
    .post(DANG_NHAP, input)
    .then(({ data }) => {
      const token = {
        taiKhoan: data.taiKhoan,
        token: data.accessToken,
      };
      localStorage.setItem('tokenKhandemy', JSON.stringify(token));
    })
    .catch((err) =>
      notification.error({
        message: err.message,
      })
    );
export const callRegisterAPI = (input) =>
  axios
    .post(DANG_KY, input)
    .then(({ data }) => {
      const token = {
        taiKhoan: data.taiKhoan,
        token: data.accessToken,
      };
      localStorage.setItem('tokenKhandemy', JSON.stringify(token));
    })
    .catch((err) =>
      notification.error({
        message: err.message,
      })
    );
export const getCourseCategoryAPI = () => axios.get(LAY_DANH_MUC_KHOA_HOC);


export const rules = {
  username: [
    {
      required: true,
      message: 'Vui lòng nhập tên tài khoản',
    },
    {
      pattern: /^\S*$/,
      message: 'Không được có dấu cách đầu dòng',
    },
  ],
  password: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu',
    },
    {
      min: 8,
      message: 'Mật khẩu phải có từ 8 kí tự trở lên',
    },
  ],
};
