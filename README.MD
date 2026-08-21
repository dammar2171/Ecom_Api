# Learning Project

## Mongodb
- MongoDB is a document-oriented, operational database built from the ground up as an alternative to the relational database for modern applications.

## why mongodb
1. Your data structure change frequently.
2. Your work heavily with JSON.
3. You are building nodeJS application.
4. You need scale horizontally.
5. Your app naturally represent data as document.

## Command of mongosh
1. show dbs
- view all database.
2. use databaseName
- create or switch database.
3. db.dropDatabase
- delete current database.
4. db.createCollection("collectionName")
- create a new collection explicitly

### Create
5. db.collectionName.insertOne({})
- use to insert single row data
6. db.collectionName.insertMany([{},{}])
- use to insert multiple row at once.

### Find
7. db.collectionName.find()
- Find all data like select * in sql db.
8. db.collectionName.findOne({})
- return only one data matching document

### Delete
9. deleteOne()
- delete one data from document
10. deleteMany()
- delete multiple data at once

## Query operation
- $gt : greater than
- $lt : less than
- $gte: greater than or equal to 
- $lte: less than or equal to
- $ne : not equal to 
- $in : matches in array
- $nin: not matches in arrray

## Common update operator
- $set : set/replace a field value
- $inc : increment a numeric field
- $unset: remove a field
- $push: add item in an array
- $pop: remove item from an array

## JWT auth process:

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
