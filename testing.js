'use strict';function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @module
 * @description
 * This module is used for writing tests for applications written in Angular.
 *
 * This module is not included in the `angular2` module; you must import the test module explicitly.
 *
 */
__export(require('./src/testing/testing'));
var test_component_builder_1 = require('./src/testing/test_component_builder');
exports.ComponentFixture = test_component_builder_1.ComponentFixture;
exports.TestComponentBuilder = test_component_builder_1.TestComponentBuilder;
__export(require('./src/testing/test_injector'));
__export(require('./src/testing/fake_async'));
var view_resolver_mock_1 = require('angular2/src/mock/view_resolver_mock');
exports.MockViewResolver = view_resolver_mock_1.MockViewResolver;
var xhr_mock_1 = require('angular2/src/compiler/xhr_mock');
exports.MockXHR = xhr_mock_1.MockXHR;
var ng_zone_mock_1 = require('angular2/src/mock/ng_zone_mock');
exports.MockNgZone = ng_zone_mock_1.MockNgZone;
var mock_application_ref_1 = require('angular2/src/mock/mock_application_ref');
exports.MockApplicationRef = mock_application_ref_1.MockApplicationRef;
var directive_resolver_mock_1 = require('angular2/src/mock/directive_resolver_mock');
exports.MockDirectiveResolver = directive_resolver_mock_1.MockDirectiveResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtOHhBNTdudWkudG1wL2FuZ3VsYXIyL3Rlc3RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILGlCQUFjLHVCQUF1QixDQUFDLEVBQUE7QUFDdEMsdUNBQXFELHNDQUFzQyxDQUFDO0FBQXBGLHFFQUFnQjtBQUFFLDZFQUFrRTtBQUM1RixpQkFBYyw2QkFBNkIsQ0FBQyxFQUFBO0FBQzVDLGlCQUFjLDBCQUEwQixDQUFDLEVBQUE7QUFFekMsbUNBQStCLHNDQUFzQyxDQUFDO0FBQTlELGlFQUE4RDtBQUN0RSx5QkFBc0IsZ0NBQWdDLENBQUM7QUFBL0MscUNBQStDO0FBQ3ZELDZCQUF5QixnQ0FBZ0MsQ0FBQztBQUFsRCwrQ0FBa0Q7QUFDMUQscUNBQWlDLHdDQUF3QyxDQUFDO0FBQWxFLHVFQUFrRTtBQUMxRSx3Q0FBb0MsMkNBQTJDLENBQUM7QUFBeEUsZ0ZBQXdFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgbW9kdWxlIGlzIHVzZWQgZm9yIHdyaXRpbmcgdGVzdHMgZm9yIGFwcGxpY2F0aW9ucyB3cml0dGVuIGluIEFuZ3VsYXIuXG4gKlxuICogVGhpcyBtb2R1bGUgaXMgbm90IGluY2x1ZGVkIGluIHRoZSBgYW5ndWxhcjJgIG1vZHVsZTsgeW91IG11c3QgaW1wb3J0IHRoZSB0ZXN0IG1vZHVsZSBleHBsaWNpdGx5LlxuICpcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvdGVzdGluZy90ZXN0aW5nJztcbmV4cG9ydCB7Q29tcG9uZW50Rml4dHVyZSwgVGVzdENvbXBvbmVudEJ1aWxkZXJ9IGZyb20gJy4vc3JjL3Rlc3RpbmcvdGVzdF9jb21wb25lbnRfYnVpbGRlcic7XG5leHBvcnQgKiBmcm9tICcuL3NyYy90ZXN0aW5nL3Rlc3RfaW5qZWN0b3InO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvdGVzdGluZy9mYWtlX2FzeW5jJztcblxuZXhwb3J0IHtNb2NrVmlld1Jlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay92aWV3X3Jlc29sdmVyX21vY2snO1xuZXhwb3J0IHtNb2NrWEhSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIveGhyX21vY2snO1xuZXhwb3J0IHtNb2NrTmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9uZ196b25lX21vY2snO1xuZXhwb3J0IHtNb2NrQXBwbGljYXRpb25SZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL21vY2tfYXBwbGljYXRpb25fcmVmJztcbmV4cG9ydCB7TW9ja0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9kaXJlY3RpdmVfcmVzb2x2ZXJfbW9jayc7XG4iXX0=