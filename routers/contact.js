const express = require('express');
const router = express.Router();
const { Contact, contactSchema } = require('../models/contact');
const validate = require('../middlewares/validate');

router.get('/socket', async (req, res, next) => {
    try {
        res.render("contact");
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        next(err);
    }
});

router.get('/findbyName/:name', async (req, res, next) => {
    try {
        const contacts = await Contact.find({ name: req.params.name });
        res.json(contacts);
    } catch (err) {
        next(err);
    }
});

router.post('/', validate(contactSchema), async (req, res, next) => {
    try {
        const contact = new Contact({
            name: req.body.contactName,
            phone: req.body.contactPhone
        });
        await contact.save();
        res.status(201).send("Contact has been created");
    } catch (err) {
        next(err);
    }
});

router.delete('/deleteContact/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.send('Contact has been deleted');
    } catch (err) {
        next(err);
    }
});

router.put('/updateContact/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedContact = await Contact.findByIdAndUpdate(id, {
            name: req.body.contactName,
            phone: req.body.contactPhone
        }, { new: true });
        res.json(updatedContact);
    } catch (err) {
        next(err);
    }
});

module.exports = router;