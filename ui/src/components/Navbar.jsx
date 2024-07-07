import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import CellTowerIcon from "@mui/icons-material/CellTower";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import FlexBetween from "../components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../features/theme/index";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { logout , reset} from "../features/auth/authSlice";

export default function Navbar({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const menuRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAnchorEl(null); // Close the menu if click occurs outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu on button click
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
    handleClose(); // Close the menu after logout
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* left side */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderradius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search...." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* right side */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <NotificationsActiveIcon sx={{ fontSize: "25px" }} />
          </IconButton>

          <Box
            ref={menuRef}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textTransform: "none",
              gap: "1rem",
            }}
          >
            <CellTowerIcon />
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.85rem"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user.name}
              </Typography>
              <Typography
                fontSize="0.75rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                {user.role}
              </Typography>
            </Box>
            <IconButton onClick={handleClick}>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem>{user.name}</MenuItem>
              <MenuItem>{user.role}</MenuItem>
              <MenuItem>{user.email}</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </Box>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
