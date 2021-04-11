import {atom} from 'recoil'

export const emailState = atom({
  key: 'emailState',
  default: ''
})

export const passwordState = atom({
  key: 'passwordState',
  default: ''
})

export const authState = atom({
  key: 'authState',
  default: false
})

export const listState = atom({
    key: 'listState',
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

export const uidState = atom ({
  key: 'uidState',
  default: ''
})

export const messageState = atom({
  key: 'messageState',
  default: ''
})

export const idState = atom({
  key: 'idState',
  default: ''
})
