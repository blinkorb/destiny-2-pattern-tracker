# Destiny 2 Pattern Tracker

**Track your Destiny 2 craftable weapons & pattern progress**

## Updating Grouping/Hashes

Every so often Bungie release updates and some of the weapon/pattern hashes change.

To update the hashes you first need to run the dev server and wait for the manifest to load.

Once loaded, open the console and run:

```js
updatePatternHashes();
```

This will output the new content to be placed in `constants.ts`.

Paste the content into `constants.ts` and check if everything is now grouped correctly. You may need to add new weapons for the latest season. To automatically add the hashes for new weapons, simply add a new group and list the weapons, but set all their patternHashes to 0 and re-run the update function mentioned above.

## Contributing

### Setup a Destiny API App

- Head to https://www.bungie.net/en/Application
- Select "Create New App"
- Give it a name e.g. "D2PT Dev"
- Set the website to https://d2pt.local:3000
- Set the Redirect URL to https://d2pt.local:3000
- Set the Auth Client Type to "Public"
- Check the box for "Read your Destiny 2 information"
- Set the Origin Header to https://d2pt.local:3000

### Set Environment Variables

- Create a `.env` file in the root of the project
- Add the following variables:

```shell
URL=https://d2pt.local:3000
CLIENT_API_URL=https://www.bungie.net
CLIENT_ID=YOUR_CLIENT_ID
CLIENT_API_KEY=YOUR_API_KEY
```

### Setup a Local Hosts File

This will vary per platform.

If you are on a Mac you can edit `/private/etc/hosts` and add the following line:

```shell
127.0.0.1       d2pt.local
```

### Setup Node, Install Dependencies, and Run the Dev Server

- Ensure you are using Node v20 or higher. If you're using NVM you can just run `nvm use`
- Install dependencies with `npm ci`
- Run the dev server with `npm run dev`
- To rebuild after changes run `npm run build` (ideally in another terminal window)

### Run Linting, Type-checking, and Tests

- To run all linting, type-checking, and tests run `npm test`
- To format files run `npm run format`
