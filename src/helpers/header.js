const header_status = "header_status";

export function setStatus(status) {
  localStorage.setItem(header_status, status);
}

export function getStatus() {
  return localStorage.getItem(header_status);
}

export function deleteStatus() {
  localStorage.removeItem(header_status);
}
