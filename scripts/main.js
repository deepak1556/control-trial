require(['game/grid', 'game/comp', 'game/code'], 
function (grid, c, code) {
    // Helper
    function gI(id) {
        return document.getElementById(id);
    }

    var canvas = gI('game-canvas'),
    codeArea = gI('control-code'),
    logArea = gI('error-log');
    ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 512;

    const pixel = 16; 
    // Calculate from above
    grid.init(32, 64, 16);
    code.init(codeArea, logArea);
    var p = new c.Player(1, 1);
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        grid.debugDraw(ctx);
        requestAnimationFrame(update);
    }
    update();
})
