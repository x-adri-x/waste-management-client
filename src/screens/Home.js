import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {listState, authState} from '../atoms/Atoms.js'
import {useRecoilState, useSetRecoilState} from 'recoil'
import Messages from './Messages.js'
import List from '../components/List.js'
import {toggleHidden} from '../utils/toggleHidden.js'
import {generateUrl} from '../utils/retrieving_data.js'
import {formatDriver} from '../utils/formatting.js'

function Home () {
    const setList = useSetRecoilState(listState)
    const [auth, setAuth] = useRecoilState(authState)

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
                <Button variant = 'light' size = 'large' onClick = {logout} className = 'logout'>logout</Button>
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col className = 'col-drivers-data-tab'>
            <Messages />
            <List />
          </Col>
        </Row>
      </Container>
    )
} 

export default Home

