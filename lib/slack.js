const axios = require('axios');

const SLACK_ENABLED = process.env.SLACK_ENABLED || false;
const SLACK_URL = process.env.SLACK_URL;

module.exports = {
    send: function(text, attachment, color) {
        if (!SLACK_ENABLED || !SLACK_URL) {
            return;
        }

        var data = {
            text: text,
            attachments: [{
                color: color,
                fields: [{
                    title: attachment.title,
                    value: attachment.value,
                    short: false
                }]
            }]
        };

        return axios.post(SLACK_URL, 'payload=' + JSON.stringify(data), {
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
};
