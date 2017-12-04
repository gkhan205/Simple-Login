const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/users');

router.route('')
    .post(function(req, res){
        User.findOne({email: req.body.email}, function(err, data) {
           if(err) {
               res.status(500).json({
                   message: 'Error Occured'
               });
           } else if(!data) {
                res.status(500).json({
                    code: 203,
                    message: 'User does not exist'
                });
            } else {
               if(data.password === req.body.password) {
                   res.status(200).json({
                       code: 200,
                       message: 'Successfully Logged in',
                       userId: data._id
                   });
               } else {
                   res.status(500).json({
                       code: 203,
                       message: 'Password does not match'
                   });
               }
           }
        });
    });

module.exports = router;