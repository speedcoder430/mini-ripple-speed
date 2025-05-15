// POST /fetch-ga-data
const axios = require('axios');
const UserModel = require('../models/user.model');

exports.fetchGAData = async (req, res) => {
  const { token, propertyId, email } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Missing access token' });
  }

  try {
    const result = await axios.post(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        dimensions: [
          { name: 'dateHour' },
          { name: 'country' },
          { name: 'city' },
          { name: 'browser' },
          { name: 'hostName' },
          { name: 'deviceCategory' },
          { name: 'pagePath' },
          { name: 'sessionSource' },
          { name: 'sessionMedium' }
        ],
        metrics: [
          { name: 'activeUsers' },
          { name: 'newUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'engagementRate' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' }
        ],
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        limit: 100000 // max allowed by the API
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    await UserModel.findOneAndUpdate(
      { email },
      { $set: { gaPropertyId: propertyId } }
    );

    res.json(result.data);
  } catch (error) {
    console.error('Google Analytics API error:', error.response?.data || error.message);
    error.response?.data?.error?.code === 401 ? res.status(401).json({ error: 'Failed to fetch GA data' }) : res.status(500).json({ error: 'Failed to fetch GA data' });
  }
};

exports.getConnectedDomains = async (req, res) => {
  const { token, propertyId, email } = req.body;

  if (!token || !propertyId) {
    return res.status(400).json({ error: 'Missing access token or property ID' });
  }

  try {
    // Call the Admin API
    const response = await axios.get(
      `https://analyticsadmin.googleapis.com/v1beta/properties/${propertyId}/dataStreams`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Filter for Web streams and get the domain name
    const domains = response.data.dataStreams
      .filter(stream => stream.type === 'WEB_DATA_STREAM')
      .map(stream => ({
        displayName: stream.displayName,
        defaultUri: stream.webStreamData?.defaultUri
      }));

    await UserModel.findOneAndUpdate(
      { email },
      { $set: { gaDefaultDomain: domains[0]?.defaultUri } }
    );

    res.status(200).json({ domains });
  } catch (error) {
    console.error('Admin API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch domains', details: error.response?.data });
  }
};
