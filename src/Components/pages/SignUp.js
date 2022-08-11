import React from "react";
import {Button, TextField, Link, Grid, Container, Typography} from "@material-ui/core";
import { signup } from "../../service/ApiService";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
    const data = new FormData(event.target);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const passwordcheck = data.get("passwordcheck");
    const nickName = data.get("nickName");
    signup({ email: email, name: name, password: password, passwordcheck:passwordcheck, nickName:nickName }).then(
      (response) => {
        // 계정 생성 성공 시 login페이지로 리디렉트
        window.location.href = "/login";
        alert('회원가입이 완료되었습니다.')
      }
    );
  }

  render() {
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                계정 생성
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="유저 이름"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="email"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="password"
                required
                fullWidth
                label="패스워드"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="passwordcheck"
                required
                fullWidth
                label="패스워드확인"
                type="password"
                id="passwordcheck"
                autoComplete="password"
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="nickName"
                required
                fullWidth
                label="닉네임"
                id="nickName"
                autoComplete="passwordcheck"
              />
              </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                계정 생성
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                이미 계정이 있습니까? 로그인 하세요.
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default SignUp;