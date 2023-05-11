import './index.css'

const SpokenLanguageSlide = props => {
  const {SpokenLanguage} = props
  const {id, englishName} = SpokenLanguage
  return (
    <li>
      <p key={id} className="Spoken-language-slider-container-english">
        {englishName}
      </p>
    </li>
  )
}

export default SpokenLanguageSlide
