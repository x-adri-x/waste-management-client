export const formatDriver = (result) => {
    let formatted_list = []
    if(result.length > 0) {
        let res = result.map(driver => {
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
            return formatted_list
        })
        return res[0]
    } else {
        return []
    }
}
