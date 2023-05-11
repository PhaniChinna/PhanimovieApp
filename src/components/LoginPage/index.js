import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillDoorOpenFill, BsFillDoorClosedFill} from 'react-icons/bs'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    ShowErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderLoginButton = () => (
    <div className="Render-button">
      <button className="button-Route" type="submit">
        Login
      </button>
    </div>
  )

  renderLoginButtonRoute = () => (
    <div className="Render-button">
      <button className="button-Route-list" type="submit">
        Login
      </button>
    </div>
  )

  onSubmitSuccessData = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailureData = errorMsg => {
    this.setState({
      ShowErrorMsg: true,
      errorMsg,
    })
  }

  onSubmitSuccess = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const UserDetails = {username, password}
    const LoginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }
    const response = await fetch(LoginApi, options)
    const data = await response.json()
    const Storage = localStorage.setItem('username', username)
    const Storage1 = localStorage.setItem('password', password)
    console.log(Storage)
    console.log(Storage1)
    if (response.ok === true) {
      this.onSubmitSuccessData(data.jwt_token)
    } else {
      this.onSubmitFailureData(data.error_msg)
    }
  }

  render() {
    const {username, password, ShowErrorMsg, errorMsg} = this.state
    const List = username
    const Final = List.slice(0, 1)
    const Result = Final
    const Pass = password
    const FinalResult = Pass.slice(0, 1)
    const PasswordLength2 = password.length >= 4
    if (PasswordLength2) {
      this.renderLoginButton()
    } else {
      this.renderLoginButtonRoute()
    }
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="Login-page-container">
          <div>
            <img
              src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679652587/Group_7399_2_x2dqea.png"
              alt="login website logo"
              className="Website-logo"
            />
          </div>
          <div className="Match-card">
            <Link to="/Match-Game">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                alt="Logo"
                className="MatchGaME"
              />
            </Link>
          </div>
          <div className="Lo">
            <form className="Form-container" onSubmit={this.onSubmitSuccess}>
              <h1 className="Login-heading">Login</h1>
              <label className="Label-Username" htmlFor="username">
                USERNAME
              </label>
              <input
                value={username}
                className="Input-username"
                id="username"
                type="text"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
              <div className="Login-className-container">
                <h1 className="Container-Result">{Result}</h1>
              </div>

              <label className="Label-password" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="Input-password"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
              <div className="Final-Result-container">
                {FinalResult ? (
                  <BsFillDoorClosedFill className="Door-close" />
                ) : (
                  <BsFillDoorOpenFill className="Door-Open" />
                )}
              </div>
              <div>
                {ShowErrorMsg && <p className="ShowError_msg">*{errorMsg}</p>}
              </div>
              {password
                ? this.renderLoginButtonRoute()
                : this.renderLoginButton()}
            </form>
          </div>
          <div className="Container-list-match-game">
            <Link to="/Match-Game">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                alt="Logo-match"
                className="Logo-image-game"
              />
            </Link>
          </div>
        </div>
      </>
    )
  }
}
export default LoginRoute
