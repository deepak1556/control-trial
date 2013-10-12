define([], function() {
    var q = {}, grid = [],
    row, column, pixel
    function init(r, c, px) {
        row = r, column = c, pixel = px;
        grid = new Array(r * c);
    }
    q.init = init;

    function assertBounds(i, j) {
        return ((i >= 0) && (i < row)) && ((j >= 0) && (j <column));
    }
    q.assertBounds = assertBounds;

    function get(i, j) {
        if(!assertBounds(i, j)) {
            return null;
        }
        return grid[i * column + j];
    }
    q.get = get;

    function set(i, j, val) {
        if(!assertBounds(i, j)) {
            return;
        }
        grid[i * column + j] = val;
    }
    q.set = set;

    function move(i, j, dI, dJ) {
        if(!assertBounds(i,j) || !assertBounds(i + dI, j + dJ)) {
            return 0;
        }
        var oP = i * column + j,
        nP = (i + dI) * column + j + dJ;
        grid[nP] = grid[oP];
        grid[oP] = null;
        return 1;
    }
    q.move = move;

    function debugDraw(ctx) {
        var i;
        for(i = 0; i < grid.length; i++) {
            var r = ~~(i/ column),
            c = i % column,
            val = grid[i];
            if(val) {
                var color = val.color || 'black';
                ctx.fillRect(c * pixel, r * pixel, pixel, pixel);
            }
        }
        // Drawing the GRID
        for(i = 0; i <= column; i++) {
            ctx.fillRect(i * pixel - 1, 0, 2, row * pixel);
        }
        for(i = 0; i <= row; i++) {
            ctx.fillRect(0, i * pixel - 1, column * pixel, 2);
        }
    }
    q.debugDraw = debugDraw;

    return q;
})
