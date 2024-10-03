import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModels.js';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import hashPassword from '../utils/hashPassword.js';
import matchPassword from '../utils/matchPasswords.js';

const userControllers = {
    getLoginForm: (req, res) => {
        res.status(200).render('get-login-form');
    },
    login: (req, res) => {
        const { email, password } = req.body;

        //check if email exist
        const emailExist = User.getUserByEmail(email);
        if (!emailExist) {
            return res.status(400).render('404', {
                title: 'Your email does not exist in the data base',
                message: 'Please register'
            });
        }

        //check if the password is correct
        bcrypt.compare(password, emailExist.password, (err, isValid) => {
            if (err) {
                console.error(err);
            }

            if (!isValid) {
                return res.status(400).render('404', {
                    title: 'Invalid password or email',
                    message: 'Invalid password or email'
                });
            }

            //create token
            const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
            //set cookie
            res.cookie('token', token, { httpOnly: true });
            res.status(302).redirect('/api/dogs');
        });
    },

    getRegisterForm: (req, res) => {
        res.status(200).render('get-register-form');
    },
    register: (req, res) => {
        const { email, password, rePassword } = req.body;

        //check if the email exist
        const emailExist = User.getUserByEmail(email);
        if (emailExist) {
            return res.status(400).render('404', {
                title: 'Your email already exists',
                message:
                    'Your email already exists, please login to your account'
            });
        }
        //validate email, password and check if the passwords match
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const doPasswordsMatch = matchPassword(password, rePassword);

        if (isEmailValid && isPasswordValid && doPasswordsMatch) {
            //hash password
            const hashedPassword = hashPassword(password);
            console.log(hashedPassword);

            //create user
            const newUser = User.add({ email, password: hashedPassword });
            //redirect to login
            return res.status(302).redirect('/api/login');
        } else {
            return res.status(400).render('404', {
                title: 'Incorrect email or password',
                message: 'Incorrect email or password'
            });
        }
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(302).redirect('/api/dogs');
    }
};

export default userControllers;
