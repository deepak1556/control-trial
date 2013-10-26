define(['game/grid'], function (grid) {
    var self, _played = false;
    function Player(iI, iJ) { 
        if(self) {
            console.log("Something's UP... This ain't supposed to happen")
            grid.delObject(self.gIdx);
        }
        self = this;
        // Initializtions
        self.i = iI;
        self.j = iJ;
        self.memory = {};
        self.gIdx = grid.addObject(self);
    }

    /* 4 - bit binary sequence
    2, 2 - bit numbers.
    First pair : vertical movement
    Second pair : horizontal movement
    Each 2 - bit number can be,
    00 - INVALID
    01 - NEGATIVE
    10 - ZERO
    11 - POSITIVE */
    var DIR = {
        S:  14,
        N:  6,
        E:  11,
        W:  9,
        SE: 15,
        SW: 13,
        NE: 7,
        NW: 5
    }
    DIR.doc = "Constants for cardinal and ordinal directions {NSEW}"

    var TYPE = {
        block: 1<<1,
        unknown: 1<<0,
    }
    TYPE.doc = "Constants defining type of sensed object"

    // Utility function
    function getDisplacement(dir) {
            var vert = ((dir >> 2) & 3),
            horiz = (dir & 3);
            if(!vert || !horiz) {
                return [0, 0];
            }
            vert -= 2;
            horiz -=2;
            return [vert, horiz];
    }

    function doubleAdd(a, b) {
        return [a[0]+b[0], a[1]+b[1]];
    }

    // API functions
    function remember(obj) {
        for(key in obj) {
            if(obj.hasOwnProperty(key)) {
                self.memory[key] = obj[key];
            }
        }
    }

    function recollect(key) {
        return self.memory[key];
    }

    function move (dir) {
        if(!_played) {
            _played = true;
            var nDisp = getDisplacement(dir);
            if(!grid.move(self.gIdx, nDisp[0], nDisp[1])) {
                console.log('Bad Move');
            }
        }
    }
    move.apiDoc = "Moves in the given direction.\n" +
        " Use constants from DIR\n" +
        " Ends turn..\n";

    function sense() {
        pos = [self.i, self.j];
        var dCMap = {};
        for (key in DIR) {
            if(DIR.hasOwnProperty(key)) {
                var code = DIR[key],
                coord = doubleAdd(getDisplacement(code), pos);
                dCMap[code] = grid.get(coord[0], coord[1]);
            }
        }
        return dCMap;
    }
    sense.apiDoc = "Senses nearby objects"

    var apiObject = {
        player: {
            move: move,
            sense: sense,
        },
        constants: {
            DIR: DIR,
            TYPE: TYPE,
        },
    };

    function getAPIObject() {
        return apiObject;
    }
    Player.getAPIObject = getAPIObject;

    function resetFlags() {
        _played = false;
    }
    Player.resetFlags = resetFlags;

    return Player;
})
