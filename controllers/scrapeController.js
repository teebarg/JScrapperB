const Scrapper = require('../services/scrape');
const User = require("../models").User;
const Email = require("../services/mail");

// Scrape
exports.scrape = async (req, res) => {
    const {target = 50, page = 'https://www.jumia.com.ng'} = req.body;
    try {
        const resp = await Scrapper(target, page)
        res.json(resp);
    } catch (error) {
        res.status(400).json(error)
    }
};

// Subscribe for Updates.
exports.subscribe = async (req, res) => {
    try {
        const { email: to } = await User.create(req.body);
        await Email.SendMail({to}, 'test', 'Your Subscription is Active');

        res.json('User Subscribed Successfully');
    } catch (error) {
        res.status(422).json(error);
    }
};

// Contact Admin.
exports.contact = async (req, res) => {
    try {
        await Email.SendMail({to: process.env.CONTACT, ...req.body}, 'contact', 'Contact Me');
        res.json('Successful');
    } catch (error) {
        res.status(500).json('Something went wrong')
    }
};