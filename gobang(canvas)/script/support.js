// 创建数组储存每一步的状态，每一步状态的格式都是一个包含x,y坐标和棋子颜色的对象
var moves = [];

// 储存游戏是否结束的状态
var gameOver = false;

// 储存悔掉的步数
var retractions = [];

// true for black, false for whilte
var pieceColor = true;

// 创建多维数组来存储棋盘所有格子的状态，0表示没有子，1表示有黑子，2表示有白子
var board = [];
// 初始时全部为0，即没有子的状态
for (let i = 0; i < 15; i++) {
    board[i] = [];
    for (let j = 0; j < 15; j++) {
        board[i][j] = 0;
    }
}

function isOver(i, j, pieceColor) {
    if (board[i][j] === 0) return false;
    // 右方
    if (j < 14 && board[i][j + 1] == board[i][j]) {
        for (let k = 0; k < 11; k++) {
            if (
                board[i][k] == board[i][j] &&
                board[i][k + 1] == board[i][j] &&
                board[i][k + 2] == board[i][j] &&
                board[i][k + 3] == board[i][j] &&
                board[i][k + 4] == board[i][j]
            ) {
                gameOver = true;
            }
        }
    }

    // 左方
    if (j > 0 && board[i][j - 1] == board[i][j]) {
        for (let k = 0; k < 11; k++) {
            if (
                board[i][k] == board[i][j] &&
                board[i][k + 1] == board[i][j] &&
                board[i][k + 2] == board[i][j] &&
                board[i][k + 3] == board[i][j] &&
                board[i][k + 4] == board[i][j]
            ) {
                gameOver = true;
            }
        }
    }


    // 下方
    if (i < 14 && board[i + 1][j] == board[i][j]) {
        for (let k = 0; k < 11; k++) {
            if (
                board[k][j] == board[i][j] &&
                board[k + 1][j] == board[i][j] &&
                board[k + 2][j] == board[i][j] &&
                board[k + 3][j] == board[i][j] &&
                board[k + 4][j] == board[i][j]
            ) {
                gameOver = true;
            }
        }
    }

    // 上方
    if (i > 0 && board[i - 1][j] == board[i][j]) {
        for (let k = 0; k < 11; k++) {
            if (
                board[k][j] == board[i][j] &&
                board[k + 1][j] == board[i][j] &&
                board[k + 2][j] == board[i][j] &&
                board[k + 3][j] == board[i][j] &&
                board[k + 4][j] == board[i][j]
            ) {
                gameOver = true;
            }
        }
    }

    //右下
    if (i < 14 && j < 14 && board[i + 1][j + 1] == board[i][j]) {
        for (let k = -7; k < 7; k++) {
            if (i + k < 11 && j + k < 11 && i + k >= 0 && j + k >= 0) {
                if (
                    board[i + k][j + k] == board[i][j] &&
                    board[i + k + 1][j + k + 1] == board[i][j] &&
                    board[i + k + 2][j + k + 2] == board[i][j] &&
                    board[i + k + 3][j + k + 3] == board[i][j] &&
                    board[i + k + 4][j + k + 4] == board[i][j]
                ) {
                    gameOver = true;
                }
            }
        }
    }

    //左上
    if (i > 0 && j > 0 && board[i - 1][j - 1] == board[i][j]) {
        for (let k = -7; k < 7; k++) {
            if (i + k < 11 && j + k < 11 && i + k >= 0 && j + k >= 0) {
                if (
                    board[i + k][j + k] == board[i][j] &&
                    board[i + k + 1][j + k + 1] == board[i][j] &&
                    board[i + k + 2][j + k + 2] == board[i][j] &&
                    board[i + k + 3][j + k + 3] == board[i][j] &&
                    board[i + k + 4][j + k + 4] == board[i][j]
                ) {
                    gameOver = true;
                }
            }
        }
    }

    // 左下
    if (i < 14 && j > 0 && board[i + 1][j - 1] == board[i][j]) {
        for (let k = -7; k < 7; k++) {
            if (i + k < 11 && j + k < 11 && i + k >= 0 && j + k >= 0) {
                if (
                    board[i + k][j - k] == board[i][j] &&
                    board[i + k + 1][j - k - 1] == board[i][j] &&
                    board[i + k + 2][j - k - 2] == board[i][j] &&
                    board[i + k + 3][j - k - 3] == board[i][j] &&
                    board[i + k + 4][j - k - 4] == board[i][j]
                ) {
                    gameOver = true;
                }
            }
        }
    }

    //右上
    if (i > 0 && j < 14 && board[i - 1][j + 1] == board[i][j]) {
        for (let k = -7; k < 7; k++) {
            if (i + k < 11 && j + k < 11 && i + k >= 0 && j + k >= 0) {
                if (
                    board[i + k][j - k] == board[i][j] &&
                    board[i + k + 1][j - k - 1] == board[i][j] &&
                    board[i + k + 2][j - k - 2] == board[i][j] &&
                    board[i + k + 3][j - k - 3] == board[i][j] &&
                    board[i + k + 4][j - k - 4] == board[i][j]
                ) {
                    gameOver = true;
                }
            }
        }
    }

    if (gameOver) {
        alert('游戏结束！' + (pieceColor ? '黑方' : '白方') + '获胜!');
    }
}

function retract() {
    if (moves.length === 0) {
        alert('棋盘上都没子了还悔什么呀！！')
        return;
    };
    //悔棋恢复该位置为无子状态
    board[moves[moves.length - 1].x][moves[moves.length - 1].y] = 0;
    // 若游戏已结束恢复成为结束状态
    if (gameOver) gameOver = false;
    // 将已落子放入已悔子数组中
    retractions.push(moves.pop());

    //清空画布并重绘
    ctx.clearRect(0, 0, 450, 450);
    boardRendering();
    for (var i = 0; i < moves.length; i++) {
        pieceRendering(moves[i].x, moves[i].y, moves[i].color);
    }
}

function abortRetract() {
    if (retractions.length === 0) {
        alert('还没悔呢撤销什么鬼啊！！');
        return;
    };
    // 重绘上一步已悔的棋子
    pieceRendering(retractions[retractions.length - 1].x, retractions[retractions.length - 1].y,
        retractions[retractions.length - 1].color);
    // 恢复已悔子到已落子数组中
    moves.push(retractions.pop());
}
