function request(method) {
  const getAuthHeader = () => {
    const token = window.localStorage.getItem("auth_token");
    return token && token.length ? { Authorization: `Bearer ${token}` } : {};
  };

  return async (url, data = {}, dataType = "json", options = {}) => {
    const authHeader = getAuthHeader();
    let qs = "";
    let body;
    let headersType = headersResolve(dataType);
    const headers = {
      ...headersType,
      ...authHeader
    };
    if (["get", "delete"].indexOf(method) > -1) qs = "?" + getQueryString(data);
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
      debugger
      return text ? JSON.parse(text) : {};
    });
  };
}

function headersResolve(type) {
  switch (type) {
    case "json":
      return { "Content-Type": "application/json", Accept: "application/json" };
    case "multipart":
      return {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data"
      };
  }
}

function dataResolve(type, data) {
  switch (type) {
    case "json":
      return JSON.stringify(data).length ? JSON.stringify(data) : undefined;
    case "multipart":
      return data;
  }
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
