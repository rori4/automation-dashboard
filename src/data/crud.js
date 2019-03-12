function request(method) {
  const getAuthHeader = () => {
    const token = window.localStorage.getItem("auth_token");
    return token && token.length ? { Authorization: `Bearer ${token}` } : {};
  };

  return async (url, data = {}, options = {}) => {
    const authHeader = getAuthHeader();
    let qs = "";
    let body;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...authHeader
    };
    if (["get", "delete"].indexOf(method) > -1)
      qs = "?" + getQueryString(data);
    //POST or PUT
    else body = JSON.stringify(data).length ? JSON.stringify(data) : undefined;
    url = url + qs;
    const response = await fetch(url, {
      method,
      headers,
      body,
      ...options
    });
    return response.text().then(function(text) {
      return text ? JSON.parse(text) : {}
    })
  };
}

function getQueryString(data) {
  var esc = encodeURIComponent;
  return Object.keys(data)
    .map(k => esc(k) + "=" + esc(data[k]))
    .join("&");
}

export const get = request("get");
export const post = request("post");
export const put = request("put");
export const remove = request("delete");
