import React, {ChangeEvent, useState} from "react";
import {Switch, Route} from "react-router-dom";
import {Box, Button, OutlinedInput, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import app from "../../style/App.module.scss"

const useStyle = makeStyles({
  inputAndTitleSpace: {
     marginTop: "3em"
  },
  inputSpace: {
     marginTop: "2em"
  },
  button: {
    marginTop: "2em",
    width: "100%"
  }
})

type LoginProps = {
  signInProps: SignInProps,
  signUpProps: SignUpProps
}

const Login = (props: LoginProps) => {
  return (
    <Switch>
      <Route path="/login/sign-up">
        <SignUp {...props.signUpProps} />
      </Route>
      <Route path="/login/forget-password">
        <ForgetPassword />
      </Route>
      <Route exact path="/login">
        <SignIn {...props.signInProps} />
      </Route>
    </Switch>
  )
}

type SignUpProps = {
  registerAccountHandler: (userId: string, userPassword: string, userName: string) => void
}

const SignUp = (props: SignUpProps) => {
  const classes = useStyle();
  const [form, setForm] = useState({
    id: "",
    userName: "",
    password: ""
  })

  const changeFormHandler = (event: ChangeEvent<any>) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setForm({...form, [name]: value})
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" className={app.contentsBox}>
      <Typography variant="h3" >
        アカウント登録
      </Typography>
      <OutlinedInput name="id" required fullWidth
                     placeholder=" アカウントID" className={classes.inputAndTitleSpace} onChange={changeFormHandler}/>
      <OutlinedInput name="userName" required fullWidth
                     placeholder=" アカウント名" className={classes.inputAndTitleSpace} onChange={changeFormHandler}/>
      <OutlinedInput name="password" required
                     type="password" fullWidth placeholder=" パスワード" className={classes.inputSpace} onChange={changeFormHandler}/>
      <Button variant="contained" color="primary" className={classes.button} disableElevation
              onClick={() => props.registerAccountHandler(form.id, form.password, form.userName)} >アカウント登録</Button>
    </Box>
  )
}

type SignInProps = {
  loginHandler: (id: string, code: string) => void,
  goToSignUpHandler: () => void
}

const SignIn = (props: SignInProps) => {
  const classes = useStyle();
  const [form, setForm] = useState({
    id: "",
    password: ""
  })

  const changeFormHandler = (event: ChangeEvent<any>) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setForm({...form, [name]: value})
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" className={app.contentsBox}>
      <Typography variant="h3" >
        ログイン
      </Typography>
      <OutlinedInput
        name="id" required fullWidth placeholder=" アカウントID"
        className={classes.inputAndTitleSpace} onChange={changeFormHandler}/>
      <OutlinedInput name="password" required type="password"
                     fullWidth placeholder=" パスワード" className={classes.inputSpace} onChange={changeFormHandler}/>
      <Button variant="contained" color="primary"
              className={classes.button} disableElevation onClick={() => props.loginHandler(form.id, form.password)} >ログイン</Button>
      <Button variant="contained" color="primary"
              className={classes.button} disableElevation onClick={props.goToSignUpHandler} >アカウント登録</Button>
    </Box>
  )
}

const ForgetPassword = () => {
  return (
    <div>ForgetPassword</div>
  )
}

export default Login;
