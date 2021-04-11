import React from 'react'
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import Home from '../screens/Home'
import Drivers from '../screens/Drivers'
import Catalog from '../screens/Catalog'
import Login from '../screens/Login'
import ProtectedRoute from '../components/ProtectedRoute.js'
import {RecoilRoot} from 'recoil'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Navbar () {

    return(
        <RecoilRoot>
          <Router>
            <Container fluid className = 'App'>
                <Row >
                <Col className = 'row-header'>
                  <h3>Waste Management Administration</h3>
                </Col>
                </Row>
            <div>
              <nav className = 'navigation'>
                <ul>
                    <Link to = '/home'>Home</Link>
                    <Link to = '/drivers'>Drivers</Link>
                    <Link to = '/catalog'>Catalog</Link>
                </ul>
              </nav>
              <Switch>
                <Route exact path = '/'><Login/></Route>
                <ProtectedRoute path = '/home'>
                    <Home />
                </ProtectedRoute>
                <ProtectedRoute path = '/drivers'>
                    <Drivers />
                </ProtectedRoute>
                <ProtectedRoute path = '/catalog'>
                    <Catalog />
                </ProtectedRoute>
              </Switch>
            </div>
            </Container>
          </Router>
      </RecoilRoot>
    )
}

export default Navbar
