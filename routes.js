"use strict";

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('./db');
const {Course, User} = db.models;
const auth = require('basic-auth');
//auth middleware 
const authUser = (req, res, next) => {
    const credentials = auth(req);
    if(credentials){
        User.findOne(
            {
                where: {
                    emailAddress: credentials.name
                }
            }
        ).then((user) => {
           bcrypt.compare(credentials.pass, user.password, (err,res) => {
               if(res){
                   req.currentUser = user;
                   next();
               }
           })
        })
    } 
}
//Create user
router.post('/users', (req, res, next) => {
    const user = req.body;
    // async way to has the passwd
    bcrypt.genSalt(5,(err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            User.create({
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.emailAddress,
                password: hash
            });
        })
    })


    res.location = '/';
    res.status(201).end(); //return a 201 status code and end the response
})

//GET user

router.get('/users',authUser ,(req, res, next) => {
    const user = req.currentUser;
    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    })
})

//POST course 
router.post('/courses', authUser, (req, res, next) => {
    const user = req.currentUser;
    const course = req.body;
    Course.create({
        userId: user.id,
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded
    })
    res.location = '/';
    res.status(201).end();
})

//GET course
router.get('/courses', (req, res, next) => {
    Course.findAll({
        include: [
            {
                model: User
            }
        ]
    }).then((courses) => {
        res.json(courses)
    })
})
module.exports = router;