import {Component} from 'react'

import HeaderPage from '../HeaderPage'

import TrendingMovies from '../TrendingMovies'

import TopRatedMovies from '../TopRatedMovies'

import OriginalMovies from '../OriginalMovies'

import ContactUs from '../ContactPage'

import './index.css'

class HomePage extends Component {
  render() {
    return (
      <>
        <div>
          <HeaderPage />
        </div>
        <div className="Home-page-list">
          <TrendingMovies />
        </div>
        <div className="Home-page-list-card">
          <TopRatedMovies />
        </div>
        <div className="Home-page-list-card">
          <OriginalMovies />
        </div>
        <div className="Contact-us-page-Home-page">
          <ContactUs />
        </div>
      </>
    )
  }
}

export default HomePage
