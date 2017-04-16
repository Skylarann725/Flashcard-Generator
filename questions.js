var inquirer = require('inquirer'); // for inquirer package
var fs = require('fs'); // for fs
var BasicCard = require('./basic.js'); // to retrieve basic card info
var ClozeCard = require('./cloze.js'); // to retrieve close card info
var basicData = require('./BASIC.JSON');
var clozeData = require('./partial.json')


function playGameBasic() {
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
            basicQuestions(cards, index, score);
        });

    } else {
        playGameBasic();
    }
}

function playGameCloze(cards, index, score) {
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
        playGameCloze();
    }
}
