import {
    Router
}
from 'express';
import Promise from 'bluebird';
import bodyParser from 'body-parser';
import Database from '../database';
import userUtils from '../core/User';


const router = new Router();

router.post('/login', bodyParser.json(), async(req, res, next) => {
    try {
        const params = req.body;
        console.log(params);

        res.status(200).json({
            status: 'ok'
        });

    } catch (err) {
        next(err);
    }
});

router.get('/register', async(req, res, next) => {
    try {
        const params = req.query;

        if (!(params.password || params.email))
            return res.status(200).json({
                status: 'error',
                error: 'Required parameters not found'
            });


        userUtils.password.hash(params.password, params.email)
            .then(hash => {
                res.status(200).json({
                    status: 'ok',
                    comment: 'yes the hash will be removed in production',
                    hash: hash
                });
            })
            .catch(next)

        //Database.user.create(params)

    } catch (err) {
        next(err);
    }
});

export
default router;