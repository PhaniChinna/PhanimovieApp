import {Link} from 'react-router-dom'

import './index.css'

const PopularWrap = props => {
  const {PopularWrapList} = props
  return (
    <ul className="Popular-wrap-list">
      {PopularWrapList.map(each => (
        <li key={each.id}>
          <Link to={`/movies/${each.id}`}>
            <img
              src={each.posterPath}
              alt={each.title}
              className="Popular-Wrap"
            />
          </Link>
          <p className="Popular-Wrap-title">{each.title}</p>
        </li>
      ))}
    </ul>
  )
}

export default PopularWrap
