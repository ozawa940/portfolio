import React, {useState} from "react";
import {AppBar, IconButton, ListItem, ListItemText, Menu, MenuItem, Typography} from "@material-ui/core";
import app from "../style/App.module.scss";
import SettingsIcon from '@material-ui/icons/Settings';
import {makeStyles} from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import clsx from "clsx";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyle = makeStyles(({
  title: {
    fontSize: "3em",
  },
  icon: {
    width: "1.5em",
    height: "1.5em"
  },
  menu: {
    display: "flex",
    flexDirection: "column"
  }
}))


type HeaderProps = {
  isLogin: boolean,
  isLoginPath: boolean,
  goToLoginPageHandler: () => void,
  goToMainPageHandler: () => void,
  logoutHandler: () => void,
  showAccountHandler: () => void
}

const Header = (props: HeaderProps) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <AppBar>
      <div className={app.header}>
        <div></div>
        <div>
          <Typography variant="h1" className={classes.title} onClick={props.goToMainPageHandler} >
            Portfolio
          </Typography>
        </div>
        <div className={clsx(!props.isLogin && app.hidden)}>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <SettingsIcon className={classes.icon} />
          </IconButton>
        </div>
        <div className={clsx((props.isLogin || props.isLoginPath) && app.hidden)} >
          <IconButton onClick={props.goToLoginPageHandler}>
            <AccountCircleIcon className={classes.icon} />
          </IconButton>
        </div>
        <div className={clsx((props.isLogin || !props.isLoginPath) && app.hidden)} >
          <IconButton onClick={props.goToMainPageHandler}>
            <ArrowBackIcon className={classes.icon} />
          </IconButton>
        </div>
        <Menu open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
        >
          <MenuItem>
            <ListItem onClick={props.showAccountHandler}>
              <HomeIcon />
              <ListItemText primary="アカウント情報" />
            </ListItem>
          </MenuItem>
          <MenuItem>
            <ListItem onClick={props.logoutHandler}>
              <ExitToAppIcon />
              <ListItemText primary="ログアウト" />
            </ListItem>
          </MenuItem>
        </Menu>
      </div>
    </AppBar>
  )
}

export default Header;
