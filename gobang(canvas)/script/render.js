var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var retractBtn = document.getElementById('retract-btn');
var abortRetractBtn = document.getElementById('abortRetract-btn');
var restartBtn = document.getElementById('restart-btn');

// 绘制棋盘
function boardRendering() {
    // board color
    ctx.fillStyle = 'rgb(187, 101, 54)';
    ctx.rect(0, 0, 450, 450);
    ctx.fill();
    // lines
    ctx.strokeStyle = '#202020';
    for (var i = 0; i <= 15; i++) {
        ctx.beginPath();
        ctx.moveTo(15 + i * 30, 15);
        ctx.lineTo(15 + i * 30, 435);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(15, 15 + i * 30);
        ctx.lineTo(435, 15 + i * 30);
        ctx.closePath();
        ctx.stroke();
    }

    infoDisplay(pieceColor);

}


// 绘制棋子
function pieceRendering(i, j, color) {
    if (gameOver) return;

    var x = 15 + i * 30;
    var y = 15 + j * 30;

    ctx.beginPath();
    ctx.arc(x, y, 13, 0, 2 * Math.PI);
    ctx.closePath();

    var gradient = ctx.createRadialGradient(x + 3, y - 3, 13, x + 3, y - 3, 0);
    if (color) {
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#666666');

        board[i][j] = 1;
    } else {
        gradient.addColorStop(0, 'rgb(174, 175, 175)');
        gradient.addColorStop(1, '#f9f9f9');

        board[i][j] = 2;
    }
    ctx.fillStyle = gradient;
    ctx.fill();

    isOver(i, j, color);
    pieceColor = !color;
    infoDisplay(pieceColor);
}

function infoDisplay(pieceColor) {
    var text = document.getElementById('text')
    text.innerHTML = pieceColor ? '黑方' : '白方';
}
