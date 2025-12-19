import { Button, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = ({ open, setOpen }) => {


  /*

  TODO HERE ADD LINK TO TEAM SOMEWHERE AND MAKE TEAM CALENDAR OR SOMETHIGN


  */


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const user = {
    name: localStorage.getItem("name"),
    email:localStorage.getItem("email")
  };


  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.clear();

    window.location.href = "/auth";
  };

  const handleSettings=()=>{
    window.location.href = "/user";
  }


  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: 250,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",  
          gap: 1.5,           
        }}
      >
        <AccountBoxIcon color="primary" sx={{ fontSize: 50 }} />
        <List disablePadding sx={{ width: "100%" }}>
          <ListItem sx={{ justifyContent: "center", textAlign: "center" }}>
            <ListItemText
              primary={user.name}
              sx={{ textAlign: "center", fontWeight: "bold" }}
            />
          </ListItem>

          <ListItem sx={{ justifyContent: "center", textAlign: "center" }}>
            <ListItemText
              primary={user.email}
              sx={{ textAlign: "center", color: "text.secondary", fontSize: "0.9rem" }}
            />
          </ListItem>

          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button onClick={handleSettings}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AccountBoxIcon />}
            >
              Profile
            </Button>
          </ListItem>

          <ListItem disablePadding sx={{ mt: 1 }}>
            <Button onClick={handleLogOut}
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
