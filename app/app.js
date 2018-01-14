'use strict';

// =================================================================================
// App Configuration
// =================================================================================

//const {App} = require('jovo-framework');
const app = new (require('jovo-framework').JovoClazz)();
//let app = require( 'jovo-framework').Jovo;
//let app = require( 'jovo-framework');
const translations = require( "./i18n/en-US.js");

const config = {
    logging: true,
    intentMap : {
        'AMAZON.HelpIntent' : 'HelpIntent',
        'AMAZON.StopIntent' : 'END',
        'AMAZON.CancelIntent' : 'END',
        'AMAZON.YesIntent' : 'YesIntent',
        'AMAZON.NoIntent' : 'NoIntent'
    },
    i18n: {
        'resources' : translations,
        'returnObjects' : true,
    }
};

//const app = new App(config);
app.setConfig( config);


// =================================================================================
// App Logic
// =================================================================================

const events = require('./events/events.js');

app.setHandler({
    'LAUNCH': function() {
        events.launch( app);
    },
     'Unhandled': function() {
        events.launch( app);
    },
    'END': function() {
        events.exit.menu( app);
    },

    'STATE_MENU' : {
        'YesIntent'  : function() {
            events.tag_select( app);
        },
        'Unhandled' : function() {
            events.help.tag( app);
        },
        'END' : function() {
            events.exit.menu( app);
        }
    },

    'STATE_ROUND_SELECT' : {
        'PopulationIntent' : function( ){
            events.round.select.population( app);
        },
        'AreaIntent' : function( ){
            events.round.select.area( app);
        },
        'EconomyIntent' : function( ){
            events.round.select.economy( app);
        },
        'WealthIntent' : function( ){
            events.round.select.wealth( app);
        },
        'RainfallIntent' : function( ){
            events.round.select.rainfall( app);
        },
        'Unhandled' : function() {
            events.help.round( app);
        },
        'END' : function() {
            events.exit.round( app);
        }
    }
});

module.exports.app = app;
