'use strict';

// =================================================================================
// App Configuration
// =================================================================================

//const {App} = require('jovo-framework');
const app = new (require('jovo-framework').JovoClazz)();

let translations = require( "./i18n/en-US.js");
Object.assign( translations, require( './i18n/de-DE.js'));

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
app.setConfig(config);
app.setDynamoDb('WORLDDUEL_USERS');

// =================================================================================
// App Logic
// =================================================================================

const events = require('./events/events.js');

app.setHandler({
  'END': function() {
    events.exit.menu(this);
  },

  'NEW_SESSION': function() {
    events.session.known_user(this);
  },

  'NEW_USER': function() {
    events.session.new_user(this);
  },

  'STATE_MENU' : {
    'END' : function() {
      events.exit.menu(this);
    }
    'NoIntent' : function() {
      events.exit.menu(this);
    },
    'Unhandled' : function() {
      events.session.start_game(this);
    },
    'YesIntent'  : function() {
      events.session.start_game(this);
    },
  },

  'STATE_ROUND_SELECT' : {
    'AreaIntent' : function(){
      events.round.select.area(app);
    },
    'EconomyIntent' : function( ){
      events.round.select.economy(app);
    },
    'END' : function() {
      events.exit.round(app);
    }
    'PopulationIntent' : function(){
      events.round.select.population(app);
    },
    'RainfallIntent' : function(){
      events.round.select.rainfall(app);
    },
    'Unhandled' : function() {
      events.help.round(app);
    },
    'WealthIntent' : function(){
      events.round.select.wealth(app);
    },
  }
});

module.exports.app = app;
