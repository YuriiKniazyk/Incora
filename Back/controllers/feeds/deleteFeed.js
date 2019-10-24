const Op = require('sequelize').Op;
const db = require('../../db/index').getInstance();

module.exports = async (req, res, next) => {
    try {
        const feedModel = await db.getModel('feeds');
        const {id, username} = req.body;

        await feedModel.destroy({
            where: {
                id, username
            }
        });
        
        res.status(200).json({ 
            succses: true,
            msg: 'ok'
        });

    } catch (e) {

        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};