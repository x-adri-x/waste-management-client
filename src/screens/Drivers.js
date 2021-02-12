import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import CustomCard from '../components/List.js'
import Add from './Add.js'
import Update from './Update.js'
import Search from './Search.js'

class Drivers extends React.Component {

    state = {
        drivers: [],
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
        return(
            <Container fluid className = 'App'>
            <Row>
              <Col className = 'col-drivers-action-tab'>
                <p className = 'drivers-label'>DRIVERS administration</p>
                <Row>
                  <Col className = 'drivers-admin-btns'>
                    <Button variant = 'light' size = 'large' onClick = {this.listDrivers}>list</Button>
                    <Button variant = 'light' size = 'large'  onClick = {this.searchDrivers}>search</Button>
                    <Button variant = 'light' size = 'large' onClick = {this.addDrivers}>create</Button>
                    <Button variant = 'light' size = 'large' onClick = {this.updateDrivers}>update</Button>
                    <Button variant = 'light' size = 'large'>delete</Button>
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
        )
    }
    
}

export default Drivers
