const express = require("express");
const router = express.Router();


const User = require("../../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup user
router.post("/signup", async(req, res) => {
    const {
        email,
        password,
        name
    } = req.body;

    const user = await User.findOne({
        email
    });

    if (user) {
        res.status(409).send({
            msg: "Email already in use"
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = User({
        email,
        password: passwordHash,
        name,
    });

    await result.save();

    jwt.sign({
            id: result.id,
            admin: false,
        },
        process.env.JWT_SECRET, {
            expiresIn: "2d",
        },
        (err, token) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({
                token
            });
        }
    );
});

//Login user
router.post("/login", async(req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({
        email
    });

    if (!user) return res.sendStatus(401);
    const {
        id,
        isAdmin
    } = user;
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        jwt.sign({
                id,
                admin: isAdmin
            },
            process.env.JWT_SECRET, {
                expiresIn: "2d"
            },
            (err, token) => {
                if (err) {
                    res.status(500).json(err);
                }

                res.status(200).json({
                    token
                });
            }
        );
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;