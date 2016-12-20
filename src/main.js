var canvas = document.getElementById('canvas');
var restart = document.getElementById('restart');
var context = canvas.getContext('2d');
var gameOver = false;
var pieceColor = true; // true for black(human), false for white(ai)

// store every position on the board, 0 means nothing there, 1 means black, 2 means white
var board = [];
// initial values are nothing there in all positions
for (var i = 0; i < 15; i++) {
    board[i] = [];
    for (var j = 0; j < 15; j++) {
        board[i][j] = 0;
    }
}

// store all the ways to win the game
var win = [];
for (var i = 0; i < 15; i++) {
    win[i] = [];
    for (var j = 0; j < 15; j++) {
        win[i][j] = [];
    }
}

// let's calculate how many ways are there to win the game
var count = 0;
// horizontally
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            win[i][j+k][count] = true;
        }
        count++;
    }
}
// vertically
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            win[j+k][i][count] = true;
        }
        count++;
    }
}
// diagonally
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            win[i+k][j+k][count] = true;
        }
        count++;
    }
}
// back-diagonally
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            win[i+k][j-k][count] = true;
        }
        count++;
    }
}
// console.log(count)
// so now the total amount count === 572;

// me wins
var humanWin = [];

// ai wins
var aiWin = [];

// initial value is 0
for (var i = 0; i < count; i++) {
    humanWin[i] = 0;
    aiWin[i] = 0;
}



window.onload = function() {
    drawBoard();
    canvas.onclick = function(event) {
        if (gameOver) {
            return;
        }
        if (!pieceColor) {
            return;
        }
        humanStep(event);
        if (!gameOver) {
            pieceColor = !pieceColor;
            aiStep();
        }
    }

    restart.onclick = function() {
        location.reload();
    }

}


function drawBoard() {
    context.strokeStyle = '#bfbfbf';
    for (var i = 0; i < 15; i++) {
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();

        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }
}

function drawPiece(i, j, pieceColor) {
    var x = 15 + i * 30;
    var y = 15 + j * 30;

    context.beginPath();
    context.arc(x, y, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(x + 3, y - 3, 13, x + 3, y - 3, 0);
    if (pieceColor) {
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#666666');
    } else {
        gradient.addColorStop(0, '#d1d1d1');
        gradient.addColorStop(1, '#f9f9f9');
    }
    context.fillStyle = gradient;
    context.fill();

}

function humanStep(event) {
    var i = Math.floor(event.offsetX / 30);
    var j = Math.floor(event.offsetY / 30);
    if (board[i][j] === 0) {
        drawPiece(i, j, pieceColor);
        board[i][j] = 1;
        check(i, j, true);
    }
}

function aiStep() {
    // I added a bit delay time for better experience
    var time = parseInt(Math.random() * 2000);
    setTimeout(function(){
        aiCalculating();
    }, time)
}

function aiCalculating() {
    var defence = [];
    var offence = [];
    var totalFactor = 0;
    var bestX = 0;
    var bestY = 0;
    for (var i = 0; i < 15; i++) {
        defence[i] = [];
        offence[i] = [];
        for (var j = 0; j < 15; j++) {
            defence[i][j] = 0;
            offence[i][j] = 0;
        }
    }

    // 遍历每一个位置，分别计算玩家和ai下子在此处的优势权重来决定进攻还是放守
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (board[i][j] === 0) {
                for (var k = 0; k < count; k++) {
                    if (win[i][j][k]) {
                        switch (humanWin[k]) {
                            case 1:
                                defence[i][j] += 200;
                                break;
                            case 2:
                                defence[i][j] += 400;
                                break;
                            case 3:
                                defence[i][j] += 2000;
                                break;
                            case 4:
                                defence[i][j] += 10000;
                                break;
                        }

                        switch (aiWin[k]) {
                            case 1:
                                offence[i][j] += 300;
                                break;
                            case 2:
                                offence[i][j] += 500;
                                break;
                            case 3:
                                offence[i][j] += 4000;
                                break;
                            case 4:
                                offence[i][j] += 20000;
                                break;
                        }
                    }
                }

                if (defence[i][j] > totalFactor) {
                    totalFactor = defence[i][j];
                    bestX = i;
                    bestY = j;
                } else if (defence[i][j] === totalFactor) {
                    if (offence[i][j] > offence[bestX][bestY]) {
                        bestX = i;
                        bestY = j;
                    }
                }
                if (offence[i][j] > totalFactor) {
                    totalFactor = offence[i][j];
                    bestX = i;
                    bestY = j;
                } else if (offence[i][j] === totalFactor) {
                    if (defence[i][j] > defence[bestX][bestY]) {
                        bestX = i;
                        bestY = j;
                    }
                }
            }
        }
    }

    if (board[bestX][bestY] === 0) {
        drawPiece(bestX, bestY, false);
        board[bestX][bestY] = 2;
        check(bestX, bestY, false);
    }

    if (!gameOver) {
        pieceColor = !pieceColor;
    }
}

// check if this position will results the winning match
function check(x, y, pieceColor) {
    for (var i = 0; i < count; i++) {
        if (win[x][y][i]) {
            if (pieceColor) {
                humanWin[i]++;
                aiWin[i] = -99;
                if (humanWin[i] === 5) {
                    window.alert('you win!')
                    gameOver = true;
                }
            } else {
                aiWin[i]++;
                humanWin[i] = -99;
                if (aiWin[i] === 5) {
                    window.alert('you lose!')
                    gameOver = true;
                }
            }
        }
    }
}
