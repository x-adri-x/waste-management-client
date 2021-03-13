export const generateFetchUrl = (path) => {
    let url = ''
        if(process.env.NODE_ENV === 'development'){
          url = process.env.REACT_APP_DEV_API_URL + 'api/' + path
        } else {
          url = process.env.REACT_APP_PRD_API_URL + path
        }
    return url
}
