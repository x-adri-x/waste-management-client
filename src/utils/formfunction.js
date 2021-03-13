export const validateData = (name, length, value) => {
    let msg = ''
    let phoneNumber = new RegExp('^06[237]0\\d{7}$')
    let messages = []

    if(name === 'firstName' || name === 'lastName'){
        if(value.match(/\d+/g) != null){
            msg = 'Name contains numbers.'
            messages.push(msg)
        }
        if(length < 2){
            msg = 'First name and last name should at least be 2 characters long.'
            messages.push(msg)
        }
    }
        
    if(name === 'email') {
        if(!value.includes('@')) {
            msg = 'Invalid email.'
            messages.push(msg)
        }
    }
        
    if(name === 'privatePhone' || name === 'workPhone'){
        if(value.match(/\D+/g) != null){
            msg = 'Phone number cannot contain letters.'
            messages.push(msg)
        }
        if(!phoneNumber.test(value)){
            msg = 'Wrong format, format should be 06701234567'
            messages.push(msg)
        }
    }
    
    return messages
}
