# Mongo Explorer
https://my-mongo-explorer.herokuapp.com/

Web application to visualize a MongoDB database and do CRUD operations within it.

**note:** @john-guerra para el parcial hice la opción 2B (Desplegado, con crear, modificar, borrar registros y paginación).

### Demo

![Demo](https://raw.githubusercontent.com/jsbravo-sw/mongo-explorer/master/assets/gif/demo.gif)

### Prerrequisites
All the listed prerrequisites must be installed in order to use the application. 
* <a href="https://nodejs.org/en/">Node.js</a>
* <a href="https://www.npmjs.com/get-npm">npm</a> `(Node Package Manager)`
* <a href="https://www.mongodb.com/download-center">MongoDB</a> 

### Installation
* Clone repository using git
    ```bash
    $ git clone https://github.com/jsbravo-sw/mongo-explorer.git
    ```
* Install dependencies from package.json
    ```bash
    $ npm install
    ```


### Configuration
* If the MongoDB database URI is from MongoDB Atlas, remember to open the ports to all ips (or at least https://my-mongo-explorer.herokuapp.com/ ip)
    Steps:
        1. Open the MongoDB Atlas dashboard. 
        2. In the side panel look for Security -> Network Access.
        3. Click 'Add IP Address'
        4. Allow '0.0.0.0/0' ip (all connections) 

    
### Running the application
* Before starting the application make sure you have mongodb installed and running, if it doesn't run it using this command.
    ``` bash
    $ sudo service mongod start
    ```
* Run the application
    ``` bash
    $ npm start
    ```

### Application Usage
* Go to your browser go to http://localhost:3000

### **License**
**mongo-explorer** is a open-source software licensed under the MIT License.
