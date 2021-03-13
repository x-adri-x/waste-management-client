import React from 'react'
import { useRecoilState } from 'recoil'
import { searchState } from '../atoms/Atoms.js'
import Result from '../components/Result.js'
import {generateFetchUrl} from '../utils/generateFetchUrl.js'

function MessagesStarterScreen() {

    const [search, setSearch] = useRecoilState(searchState)

    const showUserMessages = () => {
        let url = generateFetchUrl('notifications/agent/user')
        fetch(url)
        .then(notifications => notifications.json())
        .then(result => {
            setSearch(result)
        })
    }

    const showDriversMessages = () => {
        let url = generateFetchUrl('notifications/agent/driver')
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
