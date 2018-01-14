'use strict';

const {Webhook} = require('jovo-framework');
const {app} = require('./app/app.js');

// =================================================================================
// Server Configuration
// =================================================================================

if (isWebhook()) {
    const port = process.env.PORT || 3000;
    Webhook.listen(port, () => {
        console.log(`Example server listening on port ${port}!`);
    });
    Webhook.post('/webhook', (req, res) => {
        app.handleWebhook(req, res);
    });
}

exports.handler = (event, context, callback) => {
    app.handleLambda(event, context, callback);
};

// will be moved to jovo-framework in final version
function isWebhook() {
    return process.argv.indexOf('--webhook') > -1 ? 'webhook' : '';
}



// =================================================================================
/*
let app = require( 'jovo-framework').Jovo;

exports.handler = function( event, context, callback){
    app.handleRequest( event, callback, handlers);
    app.execute( );
};

const translations = require( "./app/i18n/en-US.js");

app.setConfig({  
    logging: true,
    intentMap : {
        'AMAZON.HelpIntent' : 'HelpIntent',
        'AMAZON.StopIntent' : 'END',
        'AMAZON.CancelIntent' : 'END',
        'AMAZON.YesIntent' : 'YesIntent',
        'AMAZON.NoIntent' : 'NoIntent'
    },
    i18n: {
        'resources' : translations
    }
});

// =================================================================================
// App Logic
// =================================================================================

const events = require('./app/events/events.js');

const handlers = {
    'LAUNCH': function() {
        events.launch( app);
    },
     'Unhandled': function() {
        events.launch( app);
    },
    'END': function() {
        events.exit.unfinished( app);
    },

    'STATE_TAG_CHOOSE' : {
        'SelectTagIntent'  : function() {
            events.tag.select( app);
        },
        'Unhandled' : function() {
            events.help.tag( app);
        },
        'END' : function() {
            app.toStatelessIntent( 'END');
        }
    },

    'STATE_QUOTE_CHOOSE' : {
        'YesIntent' : function() {
            events.quote.accept( app);
        },
        'NoIntent' : function() {
            events.quote.reject( app);
        },
        'END' : function() {
            app.toStatelessIntent( 'END');
        }
    },
};
*/