Hotel api
==================================

Mock Hotel Reservation API.

Endpoints : 

account/ 
- create different users of api with defferent roles "guest hotel-manager"
- login and sign in 

reservation/ 
crud reservation documents + action to search and cancel

hotel/ 
crud hotel documents

stay/ : 
CRUD information on user's stay


Getting Started
---------------

```sh
# clone it
npm install 
npm dev
```
 

.env
-------
```sh
NODE_ENV=develop
PORT=4000
ROUTES_DIRECTORY_NAME=routes
JWT_SALT=10

MONGO_DB_NAME=dev
MONGO_DB_URI=mongodb://localhost:27017/hotel
```
