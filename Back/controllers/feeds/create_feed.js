const db = require('../../db/index').getInstance();

module.exports = async (req, res) => {
    try {
        const feedModel = db.getModel('feeds');
        const { username, title, url } = req.body;
        
        if (!username || !title || !url ) throw new Error('Some field is empty!');

        await feedModel.create({
            username,
            title,
            url
        });

        res.status(200).json({
            succses: true,
            msg: 'OK'
        });
    } catch (e) {

        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};