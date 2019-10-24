const db = require('../../db/index').getInstance();

module.exports = async (req, res, next) => {
    try {
        
        const feedModel = await db.getModel('feeds');

        const {username} = req.body;
        const allFeeds = await feedModel.findAll({ 
            where: {
                username
        }});

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
