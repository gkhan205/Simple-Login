const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/users');

router.route('/')
    .get(function (req, res) {
        User.find(function (err, data) {
            res.status(200).json({
                data: data
            })
        })
    })
    .post(function (req, res) {
        const register = new User({
            email: req.body.email,
            password: req.body.password
        });
        register.save(function (err, data) {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: 'Error Occured while registering'
                });
            }

            res.status(200).json({
                code: 200,
                message: 'Successfully registered',
                userId: data._id
            });
        });
    });


router.route('/:id')
    .get(function (req, res) {
        User.findOne({_id: req.params.id}, function (err, data) {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: 'Error Occured'
                });
            }
            res.status(200).send(data);
        });
    })

    .put(function (req, res) {
        User.findOneAndUpdate({_id: req.params.id}, req.body, function (err, data) {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: 'Error Occured'
                });
            }

            res.status(200).json({
                code: 200,
                message: 'Successfully Updated',
                userId: data._id
            });
        });
    });

module.exports = router;