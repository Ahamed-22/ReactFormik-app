import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Divider, Menu, Switch } from "antd";
import BookDetailsPage from "./pages/BookDetailsPage/BookDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage/AuthorDetailsPage";

// Side Menu
const items = [
  {
    key: "1",
    icon: <MailOutlined />,
    label: (
      <Link style={{ textDecoration : "none" }} to='/' rel="noopener noreferrer">
        BookDetails
      </Link>
    ),
  },
  {
    key: "2",
    icon: <CalendarOutlined />,
    label: (
      <Link style={{ textDecoration : "none" }} to='/AuthorDetailsPage' rel="noopener noreferrer">
        AuthorDetailsPage
      </Link>
    ),
  },
];
// Side Menu

function App() {

  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ height: "100vh" }}>
          <div className="col-md-3">
            <div className="fs-4 text-center my-4">Library UAE</div>
            <br />
            <br />
            <Menu
              // style={{
              //   width: 300,
              // }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              items={items}
            />
          </div>
          <div className="col-md-9">
            <Routes>
              <Route path="/" Component={BookDetailsPage} />
              <Route path="/AuthorDetailsPage" Component={AuthorDetailsPage} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
