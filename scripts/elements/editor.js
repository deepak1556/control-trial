define(['import/codemirror'],
function() {
    var q = {},
    logArea, codeMirror;

    const defaultCode = 
        "function update(api) {\n"+
        "    //INSERT CODE HERE\n"+
        "}\n\n"+
        "function init(api, pos) {\n"+
        "   //INIT THINGS\n"+
        "}\n";

    function flagLine(line) {
        line = line || 1;
        if(typeof line == "number" && --line >= 0 && line < codeMirror.lineCount()) {
            var mark = document.createElement('div');
            mark.style.color = 'red';
            mark.style.fontSize = 16;
            mark.innerHTML = '•';
            codeMirror.setGutterMarker(line, 'error-flag', mark);
        }
    }
    q.flagLine = flagLine;

    function clearFlags() {
        codeMirror.clearGutter('error-flag');
    }
    q.clearFlags = clearFlags;

    function init(codeArea) {
        codeMirror = CodeMirror(codeArea, {
            value: defaultCode,
            mode:  "javascript",
            lineNumbers: true,
            indentUnit: 4,
            gutters: ['CodeMirror-linenumbers', 'error-flag']
        });
    }
    q.init = init;

    function getCode() {
        return codeMirror.getValue();
    }
    q.getCode = getCode;

    return q;
});
