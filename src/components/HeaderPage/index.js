import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'

import {AiFillHome, AiFillStar} from 'react-icons/ai'
import {IoIosThumbsUp} from 'react-icons/io'
import {BsSearch} from 'react-icons/bs'
import {VscAccount} from 'react-icons/vsc'
import {CgMenuGridR} from 'react-icons/cg'

import './index.css'

class HeaderPage extends Component {
  state = {
    Home: false,
    popular: false,
    searchRs: false,
    Account: false,
    BgMenu: false,
  }

  onClickHomeListItem = () => {
    this.setState(prev => ({
      Home: !prev.Home,
    }))
  }

  onClickPopularListItem = () => {
    this.setState(Prev => ({
      popular: !Prev.popular,
    }))
  }

  onClickSearchListItem = () => {
    this.setState(Prev => ({
      searchRs: !Prev.searchRs,
    }))
  }

  onClickAccountListItem = () => {
    this.setState(Prev => ({
      Account: !Prev.Account,
    }))
  }

  onClickBurgMenu = () => {
    this.setState(Prev => ({
      BgMenu: !Prev.BgMenu,
    }))
  }

  onChangeLinkButton = () => (
    <div>
      <AiFillHome />
    </div>
  )

  render() {
    const {Home, popular, searchRs, Account, BgMenu} = this.state
    const HomeHeading = Home ? <AiFillHome className="Home-Heading" /> : 'Home'
    const PopularHeading = popular ? (
      <div className="Popular-head">
        <IoIosThumbsUp className="Bs-fill" />
        <AiFillStar className="As-star" />
      </div>
    ) : (
      'Popular'
    )

    const SearchResult = searchRs ? <BsSearch className="BsSearch" /> : 'Search'
    const AccountRoute = Account ? (
      <VscAccount className="Home-VscAccount" />
    ) : (
      'Account'
    )
    return (
      <div className="Header-page-container">
        <img
          src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679652587/Group_7399_2_x2dqea.png"
          alt="website logo"
          className="Website-logo-image-header"
        />
        <div className="Div-Header-top-container">
          <ul className="Heading-unOrder-list">
            <li
              className="Home-list-heading"
              onClick={this.onClickHomeListItem}
            >
              <Link
                className="Home-Heading-list"
                to="/"
                onClick={this.onChangeLinkButton}
              >
                {HomeHeading}
              </Link>
            </li>
            <li
              className="Home-list-popular"
              onClick={this.onClickPopularListItem}
            >
              <Link className="Popular-Link" to="/popular">
                {PopularHeading}
              </Link>
            </li>

            <li
              className="Home-list-search"
              onClick={this.onClickSearchListItem}
            >
              <Link className="search-Link" to="/search">
                {SearchResult}
              </Link>
            </li>
            <li
              className="Home-list-Account"
              onClick={this.onClickAccountListItem}
            >
              <Link className="Account-Route" to="/account">
                {AccountRoute}
              </Link>
            </li>
          </ul>
        </div>
        <div className="Mobile-heading">
          <CgMenuGridR className="CgMenuGr" onClick={this.onClickBurgMenu} />
          {BgMenu && (
            <div className="Loppp">
              <ul className="un-ordered-list">
                <li className="Home-list-items">
                  <Link to="/">
                    <AiFillHome className="Home-Heading" />
                  </Link>
                </li>
                <li className="Header-popular">
                  <Link to="/popular">
                    <div className="Popular-head">
                      <IoIosThumbsUp className="Bs-fill" />
                      <AiFillStar className="As-star" />
                    </div>
                  </Link>
                </li>
                <li className="Header-search">
                  <Link className="search-Link" to="/search">
                    <BsSearch className="BsSearch" />
                  </Link>
                </li>
                <li className="Header-Account">
                  <Link className="Account-Route" to="/account">
                    <VscAccount className="Home-VscAccount" />
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(HeaderPage)
