import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from './Result.js'
import {searchState} from './Atoms.js'
import { useRecoilState, useRecoilValue } from 'recoil';


function Search () { 
    const [search, setSearch] = useRecoilState(searchState)

    const getDriver = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const first_name = data.get('firstName')
        const last_name = data.get('lastName')
        let url = `api/drivers/search/first_name/${first_name}/last_name/${last_name}`
        const result = await fetch(url).then(r => r.json()).catch(e => console.log(e))
        console.log(result)
        setSearch(result)
        document.querySelector('#searchForm').reset()
        }

    const urlBase64ToUint8Array = (base64String) => {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
              .replace(/-/g, '+')
              .replace(/_/g, '/');
           
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
           
            for (let i = 0; i < rawData.length; ++i) {
              outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
    }

    const sendSubscription = (subscription) => {
        return (
            fetch('http://localhost:3000/api/notifications', {
                method: "POST",
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )
    }

    const subscribeUser = () => {
        const convertedVapidKey = urlBase64ToUint8Array('BAO-gzZEaIpZGRPDXSs8Cwa15U77Irdh7V8zuFPPqk7eso042a7WZCNGjK19iNeq6eY7gCgMLazzMC3rYEj8Mfc')
        if('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
                if(!registration.pushManager){
                    console.log('Push manager unavailable.')
                    return
                }
                registration.pushManager.getSubscription().then((existedSubscription) => {
                    if(existedSubscription === null) {
                        console.log('No subscription detected, make a request.')
                        registration.pushManager.subscribe({
                            applicationServerKey: convertedVapidKey,
                            userVisibleOnly: true
                        }).then((newSubscription) => {
                            console.log('New subscription added.')
                            sendSubscription(newSubscription)
                        }).catch(e => {
                            if(Notification.permission !== 'granted'){
                                console.log('Permission was not granted.')
                            } else {
                                console.error('An error ocurred during the subscription process.', e)
                            }
                        })
                    } else {
                        console.log('Existed subscription detected.')
                        sendSubscription(existedSubscription)
                    }
                })
            }).catch(e => console.error('An error ocurred during Service Worker registration.', e))
        } 
    }

    const message = async() => {
        const message = {
            to: "ExponentPushToken[i9Yi9pJpzCwwxzq3rXi_LJ]",
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!'
          };
        
          await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Accept': 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          })

        // const timestamp = new Date().toLocaleString()
        // const message = {
        //     'message': e.target.innerHTML,
        //     'user_id': 18,
        //     'timestamp': timestamp
        // }
        // fetch('api/notifications', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(message)
        // })
        // .then(response => console.log(response.json()))
        //subscribeUser()
    }
        
        return(
            <div className = 'search hidden'>
                <button onClick = {message}>Message</button>
                <h3>Search driver</h3>
                <form onSubmit = {getDriver} id = 'searchForm'>
                    <label htmlFor = 'firstName'>First name:</label>
                    <input type = 'text' id = 'firstName' name = 'firstName'></input>
                    <label htmlFor = 'lastName'>Last name:</label>
                    <input type = 'text' id = 'lastName' name = 'lastName'></input>
                    <button type="submit" className="btn btn-outline-info">Search driver</button>
                </form>
                <Result />
            </div>
        )
    }

export default Search