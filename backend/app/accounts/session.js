const uuid = require('uuid/v4');
const{ hash } = require('./secure');

const SEPARATOR = '|';

class Session {
    constructor ({ username }) {
        this.username = username;
        this.id = uuid();
    }

    //returns sessionString
    toString() {
        const { username, id } = this;
        return Session.sessionString({ username, id });
    }

    //separates useranme, id, idhash 
    static parse( sessionString ) {
        const sessionData = sessionString.split( SEPARATOR );

        return {
            username: sessionData[0],
            id: sessionData[1],
            sessionHash: sessionData[2]
        };
    }

    //verifies idHash of of client for authentication
     static verify( sessionString ) {
        const { username, id, sessionHash } = Session.parse( sessionString );
        const acountData = Session.accountData({ username, id });

        return hash(acountData) === sessionHash;
     }

    //acountdata returns "username|id"
    static accountData({ username, id }) {
        return `${username}${SEPARATOR}${id}`;
    }

    //sessionString return "username|id|idHash"
    static sessionString({ username, id }) {
        const accountData = Session.accountData({ username, id});
        return `${accountData}${SEPARATOR}${hash(accountData)}`;
    }
}

module.exports = Session;
