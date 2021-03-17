export const generateUrl = (path) => {
    let url = ''
        if(process.env.NODE_ENV === 'development'){
          url = process.env.REACT_APP_DEV_API_URL + 'api/' + path
        } else {
          url = process.env.REACT_APP_PRD_API_URL + path
        }
    return url
}

export const validateSQLResult = (result) => {
  let response = ''
  if(result.affectedRows === 1){
    response = `The number of affected rows were ${result.affectedRows}`
  } else {
    response = result.sqlMessage
  }
  return response
}
