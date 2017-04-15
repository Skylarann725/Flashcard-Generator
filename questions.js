var inquirer = require('inquirer'); // for inquirer package
var fs = require('fs'); // for fs
var BasicCard = require('./basic.js'); // to retrieve basic card info
var ClozeCard = require('./cloze.js'); // to retrieve close card info
var cardData = require('./basic.json');


function playGame() {
    var cards = []; // empty card array
    var index = 0;
    var score = 0;

    for (var i = 0; i < cardData.length; i++) {
        var currentCard = new BasicCard(cardData[i].front, cardData[i].back);
        currentCard.push(cards);
    }

    basicQuestions(cards, index, score);
}

function basicQuestions(cards, index, score) {
    if (index < cards.length) {

        var card = cards[index];
        inquirer.prompt([{
            type: 'input',
            name: 'text',
            message: card.front + "\nAnswer: ",
        }]).then(function(answer){
        	if(answer.text === card.back) {
        		score++;
        	} else {
        		console.log("Incorrect. The correct answer is " + card.back);
        	}
        	index++;
        	basicQuestions(cards, index, score);
        });

    } else {
    	endGame();
    }
}
