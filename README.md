# CS602 Server-Side Web Development Final Project
## Getting Started
- Setup Mongodb locally - see Secrets.js for creds/port (for CS602, this is the standard creds)
- Run dbInitialization.js to setup DB collections
- Run server.js

## ASSUMPTIONS
For the scope of this class, we have to assume the user cannot add songs to the spotify playlist via the spotify app directly. This will require a great deal of out-of-scope syncing work. I have a plan for this (a timed job, and any out of sync songs would be created by the anonymous user) but this will take some time.

## TODOS
- UNIT TESTS!
- Use ajax to update playlist and search pages
- Use real 'login'
- Security review - injection, cross-site scripting, etc.
- Add full support for syncing and history - need a timed job to sync playlist
- Add access control (username/password? Token?) for the API