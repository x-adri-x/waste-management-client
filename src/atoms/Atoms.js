import {atom} from 'recoil'

export const searchState = atom({
    key: 'searchState',
    default: []
  })

export const notificationsState = atom ({
  key: 'notificationsState',
  default: {}
})
