define(['game/grid', 'player/basic'], 
function(grid, Player) {
    const pixel = 16, tTime = 60;
    var q = {}, _state = -1, _time = 0,
    canvas, player, ctx, defFn;
    function update() {
        if(_state == 1) {
            if(--_time <= 0) {
                _time = tTime;
                console.log(player);
                defFn.update(Player.getAPIObject());
                Player.resetFlags();
                console.log("Played");
            }
        }
        draw();
    }
    q.update = update;

    function init(can) {
        _state = 0;
        canvas = can;
        ctx = canvas.getContext('2d');
        //HARDCODE
        canvas.width = 1024;
        canvas.height = 512;
        // Calculate from above
        grid.init(32, 64, pixel);
        player = new Player(0, 0);
    }
    q.init = init;

    function start(dFn) {
        _state = 1;
        defFn = dFn;
    }
    q.start = start;

    function reset() {
        _state = 0;
        player = new Player(0, 0);
    }
    q.reset = reset;

    function draw() {
        ctx.clearRect(0, 0, 1024, 512);
        grid.debugDraw(ctx);
    }

    function getPlayerApiDoc() {
        var doc = "",
        apiObject = Player.getAPIObject();
        for (sect in apiObject) {
            for (key in apiObject[sect]) {
                doc += sect+","+key+": "+apiObject[sect][key].doc+"<br>";
            }
        }
        return doc;
    }
    q.getPlayerApiDoc = getPlayerApiDoc;

    return q;
});
