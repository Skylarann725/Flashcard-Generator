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
            	// if player picks basic card game
                case 'Basic Card Game':
                    function playGameBasic() {
                        var basicData = require('./BASIC.JSON'); // calls basic.json file
                        var cards = []; // empty card array
                        var index = 0;
                        var score = 0;

                        // loop to go through all the questions in the basic json file
                        for (var i = 0; i < basicData.length; i++) {
                            var currentCard = new BasicCard(basicData[i].front, basicData[i].back);
                            currentCard.push(cards);
                        }

                        // calls basic questions function
                        basicQuestions(cards, index, score);
                    }

                    function basicQuestions(cards, index, score) {
                        if (index < cards.length) {
                            var card = JSON.parse(cards[index]);
                            // prompt to show the question and let the user input their answer
                            inquirer.prompt([{
                                type: 'input',
                                name: 'text',
                                message: card.front + "\nAnswer: "
                            }]).then(function(answer) {
                            	// if user answer equals the card answer then the user's score goes up
                                if (answer.text === card.back) {
                                    score++;
                                } else {
                                	// if the user answer does not equal the card answer then show the below message and show them the correct answer
                                    console.log("Incorrect. The correct answer is " + card.back);
                                }
                                // goes to the next question
                                index++;
                                basicQuestions(cards, index, score);
                            });

                        } else {
                        	// show's user their score when the game is finished and restarts the game
                            console.log('Your score is ' + score);
                            start();
                        }
                    }
                    break;

                // if player picks cloze card game    
                case 'Cloze Card Game':
                    function playGameCloze(cards, index, score) {
                        var clozeData = require('./partial.json'); // calls partial.json file
                        var cards = []; // empty card array
                        var index = 0;
                        var score = 0;

                        // loop to go through all the questions in the cloze json file
                        for (var i = 0; i < clozeData.length; i++) {
                            var currentCard = new ClozeCard(clozeData[i].front, clozeData[i].back);
                            currentCard.push(cards);
                        }

                        // calls cloze questions function
                        clozeQuestions(cards, index, score);

                    }

                    function clozeQuestions(cards, index, score) {
                        if (index < cards.length) {
                            var card = cards[index];

                            // prompt to show the question and let the user input their answer
                            inquirer.prompt([{
                                type: 'input',
                                name: 'text',
                                message: card.front + "\nAnswer: "
                            }]).then(function(answer) {
                            	// if user answer equals the card answer then the user's score goes up
                                if (answer.text === card.back) {
                                    score++;
                                } else {
                                	// if the user answer does not equal the card answer then show the below message and show them the correct answer
                                    console.log("Incorrect. The correct answer is " + card.back);
                                }
                                // goes to the next question
                                index++;
                                clozeQuestions(cards, index, score);
                            });
                        } else {
                        	// show's user their score when the game is finished and restarts the game
                            console.log('Your score is ' + score);
                            start();
                        }
                    } // end of clozeQuestions function
                    break;

            } // end of switch function
        }) ;// end of first inquirer prompt

}; // end to start game function

start();
