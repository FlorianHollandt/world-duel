module.exports = {
    "en-US" : {
        translation: {
            WELCOME_NEW: " Welcome to World Duel! With this Skill, you can put your geography knowledge "
                + " to the ultimate test! In each round, you will play against <say-as interpret-as='cardinal'>%s</say-as> "
                + " countries. Are you ready for your first round?",
            WELCOME_KNOWN : " Welcome back to World Duel! Are you ready to put your geography knowledge "
                + " to the test? ",
            WELCOME_REPROMPT : [
                " Are you ready for your first round of World Duel? "
            ],

            GAME_START_PROMPT : [
                " Are you ready? ",
                " Can we get started? "
            ],

            GAME_START_CONFIRM : [
                " Wonderful! ",
                " Great! ",
            ],


            ROUND_START_NEW_SESSION: [
                " Your first country is %s. "
            ],
            ROUND_START_NEW_SESSION_HELP: [
                " Wonderful! "
                + "As soon as you hear the bell, you can decide between area, population, economy, wealth and rainfall. "
            ],
            ROUND_START_NEW_USER: [
                " Wonderful! <audio src='https://s3-eu-west-1.amazonaws.com/duelgameresources/bell.mp3' />"
                + " Every time you hear this bell, you have to pick a category in which to stand off against the "
                + " next country. You can select area, population, economy, wealth or rainfall. "
                + " The more your country has in the selected category, the better. "
                + " Your first country is <break strength='weak'/> %s. Let's go! "
            ],
            ROUND_START_NEW_ROUND: [
                " Let's continue with %s. "
            ],
            
            ROUND_MIDDLE: [
                " So, your next country is %s. "
            ],

            ROUND_END_START_FULL: [
                " Wow, very impressive! At your first try, you guessed correctly for each of your %s countries! "
            ],
            ROUND_END_START_MULTIPLE: [
                " Very nice, you guessed correctly for %s of %s countries at your first try! ",
                + " Let's see if you can still improve on this! "
            ],
            ROUND_END_START_SINGLE: [
                " Well, at least you guessed one of %s contries correctly at your first contries. ",
                + " You can certainly improve on that! "
            ],
            ROUND_END_START_ZERO: [
                " Oh dear, did you really not have a good guess about any of your %s countries? ",
                + " Let's try this again right away! "
            ],
            ROUND_END_FULL: [
                " Wow, you picked the right category for each of your %s countries! "
            ],
            ROUND_END_POSITIVE: [
                " This time you got %s of %s countries right. You'r getting better! "
            ],
            ROUND_END_NEUTRAL: [
                " This time again, you were right with %s of %s countries. That's not bad!"
            ],
            ROUND_END_NEGATIVE: [
                " At least you got %s of %s countries right. You can do better than that, right? "
            ],
            ROUND_END_SINGLE: [
                " At least you got one of %s countries right. You can do better than that, right? "
            ],
            ROUND_END_ZERO: [
                " On no, was this round so hard for you? I'm sure next round you'll be doing better! "
            ],

            ROUND_PROMPT : [
                " <audio src='https://s3-eu-west-1.amazonaws.com/duelgameresources/bell.mp3' /> "
            ],
            ROUND_REPROMPT : [
                " Do you want to compete against the next country "
                + "in the category population, area, economy, wealth, or rainfall? "
            ],
            ROUND_CONFIRM : [
                " %s? Alright, let's see! ",
                " %s? Okey-dokey! ",
                " %s? As you wish! ",
                " %s? Sure! "
            ],
            ROUND_REVEAL_COUNTRY : [
                " The next country is <break strength='weak'/> %s! "
            ],
            ROUND_WIN_JINGLE : [
                " <audio src='https://s3-eu-west-1.amazonaws.com/duelgameresources/win.mp3' /> "
            ],
            ROUND_WIN : [
                " You're completely right! ",
                " Great guess! ",
                " That was exactly right! "
            ],
            ROUND_LOSE_JINGLE : [
                " <audio src='https://s3-eu-west-1.amazonaws.com/duelgameresources/loose.mp3' /> "
            ],
            ROUND_LOSE : [
                " Unfortunately not. ",
                " Not quite. ",
                " I'm afraid that's not quite right. "
            ],


            WORD_POPULATION : 'population',
            WORD_AREA : 'area',
            WORD_ECONOMY : 'economy',
            WORD_WEALTH : 'wealth',
            WORD_RAINFALL : 'rainfall',

            HELP_ROUND : " You can compete in one of the following categories: Area, Population, Economy, Wealth or Rainfall. "
                + " In which of these categories do you think %s is better than most other countries?",

            EXIT_ROUND : " It was a pleasure playing with you. See you later! ",
            EXIT_MENU : " I look forward to our next round of World Duel. Good bye! ",
            EXIT_ERROR : " Oh no, I forgot all the countries! Sorry, I can't work like this. Bye! "
        }
    }
}