const Property = require('../models/property.model');

/**
 * Middleware to get the property from request
 * Either from query param, body or user's default property
 */
exports.getProperty = async (req, res, next) => {
  try {
    let propertyId;
    
    // Check if propertyId is in query params
    if (req.query.propertyId) {
      propertyId = req.query.propertyId;
    } 
    // Check if propertyId is in request body
    else if (req.body.propertyId) {
      propertyId = req.body.propertyId;
    } 

    console.log("propertyId", propertyId);
    
    // // If no propertyId found, try to get the first property associated with the user
    // if (!propertyId) {
    //   const userProperties = await Property.find({ user: req.user._id }).limit(1);
    //   if (userProperties && userProperties.length > 0) {
    //     propertyId = userProperties[0]._id;
    //   }
    // }
    
    if (!propertyId) {
      return res.status(400).json({ error: 'No property found. Please specify a propertyId or create a property first.' });
    }
    
    // Find the property
    const property = await Property.findOne({ 
      propertyId : propertyId,
      // user: req.user._id // Ensure the property belongs to the user
    });
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found or you do not have access to it' });
    }
    
    // Attach property to request object
    req.property = property;
    next();
  } catch (error) {
    console.error('Property middleware error:', error);
    res.status(500).json({ error: 'Error processing property request' });
  }
};
