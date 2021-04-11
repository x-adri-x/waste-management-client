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
    
    const showMessages = (e) => {
        const agent = e.target.name
        let url = generateUrl(`notifications/agent/${agent}`)
        fetch(url)
        .then(notifications => notifications.json())
        .then(result => {
            setList(result)
            toggleHidden('result')
        })
    }

    const sendExpoMessage = async() => {
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

        const status = {
            'status': 'in progress'
        }
        let __url = generateUrl(`notifications/id/${messageID}`)
        fetch(__url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(status)
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
            <input className = 'messagebox' type = 'textarea' value = {message} onChange = {e => setMessage(e.target.value)}/>
            <input type = 'text' placeholder = 'uid' value = {uid} readOnly/>
            <input type = 'text' placeholder = 'message id' value  = {messageID} readOnly/>
            <button className = 'smallbutton' onClick = {sendExpoMessage}>Send</button>
        </div>) : null
        }
            
        </div>
        </div>
    )
}

export default MessagesStarterScreen
