import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function Catalog () {
    
    return(
        <Container fluid className = 'App'>
        <Row>
          <Col className = 'col-drivers-action-tab'>
            <Row>
              <Col className = 'drivers-admin-btns'>
                <Button variant = 'light' size = 'large'>centers</Button>
                <Button variant = 'light' size = 'large'>geocode centers</Button>
                <Button variant = 'light' size = 'large'>geocode addresses</Button>
                <Button variant = 'light' size = 'large' >filter addresses</Button>
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

export default Catalog

