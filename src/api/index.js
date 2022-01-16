const apiUrl = process.config.REACT_APP_URL_API;
export const http = (endPort, method, data) => {
  fetch(`${apiUrl}/${endPort}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
