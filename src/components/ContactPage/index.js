import {Component} from 'react'
import {FcGoogle} from 'react-icons/fc'

import './index.css'

class ContactUs extends Component {
  render() {
    return (
      <>
        <div className="Lppp">
          <div className="Contact-us-container">
            <button type="button" className="Fc-Google">
              <FcGoogle className="Google" />
            </button>
            <button type="button" className="You-tube">
              <img
                src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1683627935/1384060_cekrjw.png"
                alt="youtube"
                className="You"
              />
            </button>
            <button type="button" className="Instagram">
              <img
                src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1683628121/1024px-Instagram_icon_ulw4gp.png"
                alt="insta"
                className="Insta"
              />
            </button>
            <button className="Twitter-im" type="button">
              <img
                src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1683631606/twitter_318-674515_qhsbry.avif"
                alt="Twitter"
                className="Twitter"
              />
            </button>
          </div>
          <div className="Contact-us-Para">
            <p className="Contact-us-Paragraphs">Contact Us</p>
          </div>
        </div>
      </>
    )
  }
}
export default ContactUs
