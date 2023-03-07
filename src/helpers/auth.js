import cookie from "js-cookie";

const token_key = "id";

export function setToken(token) {
  cookie.set(token_key, token);
}

export function getToken() {
  return cookie.get(token_key);
}

export function deleteToken() {
  cookie.remove(token_key);
}
