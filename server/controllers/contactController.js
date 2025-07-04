const Contact = require('../models/Contact');

// Create a new contact
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message
        });

        await newContact.save();

        return res.status(200).json({
            success: true,
            message: 'Contact created successfully',
            data: newContact
        });
    } catch (error) {
        console.error('Error creating contact:', error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating contact',
            error: error.message
        });
    }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();

        return res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching contacts',
            error: error.message
        });
    }
};

// Update a contact by ID
exports.updateContact = async (req, res) => {
    try {
        const { id, status } = req.body;

        if (!status || !id) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const updatedContact = await Contact.findByIdAndUpdate(id, { status }, { new: true });

        return res.status(200).json({
            success: true,
            data: updatedContact,
            message: 'Contact updated successfully',
        });
    } catch (error) {
        console.error('Error updating contact:', error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating contact',
            error: error.message
        });
    }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Contact deleted successfully',
            data: deletedContact
        });
    } catch (error) {
        console.error('Error deleting contact:', error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting contact',
            error: error.message
        });
    }
};