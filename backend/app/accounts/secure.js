const SHA256 = require('crypto-js/sha256');

const { paddingString } = require('../../data/confidential-data/padding');

const hash = string => {
    return SHA256(`${paddingString}${string}${paddingString}`).toString() ;
}

module.exports = { hash };