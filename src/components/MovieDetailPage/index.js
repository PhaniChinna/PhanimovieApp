import {Component} from 'react'
import ThreeCircles from 'react-loader-spinner'
import Cookies from 'js-cookie'

import HeaderPage from '../HeaderPage'

import GeneresSlider from '../GenresPage'

import SpokenLanguageSlide from '../SpokenEnglishPage'

import SimilarMovies from '../SimilarPage'

import ContactUs from '../ContactPage'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieSlider extends Component {
  state = {
    MovieDetailsList: {},
    GenresDetails: [],
    SpokenLanguage: [],
    SimilarDetails: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getMovieDetailsRoute()
  }

  getMovieDetail = data => ({
    adult: data.adult,
    backdropPath: data.backdrop_path,
    budget: data.budget,
    id: data.id,
    overview: data.overview,
    releaseDate: data.release_date,
    runtime: data.runtime,
    title: data.title,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  getSimilarMoviesData = data => ({
    posterPath: data.poster_path,
  })

  getMovieDetailsRoute = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const MovieApiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(MovieApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const MovieDetailsUpdatedResult = this.getMovieDetail(data.movie_details)
      const GenresDetailsList = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      const SpokenLanguageDetails = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          englishName: each.english_name,
        }),
      )
      const SimilarDetailsList = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      console.log(SimilarDetailsList)
      this.setState({
        MovieDetailsList: MovieDetailsUpdatedResult,
        GenresDetails: GenresDetailsList,
        SpokenLanguage: SpokenLanguageDetails,
        SimilarDetails: SimilarDetailsList,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderLoaderViewDetail = () => (
    <div className="Render-loader-movie-details" login website logo>
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

  renderFailureViewDetail = () => (
    <div className="Render-failure-view-details">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="failure view"
      />
      <p className="Render-failure-Something-wrong">
        Something went wrong. Please try again
      </p>
      <button className="render-try-again-button" type="button">
        Try Again
      </button>
    </div>
  )

  renderMovieDetailsListView = () => {
    const {
      MovieDetailsList,
      GenresDetails,
      SpokenLanguage,
      SimilarDetails,
    } = this.state
    const {
      adult,
      id,
      backdropPath,
      budget,
      overview,
      releaseDate,
      runtime,
      title,
      voteAverage,
      voteCount,
    } = MovieDetailsList
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const date = new Date(releaseDate)
    const releaseDateView = date.getFullYear()

    return (
      <>
        <div className="Lip">
          <img
            src={backdropPath}
            alt={title}
            key={id}
            className="Movie-details-Image-list"
          />
          <div className="Movies-item-detail-h-p-hr-container">
            <p className="Movie-detail-title-name">{title}</p>
            <div className="Movie-details-hrs-adult-date-container">
              <p className="Movie-detail-hours-minutes">{`${hours}h ${minutes}m`}</p>
              <p className="Movie-a-u-a">{adult ? 'A' : 'U / A'}</p>
              <p className="Movie-release-data-view">{releaseDateView}</p>
            </div>
            <div className="Movie-details-OverView">
              <p className="Movie-details-paragraph-overview">{overview}</p>
            </div>
            <button className="Movie-details-button-play" type="button">
              Play
            </button>
          </div>
          <div className="Movie-detail-budget-avg-count-container">
            <h1 className="Movie-details-Genres">Genres</h1>
            <div className="Movie-details-cont">
              <ul className="Movie-detail-unOrdered-list">
                {GenresDetails.map(each => (
                  <GeneresSlider key={each.id} Generes={each} />
                ))}
              </ul>
              <div className="Movies-mobile-container-spoken">
                <ul className="Movies-un-ordered-list-spoken">
                  <h1 className="Movies-spoken-languages">Audio Available</h1>
                  {SpokenLanguage.map(each => (
                    <SpokenLanguageSlide key={each.id} SpokenLanguage={each} />
                  ))}
                </ul>
              </div>
              <div>
                <div className="Movies-card-rating-container">
                  <h1 className="Movies-Rating-count">Rating Count</h1>
                  <p className="Movies-Rating-Vote-count">{voteCount}</p>
                  <h1 className="Movies-Rating-Average">Rating Average</h1>
                  <p className="Movies-Voting-Average">{voteAverage}</p>
                </div>
              </div>
              <div className="Movies-budget-container">
                <h1 className="Movies-budget-budget-list">Budget</h1>
                <p className="Movies-Budget-release-budget">{budget}</p>
                <h1 className="Movies-Budget-Release-data">Release Data</h1>
                <p className="Movies-release-data">{releaseDate}</p>
              </div>
            </div>
            <h1 className="Movies-like-Heading-route">Movies Likes</h1>
            <ul className="Similar-movies-un-ordered-list">
              <SimilarMovies SimilarMoviesList={SimilarDetails} />
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderTotalSuccessViewPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderMovieDetailsListView()
      case apiStatusConstant.failure:
        return this.renderFailureViewDetail()
      case apiStatusConstant.inProgress:
        return this.renderLoaderViewDetail()
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
        <div>{this.renderTotalSuccessViewPage()}</div>
        <div className="Render-Movie-Detail">
          <ContactUs />
        </div>
      </>
    )
  }
}

export default MovieSlider
