import express from 'express';
import User from '../models/Users.js';

const router = new express.Router();

//! POST /auth/signup  (Register New User)

router.post('/signup', async (req, res) => {
  try {
    const emailInUse = await User.findOne({ email: req.body.email });

    if (emailInUse) {
      return res.send('Email in use!');
    }

    const user = await User.create(req.body);

    res.send(user);

  } catch (error) {
    console.log(error);
  }
});

//! POST /auth/signin  (Authenticate an existing User)

router.post('/signin', async (req, res) => {
  try {
    const dbUser = await User.findOne({
      email: req.body.email,
    });

    //+ Existing user with Email
    if (!dbUser) {
      return res.send('Check your credentials!');
    }

    //+ Password Match
    if (dbUser.password !== req.body.password) {
      return res.send('Check your password!');
    }

    //+ SEND ALL THE USER DATA
    res.send(dbUser);

  } catch (error) {
    console.log(error);
  }
});

export default router;
