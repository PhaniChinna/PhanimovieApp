import {Switch, Route, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginPage'
import HomePage from './components/HomePage'
import PopularPage from './components/PopularPage'
import ProtectedSlide from './components/ProtectedPage'
import AccountPage from './components/AccountPage'
import SearchPage from './components/SearchPage'
import NotFound from './components/NotFoundPage'
import EmojiGame from './components/EmojiGamePage'
import MatchGame from './components/MatchGamePage'
import MovieSlider from './components/MovieDetailPage'

import './App.css'

const App = () => (
  <Switch>
    <Route path="/login" component={LoginRoute} />
    <ProtectedSlide exact path="/" component={HomePage} />
    <ProtectedSlide exact path="/popular" component={PopularPage} />
    <ProtectedSlide exact path="/account" component={AccountPage} />
    <ProtectedSlide exact path="/search" component={SearchPage} />
    <ProtectedSlide exact path="/movies/:id" component={MovieSlider} />
    <Route exact path="/Emoji-Game" component={EmojiGame} />
    <Route exact path="/Match-Game" component={MatchGame} />

    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
