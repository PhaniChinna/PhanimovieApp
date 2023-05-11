import {Component} from 'react'
import ThreeCircles from 'react-loader-spinner'
import Cookies from 'js-cookie'

import TopRatedSlidesCarousel from '../TopRatedMoviesCaroules'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TopRatedMovies extends Component {
  state = {
    TopRatedMoviesList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const TopRatedUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(TopRatedUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const TopRated = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        title: each.title,
      }))
      this.setState({
        TopRatedMoviesList: TopRated,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderTopRatedMoviesCarousel = () => {
    const {TopRatedMoviesList} = this.state
    return (
      <>
        <div>
          <ul>
            <TopRatedSlidesCarousel
              TopRatedSlideMovie={TopRatedMoviesList}
              key={TopRatedMoviesList.id}
            />
          </ul>
        </div>
      </>
    )
  }

  renderTopRatedLoaderView = () => (
    <div className="loader-container-TopRated" testid="loader">
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

  renderTopRatedFailureView = () => (
    <div className="Failure-trending-TopRated">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="danger"
      />
      <p className="Para-TopRated">Something went wrong, please try again</p>
      <button className="TryAgain-TopRated" type="button">
        Try Again
      </button>
    </div>
  )

  renderTopRatedSuccessView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderTopRatedMoviesCarousel()
      case apiStatusConstant.inProgress:
        return this.renderTopRatedLoaderView()
      case apiStatusConstant.failure:
        return this.renderTopRatedFailureView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderTopRatedSuccessView()}</div>
  }
}

export default TopRatedMovies
