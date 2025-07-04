const express = require('express');
const {
    createContact,
    getAllContacts,
    updateContact,
    deleteContact
} = require('../controllers/contactController');
const router = express.Router();

router.post('/create', createContact);
router.get('/all', getAllContacts);
router.put('/status', updateContact);
router.delete('/delete/:id', deleteContact);

module.exports = router;