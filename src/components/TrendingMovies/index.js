import {Component} from 'react'
import ThreeCircles from 'react-loader-spinner'
import Cookies from 'js-cookie'

import TrendingSlidesCarousel from '../TrendingMovieCarousel'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingMovies extends Component {
  state = {
    TrendingMoviesList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const TrendingUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(TrendingUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const Trending = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        title: each.title,
      }))
      this.setState({
        TrendingMoviesList: Trending,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderTrendingMoviesCarousel = () => {
    const {TrendingMoviesList} = this.state
    return (
      <>
        <div>
          <ul>
            <TrendingSlidesCarousel
              TrendingSlideMovie={TrendingMoviesList}
              key={TrendingMoviesList.id}
            />
          </ul>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
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

  renderFailureView = () => (
    <div className="Failure-trending">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="danger"
      />
      <p className="Para">Something went wrong, please try again</p>
      <button className="TryAgain" type="button">
        Try Again
      </button>
    </div>
  )

  renderTrendingSuccessView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderTrendingMoviesCarousel()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderTrendingSuccessView()}</div>
  }
}

export default TrendingMovies
