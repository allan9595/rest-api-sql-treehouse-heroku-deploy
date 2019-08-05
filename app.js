'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const router = require('./routes');
const {Course, User} = db.models;
// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';
// create the Express app
const app = express();

// Setup request body JSON parsing.
app.use(express.json());

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  // Note: using `force: true` will drop the table if it already exists
/*
db.sequelize.sync({ force: true }).then(() => {
  
  User.create({
    firstName: "Joe",
    lastName: "Smith",
    emailAddress: "joe@smith.com",
    password: "joepassword"
  }).then((user) => {
    Course.create({
      userId: user.id,
      title: "Build a Basic Bookcase",
      description: "High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.\n\nNot every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.\n\nOur pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs.\n\nWe made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish.\n\nAs for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac.\n\nThe specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.",
      estimatedTime: "12 hours",
      materialsNeeded: "* 1/2 x 3/4 inch parting strip\n* 1 x 2 common pine\n* 1 x 4 common pine\n* 1 x 10 common pine\n* 1/4 inch thick lauan plywood\n* Finishing Nails\n* Sandpaper\n* Wood Glue\n* Wood Filler\n* Minwax Oil Based Polyurethane\n"
    })
  })

  User.create({
    firstName: "Sally",
    lastName: "Jones",
    emailAddress: "sally@jones.com",
    password: "sallypassword"
  }).then(user => {
    Course.create({
      userId: user.id,
      title: "Learn How to Program",
      description: "In this course, you'll learn how to write code like a pro!",
      estimatedTime: "6 hours",
      materialsNeeded: "* Notebook computer running Mac OS X or Windows\n* Text editor"
    })
    Course.create({
      userId: user.id,
      title: "Learn How to Program",
      description: "In this course, you'll learn how to write code like a pro!",
      estimatedTime: "6 hours",
      materialsNeeded: "* Notebook computer running Mac OS X or Windows\n* Text editor"
    })
  })
  
 
});
*/


// setup morgan which gives us http request logging
app.use(morgan('dev'));

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

app.use('/api', router);

// GET a list of 
// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
