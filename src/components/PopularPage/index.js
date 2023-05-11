import {Component} from 'react'
import Cookies from 'js-cookie'
import ThreeCircles from 'react-loader-spinner'
import HeaderPage from '../HeaderPage'

import PopularWrap from '../PopularWrap'

import ContactUs from '../ContactPage'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PopularPage extends Component {
  state = {
    PopularPageList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const PopularMovies = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(PopularMovies, options)
    const data = await response.json()
    if (response.ok === true) {
      const PopularMoviesList = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        PopularPageList: PopularMoviesList,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderPopularWrap = () => {
    const {PopularPageList} = this.state
    return (
      <>
        <div>
          <ul className="List-un-Ordered">
            <PopularWrap PopularWrapList={PopularPageList} />
          </ul>
        </div>
      </>
    )
  }

  renderPopularLoaderView = () => (
    <div className="loader-container-Popular" testid="loader">
      <ThreeCircles
        height="100"
        width="100"
        color="Red"
        wrapperStyle={{}}
        wrapperClass=""
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  )

  renderPopularFailureView = () => (
    <div className="Failure-trending-Popular ">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="danger"
      />
      <p className="Para-Popular">Something went wrong, please try again</p>
      <button className="TryAgain-Popular" type="button">
        Try Again
      </button>
    </div>
  )

  renderPopularSuccessViewDetail = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderPopularWrap()
      case apiStatusConstant.failure:
        return this.renderPopularFailureView()
      case apiStatusConstant.inProgress:
        return this.renderPopularLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div>
          <HeaderPage />
        </div>
        <div className="Popular-render">
          {this.renderPopularSuccessViewDetail()}
        </div>
        <div className="Contact-us-page-Popular-page">
          <ContactUs />
        </div>
      </>
    )
  }
}

export default PopularPage
