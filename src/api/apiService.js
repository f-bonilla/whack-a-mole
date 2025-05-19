const ApiService = (() => {
  let baseURL = null;

  const buildURL = (endpoint) =>
    `${baseURL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const request = async (endpoint, options = {}) => {
    if (!baseURL)
      throw new Error("Base URL is not set. Use setBaseURL() first.");

    const url = buildURL(endpoint);

    const headers = { ...options.headers };
    if (
      !headers["Content-Type"] &&
      options.method !== "GET" &&
      options.method !== "HEAD"
    ) {
      headers["Content-Type"] = "application/json";
    }

    const config = {
      ...options,
      headers,
      mode: "cors",
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText}`
        );
      }
      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      } else if (contentType?.includes("text/")) {
        return await response.text();
      } else {
        return await response.blob();
      }
    } catch (error) {
      console.error(`ApiService Error: ${error.message}`);
      throw error;
    }
  };

  const get = (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "GET" });

  const post = (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });

  const put = (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });

  const deleteField = (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "DELETE" });

  const patch = (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });

  return {
    setBaseURL: (url) => {
      if (!url) throw new Error("Base URL cannot be empty.");
      baseURL = url;
    },
    getBaseURL: () => baseURL,
    get,
    post,
    put,
    patch,
    delete: deleteField,
  };
})();

export default ApiService;
