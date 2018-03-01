// Example file to show how the creds should look since they aren't included in source control
module.exports = {
    dev: {
        spotify: {
            access_token: 'xxx',
            refresh_token:'yyy',
            client_id: 'zzz',
            client_secret: 'aaa',
            user_id:'asdf',
            playlist_id: 'qwerty'
        },
        host:       'localhost',
        port:       '27017',
        username:   'xxx',
        password:   'xxx',
        database:   'xxx'
    },
    test: {},
    prod: {}
};

