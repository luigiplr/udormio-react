import scrypt from 'scrypt';
import Promise from 'bluebird';

const scryptParameters = {
    N: 1,
    r: 1,
    p: 1
};

class User {
    constructor() {
        this.password = {
            hash: this.hashPass,
            validate: this.validatePass
        };
    }

    hashPass(password, email) {
        return new Promise((resolve, reject) => {
            if (!(password || email))
                return reject();

            scrypt.hash(new Buffer(password), scryptParameters, 72, new Buffer(email), (err, result) => {
                if (err)
                    return reject(err);
                resolve(result.toString('base64'));
            });
        });
    }

    validatePass(hash, input) {
        return new Promise((resolve, reject) => {
            this.hashPass(input.password, input.email)
                .then(hashed => {
                    resolve((hashed === hash));
                })
                .catch(reject)
        });
    }
}

export
default new User();