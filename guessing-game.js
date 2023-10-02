
const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let secretNumber ;
let numAttempts ;

let askLimit = () => {
    rl.question('In how many rounds you want to Guess: ', (answer) => {
        numAttempts = Number(answer);
        askRange()
    });
}

let askRange = () => {
    rl.question('Enter a max number: ', handleResponseOne);

    function handleResponseOne(firstAnswer) {
        rl.question('Enter a min number: ', (SecondAnswer) => {
            let min = Number(SecondAnswer);
            let max = Number(firstAnswer);
            secretNumber = randomInRange (min, max);
            console.log(`I'm thinking of a number between ${SecondAnswer} and ${firstAnswer}...`);
            askGuess();
        });
    }
};


let randomInRange = (min, max) => {
    return Math.floor(Math.random()* (max - min) + min + 1);
};

let askGuess = () => {

    rl.question('Enter a guess: ', (answer) => {
        let response = Number(answer);
        if (checkGuess(response)) {
            console.log("You Win!");
            rl.close();
        } else {
            numAttempts--;
            if (numAttempts === 0) {
                console.log("You Loose!");
                rl.close();
            } else {
                askGuess();
            }
        }
    });
}


let checkGuess = (num) => {
    if (num > secretNumber) {
        console.log("Too high");
        return false;
    } else if (num < secretNumber) {
        console.log("Too Low");
        return false;
    } else if (num === secretNumber) {
        console.log("Correct!");
        return true;
    }
}

askLimit();
