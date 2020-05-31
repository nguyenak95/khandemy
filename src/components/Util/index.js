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
export const LAY_THONG_TIN_CA_NHAN =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan';
export const CAP_NHAT_THONG_TIN =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung';
export const HUY_DANG_KY_KHOA_HOC =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh';
export const DANG_KY_KHOA_HOC =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/DangKyKhoaHoc';
export const TIM_KIEM_NGUOI_DUNG =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP08';
export const XOA_NGUOI_DUNG =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=';
export const POST_THEM_NGUOI_DUNG =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung';
export const PUT_SUA_NGUOI_DUNG =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung';

export const POST_KHOA_HOC_CHUA_GHI_DANH =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh';
export const POST_KHOA_HOC_DA_GHI_DANH =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet';
export const POST_KHOA_HOC_CHO_XET_DUYET =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet';
export const POST_ADMIN_GHI_DANH_KHOA_HOC =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/GhiDanhKhoaHoc';
export const POST_HUY_DANG_KY =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh';

export const generateRandomStar = () => Math.ceil(Math.random() * 5);

export const successBar = (mess) =>
  notification.success({
    message: mess,
    placement: 'bottomRight',
  });
export const errorBar = (mess) =>
  notification.error({
    message: mess,
    placement: 'bottomRight',
  });
export const rules = {
  required: [
    {
      required: true,
      message: 'Không được để trống trường',
    },
  ],
};
