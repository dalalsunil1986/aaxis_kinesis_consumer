# Aaxis Kinesis Consumer

A simple Kinesis consumer to log real-time data on your console.

### Prerequisite
Before you begin, Node.js and NPM must be installed on your system. For download instructions for your platform, see http://nodejs.org/download/.

## Running The Consumer App

    1. Get all required NPM modules. **From the root of the repository**, execute the following command on your terminal:

    `npm install`

    This downloads all dependencies.

    2. Inside the app folder, add a js file and name it "credentials.js". Paste the code below and provide the details of your AWS Kinesis account:

    ```
        'use strict';

        //provide the access key, secret access key, stream name, and region
        var credentials = module.exports = {
            accessKeyId: "",
            secretAccessKey: "",
            stream : "",
            region : ""
        };
    ```

    3. Execute the following commands from the root of the repository:

    ```sh
        cd app
        node index.js
    ```



