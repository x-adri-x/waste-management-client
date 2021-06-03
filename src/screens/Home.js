import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {listState, authState, messageState} from '../atoms/Atoms.js'
import {useSetRecoilState, useRecoilState} from 'recoil'
import Messages from './Messages.js'
import List from '../components/List.js'
import {toggleHidden} from '../utils/toggleHidden.js'
import {generateUrl} from '../utils/retrieving_data.js'
import {formatDriver} from '../utils/formatting.js'

function Home () {
    const setList = useSetRecoilState(listState)
    const setAuth = useSetRecoilState(authState)
    const [message, setMessage] = useRecoilState(messageState)

    const showMessagesOpts = () => {
        toggleHidden('messagesStarter')
    }

    const showLoggedInDrivers = async() => {
      let searchParam = {
        "status_id": 1
      }
      let url = generateUrl('drivers/search')
      let result = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(searchParam)
          })
          .then(response => response.json())
          .then(result => result)
      const formatted_list = formatDriver(result)
      setList(formatted_list)
      toggleHidden('list')
    }

    const generateRoute = async() => {
      setList([])
      toggleHidden('route')
      let searchParam = {
        "status_id": 1
      }
      let url = generateUrl('drivers/search')
      let drivers = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(searchParam)
          })
          .then(response => response.json())
          .then(result => result)
      if(drivers.length > 0) {
        let _url = generateUrl('maps/routes')
        let routes = await fetch(_url).then(response => response.json()).then(result => result)
        let route_id = routes[0].route_id
        let update_url = generateUrl(`maps/routes/route_id/${route_id}`)
        let body = {
          'driver_id': drivers[0].uid
        }
        fetch(update_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then(response => response.json()).then(result => console.log(result))
      }
      
      drivers.length > 0 ? setMessage(`The route was assigned to ${drivers[0].email_address}.`) : setMessage('There are no logged in drivers.') 
    }

    const logout = () => {
      setAuth(false)
      sessionStorage.removeItem('isAuth')
  }
    
    return(
        <Container fluid className = 'App'>
        <Row>
          <Col className = 'col-drivers-action-tab'>
            <Row>
              <Col className = 'drivers-admin-btns'>
                <Button variant = 'light' size = 'large' onClick = {showMessagesOpts}>messages</Button>
                <Button variant = 'light' size = 'large' onClick = {showLoggedInDrivers}>available drivers</Button>
                <Button variant = 'light' size = 'large' onClick = {generateRoute}>send route</Button>
                <Button variant = 'light' size = 'large' onClick = {logout} className = 'logout'>logout</Button>
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col className = 'col-drivers-data-tab'>
            <p className = 'route hidden'>{message}</p>
            <Messages />
            <List />
          </Col>
        </Row>
      </Container>
    )
} 

export default Home

