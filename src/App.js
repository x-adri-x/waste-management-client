import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RecoilRoot } from 'recoil'
import firebase from './firebase.js'
import {BrowserRouter, Route} from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Home from './screens/Home.js'
import Drivers from './screens/Drivers.js'


class App extends React.Component {

  componentDidMount() {
    const messaging = firebase.messaging()
    if(Notification.permission === 'granted') {
      const notification = new Notification('Granted.')
      messaging.getToken({vapidKey: process.env.REACT_APP_MESSAGING_VAPID_KEY})
      .then(function(token){
        console.log('Token: ' + token)
      })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function(permission){
        if(permission === 'granted') {
          const notification = new Notification('It is granted now.')
        }
      })
    }
    messaging.onMessage(function(payload){
      console.log('onMessage: ' + payload)
    })
  }

  render(){
    return (
      <BrowserRouter>
        <RecoilRoot>
        <Container fluid className = 'App'>
        <Row >
          <Col className = 'row-header'>
            <h3>Waste Management Administration</h3>
          </Col>
        </Row>
        <Row>
          <Navbar />
          <Route path = '/home' component = {Home} />
          <Route path = '/drivers' component = {Drivers} />
        </Row>
      </Container>
      </RecoilRoot>
      </BrowserRouter>
      
      
  )}
}

export default App;
