const slack = require('./slack');

const PAGE_LOAD_TIMEOUT = process.env.PAGE_LOAD_TIMEOUT || 20 * 1000;

module.exports = {
    beforeSend: function(request, response, next) {
        const renderTime = new Date().getTime() - request.prerender.start.getTime();
        const date = new Date().toISOString();

        if (renderTime > PAGE_LOAD_TIMEOUT) {
            console.warn(date, 'timeout render (' + renderTime + 'ms)', request.prerender.url);

            slack.send(undefined, {
                title: '*Timeout render (' + renderTime + 'ms)*',
                value: request.prerender.url
            }, 'danger');

            return next();
        }

        if (Number(request.prerender.statusCode) !== 200) {
            if (Number(request.prerender.statusCode) === 301) {
                console.warn(date, 'redirect', request.prerender.url, '->', request.res.getHeader('Location'));

                slack.send('*Redirect*', {
                    value: 'From: ' + request.prerender.url + '\n' +
                        'To: ' + request.res.getHeader('Location')
                }, 'good');
            } else {
                console.warn(date, 'response status', request.prerender.statusCode, request.prerender.url);

                slack.send(undefined, {
                    title: '*Response status ' + request.prerender.statusCode + '*',
                    value: request.prerender.url
                }, 'warning');
            }

            return next();
        }

        var noindex = request.prerender.content.toString().search('<meta name="robots" content="noindex, nofollow">');

        if (noindex) {
            console.warn(date, 'noindex, nofollow', request.prerender.url);

            slack.send(undefined, {
                title: '*Page contains content="noindex, nofollow"*',
                value: request.prerender.url
            }, 'danger');
        }

        next();
    }
};
