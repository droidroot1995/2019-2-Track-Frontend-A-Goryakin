import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import D3Graph from './D3Graph'
import logo from './logo.svg'
import styles from '../styles/App.module.css'

function App() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }

  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  return (
    <Switch>
      <Route
        path="/stats"
        render={() => (
          <D3Graph
            filename="covid19.csv"
            filterField="Region_ID"
            filterValue={50}
            width={windowWidth}
            height={windowHeight}
          />
        )}
      />
      <Route
        path="/stats_msk"
        render={() => (
          <D3Graph
            filename="covid19.csv"
            filterField="Region_ID"
            filterValue={77}
            width={windowWidth}
            height={windowHeight}
          />
        )}
      />
      <Route path="/">
        <div className={`${styles['App']}`}>
          <header className={`${styles['App-header']}`}>
            <img src={logo} className={`${styles['App-logo']}`} alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a className={`${styles['App-link']}`} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
            <br />
            <Link to="/stats" className={`${styles['App-link']}`}>
              COVID-19 Statistics in Moscow Region
            </Link>
            <br />
            <Link to="/stats_msk" className={`${styles['App-link']}`}>
              COVID-19 Statistics in Moscow
            </Link>
          </header>
        </div>
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default App
