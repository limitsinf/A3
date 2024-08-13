const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views/home_page.html')));
router.get('/home_page.html', (req, res) => res.sendFile(path.join(__dirname, '../views/home_page.html')));
router.get('/browse_pets.html', (req, res) => res.sendFile(path.join(__dirname, '../views/browse_pets.html')));
router.get('/find_pets.html', (req, res) => res.sendFile(path.join(__dirname, '../views/find_pets.html')));
router.get('/give_away.html', (req, res) => res.sendFile(path.join(__dirname, '../views/give_away.html')));
router.get('/create_account.html', (req, res) => res.sendFile(path.join(__dirname, '../views/create_account.html')));
router.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, '../views/login.html')));
router.get('/contact_us.html', (req, res) => res.sendFile(path.join(__dirname, '../views/contact_us.html')));
router.get('/disclaimer.html', (req, res) => res.sendFile(path.join(__dirname, '../views/disclaimer.html')));
router.get('/dog_care.html', (req, res) => res.sendFile(path.join(__dirname, '../views/dog_care.html')));
router.get('/cat_care.html', (req, res) => res.sendFile(path.join(__dirname, '../views/cat_care.html')));
router.get('/logout.html', (req, res) => res.sendFile(path.join(__dirname, '../views/logout.html')));

router.get('/findSummation.html', (req, res) => res.sendFile(path.join(__dirname, '../views/findSummation.html')));
router.get('/uppercaseFirstandLast.html', (req, res) => res.sendFile(path.join(__dirname, '../views/uppercaseFirstandLast.html')));
router.get('/findAverageAndMedian.html', (req, res) => res.sendFile(path.join(__dirname, '../views/findAverageAndMedian.html')));
router.get('/findFourDigits.html', (req, res) => res.sendFile(path.join(__dirname, '../views/findFourDigits.html')));
router.get('/numOfVisits.html', (req, res) => res.sendFile(path.join(__dirname, '../views/numOfVisits.html')));
router.get('/validatePhoneNumber.html', (req, res) => res.sendFile(path.join(__dirname, '../views/validatePhoneNumber.html')));

module.exports = router;
