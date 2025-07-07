import Cookies from 'js-cookie'

const TokenKey = 'pyp-token'
const openIdKey = 'open-id'

// token
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getOpenId() {
  return Cookies.get(openIdKey)
}
export function setOpenId(token) {
  return Cookies.set(openIdKey, token)
}
export function removeOpenId() {
  return Cookies.remove(openIdKey)
}
