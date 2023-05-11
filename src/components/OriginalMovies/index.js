import {Component} from 'react'
import ThreeCircles from 'react-loader-spinner'
import Cookies from 'js-cookie'

import OriginalSlidesCarousel from '../OriginalMoviesCarousel'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class OriginalMovies extends Component {
  state = {
    OriginalMoviesList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getOriginalMovies()
  }

  getOriginalMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const OriginalUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(OriginalUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const Original = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        title: each.title,
      }))
      this.setState({
        OriginalMoviesList: Original,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderOriginalMoviesCarousel = () => {
    const {OriginalMoviesList} = this.state
    return (
      <>
        <div>
          <ul>
            <OriginalSlidesCarousel
              OriginalSlideMovie={OriginalMoviesList}
              key={OriginalMoviesList.id}
            />
          </ul>
        </div>
      </>
    )
  }

  renderOriginalLoaderView = () => (
    <div className="loader-container-Original" testid="loader">
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

  renderOriginalFailureView = () => (
    <div className="Failure-trending-Original ">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="danger"
      />
      <p className="Para-Original">Something went wrong, please try again</p>
      <button className="TryAgain-Original" type="button">
        Try Again
      </button>
    </div>
  )

  renderOriginalSuccessView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderOriginalMoviesCarousel()
      case apiStatusConstant.inProgress:
        return this.renderOriginalLoaderView()
      case apiStatusConstant.failure:
        return this.renderOriginalFailureView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderOriginalSuccessView()}</div>
  }
}

export default OriginalMovies
