import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {FcLike, FcDislike} from 'react-icons/fc'

import './index.css'

class TrendingSlidesCarousel extends Component {
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
    const {TrendingSlideMovie} = this.props
    const {Like} = this.state
    return (
      <>
        <h1 className="Heading-list">Trending :</h1>
        <Slider {...settings} className="Trending-Carousel-width">
          {TrendingSlideMovie.map(each => (
            <li key={each.id}>
              <Link to={`/movies/${each.id}`}>
                <img
                  src={each.backdropPath}
                  alt={each.title}
                  key="title"
                  className="Trending-slider-carousel"
                />
              </Link>
              {Like ? ' ' : <p className="Trending-slide-Para">{each.title}</p>}
              {Like ? (
                <FcDislike className="AiHeart" onClick={this.onClickFcLike} />
              ) : (
                <FcLike className="AiHeart" onClick={this.onClickFcLike} />
              )}
            </li>
          ))}
        </Slider>
      </>
    )
  }
}

export default TrendingSlidesCarousel
