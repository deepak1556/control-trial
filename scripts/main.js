define(['code/iface', 'ui', 'level/test'], function(code, ui, lvl) {

    // Helper
    function gI(id) {
        return document.getElementById(id);
    }

    canvas = gI('game-canvas'),
    codeArea = gI('control-code'),
    logArea = gI('error-log'),
    startButton = gI('start-stub'),
    resetButton = gI('reset-stub');
    var uCount,  _reset = false;

    function start(codeObj) {
        ui.easeScroll(canvas);
        startButton.disabled = true;
        resetButton.disabled = false;
        lvl.start(codeObj);
    }

    function init() {
        function startClick() {
            var rObj = code.checkCode();
            if(rObj) {
                start(rObj);
            } else {
                ui.easeScroll(logArea);
            }
        }
        function resetClick() {
            lvl.reset();
            startButton.disabled = false;
            resetButton.disabled = true;
        }
        startButton.addEventListener('click', startClick);
        resetButton.addEventListener('click', resetClick);
        lvl.init(canvas);
        code.init(codeArea, logArea);
        code.logEntry(lvl.getPlayerApiDoc());
        update();
    }

    function update() {
        lvl.update();
        ui.update();
        requestAnimationFrame(update);
    }

    init();
})
