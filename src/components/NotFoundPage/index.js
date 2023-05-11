import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div>
        <img
          src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679996181/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_rghzpr.png"
          alt="notFound"
          className="Not-FOund-page"
        />
        <div className="Not-found-container">
          <h1 className="Not-found-lost-heading">Lost Your Way ?</h1>
          <p className="Not-found-Para">
            We are sorry the page you requested could not be found please go
            back to home page
          </p>
          <Link to="/">
            <button className="Not-found-button" type="button">
              Go to Home
            </button>
          </Link>
        </div>
        <div className="Play-Game">
          <Link to="/Emoji-Game">
            <button className="Button-play-game" type="button">
              Play Emoji Game
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default NotFound
