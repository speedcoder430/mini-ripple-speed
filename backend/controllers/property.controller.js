const validator = require("validator");
const Property = require("../models/property.model");
const { randomUUID } = require("crypto");

// Helper to generate unique propertyId with prefix MR-
const generatePropertyId = () => {
  return `MR-${randomUUID().split("-")[0]}`; // e.g. MR-9f1c2a3b
};
// Create or Update User's Single Property
exports.createOrUpdateProperty = async (req, res) => {
  try {
    const { propertyName, domain } = req.body;
    // const userId = req.user._id; // Get user ID from auth middleware
    const userId = "64fa66c3c3b7d0a9a0f1a111";

    if (!propertyName || !domain) {
      return res.status(400).json({ 
        success: false, 
        error: "Property name and domain are required." 
      });
    }

    // Clean domain input — remove protocol and trailing slashes
    const cleanedDomain = domain
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "")
      .replace(/^www\./, "");

    // Validate domain (subdomains allowed)
    if (!validator.isFQDN(cleanedDomain)) {
      return res.status(400).json({
        success: false,
        error: "Invalid domain format. Use a valid domain like 'app.example.com'.",
      });
    }

    // Check if domain is already registered by another user
    const existingDomain = await Property.findOne({ 
      domain: cleanedDomain,
      user: { $ne: userId } // Exclude current user's properties
    });

    if (existingDomain) {
      return res.status(400).json({
        success: false,
        error: "This domain is already registered by another user.",
      });
    }

    // Try to find existing property for this user
    let property = await Property.findOne({ user: userId });

    if (property) {
      // Update existing property
      property.propertyName = propertyName;
      property.domain = cleanedDomain;
      await property.save();
      
      return res.status(200).json({
        success: true,
        message: "Property updated successfully",
        data: {
          propertyId: property.propertyId,
          propertyName: property.propertyName,
          domain: property.domain,
          status: property.status,
        },
      });
    } else {
      // Create new property
      const propertyId = generatePropertyId();
      property = new Property({
        propertyId,
        propertyName,
        domain: cleanedDomain,
        user: userId,
        status: 'active'
      });
      
      await property.save();
      
      return res.status(201).json({
        success: true,
        message: "Property created successfully",
        data: {
          propertyId: property.propertyId,
          propertyName: property.propertyName,
          domain: property.domain,
          status: property.status,
        },
      });
    }

  } catch (error) {
    console.error('Error in createProperty:', error);
    res.status(500).json({ 
      success: false, 
      error: "Server error while processing property" 
    });
  }
};

// Get user's property
exports.getUserProperty = async (req, res) => {
  try {
    // const userId = req.user._id; // Get user ID from auth middleware
    const userId = "64fa66c3c3b7d0a9a0f1a111";
    
    const property = await Property.findOne({ user: userId });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        error: "No property found for this user",
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        propertyId: property.propertyId,
        propertyName: property.propertyName,
        domain: property.domain,
        status: property.status,
      }
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get 's property status
exports.CheckDomainStatus = async (req, res) => {
  try {
    // const userId = req.user._id; // Get user ID from auth middleware
    const userId = "64fa66c3c3b7d0a9a0f1a111";
    
    const property = await Property.findOne({ user: userId });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        error: "No property found for this user",
      });
    }
    
    res.status(200).json({
      success: true,
      data:{
        domainStatus: property.status,
        propertyId: property.propertyId  
      }
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


// Get All Properties
exports.getAllProperties = async (req, res) => {
  const userId = req.params.userId;
  try {
    const properties = await Property.find({ user: userId });
    res.status(200).json({ success: true, properties: properties });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get Single Property
exports.getPropertyByPropertyId = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findOne({ propertyId: propertyId });
    console.log("Property:", property);
    // Check if properties array is empty
    if (!property) {
      return res.status(404).json({
        success: false,
        error: "No properties found",
      });
    }
    console.log("Property:", property);
    res.status(200).json({ success: true, property: property });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Update Property
exports.updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    var { propertyName, domain } = req.body;

    // Clean domain input — remove protocol and trailing slashes
    domain = domain
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "")
      .replace(/^www\./, "");

    const property = await Property.findOne({ propertyId: propertyId });

    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    if (domain) property.domain = domain;
    if (propertyName) property.propertyName = propertyName;
    // Status is not updated here as it has a dedicated endpoint

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Delete Property
// Toggle Property Status (Active/Inactive)
exports.togglePropertyStatus = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { status } = req.body;
    
    // Validate status
    if (!status || !['active', 'inactive'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        error: "Status must be either 'active' or 'inactive'" 
      });
    }

    const property = await Property.findOne({ propertyId: propertyId });
    
    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    // Update status
    property.status = status;
    await property.save();

    res.status(200).json({
      success: true,
      message: `Property status updated to ${status}`,
      property,
    });
  } catch (error) {
    console.error("Error updating property status:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findOne({ propertyId: propertyId });
    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    const result = await Property.findByIdAndDelete(property._id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
