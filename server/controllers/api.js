// TODO: Add access control (username/password? Token?) for the API
const playlistModel = require('../models/playlistModel');

let getPlaylist = async (req, res) => {
    let data = await playlistModel.getTracksInPlaylist();
    let format = getFormat(req.accepts());

    if (format === 'APPLICATION/JSON') {

    } else if (format === 'APPLICATION/XML') {

    }
};

let getTracks = () => {

};

let getHistoryByUser = () => {

};

let getFormat = (accepts) => {
    let format = "APPLICATION/JSON";

    // Find format -- could contain multiple items (is an array) so we will default to json
    for (let i = 0; i < accepts().length; i++) {
        if (accepts[i].toUpperCase() === 'APPLICATION/JSON') {
            format = 'APPLICATION/JSON';
            break;
        } else if (accepts[i].toUpperCase() === 'APPLICATION/XML') {
            format = 'APPLICATION/XML';
            break;
        }
    }
    return format;
};

module.exports = {
    getPlaylist: getPlaylist,
    getTracks: getTracks,
    getHistoryByUser: getHistoryByUser
};