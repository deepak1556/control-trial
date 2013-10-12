require(['game/grid', 'game/comp', 'import/esprima', 'import/escodegen'], function (grid, c, ep, ec) {
    var canvas = document.getElementById('game-canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 512;
    const pixel = 16; 
    // Calculate from above
    grid.init(32, 64, 16);
    var p = new c.Player(1, 1);
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        grid.debugDraw(ctx);
        p.move(c.Player.DIR.S);
        requestAnimationFrame(update);
    }
    console.log(ep);
    console.log(ec);
    update();
})
