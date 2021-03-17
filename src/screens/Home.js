import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {notificationsState, searchState, responseStatus} from '../atoms/Atoms.js'
import {useRecoilState} from 'recoil'
import Messages from './Messages.js'
import {toggleHidden} from '../utils/toggleHidden.js'
import {generateUrl, validateSQLResult} from '../utils/retrieving_data.js'
import Result from '../components/Result.js'
import WrappedMap from '../screens/Map.js'
import {GoogleMap, DirectionsRenderer, withScriptjs, withGoogleMap} from 'react-google-maps'
import {formatDriver} from '../utils/formatting.js'

function Home () {
    const [response, setResponse] = useRecoilState(responseStatus)
    const [search, setSearch] = useRecoilState(searchState)
    const [notifications, setNotifications] = useRecoilState(notificationsState)

    const showMessagesOpts = () => {
        toggleHidden('messagesStarter')
    }

    const generateRoute = async() => {
      let url = generateUrl('drivers')
      let response = await fetch(url)
      .then(response => response.json())
      .then(result => {
        const drivers = result.filter(driver => driver.status_id === 1)
        return drivers
      })
      let loggedInDrivers = []
      response.map(driver => loggedInDrivers.push(driver.uid))
      const routes = await getAllRoutes()
      let index = 0
      for(const route of routes) {
        updateRoutes(loggedInDrivers[index], route.route_id)
        index += 1
      }
    }

    const updateRoutes = (driver_id, route_id) => {
      let url = generateUrl('maps/routes/route_id/')
      url += `${route_id}`
      
      const data = {
        'driver_id': driver_id
      }
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
          setResponse(validateSQLResult(result))
      })
    }

    const getAllRoutes = async() => {
      let url = generateUrl('maps/routes')
      let response = await fetch(url)
      .then(response => response.json())
      .then(result => result)
      return response
    }

    const showLoggedInDrivers = async() => {
      let searchParam = {
        "status_id": 1
      }
      let url = generateUrl('drivers/search')
      
      await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchParam)
        })
        .then(response => response.json())
        .then(result => {
          const formatted_list = formatDriver(result)
          setSearch(formatted_list)
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
            <Messages />
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

