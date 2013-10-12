define(['game/grid'], function (grid) {
    var q = {};
    function Player(iI, iJ) { 
        var self = this;
        self.i = iI;
        self.j = iJ;
        self.color = 'blue';
        grid.set(self.i, self.j, self);
    }
    /*
    4 - bit binary sequence
    2, 2 - bit numbers.
    First pair : vertical movement
    Second pair : horizontal movement
    Each 2 - bit number can be,
    00 - INVALID
    01 - NEGATIVE
    10 - ZERO
    11 - POSITIVE
    */
    Player.DIR = {
        S:  14,
        N:  6,
        E:  11,
        W:  9,
        SE: 15,
        SW: 13,
        NE: 7,
        NW: 5
    }

    Player.prototype.move = function(dir) {
        var vert = ((dir >> 2) & 3),
        horiz = (dir & 3);
        if(!vert || !horiz) {
            return;
        }
        vert -= 2;
        horiz -=2;
        if(grid.move(this.i, this.j, vert, horiz)) {
            this.i += vert;
            this.j += horiz;
        }
    }

    q.Player = Player;

    return q;
})
