import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom"; // For navigation
import {
  Home,
  BarChart,
  PieChart,
  Timeline,
  CalendarToday,
  Description,
  Settings,
  People,
  ExitToApp,
  Medication,
  Search,
  VerifiedUser,
  Dashboard,
} from "@mui/icons-material"; // Icons
import { ListOrderedIcon } from "lucide-react";

const Side = () => {
  return (
    <Sidebar
      rootStyles={{
        height: "100vh",
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
          VitalFlow Admin Panel
        </h2>
        <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
          Welcome, Admin!
        </p>
      </div>

      {/* Sidebar Menu */}
      <Menu
        menuItemStyles={{
          button: {
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          },
        }}
      >
        {/* Home */}
        <MenuItem icon={<Home />} component={<Link to="/" />}>
          Home
        </MenuItem>
        <MenuItem icon={<Dashboard />} component={<Link to="/" />}>
          Dashboard
        </MenuItem>

        {/* Charts Submenu */}
        <SubMenu label="Charts" icon={<BarChart />}>
          <MenuItem icon={<PieChart />} component={<Link to="/pie-chart" />}>
            Pie Chart
          </MenuItem>
          <MenuItem icon={<Timeline />} component={<Link to="/line-chart" />}>
            Line Chart
          </MenuItem>
        </SubMenu>

        {/* add items */}
        <MenuItem icon={<Medication />} component={<Link to="/additems" />}>
          Add Items
        </MenuItem>

        {/* search items */}
        <MenuItem icon={<Search />} component={<Link to="/searchitems" />}>
          Search Items
        </MenuItem>
        <MenuItem icon={<VerifiedUser />} component={<Link to="/allusers" />}>
          Users
        </MenuItem>
        <MenuItem icon={<ListOrderedIcon />} component={<Link to="/allorder" />}>
          Orders
        </MenuItem>

        {/* Divider */}
        <div
          style={{
            margin: "16px 0",
            borderBottom: "1px solid #e0e0e0",
          }}
        />

        {/* Settings */}
        <MenuItem icon={<Settings />} component={<Link to="/settings" />}>
          Settings
        </MenuItem>

        {/* Users */}
        <MenuItem icon={<People />} component={<Link to="/users" />}>
          Users
        </MenuItem>

        {/* Logout */}
        <MenuItem
          icon={<ExitToApp />}
          component={<Link to="/logout" />}
          style={{ color: "#ff4444" }}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* Sidebar Footer */}
      <div
        style={{
          padding: "16px",
          textAlign: "center",
          borderTop: "1px solid #e0e0e0",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <p style={{ margin: 0, color: "#666", fontSize: "0.8rem" }}>
          © 2024 VitalFlow Admin Panel
        </p>
      </div>
    </Sidebar>
  );
};

export default Side;