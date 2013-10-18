define(['import/esprima', 'import/escodegen', 'import/estraverse', 'import/codemirror'],
function(parse, codegen, traverse) {
    var q = {},
    logArea, codeEditor;

    const defaultCode = 
        "function update(player) {\n"+
        "    //INSERT CODE HERE\n"+
        "}\n";

    function reportError(desc, line) {
        if(line !== undefined) {
            function chCback() {
                codeEditor.removeLineClass(line, 'wrapper', 'red-flag');
            }
            codeEditor.addLineClass(line, 'wrapper', 'red-flag');
            codeEditor.getLineHandle(line).on('change', chCback);
        }
        logArea.innerHTML = desc;
        logArea.style.display = 'block';
    }
    q.reportError = reportError;

    function init(codeArea, log) {
        logArea = log;
        logArea.style.display = 'none';
        codeEditor = CodeMirror(codeArea, {
            value: defaultCode,
            mode:  "javascript",
            lineNumbers: true,
            indentUnit: 4,
        });
    }
    q.init = init;

    function parseCode() {
        var code = codeEditor.getValue(),
        parseTree = parse.parse(code);
        console.log(parseTree);
    }
    q.parseCode = parseCode;

    return q;
});
