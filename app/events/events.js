const http = require('http');
const mongo = require('mongodb');
const monk = require('monk');

/*
Connect to mongo:
  Example of connecting to a mongo instance (in this case one running on my colortapapp.com server).
  In the code, to make a db call we can then do something like:

  var users = db.get('users');
  var user_count = users.count();
  user_count.then(function(uc) {
    // DO SOMETHING WITH THE uc VALUE
  });
*/
const db = monk('USERNAME:PASSWORD@colortapapp.com:27017/world_duel');

const NUMBER_TURNS_PER_ROUND = 4;

const SPREADSHEET_ID  = process.env.SPREADSHEET_ID;

module.exports = {
  /***************************
  EXIT
  ***************************/
  exit : {
    /*** EXIT: ERROR ***/
    error : function(app) {
      app.tell(
        app.t('EXIT_ERROR')
      );
    }

    /*** EXIT: MENU ***/
    menu : function(app) {
      app.tell(
        app.t('EXIT_MENU')
      );
    },

    /*** EXIT: ROUND ***/
    round : function(app) {
      app.tell(
        app.t('EXIT_ROUND')
      );
    },

  },

  /***************************
  HELP
  ***************************/
  help : {

    /*** HELP: ROUND ***/
    round : function(app) {
      const country_active_id = app.getSessionAttribute('country_active_id');
      const country_stack = app.getSessionAttribute('country_stack');

      app.ask(
        app.speech.t('HELP_ROUND', country_stack[ country_active_id]),
        app.speechBuilder().t('ROUND_REPROMPT', country_stack[ country_active_id])
      );
    }

  },

  /***************************
  ROUND
  ***************************/
  round : {

    /*** ROUND: COMPARE ***/
    compare : function(app) {
      const country_index = app.getSessionAttribute('country_index');
      const country_stack = app.getSessionAttribute('country_stack');
      const stat_selected = app.getSessionAttribute('stat_selected');
      const country_active_id = app.getSessionAttribute('country_active_id');

      const country_current = country_stack[ country_active_id];
      const country_next = country_stack[ country_active_id + 1];

      app.speech.t(
        'ROUND_REVEAL_COUNTRY',
        country_next
      );

      console.log("The " + stat_selected + " of " + country_current
        + " is " + country_index[ country_current][ stat_selected])
      console.log("The " + stat_selected + " of " + country_next
        + " is " + country_index[ country_next][ stat_selected])

      const count_total_turns = app.getSessionAttribute('count_total_turns') + 1;
      app.setSessionAttribute('count_total_turns', count_total_turns );
      app.user().data.count_total_turns = count_total_turns ;

      let count_total_wins = app.getSessionAttribute('count_total_wins');
      let count_total_defeats = app.getSessionAttribute('count_total_defeats');
      let count_round_current_wins = app.getSessionAttribute('count_round_current_wins');

      if (country_index[ country_current][ stat_selected]
        > country_index[ country_next][ stat_selected]
      ) {
        count_total_wins += 1;
        app.setSessionAttribute('count_total_wins', count_total_wins);
        app.user().data.count_total_wins = count_total_wins;

        count_round_current_wins += 1
        app.setSessionAttribute('count_round_current_wins', count_round_current_wins);

        app.speech
          .t('ROUND_WIN_JINGLE')
          .t('ROUND_WIN');

      } else {

        count_total_defeats += 1;
        app.setSessionAttribute('count_total_defeats', count_total_defeats);
        app.user().data.count_total_defeats = count_total_defeats;

        app.speech
          .t('ROUND_LOSE_JINGLE')
          .t('ROUND_LOSE');
      }

      app.setSessionAttribute(
        'total_ẃin_rate',
        count_total_wins / count_total_turns
      );
      app.user().data.total_ẃin_rate = app.getSessionAttribute('total_ẃin_rate');
      
      app.setSessionAttribute(
        'total_score',
         Math.log2(1 + count_total_wins)
         * ((count_total_wins + count_total_turns) / Math.max(count_total_turns, 1))
      );
      app.user().data.total_score = app.getSessionAttribute('total_score');

      module.exports.round.continue(app);
    },

    /*** ROUND: CONTINUE ***/
    continue : function(app) {
      const country_stack = app.getSessionAttribute('country_stack');
      const country_active_id = app.getSessionAttribute('country_active_id');
      const country_next = country_stack[ country_active_id + 1];

      const count_round_previous_wins = app.getSessionAttribute('count_round_previous_wins');
      const count_round_current_wins = app.getSessionAttribute('count_round_current_wins');
      const count_total_rounds = app.getSessionAttribute('count_total_rounds');

      app.user().data.country_current = country_next;

      if (country_active_id + 1 < NUMBER_TURNS_PER_ROUND) {
        app.setSessionAttribute(
          'country_active_id',
           app.getSessionAttribute('country_active_id') + 1
        );

        app.followUpState('STATE_ROUND_SELECT');
        app.ask(
          app.speech
            .t('ROUND_MIDDLE', country_next)
            .t('ROUND_PROMPT'),
          app.t('ROUND_REPROMPT', country_next)
        );

      } else {
        if (count_total_rounds == 0 && count_round_current_wins == NUMBER_TURNS_PER_ROUND) {
          app.speech
            .t(
              'ROUND_END_START_FULL',
              NUMBER_TURNS_PER_ROUND
            );          
        } else if (count_total_rounds == 0 && count_round_current_wins > 1) {
          app.speech
            .t(
              'ROUND_END_START_MULTIPLE',
              app.getSessionAttribute('count_total_wins'),
              NUMBER_TURNS_PER_ROUND
            );          
        } else  if (count_total_rounds == 0 && count_round_current_wins == 1) {
          app.speech
            .t(
              'ROUND_END_START_SINGLE',
              NUMBER_TURNS_PER_ROUND
            );          
        } else if (count_total_rounds == 0 && count_round_current_wins == 0) {
          app.speech
            .t(
              'ROUND_END_START_ZERO',
              NUMBER_TURNS_PER_ROUND
            );          
        } else if (count_total_rounds > 0 && count_round_current_wins == NUMBER_TURNS_PER_ROUND) {
          app.speech
            .t(
              'ROUND_END_FULL',
              NUMBER_TURNS_PER_ROUND
            );          
        } else if (count_total_rounds > 0 && count_round_current_wins == 0) {
          app.speech
            .t(
              'ROUND_END_ZERO',
              NUMBER_TURNS_PER_ROUND
            );          
        } else if (count_total_rounds > 0 && count_round_current_wins == 1) {
          app.speech
            .t(
              'ROUND_END_SINGLE',
              NUMBER_TURNS_PER_ROUND
            );          
        } else if (count_total_rounds > 0 && count_round_current_wins > count_round_previous_wins) {
          app.speech
            .t(
              'ROUND_END_POSITIVE',
              count_round_current_wins,
              NUMBER_TURNS_PER_ROUND
            );          
        } else if (count_total_rounds > 0 && count_round_current_wins < count_round_previous_wins) {
          app.speech
            .t(
              'ROUND_END_NEGATIVE',
              count_round_current_wins,
              NUMBER_TURNS_PER_ROUND
            );          
        } else {
          app.speech
            .t(
              'ROUND_END_NEUTRAL',
              count_round_current_wins,
              NUMBER_TURNS_PER_ROUND
            );          
        }

        app.setSessionAttribute('count_total_rounds', count_total_rounds + 1);
        app.setSessionAttribute('count_round_previous_wins', count_round_current_wins);
        app.setSessionAttribute('count_round_current_wins', 0);

        app.user().data.count_total_rounds = count_total_rounds + 1;
        app.user().data.count_round_previous_wins = count_round_current_wins;

        module.exports.stack.rebuild(app);
      } 
    },

    /*** ROUND: SELECT ***/
    select : {

      area : function(app) {
        app.setSessionAttribute('stat_selected', 'area');
        app.speech
          .t('ROUND_CONFIRM', app.t('WORD_AREA') );

        module.exports.round.compare(app);
      },

      economy : function(app) {
        app.setSessionAttribute('stat_selected', 'economy');
        app.speech
          .t('ROUND_CONFIRM', app.t('WORD_ECONOMY') );

        module.exports.round.compare(app);
      },

      population : function(app) {
        app.setSessionAttribute('stat_selected', 'population');
        app.speech
          .t('ROUND_CONFIRM', app.t('WORD_POPULATION') );

        module.exports.round.compare(app);
      },

      rainfall : function(app) {
        app.setSessionAttribute('stat_selected', 'rainfall');
        app.speech
          .t('ROUND_CONFIRM', app.t('WORD_RAINFALL') );

        module.exports.round.compare(app);
      },

      wealth : function(app) {
        app.setSessionAttribute('stat_selected', 'wealth');
        app.speech
          .t('ROUND_CONFIRM', app.t('WORD_WEALTH') );

        module.exports.round.compare(app);
      }

    }

  },

  /***************************
  SESSION
  ***************************/
  session : {

    /*** SESSION: KNOWN USER ***/
    known_user : function(app) {
      app.speech.t('WELCOME_KNOWN');

      app.setSessionAttribute('count_round_current_wins', 0);
      app.setSessionAttribute('count_round_previous_wins', app.user().data.count_round_previous_wins);

      app.setSessionAttribute('count_total_defeats', app.user().data.count_total_defeats);
      app.setSessionAttribute('count_total_rounds', app.user().data.count_total_rounds);
      app.setSessionAttribute('count_total_turns', app.user().data.count_total_turns);
      app.setSessionAttribute('count_total_wins', app.user().data.count_total_wins);

      app.setSessionAttribute('country_current', app.user().data.country_current);      

      module.exports.spreadsheet.get_cards(app);
    },

    /*** SESSION: NEW USER ***/
    new_user : function(app) {
      app.speech.t('WELCOME_NEW', NUMBER_TURNS_PER_ROUND);

      app.setSessionAttribute('count_total_rounds', 0);
      app.setSessionAttribute('count_total_turns', 0);
      app.setSessionAttribute('count_total_wins', 0);
      app.setSessionAttribute('count_total_defeats', 0);

      app.setSessionAttribute('count_round_current_wins', 0);
      app.setSessionAttribute('count_round_previous_wins', 0);

      app.user().data.count_total_rounds = 0;
      app.user().data.count_total_turns = 0;
      app.user().data.count_total_wins = 0;
      app.user().data.count_total_defeats = 0;
      app.user().data.count_round_previous_wins = 0;

      module.exports.spreadsheet.get_cards(app);
    },

    /*** SESSION: START GAME ***/
    start_game : function(app) {
      if (app.getSessionAttribute('count_total_turns') == 0) {
        module.exports.stack.initialize(app);
      } else {
        module.exports.stack.build(app);
      }
    }

  },

  /***************************
  SPREADSHEET
  ***************************/
  spreadsheet : {

    /*** SPREADSHEET: GET CARDS ***/
    get_cards : function(app) {
      var spreadsheet_url = 
        "http://spreadsheets.google.com/feeds/list/"
        + SPREADSHEET_ID
        + "/od6/public/basic?alt=json"

      http.get(spreadsheet_url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error('Invalid content-type.\n' +
          `Expected application/json but received ${contentType}`);
        }
        if (error) {
          console.error(error.message);
          module.exports.exit.error(app);
          // consume response data to free up memory
          //res.resume();
          //return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            //console.log(parsedData);
            const de_regex = new RegExp("de-de: (.+?), population");
            const population_regex = new RegExp("population: (.+?), area");
            const area_regex = new RegExp("area: (.+?), economy");
            const economy_regex = new RegExp("economy: (.+?), wealth");
            const wealth_regex = new RegExp("wealth: (.+?), rainfall");
            const rainfall_regex = new RegExp("rainfall: (.+?)$");
            let country_index = {};
            for (var i = 0; i < parsedData.feed.entry.length; i++) {
              console.log("Current row: " + parsedData.feed.entry[ i].content.$t);
              const row_content = parsedData.feed.entry[ i].content.$t;
              country_index[ parsedData.feed.entry[ i].title.$t] = (
                {
                  'en' : parsedData.feed.entry[ i].title.$t,
                  'de' : de_regex.exec(row_content)[ 1],
                  'population' : parseInt(population_regex.exec(row_content)[ 1].replace(/\,/g, '')),
                  'area' : parseInt(area_regex.exec(row_content)[ 1].replace(/\,/g, '')),
                  'economy' : parseInt(economy_regex.exec(row_content)[ 1].replace(/\,/g, ''))
                    * 1000000000, // because CMS contains data in billion USD
                  'wealth' : parseInt(wealth_regex.exec(row_content)[ 1].replace(/\,/g, '')),
                  'rainfall' : parseInt(rainfall_regex.exec(row_content)[ 1].replace(/\,/g, ''))
                }
              );
            }
            app.setSessionAttribute('country_index', country_index);
            app.followUpState('STATE_MENU');
            app.ask(
              app.speech,
              app.t('WELCOME_REPROMPT')
            );
          } catch (err) {
            console.error(err.message);
            module.exports.exit.error(app);
          }
        });
      })
      .on('error', (err) => {
        console.error(`Got error: ${err.message}`);
        module.exports.exit.error(app);
      });
    }

  },

  /***************************
  STACK
  ***************************/
  stack : {

    /*** STACK: BUILD ***/
    build : function(app) {
      const country_index = app.getSessionAttribute('country_index');

      const country_current = app.user().data.country_current;

      let country_stack = shuffle_array(Object.keys(country_index));
      if (country_current) {
        country_stack.splice(country_stack.indexOf(country_current), 1)
        country_stack.unshift(country_current);
      }
      country_stack = country_stack.splice(0, NUMBER_TURNS_PER_ROUND + 1);

      app.setSessionAttribute('country_active_id', 0);
      app.setSessionAttribute('country_stack', country_stack);

      app.user().data.country_current = country_stack[ 0];

      app.followUpState('STATE_ROUND_SELECT');

      app.ask(
        app.speech
          .t('ROUND_START_NEW_SESSION_HELP')
          .t('ROUND_START_NEW_SESSION', country_stack[ 0])
          .t('ROUND_PROMPT'),
        app.t('ROUND_REPROMPT' )
      );
    },

    /*** STACK: INITIALIZE ***/
    initialize : function(app) {
      const country_index = app.getSessionAttribute('country_index');
      const country_stack = shuffle_array(Object.keys(country_index)).splice(0, NUMBER_TURNS_PER_ROUND + 1);

      app.setSessionAttribute('country_active_id', 0);
      app.setSessionAttribute('country_stack', country_stack);

      app.user().data.country_current = country_stack[ 0];

      app.followUpState('STATE_ROUND_SELECT');

      app.ask(
        app.speech
          .t('ROUND_START_NEW_USER', country_stack[ 0])
          .t('ROUND_PROMPT'),
        app.t('ROUND_REPROMPT' )
      );
    },

    /*** STACK: REBUILD ***/
    rebuild : function(app) {
      const country_index = app.getSessionAttribute('country_index');
      const country_stack_old = app.getSessionAttribute('country_stack');

      const country_remainder = shuffle_array(Object.keys(country_index))
        .filter(x => !country_stack_old.includes(x));

      const country_stack_new = [ country_stack_old[ NUMBER_TURNS_PER_ROUND]]
        .concat(country_remainder.splice(0, NUMBER_TURNS_PER_ROUND));

      app.setSessionAttribute('country_active_id', 0);
      app.setSessionAttribute('country_stack', country_stack_new);

      app.followUpState('STATE_ROUND_SELECT');

      app.ask(
        app.speech
          .t('ROUND_START_NEW_ROUND', country_stack_new[ 0])
          .t('ROUND_PROMPT'),
        app.speechBuilder()
          .t('ROUND_REPROMPT', country_stack_new[ 0])
      );
    }

  }

}

/************* SUPPORT FUNCTIONS *************/

/*** SHUFFLE ITEMS IN AN ARRAY ***/
function shuffle_array(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}