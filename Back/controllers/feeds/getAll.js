const db = require('../../db/index').getInstance();
const Op = require('sequelize').Op;

module.exports = async (req, res, next) => {
    try {
        
        const feedModel = await db.getModel('feeds');

        const allFeeds = await feedModel.findAll({ attributes: ['id', 'url'] });

        res.status(200).json({
            succses: true,
            allFeed: allFeeds
        });

    } catch (e) {

        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};
