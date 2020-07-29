# prerender-slack
Slack logger for prerender.io

## How to use

The package is [available on npm](https://www.npmjs.com/package/prerender-slack). Thus, in your local prerender project simply run:

`$ npm install prerender-slack --save`

Then in the `server.js` that initializes prerender:

`server.use(require('prerender-slack'));`

## Configuration

Required env variables:

```
export SLACK_ENABLED=true
export SLACK_URL=https://hooks.slack.com/services/XXXXXXXXX/... (slack webhook)
```
* `SLACK_ENABLED` defaults to `false`

