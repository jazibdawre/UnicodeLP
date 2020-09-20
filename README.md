# Project Management System
Tasks for Unicode learning period

## Project Structure

```
.
├── .gitignore              -> Git ignore file for node_modules and vscode configs
├── config/                 -> Configuration settings of MongoDB and JWT
├── models/                 -> Contains DB models
├── public/                 -> Contains css, js, etc for frontend
├── routes/                 -> Files exporting respective routers for each endpoint
├── views/                  -> Contains the templates for jade(pug)
├── app.js                  -> Connects to DB, Sets up express app with routers, middlewares etc and exports it
├── authenticate.js         -> Assigns passports strategies, sets up JWT, exports verification functions
├── index.js                -> starts the server, file to be run for starting the app
└── package.json            -> Npm package.json file
```
## Usage
```
npm start
```
## Endpoints
All root endpoints have their separate router in `./routes` folder

|Endpoints              |Description                                                                    |Methods               |
|-----------------------|-------------------------------------------------------------------------------|----------------------|
|/                      |The default page (just for redirects)                                          |GET                   |
|/users                 |Endpoint for the users registered on the website                               |GET DELETE            |
|/users/:userId         |Details of specified user                                                      |GET PUT DELETE        |
|/users/signup          |Endpoint for registeration (returns JWT token)                                 |POST                  |
|/users/login           |Endpoint for logging in (returns JWT token)                                    |POST                  |
|/users/logout          |At present just redirects to `/`. Can be used to invalidate/blacklist JWT      |POST                  |
|/employees             |List of users currently employeed.                                             |GET POST DELETE       |
|/employees/:employeeId |Details of specified employee                                                  |GET PUT DELETE        |
|/projects              |List of all projects in database                                               |GET POST DELETE       |
|/projects/:projectId   |Details of specified project                                                   |GET PUT DELETE        |
|/customers             |List of all customers in database                                              |GET POST DELETE       |
|/customers/:customerId |Details of specified customer                                                  |GET PUT DELETE        |

All routes except `/`,`/users/signup` and `/users/login` require authentication

## Testing
Yup, I forgot to take postman screenshots :grimacing:. I will put them here if I come back to it sometime
If you are testing the endpoints, note that it is not allowed to set admin flag as true while registeration, it will be ignored
