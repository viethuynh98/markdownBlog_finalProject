# markdownBlog_finalProject

# NOTE

- rafce: tạo ra một thành phần chức năng React, import React và export component
- npm run dev -> start
- config screen width: use min-width (tailwind.config.js)
- add extension thunder client to using POSTMAN inside vscode
- axios???

# frontend

## init project frontend - create frontend folder

- cd frontend
- npm create vite@latest
  -. -> ReactJS -> Javascript
- npm install
- npm i react-router-dom axios react-icons
- npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
- npx tailwindcss init -p

- config tailwindcss.config.js
- config index.css

- install extension: ES7 React/Redux/GraphQL/React-Native snippets

## create new app

- App.jsx: rafce -> create a new one
- npm run dev -> start

- NavBar design: (init with rafce)

  - new folder pages + components
  - pages:
    - new homepage: Home.jsx
  - components:
    -new component:
    Navbar.jsx
    HomePosts.jsx
    Footer.jsx

  - add navbar, routes, footer to Home page

    - design Navbar
    - design home post
    - design footer

  - init log in and register page

    - design 2 pages

  - remove navbar from all page, move it into homepage

    - in each page, only display needed link (login -> register + homepage)

  - create post detail page (page to read article)

  - create 'create post page'

    - attention while using adding new category: add a constraint that adding only if it has text
    - while config deleteCategory button, using arrow function to add a callback function for OnClick event

  - create profile page

# backend

- npm init -y
- npm i express mongoose dotenv cors bcrypt jsonwebtoken cookie-parser multer

- turn off restrict mode for nodemon

  - open the Windows PowerShell in Administration Mode
  - Get-ExecutionPolicy to check
  - if Restricted -> Set-ExecutionPolicy Unrestrict -> Y

- run server

  - nodemon index.js

- config index.js

  - express, mongoose
  - create PORT to run server
  - connect DB
  - add authentication route

- config authentication

  - register -> receive request -> encrypt password -> newUser.save()
  - log in -> receive request -> findOne() -> compare password -> pass ? tao token : status(401)
  - log out -> clear cookie by token

- user route

  - add user route to index.js
  - add update route
  - add delete route
  - add get route

- post route

  - add post route to index.js
  - add create route
  - add update route
  - add delete route
  - add get post detail route (post detail)
  - add get all post route (homepage)
  - add get user post route (profile)

- comment route

  - create
  - delete
  - update
  - get post's comment

- verify token
  - init verify token
  - add to routes

# Connect FE and BE

- add url
- add logic to handle register
- add logic to handle log in

## init user context

- use user data everywhere in web
  - (get user data to manipulate navbar)
  - userContext get refetch data: only get userId
    - because while log in, we only pass user.\_id to token
    - we can config it to pass more info if needed (like username or email) (auth.js on log in)

## get home post and implementation searching functionality

- get home posts with GET POST route
- using array map function to generate POSTS
- add searching function
  - check user input prompt
  - send searched result to server
  - add additional condition to check result
  - add loader animation
