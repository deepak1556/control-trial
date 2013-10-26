define(['code/parse', 'import/codemirror'],
function(parse) {
    var q = {},
    logArea, editor;

    const defaultCode = 
        "function update(api) {\n"+
        "    //INSERT CODE HERE\n"+
        "}\n\n"+
        "function init(api, position) {\n"+
        "   //INIT THINGS\n"+
        "}\n";

    function reportError(desc, line) {
        line = line || 1;
        if(typeof line == "number" && --line > 0 && line < editor.lineCount()) {
            function chCback() {
                editor.removeLineClass(line, 'wrapper', 'red-flag');
            }
            editor.addLineClass(line, 'wrapper', 'red-flag');
            editor.getLineHandle(line).on('change', chCback);
        }
        logEntry("<div class='red-flag'>"+desc+"<\div>");
    }

    function init(codeArea, log) {
        logArea = log;
        editor = CodeMirror(codeArea, {
            value: defaultCode,
            mode:  "javascript",
            lineNumbers: true,
            indentUnit: 4,
        });
    }
    q.init = init;

    function checkCode() {
        var code = editor.getValue(),
        defFn;
        try {
            defFn = parse.extract(code);
            logEntry('Code Successfully Parsed');
            return defFn;
        } catch(e) {
            reportError(e.description, e.lineNumber);
            return false;
        }
    }
    q.checkCode = checkCode;

    function logEntry(log_str) {
        logArea.innerHTML += '<br><b>-'+(new Date()).toLocaleTimeString()+'-</b><br>';
        log_str.replace('\n', '<br>');
        logArea.innerHTML += log_str
    }
    q.logEntry = logEntry;

    return q;
});
