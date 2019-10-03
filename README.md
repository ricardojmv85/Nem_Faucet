# NEM Faucet

The following repository corresponds to the creation of a simple Faucet for XEM tokens from the NEM blockchain. The actual configuration of this project is sending 1 XEM token to an specific address. Requests can only be executed 1 per hour with the same address.


## Requirements

Some of the requirements includes external tools that are not part from this repository. These tools were choosen to facilitate the usability of this NEM Demo, but you could implements different tools to solve the requirements of this Faucet.

* NEM Wallet
* Considerable amount of XEM's

#### Redis
Redis was used to store the transactions executed in order to limit the number of transactions per address, this to avoid getting out of balance rapidly.
The installation guide can be found [here]([https://redis.io/topics/quickstart](https://redis.io/topics/quickstart))
#### Nodejs
Nodejs was used to build a functional API to serve as the backend of the web app with the NEM blockchain. This API basically make calls to the NEM API and returns the responses messages to the web app where these are managed. The following command will install nodejs in your machine.
```
sudo apt-get install nodejs
```
#### NPM (nem-sdk)
Since our communication was developed using Nodejs to communicate with the NEM blockchain, the package utilized was the the NPM SDK NEM package, which allows us to make almost all the NEM NIS API calls types.
The following command will install you the NEM SDK.
```
npm install nem-sdk
``` 
The full NEM SDK documentation could be found [here]([[https://www.npmjs.com/package/nem-sdk](https://www.npmjs.com/package/nem-sdk)])

#### Setup

Some details to take into account are that the *"password"* and *"privatekey"* keywords in the app.js file should be replaced with your NEM account credentials.

#### Installation

NPM Modules Installation.
```
npm install packages.json
```
#### Usage
##### Redis Initialization
Once you have installed Redis you could navigate to his src folder and run the following to command to initialize the server.
```
redis-server
```
##### API
To run the node API run the following command. The API will start running in the machine listening in the port 3000.
"Important: If your Redis server is not running locally, you must declare the server IP and Port in the client initialization in the app.js file."
```
node app.js
```
