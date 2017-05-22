# Angular Simple CMS
A simple CMS Backend made on AngularJS in order to integrate it with any Frontend Website and keep an updated blog style post section

## Documentation
The documentation is available via grunt ngDocs by running:
 ```$ grunt docs:generate``` and ```$ grunt docs:server```

## Technologies description
*HTML5
*CSS3
*NodeJS + NPM
*Grunt
*Bower
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