define(['elements/editor', 'elements/effects', 'level/test', 'elements/log', 'code/parse'], 
function(editor, fx, lvl, log, parse) {
    const updateInterval = 50;
    var canvas  = document.getElementById('game-canvas'),
    codeArea    = document.getElementById('control-code'),
    logArea     = document.getElementById('log-area'),
    startButton = document.getElementById('start-stub'),
    resetButton = document.getElementById('reset-stub'),
    time = 1,
    _state = 0;

    function InvalidStateException() {};

    // State transitions
    function start(){
        if(_state != 1) {
            throw new InvalidStateException;
        }
        _state = 2;
        startButton.innerHTML = "Pause";
        resetButton.disabled = false;
        checkCode();
    }
    function pause() {
        if(_state != 2) {
            throw new InvalidStateException;
        }
        _state = 3;
        startButton.innerHTML = "Resume";
    }
    function resume() {
        if(_state != 3) {
            throw new InvalidStateException;
        }
        _state = 2;
        startButton.innerHTML = "Pause";
    }
    function reset() {
        if(_state == 1) {
            throw  new InvalidStateException;
        }
        _state = 1;
        lvl.reset();
        startButton.innerHTML = "Start";
        resetButton.disabled = true;
    }

    function startButtonHandler() {
        switch(_state) {
            case 1: start();
                break;
            case 2: pause();
                break;
            case 3: resume();
                break;
            default: console.log("Huh??");
                break;
        }
    }

    function checkCode() {
        var codeText = editor.getCode(),
        defFn;
        try {
            defFn = parse.extract(codeText);
        } catch(e) {
            log.error(e.description);
            if(typeof e != "VerifyException") {
                editor.flagLine(e.lineNumber);
            }
            fx.easeScroll(logArea);
            log.progess('Code failed to parse!')
            reset();
            return false;
        }
        editor.clearFlags();
        log.progress('Code Successfully Parsed');
        fx.easeScroll(canvas);
        lvl.start(defFn);
        return defFn;
    }

    function init() {
        lvl.init(canvas);
        editor.init(codeArea);
        log.init(logArea);
        reset();
        startButton.addEventListener('click', startButtonHandler);
        resetButton.addEventListener('click', reset);
        update();
    }

    function update() {
        if(_state == 2) {
            if(!--time) {
                lvl.update();
                time = updateInterval;
            }
        }
        lvl.draw();
        fx.update();
        requestAnimationFrame(update);
    }

    init();
})
