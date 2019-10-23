const db = require('../../db/index').getInstance();

module.exports = async (req, res, next) => {
    try {
        const feedModel = db.getModel('feeds');
        const { username, password } = req.body;       
        
        if (!username || !password) throw new Error('Some field is empty!');
        
        const isReg = await feedModel.findOne({
            where: {
                username,
            }
        });

        if (!isReg) throw new Error('You are not register!!!');

        res.status(200).json({
            succses: true,
            token: {
                accessToken: 'token',
                type: 'Bearer'    
            }
        });

    } catch (e) {
        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
}