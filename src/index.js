// 获胜的 8 种情况
var winsArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// 获取单元格
var cells = document.querySelectorAll('.cell');
// 获取游戏面板
var gameBord = document.querySelector('#bord');
// 获取游戏胜利面板
var gameMessage = document.querySelector('#message');
// 获取 胜利者
var winner = document.querySelector('#winner');
// 获取 重新开始 按钮
var reStartBtn = document.querySelector('#restart');
var Player;
(function (Player) {
    Player["O"] = "o";
    Player["X"] = "x";
})(Player || (Player = {}));
// 记录下棋的步骤：第 9 步下完，还没分出胜负，就平局
var steps;
// 当前下棋者
var currentPlayer;
// 给重置按钮绑定点击事件
reStartBtn.addEventListener('click', startGame);
// 重新开始游戏 处理函数
function startGame() {
    // 隐藏获取游戏胜利面板
    gameMessage.style.display = 'none';
    // 重置下棋步数
    steps = 0;
    // 重置第一手是玩家 x，重置下一步提示类名
    currentPlayer = Player.X;
    gameBord.classList.remove(Player.X, Player.O);
    gameBord.classList.add(currentPlayer);
    // 重置单元格
    cells.forEach(function (item) {
        var cell = item;
        // 清空类名
        cell.classList.remove(Player.O, Player.X);
        // 重置事件(先清空，再绑定)
        cell.removeEventListener('click', clickCell);
        cell.addEventListener('click', clickCell, { once: true });
    });
}
// 开始游戏
startGame();
// 给单元格绑定点击事件
// cells.forEach(item => {
//   const cell = item as HTMLDivElement
//   cell.addEventListener('click', clickCell, { once: true })
// })
// 单元格点击事件处理函数
function clickCell(e) {
    // 点击后，添加类名
    var target = e.target;
    target.classList.add(currentPlayer);
    steps++;
    // 下棋后，进行判赢
    var isWin = checkWin(currentPlayer);
    if (isWin) {
        gameMessage.style.display = 'block';
        winner.innerHTML = currentPlayer + ' 赢了!';
        return;
    }
    if (steps >= 9) {
        gameMessage.style.display = 'block';
        winner.innerHTML = '平局 ~';
        return;
    }
    // 切换角色
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    // 添加下一步的灰色提示类名
    gameBord.classList.remove(Player.X, Player.O);
    gameBord.classList.add(currentPlayer);
}
// 判赢函数
function checkWin(player) {
    var isWin = winsArr.some(function (item) {
        var cellIndex1 = item[0];
        var cellIndex2 = item[1];
        var cellIndex3 = item[2];
        // console.log(cells[cellIndex1].classList.contains('x')) // classList.contains() 用来判断是否有某个类名
        // 如果三个单元格同时有 'x' 或 'o' 类名，就出现赢者
        var isOver = hasClass(cells[cellIndex1], player) && hasClass(cells[cellIndex2], player) && hasClass(cells[cellIndex3], player);
        if (isOver) {
            return true;
        }
        return false;
    });
    return isWin;
}
// 判断 dom 元素是否包含某个类名
function hasClass(el, className) {
    return el.classList.contains(className);
}
