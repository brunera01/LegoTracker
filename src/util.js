"use strict";
exports.__esModule = true;
exports.htmlToDivElement = void 0;
function htmlToDivElement(html) {
    var _a;
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    if (!(template.content.firstChild instanceof HTMLDivElement)) {
        throw new Error('not a div');
    }
    return (_a = template.content.firstChild) !== null && _a !== void 0 ? _a : {};
}
exports.htmlToDivElement = htmlToDivElement;
