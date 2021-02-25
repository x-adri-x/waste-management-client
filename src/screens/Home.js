import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {notificationsState} from '../atoms/Atoms.js'
import {useRecoilState} from 'recoil'
import {Centers} from '../components/Centers.js'
import WrappedMap from '../screens/Map.js'
import {GoogleMap, DirectionsRenderer, withScriptjs, withGoogleMap} from 'react-google-maps'

function Home () {

    const [notifications, setNotifications] = useRecoilState(notificationsState)
    let centers = Centers

    const openMessages = () => {
        let url = ''
        if(process.env.NODE_ENV === 'development'){
          url = process.env.REACT_APP_DEV_API_URL + 'api/notifications'
        } else {
          url = process.env.REACT_APP_PRD_API_URL + 'notifications'
        }
        fetch(url)
        .then(notifications => notifications.json())
        .then(results => {
            setNotifications(results)
            //this.toggleHidden('list')
        })
    }


    const countDistanceFromCenterPoints = () => {
      let street1 = centers[0].street.replace(' ', '+')
      let street2 = centers[1].street.replace(' ', '+')
      const data = [
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
    
      //const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${centers[0].number}+${street1}+${centers[0].city}|${centers[1].number}+${street2}+${centers[1].city}&destinations=11+Östra+Rännevallen+Vadstena&key=${process.env.REACT_APP_GOOGLE_DIRECTIONS_API_KEY}`
      let url = ''
        if(process.env.NODE_ENV === 'development'){
          url = process.env.REACT_APP_DEV_API_URL + 'api/maps/distance/destination/11+Östra+Rännevallen+Vadstena'
        } else {
          url = process.env.REACT_APP_PRD_API_URL + 'maps/distance/destination/11+Östra+Rännevallen+Vadstena'
        }
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        .then(response => console.log(response.json())) 
    }
    
    return(
        <Container fluid className = 'App'>
        <Row>
          <Col className = 'col-drivers-action-tab'>
            <Row>
              <Col className = 'drivers-admin-btns'>
                <Button variant = 'light' size = 'large'>messages</Button>
                <Button variant = 'light' size = 'large'>available drivers</Button>
                <Button variant = 'light' size = 'large' onClick = {countDistanceFromCenterPoints}>generate route</Button>
                <Button variant = 'light' size = 'large' >bins live status update</Button>
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col className = 'col-drivers-data-tab'>
          <WrappedMap 
                googleMapURL = {'https://maps.googleapis.com/maps/api/js?key=AIzaSyCZYDNkfWnxSqUeOuLfTeIRD6u1BNHI9n0&v=3.exp&libraries=geometry,drawing,places'}
                loadingElement =  {<div style={{ height: `100%` }} />}
                containerElement = {<div style={{ width: `400px`, height: '400px'}} />}
                mapElement = {<div style={{ height: `100%` }} />}
                />
          </Col>
        </Row>
      </Container>
    )
} 

export default Home

