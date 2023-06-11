const express = require('express');
const { google } = require('googleapis');
const AccessToken = require('../models/AccessToken');
const config = require('../config.js');

const router = express.Router();

// Retrieve the access token from the database
const getAccessToken = async (req, res, next) => {
  try {
    const accessToken = await AccessToken.findOne().sort({ createdAt: -1 });
    if (!accessToken || !accessToken.token) {
      return res.status(401).json({ error: 'Access Token not found' });
    }
    req.accessToken = accessToken.token;
    next();
  } catch (error) {
    console.error('Access Token fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Authorize the Google Drive API client
const authorizeClient = async (req, res, next) => {
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.accessToken });

    req.driveClient = google.drive({ version: 'v3', auth: oauth2Client });
    next();
  } catch (error) {
    console.error('Google Drive authorization error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get analytics data
router.get('/', getAccessToken, authorizeClient, async (req, res) => {
  try {
    const driveClient = req.driveClient;

    // Fetch file data from the user's Google Drive account
    const response = await driveClient.files.list({
      fields: 'files(mimeType, size)',
    });
    const files = response.data.files;

    // Calc analytics
    const analytics = {
      fileType: {}, 
      fileSize: 0,
      storageUsage: 0,
    };

    files.forEach((file) => {
      // Increment file type count
      if (file.mimeType in analytics.fileType) {
        analytics.fileType[file.mimeType]++;
      } else {
        analytics.fileType[file.mimeType] = 1;
      }

      // Accumulate file size and storage usage
      analytics.fileSize += file.size || 0;
      analytics.storageUsage += file.size || 0;
    });

    res.json({ data: analytics });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
