const authServiceURL = import.meta.env.VITE_APP_AUTH_SERVER_URL;
const originalFetch = window.fetch;

if (!authServiceURL) {
  console.error("No auth service set");
}

window.fetch = async (url, options, ...rest) => {
  let res = await originalFetch(url, { ...options }, ...rest);
  const authHeader = res.headers.get("www-authenticate");

  if (authHeader?.includes("token_expired")) {
    console.log("ATTEMPT REFRESH");
    const currRefreshToken = localStorage.getItem("refreshToken");
    const refreshRes = await originalFetch(`${authServiceURL}/refresh`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ refreshToken: currRefreshToken }),
    });

    if (!refreshRes.ok) throw new Error("Login required");

    const { accessToken, refreshToken } = await refreshRes.json();

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    res = await originalFetch(
      url,
      {
        ...options,
        headers: { ...options?.headers, Authorization: `Bearer ${accessToken}` },
      },
      ...rest,
    );
  }

  return res;
};

export { authServiceURL };
