import React from "react";
import {AppBar, IconButton, Typography} from "@material-ui/core";
import app from "../style/App.module.scss";
import SettingsIcon from '@material-ui/icons/Settings';
import {makeStyles} from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import clsx from "clsx";

const useStyle = makeStyles(({
  title: {
    fontSize: "3em",
  },
  icon: {
    width: "1.5em",
    height: "1.5em"
  }
}))

type HeaderProps = {
  isLogin: boolean,
  isLoginPath: boolean,
  goToLoginPageHandler: () => void,
  goToMainPageHandler: () => void
}

const Header = (props: HeaderProps) => {
  const classes = useStyle();
  return (
    <AppBar>
      <div className={app.header}>
        <div></div>
        <div>
          <Typography variant="h1" className={classes.title} onClick={props.goToMainPageHandler} >
            Debate
          </Typography>
        </div>
        <div className={clsx(!props.isLogin && app.hidden)}>
          <IconButton>
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
      </div>
    </AppBar>
  )
}

export default Header;
