

   var hangmanGame = {
	wordsToPick: {
		"banana" : {
			picture: '<img src =./assets/images/banana.jpg>',
			song: 'Be Happy You Win!',
			preview: './assets/images/1.mp3'
		}, 
		"kiwi" : {
			picture: '<img src =./assets/images/kiwi.jpg>',
			song: 'Be Happy You Win!',
			preview: './assets/images/2.mp3'
		}, 
		"strawberry" : {
			picture: '<img src =./assets/images/strawberry.jpg>',
			song: 'Be Happy You Win!',
			preview: './assets/images/3.mp3'
		}, 
		"apple" : {
			picture: '<img src =./assets/images/apple.jpg>',
			song: 'Be Happy You Win!',
			preview: './assets/images/4.mp3'
		}, 
		"cherry" : {
			picture: '<img src=./assets/images/cherry.jpg>',
			song: 'Be Happy You Win!',
			preview: './assets/images/5.mp3'
		}, 
		"watermelon" : {
			picture: '<img src=./assets/images/watermelon.jpg>',
			song: 'Be Happy You Win!',
			preview: './assets/images/6.mp3'
		}, 
		"grape" : {
			picture: '<img src=./assets/images/grape.jpg>',
			song: 'Be Happy You Win!',
			preview: './assets/images/7.mp3'
		}, 
		"peach" : {
			picture: '<img src=./assets/images/peach.jpg>',
			song: 'Be Happy You Win!',
			preview: './assets/images/8.mp3'
		},
		"orang" : {
			picture: '<img src=./assets/images/orang.jpg>',
			song: 'Be Happy You Win!',
			preview: './assets/images/9.mp3'
		}, 
		"blueberry" : {
			picture: '<img src=./assets/images/blueberry.jpg>',
			song: 'Be Happy You Win!',
			preview: './assets/images/10.mp3'
		}, 
		"pineapple" : {
			picture: '<img src=./assets/images/pineapple.jpg>',
			song: 'Be Happy You Win!',
			preview: './assets/images/11.mp3'
		}
	},
	wordInPlay: null,
	lettersOfTheWord: [],
	matchedLetters: [],
	guessedLetters: [],
	guessesLeft: 0,
	totalGuesses: 0,
	letterGuessed: null,
	wins: 0,
	setupGame: function() {
		// ---Pick a random word
		var objKeys = Object.keys(this.wordsToPick);
		this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

		this.lettersOfTheWord = this.wordInPlay.split('');
		this.rebuildWordView();
		this.processUpdateTotalGuesses();
	},
	updatePage: function(letter) {
		if (this.guessesLeft == 0){
			this.restartGame();
		}else{
			this.updateGuesses(letter);

			this.updateMatchedLetters(letter);

			this.rebuildWordView();

			if (this.updateWins() == true){
				this.restartGame();
				audio.pause();
			}
		}

	},
	updateGuesses: function(letter){
		//if the letter is not in the guessedLetters array
		//and
		//the letter is not in the lettersOfTheWord array
		//then
		//make guesses go down

		if ((this.guessedLetters.indexOf(letter) == -1) && (this.lettersOfTheWord.indexOf(letter) == -1)){
			
			this.guessedLetters.push(letter);

			this.guessesLeft--;

			document.querySelector('#guesses-remaining').innerHTML = this.guessesLeft;

			document.querySelector("#guessed-letters").innerHTML = this.guessedLetters.join(', ');
		}
	},
	processUpdateTotalGuesses: function() {
		this.totalGuesses = this.lettersOfTheWord.length + 5;
		this.guessesLeft = this.totalGuesses;

		// ---Render the guesses left
		document.querySelector('#guesses-remaining').innerHTML = this.guessesLeft;
	},
	updateMatchedLetters: function(letter){
		for (var i = 0; i < this.lettersOfTheWord.length; i++) {
			if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) == -1)){
				this.matchedLetters.push(letter);
			};
		};
	},
	rebuildWordView: function() {
		var wordView = "";

		for(var i=0; i < this.lettersOfTheWord.length; i++){
			if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) != -1){
				wordView += this.lettersOfTheWord[i];				
			}else{
				wordView += '&nbsp;_&nbsp;';
			}
		}

		document.querySelector('#current-word').innerHTML = wordView;

	},
	restartGame : function(){
		document.querySelector('#guessed-letters').innerHTML = '';
		this.wordInPlay = null;
		this.lettersOfTheWord = [];
		this.matchedLetters = [];
		this.guessedLetters = [];
		this.guessesLeft = 0;
		this.totalGuesses = 0;
		this.letterGuessed = null;
		this.setupGame();
		this.rebuildWordView();
	},
	updateWins: function() {


		if (this.matchedLetters.length == 0){
			var win = false;
		}else{
			var win = true
		}
		
		for (var i=0; i < this.lettersOfTheWord.length; i++){
			if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) == -1){
				win = false;
			}
		}

		if (win == true){

			this.wins =  this.wins + 1;
            
			this.guessesLeft = 0;
			document.querySelector('#wins').innerHTML = this.wins;

			document.querySelector('#music').innerHTML = this.wordsToPick[this.wordInPlay].song ;

			document.querySelector('#fruitDiv').innerHTML = this.wordsToPick[this.wordInPlay].picture ;

			var audio = new Audio(this.wordsToPick[this.wordInPlay].preview);
			audio.play();
			return true;
			
		}else{
			return false;
		}
	}
};

hangmanGame.setupGame();

document.onkeyup = function(event) {
	hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	hangmanGame.updatePage(hangmanGame.letterGuessed);
}