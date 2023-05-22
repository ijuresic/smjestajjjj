    const Place = require('../models/Place');
const userFromToken = require('../utils/userFromToken');

exports.addPlace = async (req, res) => {
  try {
    const userData = userFromToken(req);
    
    const {
      title,
      address,
      addedPhotos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    console.log(title,
      address,
      addedPhotos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price)
    const place = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description: desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    
    res.status(200).json({
      place,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    console.log(places)
    res.status(200).json({
      places,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const {
      id,
      title,
      address,
      addedPhotos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    const place = await Place.findById(id);
    if (place) {
      place.set({
        title,
        address,
        photos: addedPhotos,
        description: desc,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await place.save();
      res.status(200).json({
        message: 'Place updated!',
      });
    } else {
      res.status(400).json({
        message: 'Place not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.singlePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (place) {
      res.status(200).json({
        place,
      });
    } else {
      res.status(400).json({
        message: 'Place not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.userPlaces = async (req, res) => {
  try {
    const { userId } = req.params;
    const places = await Place.find({ owner: userId });
    res.status(200).json(places);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.searchPlaces = async (req, res) => {
  try {
    const searchword = req.params.key;

    if (searchword === '') {
      const places = await Place.find();
      res.status(200).json(places);
    } else {
      const searchMatches = await Place.find({ address: { $regex: searchword, $options: "i" } });
      res.status(200).json(searchMatches);
    }
  } catch (err) {
    console.log(err)
    res.status(  500).json({
      message: 'Internal server error',
    });
  }
};