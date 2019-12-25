import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import CityList from './CityList'
import CityWeather from './CityWeather'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    return (
      <Switch>
        <Route path="/info">
          <CityWeather />
        </Route>
        <Route path="/list">
          <CityList />
        </Route>
        <Redirect to="/list" />
      </Switch>
    )
  }
}

export default App
