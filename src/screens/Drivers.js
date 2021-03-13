import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import List from '../components/List.js'
import Add from './Add.js'
import Update from './Update.js'
import Search from './Search.js'
import {useRecoilState, useRecoilValue} from 'recoil'
import {driversState} from '../atoms/Atoms.js'
import {toggleHidden} from '../utils/toggleHidden.js'
import {generateFetchUrl} from '../utils/generateFetchUrl.js'

function Drivers () {

    const [drivers, setDrivers] = useRecoilState(driversState)
    const driversList = useRecoilValue(driversState)

    function listDrivers() {
        let url = generateFetchUrl('drivers')
        console.log(url)
        fetch(url)
        .then(response => response.json())
        .then(result => {
          let formatted_list = []
          result.map(driver => {
            const name = driver.first_name + ' ' + driver.last_name
            let driver_object = {
              'Name': name,
              'Date of Birth': driver.date_of_birth,
              'Work phone': driver.work_phone,
              'Email': driver.email_address,
              'Private phone': driver.private_phone,
              'User ID': driver.uid
            }
            formatted_list.push(driver_object)
          })
          setDrivers(formatted_list)
          toggleHidden('list')
        })
      }
    
      function addDrivers () {
        toggleHidden('add')
      }
    
      function updateDrivers () {
        toggleHidden('update')
      }
    
      function searchDrivers () {
        toggleHidden('search')
      }

        return(
            <Container fluid className = 'App'>
            <Row>
              <Col className = 'col-drivers-action-tab'>
                <p className = 'drivers-label'>DRIVERS administration</p>
                <Row>
                  <Col className = 'drivers-admin-btns'>
                    <Button variant = 'light' size = 'large' onClick = {listDrivers}>list</Button>
                    <Button variant = 'light' size = 'large'  onClick = {searchDrivers}>search</Button>
                    <Button variant = 'light' size = 'large' onClick = {addDrivers}>create</Button>
                    <Button variant = 'light' size = 'large' onClick = {updateDrivers}>update</Button>
                    <Button variant = 'light' size = 'large'>delete</Button>
                  </Col>
                  <Col></Col>
                </Row>
              </Col>
              <Col className = 'col-drivers-data-tab'>
                  <List />
                  <Add />
                  <Search />
                  <Update />
              </Col>
            </Row>
          </Container>
        )
}

export default Drivers
