import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import EmailIcon from "@mui/icons-material/Email";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import { Menu, MenuItem, Stack } from "@mui/material";
import axios from "axios";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  //  const handleDrawerOpen = () => {
  //    setOpen(true);
  // };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (route) => {
    // Handle the click on the notification menu item
    navigate(route);
    handleClose();
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };
  const token = localStorage.getItem("token");

  const handleSignout = async () => {
    try {
      // Retrieve authorization token from local storage
      

      // Make a request to the signout API endpoint with the authorization header
      const response = await axios.post(
        "https://gocarsmithbackend.onrender.com/api/admin/signout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {

        localStorage.clear();
       navigate("/")
     
      } else {
        // Failed to sign out
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Close the profile menu after signing out
    handleProfileMenuClose();
  };

  const SidebarTab = ({ icon, primary, route }) => {
    const isActive = window.location.pathname === route;

    return (
      <ListItem
        disablePadding
        sx={{
          display: "block",
          backgroundColor: isActive ? "#d3d3d3" : "inherit",
        }}
        onClick={() => {
          navigate(route);
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            "&:hover": {
              backgroundColor: "#d3d3d3",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={primary}
            sx={{
              opacity: open ? 1 : 0,
              color: isActive ? "#000000" : "inherit",
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/*Navbar*/}

      <AppBar position="fixed" sx={{ backgroundColor: "#ffffff" }}>
        <Toolbar sx={{ justifyContent: "space-between", color: "#FF5733" }}>
          <div sx={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
                edge="start"
                sx={{ color: "#FF5733" }}
              >
                <MenuIcon/>
              </IconButton>
              <h3> Admin</h3>
            </div>
          </div>
          <Stack direction="row" spacing={2}>
            <IconButton sx={{ marginRight: "15px" }}>
              <EmailIcon
                sx={{ color: "#FF5733" }}
                onClick={() => navigate("/Admin/EmailNotifications")}
              />
            </IconButton>
            <IconButton sx={{ marginRight: "15px" }} onClick={handleClick}>
              <NotificationsIcon sx={{ color: "#FF5733" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => handleNotificationClick("/Admin/Orders")}>
                Orders
              </MenuItem>
              <MenuItem onClick={() => handleNotificationClick("/Admin/Requests")}>
                Requests
              </MenuItem>
              {/* Add more menu items if needed */}
            </Menu>
            <IconButton
              sx={{ marginRight: "15px" }}
              onClick={handleProfileMenuOpen}
            >
              <AccountCircleIcon sx={{ color: "#FF5733" }} />
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchorEl}
              open={Boolean(profileMenuAnchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleSignout}>Logout</MenuItem>
              
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      {/*Navbar ends*/}
      {/*Sidebar Starts*/}

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Dashboard */}
          <SidebarTab
            icon={<SpaceDashboardRoundedIcon />}
            primary="Dashboard"
            route="/Admin/Home"
          />

          {/* Brands */}
          <SidebarTab
            icon={<FormatBoldRoundedIcon />}
            primary="Brands"
            route="/Admin/Brands"
          />

          {/* Service Centers */}
          <SidebarTab
            icon={<StorefrontRoundedIcon />}
            primary="Service Centers"
            route="/Admin/ServiceLocations"
          />

          {/* Inventory */}
          <SidebarTab
            icon={<ConstructionRoundedIcon />}
            primary="Inventory"
            route="/Admin/Inventery"
          />

          {/* Customers */}
          <SidebarTab
            icon={<GroupRoundedIcon />}
            primary="Customers"
            route="/Admin/Customers"
          />

          {/* Appointments */}
          <SidebarTab
            icon={<EditCalendarRoundedIcon />}
            primary="Appointments"
            route="/Admin/Appointments"
          />
           <SidebarTab
            icon={<EditCalendarRoundedIcon />}
            primary="Onsite Appointments"
            route="/Admin/OnsiteAppointments"
          />

          {/* Coupons */}
          <SidebarTab
            icon={<LocalOfferRoundedIcon />}
            primary="Coupons"
            route="/Admin/Coupons"
          />

          {/* Reminder */}
          <SidebarTab
            icon={<InsertInvitationRoundedIcon />}
            primary="Reminder"
            route="/Admin/Reminder"
          />

          {/* Invoice List */}
          <SidebarTab
            icon={<ReceiptLongRoundedIcon />}
            primary="Invoice"
            route="/Admin/Invoice"
          />

          {/* Blog List */}
          <SidebarTab
            icon={<NewspaperRoundedIcon />}
            primary="Blog"
            route="/Admin/blog"
          />
          <SidebarTab
            icon={<FaFileInvoiceDollar />}
            primary="TrashBin"
            route="/Admin/TrashBin"
          />
        </List>
      </Drawer>
    </Box>
  );
}
