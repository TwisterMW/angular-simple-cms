# Angular Simple CMS
A simple CMS Frontend made on AngularJS in order to integrate it with any website and keep an updated blog style post section.

## Documentation
The documentation is available via grunt ngDocs by running:

 ```$ grunt docs:generate``` and ```$ grunt docs:server```

## Technologies
*NodeJS + NPM

*Grunt

*Bower

*HTML5

*CSS3

*Bootstrap

*jQuery

*AngularJS

## Install Develop Environment
- First of all clone the repo with:
    
    ```$ git clone git@github.com:TwisterMW/angular-simple-cms.git```

- Then install project dependences (npm & bower) with:
    
    ```$ npm i && bower i```

**Note: The bower packages installed during develop and the new application files created will be automatically added to the HTML files as includings because the Wiredep Grunt task, so is not necessary to include these kind of dependencies manually.

## Runing application
For running a mockup server we can type the grunt command:

```$ grunt server```

For generate a distribution release version we can run the grunt task:

```$ grunt release:int```

## Step further on custom configuration
We need to properly set up the final details in order to connect the backend with our frontend respecting the structure of the entire application once deployed in production server.

### Webservices PATH definition
If we take a look on 'app/app.js' file we can see an angular constant declarated as below:
```javascript
    // Endpoint for MS calls
        .constant('BASE_URL', {
            'DEV': 'backend/ws/',
            'INT': ''
        });
```

This is technically a part of the endpoint through the webservice is called when we do any kind of operations on the application.

We need to change the 'DEV' value for the proper one if you are planning to store the 'backend' folder in a different location.

### Database configuration
In this case we're using PHP + MySQL for the backend so in order to configure the database you need to create a new one with utf8_unicode charset and just import the 'backend/tw-cms.sql' file for generating the tables.

After that you need to configure the database access constants on 'backend/db/db-constants.php' pointing to your host, user, password, and the database name.

### Mailing configuration
You can also configure the mail constants in order to set up the PHPMailer integrated library in order to be able to send emails through the application.

For doing this you need to edit 'backend/lib/mailer-constants.php' file with the proper values on each constant.