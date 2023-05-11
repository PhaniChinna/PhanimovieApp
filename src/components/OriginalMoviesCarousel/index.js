import {Component} from 'react'
import {Link} from 'react-router-dom'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {FcLike, FcDislike} from 'react-icons/fc'

import './index.css'

class OriginalSlidesCarousel extends Component {
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
    const {OriginalSlideMovie} = this.props
    const {Like} = this.state
    return (
      <>
        <h1 className="Heading-list-Original">Original :</h1>
        <Slider {...settings} className="Original-Carousel-width">
          {OriginalSlideMovie.map(each => (
            <li key={each.id}>
              <Link to={`/movies/${each.id}`}>
                <img
                  src={each.backdropPath}
                  alt={each.title}
                  key="title"
                  className="Original-slider-carousel"
                />
              </Link>

              {Like ? ' ' : <p className="Original-slide-Para">{each.title}</p>}
              {Like ? (
                <FcDislike
                  className="AiHeart-Original"
                  onClick={this.onClickFcLike}
                />
              ) : (
                <FcLike
                  className="AiHeart-Original"
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

export default OriginalSlidesCarousel
