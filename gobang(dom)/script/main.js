window.onload = function() {
    boardRendering()
    boardTable.addEventListener('click', function(e) {
        if (gameOver) return;
        var i = e.clientX - boardDiv.offsetLeft;
        var j = e.clientY - boardDiv.offsetTop;
        i = Math.floor(i / 30);
        j = Math.floor(j / 30);
        if (board[i][j] === 0) {
            moves.push({
                x: i,
                y: j,
                color: pieceColor
            });
            // 悔棋后又下了一步则之前存储的已悔棋清空，无法再撤销
            retractions = [];
            pieceRendering(i, j, pieceColor);
        }
    }, true);

    retractBtn.onclick = function() {
        retract();
    }

    abortRetractBtn.onclick = function() {
        abortRetract();
    }

    restartBtn.onclick = function() {
        window.location.reload();
    }
}
