import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

import HeaderPage from '../HeaderPage'

import ContactUs from '../ContactPage'

import './index.css'

const UsernameList = localStorage.getItem('username')
const PasswordList = localStorage.getItem('password')
const ListUsername = UsernameList
const PasswordLength = '*'.repeat(PasswordList)
console.log(PasswordLength)

class AccountPage extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <>
        <div>
          <HeaderPage />
        </div>
        <div>
          <h1 className="List-Account-page">Account</h1>
          <hr className="Line-through" />
        </div>
        <div className="Lop">
          <h1 className="Member-ship-Heading">Member ship</h1>
          <div className="Member-start">
            <h1 className="Username-heading">{ListUsername}@gmail.com</h1>
            <p className="Password-heading">password:**********</p>
          </div>
        </div>
        <hr className="Line-through" />
        <div className="List-row-details">
          <h1 className="Plan-Details">Plain Details</h1>
          <div className="Plain-details">
            <h1 className="Premium-Heading">Premium</h1>
            <div>
              <p className="Ultra-Hd">Ultra HD</p>
            </div>
          </div>
        </div>
        <hr className="Line-through" />
        <div className="Button-container">
          <button
            className="Button-card-button"
            type="button"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </div>
        <div className="Contact-us-page">
          <ContactUs />
        </div>
      </>
    )
  }
}
export default withRouter(AccountPage)
