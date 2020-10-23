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
├── tests/                  -> Mocha and Chai scripts for api testing
├── uploads/                -> Storage location for all uploaded files
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

| Endpoints                  | Description                                                               | Methods         |
| -------------------------- | ------------------------------------------------------------------------- | --------------- |
| /                          | The default page (just for redirects)                                     | GET             |
| /users                     | Endpoint for the users registered on the website                          | GET             |
| /users/:userId             | Details of specified user                                                 | GET PUT DELETE  |
| /users/signup              | Endpoint for registeration (returns JWT)                                  | POST            |
| /users/login               | Endpoint for logging in (returns JWT)                                     | POST            |
| /users/logout              | At present just redirects to `/`. Can be used to invalidate/blacklist JWT | GET             |
| /employees                 | List of users currently employeed.                                        | GET POST DELETE |
| /employees/:employeeId     | Details of specified employee                                             | GET PUT DELETE  |
| /projects                  | List of all projects in database                                          | GET POST DELETE |
| /projects/:projectId       | Details of specified project                                              | GET PUT DELETE  |
| /customers                 | List of all customers in database                                         | GET POST DELETE |
| /customers/:customerId     | Details of specified customer                                             | GET PUT DELETE  |
| /projects                  | List of all projects in database                                          | GET POST DELETE |
| /uploads/uploadFile        | Endpoint for uploading files                                              | POST            |
| /uploads/viewFiles         | List of all files on the server for viewing                               | GET             |
| /uploads/getFile/:filename | Download a specific file by its filename                                  | GET             |

All routes except `/`,`/users/signup` and `/users/login` require authentication

## Testing

```
npm run test
```

Testing is done with mocha and chai and covers all the endpoints with all the methods

PS: Since most of the routes are protected and a few require admin access that can only be set from the database, you are required to create an entry for a user, employee, project and a customer and supply their ObjectId's to the respective test files
