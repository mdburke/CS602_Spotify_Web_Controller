# CS602 Server-Side Web Development Final Project
## Custom Spotify Web Controller

- Credentials must be placed at resources/secrets.js. See credentials_example.js for format.

## ASSUMPTIONS
For the scope of this project, we have to assume the user cannot add songs to the spotify playlist via the spotify app directly. This will require a great deal of out-of-scope syncing work.
## TODOS
- Use ajax to update playlist and search pages
- Use real 'login'
- Security review - injection, cross-site scripting, etc.
- Add full support for syncing and history - need a timed job to sync playlist