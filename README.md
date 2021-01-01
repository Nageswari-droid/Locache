# Locache

A simple datastore based caching application developed in [Node JS](https://nodejs.org).

> Developed as part of [freshworks](https://freshworks.com) graduate trainee interview drive

## Guidelines for using the library

The library can be imported in two ways

- By linking the package to the global `node_modules` directory and using the link in the local package

```
// Go into the root of the library and type this command
npm link

// To add it as a dependency

npm link locache

// Importing the package

// ES5 style
const {Locache} = require('locache')

// ES6 style
import {Locache} from 'locache'
```

- Using relative import by directly referring the `Main.js` file

```
// ES5 style for Node JS
const {Locache} = require("./Main")
const objectName = new Locache(filepath); //Filepath is optional

// ES6 style
import {Locache} from './Main'
const objectName = new Locache(filepath); //Filepath is optional
```

**Adding key-value pair to the datastore**
  - Key, Value, Time to live(optional) are the parameters to add new item in datastore.
  
```
const cache = await objectName
      .create(key, value, timeToLive)
      .catch((err) => {
        throw new Error(err);        
      });
```

**Reading value from datastore**
  - key is the only parameter to read an item from datastore
  
```
const value = await objectName
      .read(key)
      .then((res) => {
        return res;
      })
     .catch((err) => {
        throw new Error(err);        
      });
```

**Deleting value from datastore**
   - key is the only parameter to delete an item from datastore
  
```
const value = await objectName
      .delete(key)
      .then((res) => {
        return res;
      })
     .catch((err) => {
        throw new Error(err);        
      });
```
  
