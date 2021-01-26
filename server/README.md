<!-- ## **Show User**

Returns json data about a single user.

- **URL**
  /users/:id

- **Method:**
  `GET`

- **URL Params**
  **Required:**
  `id=[integer]`

- **Data Params**
  None

---

## **Register**

Register new user.

- **URL**
  /register/

- **Method:**
  `POST`

- **URL Params**
  None

- **Data Params**
  **Required:**
  `username=[string]`
  `email=[email]`
  `namalengkap=[string]`
  `password=[password]`

---

## **Edit User**

Edit existed user data.

- **URL**
  /register/:id

- **Method:**
  `PUT`

- **URL Params**
  **Required:**
  `id=[integer]`

- **Data Params**
  **Required:**
  `username=[string]`
  `email=[email]`
  `namalengkap=[string]`
  `password=[password]`

---

## **Delete User**

Delete existed user permanently.

- **URL**
  /register/:id

- **Method:**
  `DELETE`

- **URL Params**
  **Required:**
  `id=[integer]`

- **Data Params**
  **Required:**
  `username=[string]`
  `email=[email]`
  `namalengkap=[string]`
  `password=[password]`

---

## **Login**

Login with existed credentials.

- **URL**
  /login/

- **Method:**
  `POST`

- **URL Params**
  None

- **Data Params**
  **Required:**
  `username=[string]`
  `password=[password]`

---

## **Logout**

Logout by destroying user session.

- **URL**
  /logout/

- **Method:**
  `POST`

- **URL Params**
  None

- **Data Params**
  None

--- -->
