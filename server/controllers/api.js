// TODO: Add access control (username/password? Token?) for the APIs.
// TODO: Probably should break this out into a different service and have it behind a separate ELB/SG in AWS
const
    playlistModel = require('../models/playlistModel'),
    xml = require('xml');

let getPlaylist = async (req, res) => {
    let data = await playlistModel.getTracksInPlaylist();
    let format = getFormat(req.accepts());

    if (format === 'APPLICATION/JSON') {
        res.json(data.tracks);
    } else if (format === 'APPLICATION/XML') {
        res.set('Content-Type', 'application/xml');

        res.send(formatXMLTracks(data.tracks));
    }
};

let getHistoryByUser = async (req, res) => {
    let tracks = await playlistModel.getTracksByName(req.params.user);
    let format = getFormat(req.accepts());

    if (format === 'APPLICATION/JSON') {
        res.json(tracks);
    } else if (format === 'APPLICATION/XML') {
        res.set('Content-Type', 'application/xml');

        res.send(formatXMLTracks(tracks));
    }
};

let getFormat = (accepts) => {
    let format = "APPLICATION/JSON";

    // Find format -- could contain multiple items (is an array) so we will default to json
    for (let i = 0; i < accepts.length; i++) {
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

let formatXMLTracks = (tracks) => {
    let xmlObject = [{ 'tracks': [] }];

    tracks.forEach(track => {
        xmlObject[0].tracks.push({
            'track': [
                {
                    'user': track.user
                },
                {
                    'title': track.title
                },
                {
                    'artist': track.artist
                },
                {
                    'imageUri': track.imageUri
                },
                {
                    'album': track.album
                },
                {
                    'trackUri': track.trackUri
                },
                {
                    'artistUri': track.artistUri
                }
            ]
        });
    });

    return xml(xmlObject);
};

module.exports = {
    getPlaylist: getPlaylist,
    getHistoryByUser: getHistoryByUser
};