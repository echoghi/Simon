'use strict'

class game {
    constructor() {
        this.strictMode = false;
        this.showingMoves = false;
        this.turnCount = 1;
        this.move = 0;
        this.sequence = [];
        this.moveCount = 0;
        this.playerMoves = [];
    }

    counterUpdate() {
        $('#counter').addClass('counter-on');
        this.turnCount < 10 ? ($("#counter").attr('placeholder', "0" + this.turnCount)) :
        ($("#counter").attr('placeholder', this.turnCount));
    }

    reset() {
        this.turnCount = 1;
        this.sequence = [];
        this.playerMoves = [];
        this.moveCount = 0;
        this.move = 0;
    }

    disableBoard() {
        $('#red').attr('onclick', '');
        $('#green').attr('onclick', '');
        $('#yellow').attr('onclick', '');
        $('#blue').attr('onclick', '');
    }

    activateBoard() {
        $('#red').attr('onclick', 'simon.player(2)');
        $('#green').attr('onclick', 'simon.player(1)');
        $('#yellow').attr('onclick', 'simon.player(3)');
        $('#blue').attr('onclick', 'simon.player(4)');
    }

    executeMove(move) {
        colors[move].sound.play();
        $(colors[move].id).css('background', colors[move].activeColor);

        setTimeout(function(){
            $(colors[move].id).css('background', colors[move].color)
        }, 300);

  }

    executeAll() {
        this.executeMove(1);
        this.executeMove(2);
        this.executeMove(3);
        this.executeMove(4);
    }

    winner() {
        if(this.turnCount === 20) {
            alert('you win!');
            this.reset();
        }
    }

    showMoves() {
        let that = this;
        this.disableBoard();

        (function playLoop() {
            setTimeout(function() {
                if(that.move < that.sequence.length) {
                    that.executeMove(that.sequence[that.move])
                    that.move++
                    playLoop()
                } else{
                    that.activateBoard();
                }
            }, 1000);

        })();

  }

    player(color) {
        let that = this;
        this.playerMoves.push(color);

        console.log(this.sequence[this.moveCount], this.playerMoves[this.moveCount])

        if(this.sequence[this.moveCount] === this.playerMoves[this.moveCount]) {

            for (let i = 0; i < colors.length; i++) {
                if(colors[i].location === color){
                    that.executeMove(i);
                }
            }

            this.moveCount++;

            if(this.playerMoves.length === this.sequence.length) {
                this.turnCount++;
                this.playerMoves = [];
                this.moveCount = 0;

                setTimeout(function() {
                    that.newMove()
                }, 1000);
            }
        } else {
            this.playerMoves = [];
            this.moveCount = 0;
            this.move = 0;
            that.executeAll();
            that.showMoves();

            if(this.strictMode === true) {
                that.executeAll();
                that.reset();
                that.newMove();
            }
        }

  }

    newMove() {
        this.winner();
        this.counterUpdate();
        let randomColor = Math.floor(Math.random() * 4 + 1);

        for (let i = 0; i < colors.length; i++) {

            if (colors[i].location === randomColor) {

                this.sequence.push(colors[i].location);
                console.log('turn: ' + this.turnCount);
                console.log('sequence: ' + this.sequence);
                this.move = 0;
                this.showMoves();
                this.counterUpdate();
            }
        }
    }

}


let color = function(location, color, id, activeColor, sound = {}) {
    return {
        location,
        color,
        id,
        activeColor,
        sound
        }
};

//Initialize Colors
const green = new color(1, "#02960c", '#green', "#02c30f", new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')),
    red = new color(2, "#bf0000", '#red', "#e50101", new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')),
    yellow = new color(3, "#b8c304", '#yellow', "#dffb03", new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')),
    blue = new color(4, "#0231b0", "#blue", "#003de3", new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'));

let colors = [],
    simon = new game();

colors.push('buffer', green, red, yellow, blue);

$('#start').click( () => {
    simon.strictMode = false;
    simon.reset();
    simon.newMove();
});

$('#strict').click( () => {
    simon.strictMode = true;
    simon.reset();
    simon.newMove();
});
