import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function Home () {
    return(
        <Container fluid className = 'App'>
        <Row>
          <Col className = 'col-drivers-action-tab'>
            <Row>
              <Col className = 'drivers-admin-btns'>
                <Button variant = 'light' size = 'large'>messages</Button>
                <Button variant = 'light' size = 'large'>available drivers</Button>
                <Button variant = 'light' size = 'large' >generate route</Button>
                <Button variant = 'light' size = 'large' >bins live status update</Button>
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col className = 'col-drivers-data-tab'>
          </Col>
        </Row>
      </Container>
    )
} 

export default Home

