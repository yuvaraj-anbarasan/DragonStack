const SHA256 = require('crypto-js/sha256');

const { paddingString } = require('../../data/confidential-data/padding');

const hash = string => {
    return SHA256(`${paddingString}${string}${paddingString}`).toString() ;
}

module.exports = { hash };ession = new Session({ username });
        const sessionString = session.toString();

        AccountsTable.updateSessionId({
            sessionId: session.id,
            usernameHash: hash(username)
        })
        .then(() =>{ 
            
        res.cookie('sessionString', sessionString, {
            expire: Date.now() + 36000, // sessionString expires in 1 hour
            httpOnly: true, // helps to avoid client side JS to access cookies i.e cross site crypto attacks.
            //secure: true // ensures cookies are sent over secure http i.e https
        });
        resolve({message:"sessionId update successfull"});
        })
        .catch(error => res.json({message:"sessionId update unsuccessful"}));

        
    });
}

module.exports = { setSession };