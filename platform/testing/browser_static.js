'use strict';var core_1 = require('angular2/core');
var browser_common_1 = require('angular2/src/platform/browser_common');
var browser_adapter_1 = require('angular2/src/platform/browser/browser_adapter');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
var animation_builder_mock_1 = require('angular2/src/mock/animation_builder_mock');
var directive_resolver_mock_1 = require('angular2/src/mock/directive_resolver_mock');
var view_resolver_mock_1 = require('angular2/src/mock/view_resolver_mock');
var mock_location_strategy_1 = require('angular2/src/mock/mock_location_strategy');
var location_strategy_1 = require('angular2/src/router/location/location_strategy');
var ng_zone_mock_1 = require('angular2/src/mock/ng_zone_mock');
var xhr_impl_1 = require("angular2/src/platform/browser/xhr_impl");
var compiler_1 = require('angular2/compiler');
var test_component_builder_1 = require('angular2/src/testing/test_component_builder');
var utils_1 = require('angular2/src/testing/utils');
var common_dom_1 = require('angular2/platform/common_dom');
var lang_1 = require('angular2/src/facade/lang');
var utils_2 = require('angular2/src/testing/utils');
function initBrowserTests() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    utils_1.BrowserDetection.setup();
}
/**
 * Default patform providers for testing without a compiler.
 */
exports.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([
    core_1.PLATFORM_COMMON_PROVIDERS,
    new core_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initBrowserTests, multi: true })
]);
exports.ADDITIONAL_TEST_BROWSER_PROVIDERS = lang_1.CONST_EXPR([
    new core_1.Provider(core_1.APP_ID, { useValue: 'a' }),
    common_dom_1.ELEMENT_PROBE_PROVIDERS,
    new core_1.Provider(core_1.DirectiveResolver, { useClass: directive_resolver_mock_1.MockDirectiveResolver }),
    new core_1.Provider(core_1.ViewResolver, { useClass: view_resolver_mock_1.MockViewResolver }),
    utils_2.Log,
    test_component_builder_1.TestComponentBuilder,
    new core_1.Provider(core_1.NgZone, { useClass: ng_zone_mock_1.MockNgZone }),
    new core_1.Provider(location_strategy_1.LocationStrategy, { useClass: mock_location_strategy_1.MockLocationStrategy }),
    new core_1.Provider(animation_builder_1.AnimationBuilder, { useClass: animation_builder_mock_1.MockAnimationBuilder }),
]);
/**
 * Default application providers for testing without a compiler.
 */
exports.TEST_BROWSER_STATIC_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([
    browser_common_1.BROWSER_APP_COMMON_PROVIDERS,
    new core_1.Provider(compiler_1.XHR, { useClass: xhr_impl_1.XHRImpl }),
    exports.ADDITIONAL_TEST_BROWSER_PROVIDERS
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9zdGF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTh4QTU3bnVpLnRtcC9hbmd1bGFyMi9wbGF0Zm9ybS90ZXN0aW5nL2Jyb3dzZXJfc3RhdGljLnRzIl0sIm5hbWVzIjpbImluaXRCcm93c2VyVGVzdHMiXSwibWFwcGluZ3MiOiJBQUFBLHFCQVFPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLCtCQUEyQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBQ2xGLGdDQUFnQywrQ0FBK0MsQ0FBQyxDQUFBO0FBRWhGLGtDQUErQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3hFLHVDQUFtQywwQ0FBMEMsQ0FBQyxDQUFBO0FBQzlFLHdDQUFvQywyQ0FBMkMsQ0FBQyxDQUFBO0FBQ2hGLG1DQUErQixzQ0FBc0MsQ0FBQyxDQUFBO0FBQ3RFLHVDQUFtQywwQ0FBMEMsQ0FBQyxDQUFBO0FBQzlFLGtDQUErQixnREFBZ0QsQ0FBQyxDQUFBO0FBQ2hGLDZCQUF5QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBRTFELHlCQUFzQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQy9ELHlCQUFrQixtQkFBbUIsQ0FBQyxDQUFBO0FBRXRDLHVDQUFtQyw2Q0FBNkMsQ0FBQyxDQUFBO0FBRWpGLHNCQUErQiw0QkFBNEIsQ0FBQyxDQUFBO0FBRTVELDJCQUFzQyw4QkFBOEIsQ0FBQyxDQUFBO0FBRXJFLHFCQUF5QiwwQkFBMEIsQ0FBQyxDQUFBO0FBRXBELHNCQUFrQiw0QkFBNEIsQ0FBQyxDQUFBO0FBRS9DO0lBQ0VBLG1DQUFpQkEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7SUFDaENBLHdCQUFnQkEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7QUFDM0JBLENBQUNBO0FBRUQ7O0dBRUc7QUFDVSw4Q0FBc0MsR0FDL0MsaUJBQVUsQ0FBQztJQUNULGdDQUF5QjtJQUN6QixJQUFJLGVBQVEsQ0FBQywyQkFBb0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7Q0FDOUUsQ0FBQyxDQUFDO0FBRU0seUNBQWlDLEdBQzFDLGlCQUFVLENBQUM7SUFDVCxJQUFJLGVBQVEsQ0FBQyxhQUFNLEVBQUUsRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFDLENBQUM7SUFDckMsb0NBQXVCO0lBQ3ZCLElBQUksZUFBUSxDQUFDLHdCQUFpQixFQUFFLEVBQUMsUUFBUSxFQUFFLCtDQUFxQixFQUFDLENBQUM7SUFDbEUsSUFBSSxlQUFRLENBQUMsbUJBQVksRUFBRSxFQUFDLFFBQVEsRUFBRSxxQ0FBZ0IsRUFBQyxDQUFDO0lBQ3hELFdBQUc7SUFDSCw2Q0FBb0I7SUFDcEIsSUFBSSxlQUFRLENBQUMsYUFBTSxFQUFFLEVBQUMsUUFBUSxFQUFFLHlCQUFVLEVBQUMsQ0FBQztJQUM1QyxJQUFJLGVBQVEsQ0FBQyxvQ0FBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2Q0FBb0IsRUFBQyxDQUFDO0lBQ2hFLElBQUksZUFBUSxDQUFDLG9DQUFnQixFQUFFLEVBQUMsUUFBUSxFQUFFLDZDQUFvQixFQUFDLENBQUM7Q0FDakUsQ0FBQyxDQUFDO0FBRVA7O0dBRUc7QUFDVSxpREFBeUMsR0FDbEQsaUJBQVUsQ0FBQztJQUNULDZDQUE0QjtJQUM1QixJQUFJLGVBQVEsQ0FBQyxjQUFHLEVBQUUsRUFBQyxRQUFRLEVBQUUsa0JBQU8sRUFBQyxDQUFDO0lBQ3RDLHlDQUFpQztDQUNsQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBUFBfSUQsXG4gIERpcmVjdGl2ZVJlc29sdmVyLFxuICBOZ1pvbmUsXG4gIFByb3ZpZGVyLFxuICBWaWV3UmVzb2x2ZXIsXG4gIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlMsXG4gIFBMQVRGT1JNX0lOSVRJQUxJWkVSXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtCUk9XU0VSX0FQUF9DT01NT05fUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlcl9jb21tb24nO1xuaW1wb3J0IHtCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyJztcblxuaW1wb3J0IHtBbmltYXRpb25CdWlsZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvYW5pbWF0ZS9hbmltYXRpb25fYnVpbGRlcic7XG5pbXBvcnQge01vY2tBbmltYXRpb25CdWlsZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9hbmltYXRpb25fYnVpbGRlcl9tb2NrJztcbmltcG9ydCB7TW9ja0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9kaXJlY3RpdmVfcmVzb2x2ZXJfbW9jayc7XG5pbXBvcnQge01vY2tWaWV3UmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL3ZpZXdfcmVzb2x2ZXJfbW9jayc7XG5pbXBvcnQge01vY2tMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdhbmd1bGFyMi9zcmMvbW9jay9tb2NrX2xvY2F0aW9uX3N0cmF0ZWd5JztcbmltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSAnYW5ndWxhcjIvc3JjL3JvdXRlci9sb2NhdGlvbi9sb2NhdGlvbl9zdHJhdGVneSc7XG5pbXBvcnQge01vY2tOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL25nX3pvbmVfbW9jayc7XG5cbmltcG9ydCB7WEhSSW1wbH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL3hocl9pbXBsXCI7XG5pbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvY29tcGlsZXInO1xuXG5pbXBvcnQge1Rlc3RDb21wb25lbnRCdWlsZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvdGVzdGluZy90ZXN0X2NvbXBvbmVudF9idWlsZGVyJztcblxuaW1wb3J0IHtCcm93c2VyRGV0ZWN0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvdGVzdGluZy91dGlscyc7XG5cbmltcG9ydCB7RUxFTUVOVF9QUk9CRV9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2NvbW1vbl9kb20nO1xuXG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7TG9nfSBmcm9tICdhbmd1bGFyMi9zcmMvdGVzdGluZy91dGlscyc7XG5cbmZ1bmN0aW9uIGluaXRCcm93c2VyVGVzdHMoKSB7XG4gIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gIEJyb3dzZXJEZXRlY3Rpb24uc2V0dXAoKTtcbn1cblxuLyoqXG4gKiBEZWZhdWx0IHBhdGZvcm0gcHJvdmlkZXJzIGZvciB0ZXN0aW5nIHdpdGhvdXQgYSBjb21waWxlci5cbiAqL1xuZXhwb3J0IGNvbnN0IFRFU1RfQlJPV1NFUl9TVEFUSUNfUExBVEZPUk1fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQ09OU1RfRVhQUihbXG4gICAgICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICAgICAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB7dXNlVmFsdWU6IGluaXRCcm93c2VyVGVzdHMsIG11bHRpOiB0cnVlfSlcbiAgICBdKTtcblxuZXhwb3J0IGNvbnN0IEFERElUSU9OQUxfVEVTVF9CUk9XU0VSX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1xuICAgICAgbmV3IFByb3ZpZGVyKEFQUF9JRCwge3VzZVZhbHVlOiAnYSd9KSxcbiAgICAgIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTLFxuICAgICAgbmV3IFByb3ZpZGVyKERpcmVjdGl2ZVJlc29sdmVyLCB7dXNlQ2xhc3M6IE1vY2tEaXJlY3RpdmVSZXNvbHZlcn0pLFxuICAgICAgbmV3IFByb3ZpZGVyKFZpZXdSZXNvbHZlciwge3VzZUNsYXNzOiBNb2NrVmlld1Jlc29sdmVyfSksXG4gICAgICBMb2csXG4gICAgICBUZXN0Q29tcG9uZW50QnVpbGRlcixcbiAgICAgIG5ldyBQcm92aWRlcihOZ1pvbmUsIHt1c2VDbGFzczogTW9ja05nWm9uZX0pLFxuICAgICAgbmV3IFByb3ZpZGVyKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczogTW9ja0xvY2F0aW9uU3RyYXRlZ3l9KSxcbiAgICAgIG5ldyBQcm92aWRlcihBbmltYXRpb25CdWlsZGVyLCB7dXNlQ2xhc3M6IE1vY2tBbmltYXRpb25CdWlsZGVyfSksXG4gICAgXSk7XG5cbi8qKlxuICogRGVmYXVsdCBhcHBsaWNhdGlvbiBwcm92aWRlcnMgZm9yIHRlc3Rpbmcgd2l0aG91dCBhIGNvbXBpbGVyLlxuICovXG5leHBvcnQgY29uc3QgVEVTVF9CUk9XU0VSX1NUQVRJQ19BUFBMSUNBVElPTl9QUk9WSURFUlM6IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+ID1cbiAgICBDT05TVF9FWFBSKFtcbiAgICAgIEJST1dTRVJfQVBQX0NPTU1PTl9QUk9WSURFUlMsXG4gICAgICBuZXcgUHJvdmlkZXIoWEhSLCB7dXNlQ2xhc3M6IFhIUkltcGx9KSxcbiAgICAgIEFERElUSU9OQUxfVEVTVF9CUk9XU0VSX1BST1ZJREVSU1xuICAgIF0pO1xuIl19