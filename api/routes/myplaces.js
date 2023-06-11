const express = require('express');
const jwt = require('jsonwebtoken');
const { userPlaces } = require('../controllers/placeController');

const router = express.Router();

router.get('/user-places', async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'baba');

    const places = await userPlaces(decoded.userId);

    res.json(places);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Neuspjela autorizacija' });
  }
});

module.exports = router;
