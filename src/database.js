import Promise from 'bluebird';
import elasticsearch from 'elasticsearch';
import config from './config';

const dbClient = new elasticsearch.Client({
    host: config.elasticSearch,
    log: 'trace'
});



class Database {
    constructor() {

        this.initialized = false;

        dbClient.ping(err => {
            this.initialized = err ? false : true;
        });
    }

}

const database = new Database();


export
default database;