import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import CustomCard from './components/List.js'
import Add from './components/Add.js'
import Update from './components/Update.js'
import Search from './components/Search'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RecoilRoot } from 'recoil'
import firebase from './firebase.js'


class App extends React.Component {
  state = {
    drivers: [],
  }

  componentDidMount() {
    const messaging = firebase.messaging()
    if(Notification.permission === 'granted') {
      const notification = new Notification('Granted.')
      messaging.getToken({vapidKey: 'BB7vLC4_uuRgV74i-GqvZCb51eu1Wdwa_b4ewDhBLgKWboy9QG4HLYYeceDvzl81SS-IHcjj7xKYnsb9E8MVNl0'})
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

  listDrivers = () => {
    //fetch('api/drivers')
    let url = ''
    if(process.env.NODE_ENV === 'development'){
      url = process.env.REACT_APP_DEV_API_URL + 'api/drivers'
    } else {
      url = process.env.REACT_APP_PRD_API_URL + 'drivers'
    }
    fetch(url)
    .then(drivers => drivers.json())
    .then(r => {
        this.setState({drivers: r})
        this.toggleHidden('list')
    })
  }

  addDrivers = () => {
    this.toggleHidden('add')
  }

  updateDrivers = () => {
    this.toggleHidden('update')
  }

  searchDrivers = () => {
    this.toggleHidden('search')
  }

  toggleHidden = (type) => {
    let active = document.querySelector('.active')
    if(active !== null) {
      active.classList.add('hidden')
      active.classList.remove('active')
    }
    let el = document.getElementsByClassName(`${type}`)[0]
    el.classList.remove('hidden')
    el.classList.add('active')
  }

  render(){
    return (
      <RecoilRoot>
        <Container fluid className = 'App'>
        <Row >
          <Col className = 'row-header'>
            <h3>Hulladékkezelő admin</h3>
          </Col>
        </Row>
        <Row>
          <Col className = 'col-drivers-action-tab'>
            <p className = 'drivers-label'>DRIVERS admin</p>
            <Row>
              <Col className = 'drivers-admin-btns'>
                <Button variant = 'light' size = 'large' onClick = {this.listDrivers}>list</Button>
                <Button variant = 'light' size = 'large'  onClick = {this.searchDrivers}>search</Button>
                <Button variant = 'light' size = 'large' onClick = {this.addDrivers}>create</Button>
                <Button variant = 'light' size = 'large' onClick = {this.updateDrivers}>update</Button>
                <Button variant = 'light' size = 'large'>delete</Button>
                <Button variant = 'light' size = 'large'>list address</Button>
                <Button variant = 'light' size = 'large'>generate route</Button>
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col className = 'col-drivers-data-tab'>
              <CustomCard data = {this.state.drivers} />
              <Add />
              <Search />
              <Update />
          </Col>
        </Row>
      </Container>
      </RecoilRoot>
      
  )}
}

export default App;
