import React from 'react'
import { useRecoilState } from 'recoil'
import { searchState } from '../atoms/Atoms.js'
import Result from '../components/Result.js'

function MessagesStarterScreen() {

    const [search, setSearch] = useRecoilState(searchState)

    const showUserMessages = () => {
        let url = ''
        if(process.env.NODE_ENV === 'development'){
          url = process.env.REACT_APP_DEV_API_URL + 'api/notifications/agent/user'
        } else {
          url = process.env.REACT_APP_PRD_API_URL + 'notifications/agent/user'
        }
        fetch(url)
        .then(notifications => notifications.json())
        .then(result => {
            setSearch(result)
        })
    }

    const showDriversMessages = () => {
        let url = ''
        if(process.env.NODE_ENV === 'development'){
          url = process.env.REACT_APP_DEV_API_URL + 'api/notifications/agent/driver'
        } else {
          url = process.env.REACT_APP_PRD_API_URL + 'notifications/agent/driver'
        }
        fetch(url)
        .then(notifications => notifications.json())
        .then(result => {
            setSearch(result)
        })
    }

    return (
        <div>
            <div className = 'messagesStarter hidden'>
            <button className = 'bigbutton' onClick = {showUserMessages}>User messages</button>
            <button className = 'bigbutton' onClick = {showDriversMessages}>Drivers messages</button>
        </div>
        <div>
            <Result />
        </div>
        </div>
    )
}

export default MessagesStarterScreen
