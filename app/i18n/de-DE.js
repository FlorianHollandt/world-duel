module.exports = {
    "de-DE" : {
        translation: {
            WELCOME_NEW : "Herzlich willkommen bei Länder-Duell! Mit diesem Skill kannst Du Dein Länder-Wissen "
                + " so richtig auf die Probe stellen. In jeder Runde trittst Du gegen "
                + "<say-as interpret-as='cardinal'>%s</say-as> Länder an. Bist Du bereit für Deine erste Runde?",
            WELCOME_KNOWN : "Willkommen zurück bei Länder-Duell! Bist Du bereit, Dein Länder-Wissen auf die Probe"
                + " zu stellen? ",
            WELCOME_REPROMPT : [
                " Bist Du bereit für Deine erste Runde Länder-Duell?"
            ],

            GAME_START_PROMPT : [
                " Bist Du bereit? ",
                " Legen wir los? "
            ],

            GAME_START_CONFIRM : [
                " Wunderbar! ",
                " Alles klar! ",
                " Super. Dann mal los!"
            ],
            ROUND_START_NEW_SESSION: [
                " Lass uns gleich mit %s loslegen. ",
                " Du startest mit %s. ",
                " Dein erstes Land ist %s. ",
                " Du beginnst diese Runde mit %s. "
            ],
            ROUND_START_NEW_SESSION_HELP: [
                " Wunderbar! "
                + "Sobald die Glocke ertönt, kannst Du Einwohner, Fläche, Wirtschaft, Wohlstand, oder Niederschlag sagen. "
            ],
            ROUND_START_NEW_USER: [
                " Wunderbar! <audio src='https://s3-eu-west-1.amazonaws.com/duelgameresources/bell.mp3' />"
                + " Immer wenn Du diese Glocke hörst, kannst Du Dich entscheiden, in welcher Kategorie Du gegen "
                + " das nächste Land antreten willst. Du hast die Wahl zwischen Einwohnern, Fläche, Wirtschaft, "
                + " Wohlstand und Niederschlag. Je mehr davon ein Land in der gewählten Kategorie hat, desto besser. "
                + " Dein erstes Land ist <break strength='weak'/> %s. Dann mal los! "
            ],
            ROUND_START_NEW_ROUND: [
                " Weiter gehts, immer noch mit %s. ",
                " Dann lass uns mal mit %s weitermachen. ",
                " Lass uns mit %s weiterspielen. "
            ],
            ROUND_MIDDLE: [
                " Jetzt bist Du mit %s dran. "
            ],
            ROUND_END_START_FULL: [
                " Wow, großartig! Du hast auf Anhieb bei allen %s Ländern richtig getippt! ",
                + " Meinst Du, Du schneidest in der nächsten Runde auch so gut ab? "
            ],
            ROUND_END_START_MULTIPLE: [
                " Nicht schlecht, Du hast auf Anhieb bei %s von %s Ländern richtig getippt. ",
                + " Mal sehen, ob Du das noch verbessern kannst! "
            ],
            ROUND_END_START_SINGLE: [
                " Na immerhin, Du hast auf Anhieb bei einer von %s Ländern richtig getippt. ",
                + " Du kannst Du bestimmt noch verbessern! "
            ],
            ROUND_END_START_ZERO: [
                " Oh weiah, hattest Du wirklich bei keiner der %s Länder einen guten Tipp? ",
                + " Lass uns das dochgleich nochmal versuchen! "
            ],
            ROUND_END_FULL: [
                " Wahnsinn, Du hast bei allen %s Ländern richtig getippt! ",
                " Du lagst bei allen %s Ländern richtig. Genial! ",
                " Großartig! Du hast alle %s Länder perfekt eingeschätzt! "
            ],
            ROUND_END_POSITIVE: [
                " Diesmal hast Du bei %s von %s Ländern richtig getippt. Du wirst immer besser! ",
                " Diesmal lagst Du bei %s von %s Ländern richtig. Du machst Dich richtig gut! ",
                " In dieser Runde hast Du mit %s von %s Ländern gepunktet. Weiter so! "
            ],
            ROUND_END_NEUTRAL: [
                " Das waren diesmal auch wieder %s von %s Ländern. Gar nicht schlecht!",
                " Diesmal hast Du auch wieder %s von %s Ländern richtig eingeschätzt. Weiter so!",
                " Sehr schön, auch diesmal lagst Du bei %s von %s Ländern richtig!"
            ],
            ROUND_END_NEGATIVE: [
                " Das waren immerhin %s von %s Richtigen. Das geht noch besser, oder?! ",
                " Diesmal lagst Du bei %s von %s Ländern richtig. Meinst Du, Du schaffst in der nächsten Runde mehr? "
            ],
            ROUND_END_SINGLE: [
                " Immerhin hast Du bei einem der %s Länder richtig getippt. Das geht noch besser, oder? ",
                " In der nächsten Runde schätzt Du bestimmt mehr als eins von %s Ländern richtig ein, oder? ",
                " Oh je, nur eins von %s Ländern? Ich bin sicher, dass Du das in der nächsten Runde besser hinbekommst! "
            ],
            ROUND_END_ZERO: [
                " Oh je, fiel Dir diese Runde so schwer? Diesmal tippst Du bestimmt besser! ",
                " Das waren diesmal aber auch %s schwere Länder! Die nächsten fallen Dir bestimmt leichter! "
            ],

            ROUND_PROMPT : [
                " <audio src='https://s3-eu-west-1.amazonaws.com/duelgameresources/bell.mp3' /> "
            ],
            ROUND_REPROMPT : [
                " Willst Du in der Kategorie Einwohner, Fläche, Wirtschaft, Wohlstand oder Niederschlag "
                + " gegen das nächste Land antreten? "
            ],
            ROUND_CONFIRM : [
                " %s? Alles klar! ",
                " %s? Mal sehen! ",
                " %s? Okey-dokey! ",
                " %s? Wie Du meinst! ",
                " %s? Okay, schauen wir mal! ",
                " %s? Na gut. "
            ],
            ROUND_REVEAL_COUNTRY : [
                " Das nächste Land ist <break strength='weak'/> %s! ",
                " Du trittst an gegen <break strength='weak'/> %s! ",
                " Diesmal spielst Du gegen <break strength='weak'/> %s! ",
                " Dein Gegner ist <break strength='weak'/> %s! ",
                " In diesem Zug spielst Du gegen <break strength='weak'/> %s! "
            ],
            ROUND_WIN_JINGLE : [
                " <audio src='https://s3-eu-west-1.amazonaws.com/duelgameresources/win.mp3' /> "
            ],
            ROUND_WIN : [
                " Super getippt! ",
                " Absolut richtig! ",
                " Stimmt vollkommen! ",
                " Hervorragend eingeschätzt! ",
                " Sehr gut geraten! ",
                " Vollkommen richtig! "
            ],
            ROUND_LOSE_JINGLE : [
                " <audio src='https://s3-eu-west-1.amazonaws.com/duelgameresources/loose.mp3' /> "
            ],
            ROUND_LOSE : [
                " Leider nicht. ",
                " In diesem Fall also nicht. ",
                " Schade! ",
                " Keineswegs. ",
                " Damit lagst Du leider falsch. ",
                " Diesmal hast Du daneben getippt. ",
                " Das war leider nicht richtig. "
            ],

            WORD_POPULATION : 'Einwohner',
            WORD_GROWTH : 'Wachstum',
            WORD_AGE : 'Alter',
            WORD_SUNSHINE : 'Sonnenstunden',
            WORD_AREA : 'Fläche',
            WORD_ECONOMY : 'Wirtschaft',
            WORD_WEALTH : 'Wohlstand',
            WORD_RAINFALL : 'Niederschlag',

            HELP_ROUND : " Es gibt die Kategorien Einwohner, Fläche, Wirtschaft, Wohlstand, und Niederschlag. "
                + " Für jede dieser Kategorien gilt: Je mehr, desto besser. "
                + " Was denkst Du, in welcher Kategorie ist %s besser "
                + " als die meisten anderen Länder? ",

            EXIT_ROUND : " Es war mir ein Vergnügen. Bis später! ",
            EXIT_MENU : " Ich freue mich auf unsere nächste Runde Länder-Duell. Bis bald! ",
            EXIT_ERROR : " Oh nein, ich habe alles vergessen! Lass uns das später nochmal probieren. Bis dann! "
        }
    }
}