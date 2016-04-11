'use strict';var lang_1 = require('../facade/lang');
var exceptions_1 = require('../facade/exceptions');
function assertArrayOfStrings(identifier, value) {
    if (!lang_1.assertionsEnabled() || lang_1.isBlank(value)) {
        return;
    }
    if (!lang_1.isArray(value)) {
        throw new exceptions_1.BaseException("Expected '" + identifier + "' to be an array of strings.");
    }
    for (var i = 0; i < value.length; i += 1) {
        if (!lang_1.isString(value[i])) {
            throw new exceptions_1.BaseException("Expected '" + identifier + "' to be an array of strings.");
        }
    }
}
exports.assertArrayOfStrings = assertArrayOfStrings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtR09YdlhrYUcudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9hc3NlcnRpb25zLnRzIl0sIm5hbWVzIjpbImFzc2VydEFycmF5T2ZTdHJpbmdzIl0sIm1hcHBpbmdzIjoiQUFBQSxxQkFBNEQsZ0JBQWdCLENBQUMsQ0FBQTtBQUM3RSwyQkFBNEIsc0JBQXNCLENBQUMsQ0FBQTtBQUVuRCw4QkFBcUMsVUFBa0IsRUFBRSxLQUFVO0lBQ2pFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSx3QkFBaUJBLEVBQUVBLElBQUlBLGNBQU9BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzNDQSxNQUFNQSxDQUFDQTtJQUNUQSxDQUFDQTtJQUNEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNwQkEsTUFBTUEsSUFBSUEsMEJBQWFBLENBQUNBLGVBQWFBLFVBQVVBLGlDQUE4QkEsQ0FBQ0EsQ0FBQ0E7SUFDakZBLENBQUNBO0lBQ0RBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBO1FBQ3pDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxlQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4QkEsTUFBTUEsSUFBSUEsMEJBQWFBLENBQUNBLGVBQWFBLFVBQVVBLGlDQUE4QkEsQ0FBQ0EsQ0FBQ0E7UUFDakZBLENBQUNBO0lBQ0hBLENBQUNBO0FBQ0hBLENBQUNBO0FBWmUsNEJBQW9CLHVCQVluQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0FycmF5LCBpc1N0cmluZywgaXNCbGFuaywgYXNzZXJ0aW9uc0VuYWJsZWR9IGZyb20gJy4uL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnLi4vZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0QXJyYXlPZlN0cmluZ3MoaWRlbnRpZmllcjogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gIGlmICghYXNzZXJ0aW9uc0VuYWJsZWQoKSB8fCBpc0JsYW5rKHZhbHVlKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWlzQXJyYXkodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYEV4cGVjdGVkICcke2lkZW50aWZpZXJ9JyB0byBiZSBhbiBhcnJheSBvZiBzdHJpbmdzLmApO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoIWlzU3RyaW5nKHZhbHVlW2ldKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYEV4cGVjdGVkICcke2lkZW50aWZpZXJ9JyB0byBiZSBhbiBhcnJheSBvZiBzdHJpbmdzLmApO1xuICAgIH1cbiAgfVxufVxuIl19