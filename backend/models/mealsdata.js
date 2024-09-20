const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./users');

// Define the MealData schema with timestamps
const mealdataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  // User Name field with validations
  userName: {
    type: String,
    required: [true, 'User name is required'], // Required field validation
    maxlength: [20, 'User name cannot exceed 20 characters'], // Max length validation
    match: [/^[A-Za-z][A-Za-z0-9_#]{0,19}$/, 'User name must start with a letter and contain only letters, numbers, underscore, or hash'], // Regex to validate username
  },
  // Gender field with validations
  gender: {
    type: String,
    required: [true, 'Gender is required'], // Required field validation
    enum: ['Male', 'Female'], // Only two options for gender
  },
  // Email field with validations
  email: {
    type: String,
    required: [true, 'Email is required'], // Required field validation
    maxlength: [250, 'Email cannot exceed 250 characters'], // Max length validation
    validate: {
      validator: function (value) {
        // Custom email validation logic
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
        const atSymbolCount = (value.match(/@/g) || []).length;
        if (atSymbolCount !== 1) return false; // Ensure only one '@'
        if (value.includes('..')) return false; // Prevent consecutive dots
        const plusIndex = value.indexOf('+');
        const atIndex = value.indexOf('@');
        if (plusIndex > 0 && plusIndex > atIndex) return false; // '+' must be before '@'
        return emailRegex.test(value);
      },
      message: 'Invalid email format',
    },
  },
  // Phone Number field (non-mandatory)
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return value ? /^\+91\d{10}$/.test(value) : true; // Validate phone number if provided
      },
      message: 'Phone number must start with +91 and contain 10 digits',
    },
  },
  // Location field with validations
  location: {
    type: String,
    required: [true, 'Location is required'], // Required field validation
    enum: ['Chennai', 'Erode', 'Coimbatore'], // Valid locations
    default: 'Chennai', // Default value for location
  },
  // Meal Type field with validations
  mealType: {
    type: [String], // Array of meal types
    required: [true, 'At least one meal type must be selected'], // Required field validation
    validate: {
      validator: function (value) {
        // Meal types based on location
        const mealOptions = {
          Chennai: ['Breakfast', 'Lunch'],
          Erode: ['Lunch', 'Dinner'],
          Coimbatore: ['Breakfast', 'Lunch', 'Dinner'],
        };
        return value.every((meal) => mealOptions[this.location].includes(meal));
      },
      message: 'Selected meal types do not match the location',
    },
  },
  // Date field with validations
  date: {
    type: Date,
    required: [true, 'Date is required'], // Required field validation
  },
  // Total Amount field
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'], // Required field validation
  },
}, 
// Enable timestamps to add `createdAt` and `updatedAt` fields
{
  timestamps: true,
});

// Create and export the MealData model
const Mealdata = mongoose.model('Mealdata', mealdataSchema);

module.exports = Mealdata;
