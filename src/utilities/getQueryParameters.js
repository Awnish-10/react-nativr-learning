export default function getQueryParameters(url) {
  const queryString = url.split('?')[1];
  const queryParams = {};

  if (queryString) {
    const keyValuePairs = queryString.split('&');

    for (let i = 0; i < keyValuePairs.length; i++) {
      const [key, value] = keyValuePairs[i].split('=');
      queryParams[key] = decodeURIComponent(value || '');
    }
  }
  return queryParams;
}