const db = require('../../db/index').getInstance();
const Feed = require('rss-to-json');
const fs = require('fs');

module.exports = async (req, res, next) => {
    try {

        const feedModel = await db.getModel('feeds');

        const { id, username } = req.query;
        const feeddb = await feedModel.findOne({
            where: {
                id, 
                username
            }
        });

        if (feeddb) {
            
            Feed.load(feeddb.url, function (err, rss) {

                if(err) {
                    res.status(200).json({
                        succses: false,
                        feeddb,
                        msg: 'Not parsed rss url!!!'
                    });
                };

                let dir = './files/' + feeddb.username;
                
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }

                let fileName = dir + '/rssfile' + feeddb.id + '.json';

                fs.writeFile(fileName, JSON.stringify(rss), async (err) => {
                    if (err) throw err;
                    console.log('Saved!');
                    
                    await feedModel.update({ 
                        definition: fileName 
                    }, { 
                        where: {
                            id,
                            username
                    }});
                });

                res.status(200).json({
                    succses: true,
                    feeddb,
                    rss
                });
            });
        } else {
            res.status(400).json({
                succses: false,
                msg: 'feeddb not found!!!'
            });
        }; 

    } catch (e) {

        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};
