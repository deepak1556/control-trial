define([], function() {
    var q = {}, grid = [], ent = {},
    globalEntIdx = 1, row, column, pixel; fLay = [];

    function init(r, c, px) {
        row = r, column = c, pixel = px;
        grid = new Array(r * c);
    }
    q.init = init;

    function addObject(obj) {
        var pIdx = obj.i * column + obj.j;
        if(fLay[pIdx]) {
            return 0;
        }
        fLay[pIdx] = obj;
        ent[globalEntIdx] = obj;
        return globalEntIdx++;
    }
    q.addObject = addObject;

    function delObject(idx) {
        delete fLay[ent[idx].i * column + ent[idx].j];
        delete ent[idx];
    }
    q.delObject = delObject;


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

    function move(eId, dI, dJ) {
        console.log(arguments);
        var e = ent[eId],
        oP = e.i * column + e.j,
        nP = (e.i + dI) * column + e.j + dJ,
        isOccupied = (fLay[nP]),
        isValid = assertBounds(e.i, e.j) && assertBounds(e.i + dI, e.j + dJ);
        if(!isValid || isOccupied) {
            console.log(isValid, isOccupied);
            return 0;
        }
        fLay[nP] = fLay[oP],
        fLay[oP] = null;
        e.i += dI;
        e.j += dJ;
        return 1;
    }
    q.move = move;

    function debugDraw(ctx) {
        var i;
        for(i = 0; i < grid.length; i++) {
            var r = ~~(i/ column),
            c = i % column,
            val = grid[i] || fLay[i];
            if(val) {
                var color = val.color || 'black';
                ctx.fillRect(c * pixel, r * pixel, pixel, pixel);
            }
            
        }
        // Drawing the GRID
        for(i = 0; i <= column; i++) {
            ctx.fillRect(i * pixel - 1, 0, 1, row * pixel);
        }
        for(i = 0; i <= row; i++) {
            ctx.fillRect(0, i * pixel - 1, column * pixel, 1);
        }
    }
    q.debugDraw = debugDraw;
    m=q;
    return q;
})
