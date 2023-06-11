const express = require('express');
const { google } = require('googleapis');
const AccessToken = require('../models/AccessToken');
const config = require('../config.js');

const router = express.Router();

const getAccessToken = async (req, res, next) => {
  try {
    const accessToken = await AccessToken.findOne().sort({ createdAt: -1 });
    if (!accessToken) {
      res.status(401).json({ error: 'Access Token not found' });
    }
    req.accessToken = accessToken.token;
    next();
  } catch (error) {
    console.error('Access Token fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const authorizeClient = async (req, res, next) => {
  try {
    // Set the access token for the OAuth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.accessToken });

    // Set the OAuth2 client to the request object
    req.driveClient = google.drive({ version: 'v3', auth: oauth2Client });
    next();
  } catch (error) {
    console.error('Google Drive authorization error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Revoke Google Drive access
router.post('/', getAccessToken, authorizeClient, async (req, res) => {
  try {
    const driveClient = req.driveClient;

    await driveClient.revoke();

    await AccessToken.deleteMany();

    res.json({ message: 'Google Drive access revoked' });
  } catch (error) {
    console.error('Access revocation error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
