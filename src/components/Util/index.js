const LAY_DANH_MUC_KHOA_HOC =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc';
const LAY_KHOA_HOC_THEO_DANH_MUC =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc';
const LAY_8_KHOA_MOI =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP08';
const LAY_KHOA_HOC_PHAN_TRANG =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?MaNhom=GP08&pageSize=8&';
const LAY_THONG_TIN_KHOA_HOC =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=';
const DANG_NHAP =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap';
const DANG_KY =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy';
const LAY_THONG_TIN_CA_NHAN =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan';
const CAP_NHAT_THONG_TIN =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung';
const HUY_DANG_KY_KHOA_HOC =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh';
const TIM_KIEM_NGUOI_DUNG =
  'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP08';

const generateRandomStar = () => Math.ceil(Math.random() * 5);

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
export {
  LAY_DANH_MUC_KHOA_HOC,
  LAY_KHOA_HOC_THEO_DANH_MUC,
  LAY_8_KHOA_MOI,
  LAY_KHOA_HOC_PHAN_TRANG,
  LAY_THONG_TIN_KHOA_HOC,
  DANG_NHAP,
  DANG_KY,
  LAY_THONG_TIN_CA_NHAN,
  CAP_NHAT_THONG_TIN,
  HUY_DANG_KY_KHOA_HOC,
  TIM_KIEM_NGUOI_DUNG,
  generateRandomStar,
};
