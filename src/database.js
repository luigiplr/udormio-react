import Promise from 'bluebird';
import elasticsearch from 'elasticsearch';
import {
    v1 as uuid
}
from 'node-uuid';
import config from './config';

const dbClient = new elasticsearch.Client({
    host: config.elasticSearch,
    log: 'info'
});


class Database {

    constructor() {

        this.user = {
            create: this.createUser,
            validate: this.validateUser,
            update: this.updateUser
        };

        dbClient.ping(err => {
            if (err)
                return console.error(err)
            this.initIndices();
        });
    }

    initIndices() {
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

    updateUser(params) {


    }

    validateUser(params) {
        return this.search('users', 'profile', {
            query: {
                match: {
                    email: params.email,
                    password: params.password
                }
            },
        });
    }

    createUser(params) {
        return this.create('users', 'profile', uuid(), params);
    }


    search(index, body) {
        return new Promise((resolve, reject) => {
            dbClient.search({
                index: index,
                body: body
            }, (error, response) => {
                if (error)
                    return reject(error);
                resolve(response);
            });
        });
    }

    create(index, type, id, body) {
        return new Promise((resolve, reject) => {
            dbClient.create({
                index: index,
                type: type,
                id: id,
                body: body
            }, (error, response) => {
                if (error)
                    return reject(error);
                resolve(response);
            });
        });
    }


}

const database = new Database();


export
default database;