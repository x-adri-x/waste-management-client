import React from 'react'
import { useRecoilState, useRecoilValue} from 'recoil'
import { listState, uidState, messageState, idState } from '../atoms/Atoms.js'
import Result from '../components/Result.js'
import {generateUrl} from '../utils/retrieving_data.js'
import {toggleHidden} from '../utils/toggleHidden.js'

function MessagesStarterScreen() {

    const [list, setList] = useRecoilState(listState)
    const uid = useRecoilValue(uidState)
    const [message, setMessage] = useRecoilState(messageState)
    const messageID = useRecoilValue(idState)
    
    const showMessages = async(e) => {
        const agent = e.target.name
        let url = generateUrl(`notifications/agent/${agent}`)
        let result = await fetch(url)
        .then(notifications => notifications.json())
        .then(result => result)
        setList(result)
        toggleHidden('result')
    }

    const sendExpoMessage = async(e) => {
        const timestamp = new Date().toLocaleString()
        let url = generateUrl(`users/uid/${uid}`)
        const ExponentPushToken = await fetch(url).then(response => response.json()).then(result => {return result[0].ExponentPushToken})

        const expo_message = {
            to: ExponentPushToken,
            sound: 'default',
            title: 'New notification from The Bin',
            body: 'New admin message.'
          };
        
          await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Accept': 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(expo_message)
          })

        const notification = {
            'message': message,
            'uid': uid,
            'timestamp': timestamp,
            'email': 'admin@waste.com',
            'agent': 'admin'
          }
        let _url = generateUrl('notifications')
        fetch(_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notification)
        })
        .then(response => response.json())
        .then(result => {
            if(result.affectedRows === 1){
                console.log(`The number of affected rows were ${result.affectedRows}`)
            } else {
                console.log(result.sqlMessage)
            }
        })

        let status = ''
        e.target?.id === 'close-button' ? status = 'done' : status = 'in-progress'
        const body = {
            'status': status
        }
        let __url = generateUrl(`notifications/id/${messageID}`)
        fetch(__url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(result => {
            if(result.affectedRows === 1){
                console.log(`The number of affected rows were ${result.affectedRows}`)
            } else {
                console.log(result.sqlMessage)
            }
        })
    }

    const close = (e) => {
        console.log(e.target.id)
    }

    return (
        <div>
            <div className = 'messagesStarter hidden'>
            <button className = 'bigbutton' onClick = {showMessages} name = 'user'>User messages</button>
            <button className = 'bigbutton' onClick = {showMessages} name = 'driver'>Drivers messages</button>
        </div>
        <div>
        <Result />
        {list.length > 0 ? 
            (<div className = 'textbox hidden'>
            <p className = 'header-text'>Send a reply to the selected message:</p>    
            <textarea className = 'messagebox' wrap = 'soft' value = {message} onChange = {e => setMessage(e.target.value)}></textarea>
            <input type = 'text' placeholder = 'uid' value = {uid} readOnly/>
            <input type = 'text' placeholder = 'message id' value  = {messageID} readOnly/>
            <button className = 'smallbutton' onClick = {sendExpoMessage}>Send message</button>
            <button className = 'smallbutton' id = 'close-button' onClick = {close}>Close the issue</button>
        </div>) : null
        }
            
        </div>
        </div>
    )
}

export default MessagesStarterScreen
