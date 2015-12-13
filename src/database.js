import Promise from 'bluebird';
import elasticsearch from 'elasticsearch';
import {
    v1 as uuid
}
from 'node-uuid';
import config from './config';

const dbClient = new elasticsearch.Client({
    host: config.elasticSearch,
    log: 'trace'
});

class Database {
    constructor() {

        this.initialized = false;

        dbClient.ping(err => {
            if (!err)
                this.init()
                .then(() => {
                    this.initialized = true;
                });
        });
    }

    init() {
        return new Promise((resolve, reject) => {
            dbClient.indices.create('users', {
                "mappings": {
                    "profile": {
                        "properties": {
                            "email": {
                                "type": "string",
                                "index": "not_analyzed"
                            },
                            "first": {
                                "type": "string"
                            },
                            "last": {
                                "type": "string"
                            },
                            "middle": {
                                "type": "string"
                            },
                            "full": {
                                "type": "string"
                            },
                            "password": {
                                "type": "string",
                                "index": "not_analyzed"
                            },
                            "phone": {
                                "type": "string",
                                "index": "not_analyzed"
                            },
                            "photo": {
                                "properties": {
                                    "thumb": {
                                        "type": "string"
                                    },
                                    "time": {
                                        "type": "double"
                                    }
                                }
                            },
                            "time": {
                                "type": "double"
                            }
                        }
                    }
                }
            }, err => {
                if (err) reject(err)
                else resolve();
            })
        });
    }

    create(index = false, type = false, id = uuid(), params = false, cbType = 'promise') {

        if (!(index || type || params))
            return 'ERR: input';

        switch (cbType) {
            case 'promise':
                return new Promise((resolve, reject) => {
                    dbClient.create({
                        index: index,
                        type: type,
                        id: id,
                        body: params
                    }, (error, response) => {
                        if (error)
                            return reject(error);
                        resolve(response);
                    });
                });
                break;
        }
    }

}

const database = new Database();


export
default database;