define([], function() {
    var q = {},
    cbChain = [];
    const res = 2, speed = 4;

    function newEl(type, parent) {
        var el = document.createElement(type);
        parent.appenChild(el);
        return el;
    }
    q.newEl = newEl;


    function easeScroll(x, y, delT) {
        if (Math.abs(~~(scrollX - x)) < res && Math.abs(~~(scrollY - y)) < res) {
            return;
        } else {
            var mv = speed * delT,
            pX = scrollX, pY = scrollY;
            scrollTo(scrollX + ~~(mv * (x - scrollX)), scrollY + ~~(mv * (y - scrollY)));
            if(pX == scrollX && pY == scrollY) {
                return;
            }
            return function(delT) {
                return easeScroll(x, y, delT);
            }
        }
    }
    q.easeScroll = function(el) {
        var x = el.offsetLeft,
        y = el.offsetTop;
        cbChain.push(function(delT) {
            return easeScroll(x, y, delT);
        });
    }

    function update(delT) {
        delT = delT || 1/25;
        for(var i = cbChain.length - 1; i >= 0; i--) {
            var res = cbChain[i](delT);
            if(typeof res == "function") {
                cbChain[i] = res;
            } else {
                cbChain.splice(i, 1);
            }
        }
    }

    q.update = update;
    return q;
})
