import {
    Router
}
from 'express';
import Promise from 'bluebird';

import Database from '../database';

const router = new Router();

router.get('/login', async(req, res, next) => {
    try {
        const params = req.query;
        console.log(params);

        res.status(200).send('Tis okay');
    } catch (err) {
        next(err);
    }
});

router.get('/register', async(req, res, next) => {
    try {
        const params = req.query;

        Database.user.create(params)

    } catch (err) {
        next(err);
    }
});

export
default router;