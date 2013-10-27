define([], function() {
    var q = {},
    area;
    function init(logArea) {
        area = logArea;
    }
    q.init = init;

    function reportError(content) {
        var divEl = document.createElement('div');
        divEl.className = "log-item log-error";
        divEl.innerHTML = content;
        area.appendChild(divEl);
    }
    q.error = reportError;

    function reportProgress(content) {
        var divEl = document.createElement('div'),
        timestamp = "<b>"+(new Date).toLocaleTimeString()+"</b>: ";
        divEl.className = "log-item";
        divEl.innerHTML = timestamp + content;
        area.appendChild(divEl);
    }
    q.progress = reportProgress;

    function clearArea() {
        area.innerHTML = "";
    }
    q.clearArea = clearArea;

    return q;
});
