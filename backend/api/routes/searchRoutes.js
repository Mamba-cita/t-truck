const express = require('express');
const router = express.Router();
const { search } = require('../controllers/searchController');

router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const searchResults = await search(keyword);
    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
