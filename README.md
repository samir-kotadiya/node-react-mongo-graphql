# Code Test

This repository contains all the React, Node, MongoDB and graphQl tasks.

## Prerequisites
- yarn 1.22.19
- Node 16.17.1
- React 18.2.0
- mongoDB v3.6.3

## Scripts

#### React setup

`cd client` - goto client directory

`yarn` - install dependancy

`yarn start` - starts app

#### Node server (koa) setup

`cd server` - goto server directory

`yarn` - install dependancy

`yarn start` - starts node server

## Configuration

#### DB 
testdb will be automentically created 
you can create new user from react app 

#### Postman collection
https://collaboration.msi.audi.com/stash/projects/ECACP/repos/ecacp-utils/browse/merchant/postman


### NodeJS
1. Create a NodeJS server that listens on port 3000 and responds to the route "/hello" with the
message "Hello World!".
- GET http://localhost:3000/api/v1/hello

2. Create a function in NodeJS that takes in an array of integers and returns the sum of all even
numbers in the array.
- `server/sum_even_numbers.js`

3. Create a function in NodeJS which runs automatically every 5 seconds and puts a message
(“”QUERY RUNNING) in console.
- `server/sum_even_numbers.js`

### MongoDB
1. Create a MongoDB database called "testdb" with a collection called "users".
- created via mongoose ORM `server/models/user.model.js`

2. Add a new user to the "users" collection with the following information:
- you can add via FE or via below curl
```
'curl --location --request POST 'http://localhost:3000/api/v1/users' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "name": "John Doe",
    "email": "johns.doe@example.com",
    "password": "password123"
}'
```

response
```
{
    "statusCode": 200,
    "message": "User added succesfully",
    "data": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "$2b$10$K0FxDXzm.k01HQOO48dvq.p6k/g2zOG2JCCZUmEE/xiHbKMXnfOdK",
        "token": "token",
        "_id": "64774e15093ad63f660af3fc",
        "created": "2023-05-31T13:39:33.891Z",
        "__v": 0
    }
}
```

3. Write a MongoDB query that retrieves all users with the email domain "example.com".
- call `http://localhost:3000/api/v1/users/domain` or goto FE home page

### ReactJS
1. Create a React component that displays a list of user names and email addresses. The
component should receive an array of user objects as a prop.
- check `client/src/pages/users.js` or goto graphQL menu in FE

2. Create a Multi-step (2 steps) form in React that allows users to add a new user to the list.
Information should be captured in two steps and user should be able to go back and forth. The form should have fields for name, email, and password.
- check `client/src/components/users/form.js` or goto graphQL menu in FE and click on Add button

### GraphQL
1. Create a GraphQL schema that defines the following types:
- check `server/graphql`

2. Implement the resolvers for the Query and Mutation types.
- check `server/graphql/resolvers`

3. Write a GraphQL query that retrieves all users from the database.
- server side `server/graphql/resolvers/users.js`
- client side `client/src/pages/graphql.js`

Check graphQL query window in browser at here 'http://localhost:3000/graphql`