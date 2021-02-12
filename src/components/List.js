import React from 'react'
import image from '../images/avatar.jpg'


export default class CustomCard extends React.Component {

    render() {
        return(
            <div className = 'list hidden'>
                {(this.props.data).map(obj => {
                    return(
                        <div style = {{borderStyle: 'solid', borderColor: 'grey', borderWidth: 1, padding: '2vh', width: 'fit-content'}}>
                        {/* <img src = {image} style = {{width: 100, height: 100, textAlign: 'center'}} alt = 'bunny'/> */}
                        {Object.entries(obj).map(([key, val]) => 
                            <p key={key} style = {{textAlign: 'left'}}>{key} : {val}</p>
                        )}
                    </div>
                    )  
                })}
            </div>
        )
    }
}
