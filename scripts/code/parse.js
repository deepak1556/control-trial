define(['import/esprima', 'import/estraverse'], function(esp, est) {
    var q = {};
    st = est;

    function VerifyException(reason, line) {
        this.description = reason;
        this.lineNumber = line;
    }

    function verify(code) {
        pgm = esp.parse(code);
        // Only two functions declared
        if(pgm.body.length != 2) {
            throw new VerifyException("Must have exactly two top-level statements defined");
        }
        for(var i = 0; i < 2; i++) {
            var fnD = pgm.body[i];
            if(fnD.type != "FunctionDeclaration") {
                throw new VerifyException("Only define functions");
            }
        }
        // Define _update_
        function getName(dcl) {
            return dcl.id.name;
        }
        function has(name) {
            return function(x) { return x == name; };
        }
        var names = pgm.body.map(getName);
        console.log(names);
        if(!names.some(has('update'))) {
            throw new VerifyException("No `update` loop defined");
        }
        if(!names.some(has('init'))) {
            throw new VerifyException("No `init` function defined");
        }
        return true;
    }

    function extract(code) {
        verify(code);
        eval(code);
        return {update: update, init: init}
    }
    q.extract = extract;

    return q;
});
