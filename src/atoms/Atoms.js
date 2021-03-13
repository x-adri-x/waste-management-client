import {atom} from 'recoil'

export const searchState = atom({
    key: 'searchState',
    default: []
  })

export const notificationsState = atom ({
  key: 'notificationsState',
  default: {}
})

export const warningMessageState = atom({
  key: 'warningMessageState',
  default: []
})

export const responseStatus = atom({
  key: 'responseStatus',
  default: ''
})

export const driversState = atom({
  key: 'driversState',
  default: []
})
