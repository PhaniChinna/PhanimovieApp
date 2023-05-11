import './index.css'

const GeneresSlider = props => {
  const {Generes} = props
  const {id, name} = Generes
  return (
    <li>
      <p key={id} className="GeneresSlider-name">
        {name}
      </p>
    </li>
  )
}

export default GeneresSlider
