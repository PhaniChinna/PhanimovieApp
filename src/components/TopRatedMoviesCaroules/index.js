import {Component} from 'react'
import {Link} from 'react-router-dom'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {FcLike, FcDislike} from 'react-icons/fc'

import './index.css'

class TopRatedSlidesCarousel extends Component {
  state = {
    Like: false,
  }

  onClickFcLike = () => {
    this.setState(Prev => ({
      Like: !Prev.Like,
    }))
  }

  render() {
    const settings = {
      infinite: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
      autoplay: true,
      autoplaySpeed: 2000,
    }
    const {TopRatedSlideMovie} = this.props
    const {Like} = this.state
    return (
      <>
        <h1 className="Heading-list-TopRated">TopRated :</h1>
        <Slider {...settings} className="TopRated-Carousel-width">
          {TopRatedSlideMovie.map(each => (
            <li key={each.id}>
              <Link to={`/movies/${each.id}`}>
                <img
                  src={each.backdropPath}
                  alt={each.title}
                  key="title"
                  className="TopRated-slider-carousel"
                />
              </Link>

              {Like ? ' ' : <p className="TopRated-slide-Para">{each.title}</p>}
              {Like ? (
                <FcDislike
                  className="AiHeart-TopRated"
                  onClick={this.onClickFcLike}
                />
              ) : (
                <FcLike
                  className="AiHeart-TopRated"
                  onClick={this.onClickFcLike}
                />
              )}
            </li>
          ))}
        </Slider>
      </>
    )
  }
}

export default TopRatedSlidesCarousel
