const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const { findSummation, uppercaseFirstandLast, findAverageAndMedian, findFourDigits } = require('./functions');

router.use(cookieParser());


router.post('/findSummation', (req, res) => {
    const { n } = req.body;
    const result = findSummation(parseInt(n));
    res.send(`The summation is: ${result}`);
});

router.post('/uppercaseFirstandLast', (req, res) => {
    const { str } = req.body;
    const result = uppercaseFirstandLast(str);
    res.send(`Modified string: ${result}`);
});

router.post('/findAverageAndMedian', (req, res) => {
    const arr = req.body.arr.split(',').map(Number);
    const result = findAverageAndMedian(arr);
    res.send(`Average: ${result.average}, Median: ${result.median}`);
});

router.post('/findFourDigits', (req, res) => {
    const { str } = req.body;
    const result = findFourDigits(str);
    res.send(`First four-digit number: ${result}`);
});


router.get('/numOfVisits', (req, res) => {
    let visits = req.cookies.visits ? parseInt(req.cookies.visits) : 0;
    let lastVisit = req.cookies.lastVisit ? new Date(req.cookies.lastVisit) : null;

    visits += 1;

    res.cookie('visits', visits, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year expiration
    res.cookie('lastVisit', new Date().toString(), { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year expiration

    let message;
    if (visits === 1) {
        message = 'Welcome to my webpage! It is your first time that you are here.';
    } else {
        let lastVisitMessage = `Last time you visited my webpage on: ${lastVisit.toString()}`;
        message = `Hello, this is the ${visits} time that you are visiting my webpage.<br>${lastVisitMessage}`;
    }

    res.send(`<html><body><p>${message}</p></body></html>`);
});

router.post('/validatePhoneNumber', (req, res) => {
    const { phoneNumber } = req.body;
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    
    if (phonePattern.test(phoneNumber)) {
        res.send('The phone number format is correct.');
    } else {
        res.send('The phone number format is incorrect. Please enter in the format ddd-ddd-dddd.');
    }
});


router.post('/createAccount', (req, res) => {
    const { username, password } = req.body;
    const loginFilePath = path.join(__dirname, '../data/logins.txt');
    
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

    if (!usernamePattern.test(username) || !passwordPattern.test(password)) {
        return res.redirect('/create_account.html?error=invalid'); 
    }

    fs.readFile(loginFilePath, 'utf8', (err, data) => {
        if (err) throw err;

        if (data.includes(`${username}:`)) {
            return res.redirect('/create_account.html?error=exists'); 
        } else {
            fs.appendFile(loginFilePath, `${username}:${password}\n`, (err) => {
                if (err) throw err;
                res.redirect('/login.html'); 
            });
        }
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const loginFilePath = path.join(__dirname, '../data/logins.txt');

    fs.readFile(loginFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('An error occurred on the server.');
        }

        const loginValid = data.split('\n').some(line => {
            const [storedUsername, storedPassword] = line.split(':');
            return storedUsername === username && storedPassword === password;
        });

        if (loginValid) {
            req.session.user = username;
            res.redirect('/home_page.html?status=success'); 
        } else {
            res.redirect('/login.html?status=fail'); 
        }
    });
});

router.post('/loginForGiveAway', (req, res) => {
    const { username, password } = req.body;
    const loginFilePath = path.join(__dirname, '../data/logins.txt');

    fs.readFile(loginFilePath, 'utf8', (err, data) => {
        if (err) throw err;

        const loginValid = data.split('\n').some(line => line === `${username}:${password}`);
        
        if (loginValid) {
            req.session.user = username;
            res.send('success'); 
        } else {
            res.send('fail'); 
        }
    });
});

router.get('/logout', (req, res) => {

    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('An error occurred while logging out.');
        }

        res.redirect('/logout.html');
    });
});


router.post('/giveAwayPet', (req, res) => {
    if (!req.session.user) {
        return res.send('You must be logged in to give away a pet.');
    }

    const petData = [
        req.body.type, 
        req.body.breed, 
        req.body.age, 
        req.body.gender, 
        req.body["other-pets"],  
        req.body["small-children"], 
        req.body.description
    ].join(':');
    
    const petFilePath = path.join(__dirname, '../data/pets.txt');

    fs.readFile(petFilePath, 'utf8', (err, data) => {
        if (err) throw err;

        const petId = data.split('\n').filter(line => line.trim() !== '').length + 1;
        const petEntry = `${petId}:${req.session.user}:${petData}\n`;

        fs.appendFile(petFilePath, petEntry, (err) => {
            if (err) throw err;

            res.redirect('/give_away.html?status=success&loggedIn=true');
        });
    });
});

router.post('/findPet', (req, res) => {
    const { type, breed, age, gender } = req.body;
    const petFilePath = path.join(__dirname, '../data/pets.txt');

    fs.readFile(petFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('An error occurred while reading the file.');
        }

        const matchingPets = data.split('\n').filter(line => {
            const [ , , petType, petBreed = '', petAge, petGender] = line.split(':');
            return (
                (!type || type === 'any' || petType === type) &&
                (!breed || breed === '' || (petBreed && petBreed.toLowerCase().includes(breed.toLowerCase()))) &&
                (!age || age === 'any' || petAge === age) &&
                (!gender || gender === 'any' || petGender === gender)
            );
        });

        if (matchingPets.length > 0) {
            res.send(matchingPets.join('\n'));
        } else {
            res.send('No matching pets found.');
        }
    });
});

module.exports = router;
