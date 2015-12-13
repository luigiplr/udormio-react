import scrypt from 'scrypt';
import Promise from 'bluebird';

const scryptParameters = scrypt.params(0.1);
const salt = new Buffer('DkM8rLGgE0CaWuQ6lp5QF6NdqbB9wVs1fTlOKIvHENWK41g3K2fALzgz8Xf4E0Ui');


class User {

    constructor() {

        this.password = {
            hash: this.hashPass,
            validate: this.validatePass
        };


    }

    hashPass(password) {
        return new Promise((resolve, reject) => {
            scrypt.kdf(password, scryptParameters, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result.toString('base64'));
            });
        });
    }

    validatePass(hash, input) {
        return new Promise((resolve, reject) => {
            scrypt.verifyKdf(hash, new Buffer(input), (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
            });
        });
    }


}

export
default new User();