const axios = require('axios');

const NEWS_API_URL = 'https://newsapi.org/v2';
const API_KEY = process.env.API_KEY;

const getSources = async (req, res) => {
    try {
        const response = await axios.get(`${NEWS_API_URL}/sources?apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTopHeadlines = async (req, res) => {
    try {
        const { country, category, q } = req.query;
        const response = await axios.get(`${NEWS_API_URL}/top-headlines`, {
            params: { apiKey: API_KEY, country, category, q }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEverything = async (req, res) => {
    try {
        const { q } = req.query;
        const response = await axios.get(`${NEWS_API_URL}/everything`, {
            params: { apiKey: API_KEY, q }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getSources, getTopHeadlines, getEverything };



