import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {notificationsState, searchState} from '../atoms/Atoms.js'
import {useRecoilState} from 'recoil'
import {Centers} from '../components/Centers.js'
import MessagesStarterScreen from './MessagesStarterScreen.js'
import {toggleHidden} from '../utils/toggleHidden.js'
import Result from '../components/Result.js'
import WrappedMap from '../screens/Map.js'
import {GoogleMap, DirectionsRenderer, withScriptjs, withGoogleMap} from 'react-google-maps'

function Home () {
    const [search, setSearch] = useRecoilState(searchState)
    const [notifications, setNotifications] = useRecoilState(notificationsState)
    let centers = Centers

    const showMessagesOpts = () => {
        toggleHidden('messagesStarter')
    }

    const countDistanceFromCenterPoints = () => {
      let street1 = centers[0].street.replaceAll(' ', '+')
      let street2 = centers[1].street.replaceAll(' ', '+')
      
      let data = [
        {
        'number': centers[0].number,
        'street': street1,
        'city': centers[0].city
        },
        {
        'number': centers[1].number,
        'street': street2,
        'city': centers[1].city
        }
      ]
    
      let url = ''
        if(process.env.NODE_ENV === 'development'){
          url = process.env.REACT_APP_DEV_API_URL + 'api/maps/distance/destination/11+Östra+Rännevallen+Vadstena'
        } else {
          url = process.env.REACT_APP_PRD_API_URL + 'maps/distance/destination/11+Östra+Rännevallen+Vadstena'
        }
        fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(r => console.log(r)) 
    }

    const generateRoute = async() => {
      let url = ''
      if(process.env.NODE_ENV === 'development'){
        url = process.env.REACT_APP_DEV_API_URL + 'api/drivers'
      } else {
        url = process.env.REACT_APP_PRD_API_URL + 'drivers'
      }
      let response = await fetch(url)
      .then(response => response.json())
      .then(result => {
        const drivers = result.filter(driver => driver.status_id === 1)
        return drivers
      })
      let loggedInDrivers = []
      response.map(driver => loggedInDrivers.push(driver.uid))
      console.log(loggedInDrivers)
      
      const routes = await getAllRoutes()
      let index = 0
      for(const route of routes) {
        updateRoutes(loggedInDrivers[index], route.route_id)
        index += 1
      }
      //console.log(routes.length)
      //routes.map(route => console.log(JSON.parse(route.waypoints)))
    }

    const updateRoutes = (driver_id, route_id) => {
      let url = ''
      if(process.env.NODE_ENV === 'development'){
        url = process.env.REACT_APP_DEV_API_URL + `api/maps/routes/route_id/${route_id}`
      } else {
        url = process.env.REACT_APP_PRD_API_URL + `maps/routesroute_id/${route_id}`
      }
      const data = {
        'driver_id': driver_id
      }
      
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.affectedRows === 1){
          console.log(`The number of affected rows were ${result.affectedRows}`)
        } else {
          console.log(result.sqlMessage)
        }
      })
    }

    const getAllRoutes = async() => {
      let url = ''
      if(process.env.NODE_ENV === 'development'){
        url = process.env.REACT_APP_DEV_API_URL + 'api/maps/routes'
      } else {
        url = process.env.REACT_APP_PRD_API_URL + 'maps/routes'
      }
      let response = await fetch(url)
      .then(response => response.json())
      .then(result => result)
      return response
    }

    const showLoggedInDrivers = async() => {
      let searchParam = {
        "status_id": 1
      }
      let url = ''
        if(process.env.NODE_ENV === 'development'){
          url = process.env.REACT_APP_DEV_API_URL + 'api/drivers/search'
        } else {
          url = process.env.REACT_APP_PRD_API_URL + 'drivers/search'
        }

      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchParam)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setSearch(result)
        })
    }
    
    return(
        <Container fluid className = 'App'>
        <Row>
          <Col className = 'col-drivers-action-tab'>
            <Row>
              <Col className = 'drivers-admin-btns'>
                <Button variant = 'light' size = 'large' onClick = {showMessagesOpts}>messages</Button>
                <Button variant = 'light' size = 'large' onClick = {showLoggedInDrivers}>available drivers</Button>
                <Button variant = 'light' size = 'large' onClick = {generateRoute}>generate route</Button>
                <Button variant = 'light' size = 'large' >bins live status update</Button>
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col className = 'col-drivers-data-tab'>
            <MessagesStarterScreen />
          {/* <WrappedMap 
                googleMapURL = {'https://maps.googleapis.com/maps/api/js?key=AIzaSyCZYDNkfWnxSqUeOuLfTeIRD6u1BNHI9n0&v=3.exp&libraries=geometry,drawing,places'}
                loadingElement =  {<div style={{ height: `100%` }} />}
                containerElement = {<div style={{ width: `400px`, height: '400px'}} />}
                mapElement = {<div style={{ height: `100%` }} />}
                /> */}
          </Col>
        </Row>
      </Container>
    )
} 

export default Home

