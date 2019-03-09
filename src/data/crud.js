function request(method) {
  const getAuthHeader = () => {
      const token = window.localStorage.getItem('auth_token');
    return (token && token.length)
      ? { Authorization: `Bearer ${token}token}` }
      : {};
  };

  return async (url, data = {}, options = {}) => {
    const authHeader = getAuthHeader();
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
        ...authHeader
      },
      body: JSON.stringify(data).length ? JSON.stringify(data) : undefined,
      ...options
    });
    return response.json();
  };
}
export const get = request("get");
export const post = request("post");
export const put = request("put");
export const remove = request("delete");
