# JWT auth process:

1. Login/Register success
1. Generate token
2. Store token: cookie, session, localStorage
3. Append token in every request
5. Verify token and authenticate/authorize the user (middleware)

## HTTP Status Code

1. 1xx - 199 (information)

2. 2xx - 299 (success)
- 200 (OK)
- 201 (Created)

3. 3xx - 399  (Redirect)
- 301 (moved permanently)


4. 4xx - 499  (Client Errror)
- 400 (bad request)
- 401 (Unauthorized)
- 403 (Forbidden)
- 404 (Not found)

5. 5xx - 599  (Server Error)
- 500 (Internal Server Error)
- 502 (Bad gateway)
