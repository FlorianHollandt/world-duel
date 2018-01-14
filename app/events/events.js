
const SPREADSHEET_ID  = process.env.SPREADSHEET_ID;
//const SHEET_ID  = process.env.SHEET_ID;
const SHEET_ID  = "quotes";

const NUMBER_TURNS_PER_ROUND = 4;

const http = require('http');

module.exports = {
    launch : function( app){
        app.followUpState( 'STATE_MENU');
        app.speech.t('WELCOME_NEW');

        app.setSessionAttribute( 'count_games', 0);
        app.setSessionAttribute( 'count_wins', 0);
        app.setSessionAttribute( 'count_defeats', 0);

        module.exports.spreadsheet.get_cards( app);
    },

    spreadsheet : {
        get_cards : function( app){

            var spreadsheet_url = 
                "http://spreadsheets.google.com/feeds/list/"
                + SPREADSHEET_ID
                + "/od6/public/basic?alt=json"

            http.get( spreadsheet_url, (res) => {
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
                if ( error) {
                    console.error(error.message);
                    module.exports.exit.error( app);
                    // consume response data to free up memory
                    //res.resume();
                    //return;
                }

                res.setEncoding('utf8');
                let rawData = '';
                res.on( 'data', (chunk) => { rawData += chunk; });
                res.on( 'end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        //console.log(parsedData);
                        const population_regex = new RegExp("population: (.+?), area");
                        const area_regex = new RegExp("area: (.+?), economy");
                        const economy_regex = new RegExp("economy: (.+?), wealth");
                        const wealth_regex = new RegExp("wealth: (.+?), rainfall");
                        const rainfall_regex = new RegExp("rainfall: (.+?)$");
                        let country_index = {};
                        for (var i = 0; i < parsedData.feed.entry.length; i++){
                            const row_content = parsedData.feed.entry[ i].content.$t;
                            country_index[ parsedData.feed.entry[ i].title.$t] = ( 
                                {
                                    'population' : parseInt(population_regex.exec( row_content)[ 1].replace( /\,/g, '')),
                                    'area' : parseInt(area_regex.exec( row_content)[ 1].replace( /\,/g, '')),
                                    'economy' : parseInt(economy_regex.exec( row_content)[ 1].replace( /\,/g, ''))
                                        * 1000000000, // because CMS contains data in billion USD
                                    'wealth' : parseInt(wealth_regex.exec( row_content)[ 1].replace( /\,/g, '')),
                                    'rainfall' : parseInt(rainfall_regex.exec( row_content)[ 1].replace( /\,/g, ''))
                                }
                            );
                        }
                        app.setSessionAttribute( 'country_index', country_index);
                        module.exports.stack.initialize( app);
                    } catch ( err) {
                        console.error( err.message);
                        module.exports.exit.error( app);
                    }
                });
            })
            .on('error', (err) => {
                console.error(`Got error: ${err.message}`);
                module.exports.exit.error( app);
            });
        }
    },

    stack : {

        initialize : function( app){
            const country_index = app.getSessionAttribute( 'country_index');
            const country_stack = shuffle_array( Object.keys( country_index)).splice( 0, NUMBER_TURNS_PER_ROUND + 1);

            app.setSessionAttribute( 'country_active_id', 0);
            app.setSessionAttribute( 'country_stack', country_stack);

            app.followUpState( 'STATE_ROUND_SELECT');

            app.ask(
                app.speech.t( 'ROUND_START', country_stack[ 0])
            );
        },

        rebuild : function( app){
            const country_index = app.getSessionAttribute( 'country_index');
            const country_stack_old = app.getSessionAttribute( 'country_stack');

            const country_remainder = shuffle_array( Object.keys( country_index))
                .filter(x => !country_stack_old.includes(x));

            const country_stack_new = [ country_stack_old[ NUMBER_TURNS_PER_ROUND]]
                .concat( country_remainder.splice( 0, NUMBER_TURNS_PER_ROUND));

            app.setSessionAttribute( 'country_active_id', 0);
            app.setSessionAttribute( 'country_stack', country_stack_new);

            app.followUpState( 'STATE_ROUND_SELECT');

            app.ask(
                app.speech.t( 'ROUND_RESTART', country_stack_new[ 0])
            );
        }
    },

    round : {

        select : {

            population : function( app){
                app.setSessionAttribute( 'stat_selected', 'population');
                app.speech
                    .t( 'ROUND_CONFIRM', app.t('WORD_POPULATION') );

                module.exports.round.compare( app);
            },

            area : function( app){
                app.setSessionAttribute( 'stat_selected', 'area');
                app.speech
                    .t( 'ROUND_CONFIRM', app.t('WORD_AREA') );

                module.exports.round.compare( app);
            },

            economy : function( app){
                app.setSessionAttribute( 'stat_selected', 'economy');
                app.speech
                    .t( 'ROUND_CONFIRM', app.t('WORD_ECONOMY') );

                module.exports.round.compare( app);
            },

            wealth : function( app){
                app.setSessionAttribute( 'stat_selected', 'wealth');
                app.speech
                    .t( 'ROUND_CONFIRM', app.t('WORD_WEALTH') );

                module.exports.round.compare( app);
            },

            rainfall : function( app){
                app.setSessionAttribute( 'stat_selected', 'rainfall');
                app.speech
                    .t( 'ROUND_CONFIRM', app.t('WORD_RAINFALL') );

                module.exports.round.compare( app);
            }
        },

        compare : function( app){
            const country_index = app.getSessionAttribute( 'country_index');
            const country_stack = app.getSessionAttribute( 'country_stack');
            const stat_selected = app.getSessionAttribute( 'stat_selected');
            const country_active_id = app.getSessionAttribute( 'country_active_id');

            const country_current = country_stack[ country_active_id];
            const country_next = country_stack[ country_active_id + 1];

            app.speech.t( 
                'ROUND_REVEAL_COUNTRY',
                country_next
            );

            console.log( "The " + stat_selected + " of " + country_current
                + " is " + country_index[ country_current][ stat_selected])
            console.log( "The " + stat_selected + " of " + country_next
                + " is " + country_index[ country_next][ stat_selected])

            app.setSessionAttribute( 
                'count_games',
                 app.getSessionAttribute( 'count_games') + 1
            );

            if ( country_index[ country_current][ stat_selected]
                > country_index[ country_next][ stat_selected]
            ){
                app.setSessionAttribute( 
                    'count_wins',
                     app.getSessionAttribute( 'count_wins') + 1
                );
                app.speech.t( 
                    'ROUND_WIN',
                    country_current,
                    stat_selected,
                    country_next
                );
            } else {
                app.setSessionAttribute( 
                    'count_defeats',
                     app.getSessionAttribute( 'count_defeats') + 1
                );
                app.speech.t( 
                    'ROUND_LOSE',
                    country_next,
                    stat_selected,
                    country_current
                );
            }

            if ( country_active_id + 1 < NUMBER_TURNS_PER_ROUND){
                app.setSessionAttribute( 
                    'country_active_id',
                     app.getSessionAttribute( 'country_active_id') + 1
                );

                app.followUpState( 'STATE_ROUND_SELECT');
                app.ask(
                    app.speech
                        .t( 'ROUND_MIDDLE', country_next),
                    app.t( 'ROUND_REPROMPT', country_next)
                );
            } else {
                app.speech.t(
                    'ROUND_END',
                    app.getSessionAttribute( 'count_wins'),
                    app.getSessionAttribute( 'count_games')
                );
                module.exports.stack.rebuild( app);
            } 
        }
    },

    help : {

        round : function( app){
            const country_current = app.getSessionAttribute( 'country_current');

            app.ask( 
                app.speechBuilder()
                    .t( 'ROUND_HELP', country_current),
                app.speechBuilder()
                    .t( 'ROUND_REPROMPT', country_current)
            );
        },
    },

    exit : {

        round : function( app){
            app.tell(
                app.t( 'EXIT_ROUND')
            );
        },

        menu : function( app){
            app.tell(
                app.t( 'EXIT_MENU')
            );
        },

        error : function( app){
            app.tell(
                app.t( 'EXIT_ERROR')
            );
        }
    }
}

function shuffle_array( array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}