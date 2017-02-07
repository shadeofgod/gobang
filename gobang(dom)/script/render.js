var boardTable = document.getElementById('board-tb');
var boardDiv = document.getElementById('board-div');
var retractBtn = document.getElementById('retract-btn');
var abortRetractBtn = document.getElementById('abortRetract-btn');
var restartBtn = document.getElementById('restart-btn');

function boardRendering() {
    for (let i = 0; i < 14; i++) {
        var tr = document.createElement('tr');
        for (let j = 0; j < 14; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);
            td.style.border = '2px solid #444';
            td.style.width = '30px';
            td.style.height = '30px';
            td.style.backgroundColor = 'rgb(187, 101, 54)'
        }
        boardTable.appendChild(tr);
    }

    infoDisplay(pieceColor);
}

function pieceRendering(i, j, color) {
    if (gameOver) return;

    var x = i * 30 + 2;
    var y = j * 30 - 2;

    var piece = document.createElement('div');
    piece.className = 'pieces';
    piece.id = i + '-' + j;
    piece.style.backgroundColor = color ? 'black' : 'white';
    piece.style.left = x + 'px';
    piece.style.top = y + 'px';
    boardDiv.appendChild(piece);

    board[i][j] = color ? 1 : 2;

    isOver(i, j, color);
    pieceColor = !color;
    infoDisplay(pieceColor);
}

function infoDisplay(pieceColor) {
    var text = document.getElementById('text')
    text.innerHTML = pieceColor ? '黑方' : '白方';
}
