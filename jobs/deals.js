const Scrapper = require('../services/scrape');
const User = require("../models").User;
const Email = require("../services/mail");

module.exports.DailyDeal = async () => {
    try {
        const target = 50, page = 'https://www.jumia.com.ng';
        const products = await Scrapper(target, page);
        const all = await User.findAll();
        const to = all.map(i => i.email);
       await Email.SendMail({to, products, env: process.env}, 'newsletter', 'Latest Massive Discount');
      } catch (error) {
      }
};