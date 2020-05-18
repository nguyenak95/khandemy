import React, { useEffect, useState, useCallback } from "react";
import { Menu } from "antd";
import { Logo } from "../../assets/img";
import { MenuOutlined } from "@ant-design/icons";
import { LAY_DANH_MUC_KHOA_HOC } from "../../common";
import { Link, withRouter } from "react-router-dom";

const Header = (props) => {
  const [danhMucKhoaHoc, setDanhMucKhoaHoc] = useState([]);
  const handleToHome = useCallback(() => {
    props.history.push("/");
  }, []);
  useEffect(() => {
    fetch(LAY_DANH_MUC_KHOA_HOC)
      .then((r) => r.json())
      .then((data) => setDanhMucKhoaHoc(data));
  }, []);
  return (
    <Menu className="header__menu" mode="horizontal">
      <Menu.Item>
        <img src={Logo} onClick={handleToHome} alt="Khandemy" height={45} />
      </Menu.Item>
      <Menu.SubMenu icon={<MenuOutlined />} title="Danh mục khóa học">
        {danhMucKhoaHoc.map(({ maDanhMuc, tenDanhMuc }) => (
          <Menu.Item key={maDanhMuc}>
            <Link to={`/DanhMucKhoaHoc?maDanhMuc=${maDanhMuc}&maNhom=GP08`}>
              {tenDanhMuc}
            </Link>
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    </Menu>
  );
};

export default withRouter(Header);
