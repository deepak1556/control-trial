define([], function() {
    var q = {}, grid = [],
    row, column
    function init(r, c) {
        row = r, column = c;
        grid = new Array(r * c);
    }
    q.init = init;

    function assertBounds(i, j) {
        return ((i > 0) && (i < row)) && ((j > 0) && (j <column));
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

    function move(i0, j0, i1, j1) {
        if(!assertBounds(i,j)) {
            return;
        }
        grid[i1 * column + j1] = grid[i0 * column + j0];
        grid[i0 * column + j0] = null;
    }
    q.move = move;

    function debugDraw() {
        for(var i = 0; i < grid.length; i++) {
            var r = ~~(i/ column),
            c = i % column,
            val = grid[i];
            if(val) {
            
            }
        }
    }
    return q;
})
