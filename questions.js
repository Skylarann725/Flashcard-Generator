var inquirer = require('inquirer'); // for inquirer package
var fs = require('fs'); // for fs
var BasicCard = require('./basic.js'); // to retrieve basic card info
var ClozeCard = require('./cloze.js'); // to retrieve close card info
var basicData = require('./basic.json'); // calls basic.json file
var clozeData = require('./partial.json'); // calls partial.json file

start(); //Start the Game

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
                playGameBasic();
                break;
            // if player picks cloze card game    
            case 'Cloze Card Game':
                playGameCloze();
                break;

        } // end of switch function
    }); // end of first inquirer prompt
}; // end to start game function

function playGameBasic() {
    var cards = []; // empty card array
    var index = 0;
    var score = 0;
    // loop to go through all the questions in the basic json file
    for (var i = 0; i < basicData.length; i++) {
        var currentCard = new BasicCard(basicData[i].front, basicData[i].back);
        cards.push(currentCard);
    }
    // calls basic questions function
    basicQuestions(cards, index, score);
};


function basicQuestions(cards, index, score) {
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
            	console.log("Correct!");
                score++;
            } else {
                // if the user answer does not equal the card answer then show the below message and show them the correct answer
               console.log("Incorrect. The correct answer is " + card.back);
            }
            // goes to the next question
            index++;
            basicQuestions(cards, index, score);
        });

    }else{
        // show's user their score when the game is finished and restarts the game
        console.log('Your score is ' + score);
        endGame();
    }
};

//Cloze Game
function playGameCloze() {
    var cards = []; // empty card array
    var index = 0;
    var score = 0;

    // loop to go through all the questions in the cloze json file
    for (var i = 0; i < clozeData.length; i++) {
        var currentCard = new ClozeCard(clozeData[i].fullText, clozeData[i].cloze);
        cards.push(currentCard);
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
            message: card.partialText + "\nAnswer: "
        }]).then(function(answer) {
            // if user answer equals the card answer then the user's score goes up
            if (answer.text === card.cloze) {
            	console.log("Correct!");
                score++;
            } else {
                // if the user answer does not equal the card answer then show the below message and show them the correct answer
                console.log("Incorrect. The correct answer is " + card.cloze);
            }
            // goes to the next question
            index++;
            clozeQuestions(cards, index, score);
        });
    } else {
        // show's user their score when the game is finished and restarts the game
        console.log('Your score is ' + score);
        endGame();
    }
} // end of clozeQuestions function

function endGame() {
	inquirer.prompt({
        type: 'list',
        message: 'Would you like to play again?',
        choices: ['Restart Game', 'Quit'],
        name: 'action'
    }).then(function(answer) {
    	 switch (answer.action) {
            // if player picks basic card game
            case 'Restart Game':
                start();
                break;
            // if player picks cloze card game    
            case 'Quit':
                "^C";
                break;

        } // end of switch function
    }); // end of first inquirer prompt
}; // end to end game function
