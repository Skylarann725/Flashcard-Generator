var inquirer = require('inquirer'); // for inquirer package
var fs = require('fs'); // for fs
var BasicCard = require('./basic.js'); // to retrieve basic card info
var ClozeCard = require('./cloze.js'); // to retrieve close card info

// function to start game
function start() {
    // prompt to see which game player wants to play
    inquirer.prompt({
            type: 'list',
            message: 'What game would you like to play?',
            choices: ['Basic Card Game', 'Cloze Card Game'],
            name: 'action'
        }).then(function(answer) {
            switch (answer.action) {
                case 'Basic Card Game':
                    function playGameBasic() {
                        var basicData = require('./BASIC.JSON');
                        var cards = []; // empty card array
                        var index = 0;
                        var score = 0;

                        for (var i = 0; i < basicData.length; i++) {
                            var currentCard = new BasicCard(basicData[i].front, basicData[i].back);
                            currentCard.push(cards);
                            console.log(cards);
                        }

                        basicQuestions(cards, index, score);
                    }

                    function basicQuestions(cards, index, score) {
                        if (index < cards.length) {

                            var card = JSON.parse(cards[index]);
                            console.log(card);
                            inquirer.prompt([{
                                type: 'input',
                                name: 'text',
                                message: card.front + "\nAnswer: "
                            }]).then(function(answer) {
                                if (answer.text === card.back) {
                                    score++;
                                } else {
                                    console.log("Incorrect. The correct answer is " + card.back);
                                }
                                index++;
                                basicQuestions(cards, index, score);
                            });

                        } else {
                            console.log('Your score is ' + score);
                            start();
                        }
                    }
                    break;

                case 'Cloze Card Game':
                    function playGameCloze(cards, index, score) {
                        var clozeData = require('./partial.json');
                        var cards = []; // empty card array
                        var index = 0;
                        var score = 0;

                        for (var i = 0; i < clozeData.length; i++) {
                            var currentCard = new ClozeCard(clozeData[i].front, clozeData[i].back);
                            currentCard.push(cards);
                            console.log(cards);
                        }

                        clozeQuestions(cards, index, score);

                    }

                    function clozeQuestions(cards, index, score) {
                        if (index < cards.length) {
                            var card = cards[index];
                            console.log(card);
                            inquirer.prompt([{
                                type: 'input',
                                name: 'text',
                                message: card.front + "\nAnswer: "
                            }]).then(function(answer) {
                                if (answer.text === card.back) {
                                    score++;
                                } else {
                                    console.log("Incorrect. The correct answer is " + card.back);
                                }
                                index++;
                                clozeQuestions(cards, index, score);
                            });
                        } else {
                            console.log('Your score is ' + score);
                            start();
                        }
                    } // end of clozeQuestions
                    break;

            } // end of switch function
        }) // end of first inquirer prompt

} // end to start game function

start();
