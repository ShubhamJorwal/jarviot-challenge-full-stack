const express = require('express');
const { google } = require('googleapis');
const AccessToken = require('../models/AccessToken');
const config = require('../config.js');

const router = express.Router();

// Creating an oAuth2 client
const oauth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URI
);

//  authentication url
router.get('/login', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive'],
  });

  res.json({ authorizationUrl: authUrl });
});

// Handling the oAuth2 callback
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    const accessToken = tokens.access_token;

    const newAccessToken = new AccessToken({ token: accessToken });
    await newAccessToken.save();

    res.redirect(config.FRONTEND_URL);
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
