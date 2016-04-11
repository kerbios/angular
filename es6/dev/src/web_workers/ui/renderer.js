var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/src/core/di';
import { MessageBus } from 'angular2/src/web_workers/shared/message_bus';
import { Serializer, PRIMITIVE, RenderStoreObject } from 'angular2/src/web_workers/shared/serializer';
import { RootRenderer, RenderComponentType } from 'angular2/src/core/render/api';
import { EVENT_CHANNEL, RENDERER_CHANNEL } from 'angular2/src/web_workers/shared/messaging_api';
import { bind } from './bind';
import { EventDispatcher } from 'angular2/src/web_workers/ui/event_dispatcher';
import { RenderStore } from 'angular2/src/web_workers/shared/render_store';
import { ServiceMessageBrokerFactory } from 'angular2/src/web_workers/shared/service_message_broker';
export let MessageBasedRenderer = class {
    constructor(_brokerFactory, _bus, _serializer, _renderStore, _rootRenderer) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rootRenderer = _rootRenderer;
    }
    start() {
        var broker = this._brokerFactory.createMessageBroker(RENDERER_CHANNEL);
        this._bus.initChannel(EVENT_CHANNEL);
        this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_CHANNEL), this._serializer);
        broker.registerMethod("renderComponent", [RenderComponentType, PRIMITIVE], bind(this._renderComponent, this));
        broker.registerMethod("selectRootElement", [RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._selectRootElement, this));
        broker.registerMethod("createElement", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._createElement, this));
        broker.registerMethod("createViewRoot", [RenderStoreObject, RenderStoreObject, PRIMITIVE], bind(this._createViewRoot, this));
        broker.registerMethod("createTemplateAnchor", [RenderStoreObject, RenderStoreObject, PRIMITIVE], bind(this._createTemplateAnchor, this));
        broker.registerMethod("createText", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._createText, this));
        broker.registerMethod("projectNodes", [RenderStoreObject, RenderStoreObject, RenderStoreObject], bind(this._projectNodes, this));
        broker.registerMethod("attachViewAfter", [RenderStoreObject, RenderStoreObject, RenderStoreObject], bind(this._attachViewAfter, this));
        broker.registerMethod("detachView", [RenderStoreObject, RenderStoreObject], bind(this._detachView, this));
        broker.registerMethod("destroyView", [RenderStoreObject, RenderStoreObject, RenderStoreObject], bind(this._destroyView, this));
        broker.registerMethod("setElementProperty", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._setElementProperty, this));
        broker.registerMethod("setElementAttribute", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._setElementAttribute, this));
        broker.registerMethod("setBindingDebugInfo", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._setBindingDebugInfo, this));
        broker.registerMethod("setElementClass", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._setElementClass, this));
        broker.registerMethod("setElementStyle", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._setElementStyle, this));
        broker.registerMethod("invokeElementMethod", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._invokeElementMethod, this));
        broker.registerMethod("setText", [RenderStoreObject, RenderStoreObject, PRIMITIVE], bind(this._setText, this));
        broker.registerMethod("listen", [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], bind(this._listen, this));
        broker.registerMethod("listenGlobal", [RenderStoreObject, PRIMITIVE, PRIMITIVE, PRIMITIVE], bind(this._listenGlobal, this));
        broker.registerMethod("listenDone", [RenderStoreObject, RenderStoreObject], bind(this._listenDone, this));
    }
    _renderComponent(renderComponentType, rendererId) {
        var renderer = this._rootRenderer.renderComponent(renderComponentType);
        this._renderStore.store(renderer, rendererId);
    }
    _selectRootElement(renderer, selector, elId) {
        this._renderStore.store(renderer.selectRootElement(selector), elId);
    }
    _createElement(renderer, parentElement, name, elId) {
        this._renderStore.store(renderer.createElement(parentElement, name), elId);
    }
    _createViewRoot(renderer, hostElement, elId) {
        var viewRoot = renderer.createViewRoot(hostElement);
        if (this._renderStore.serialize(hostElement) !== elId) {
            this._renderStore.store(viewRoot, elId);
        }
    }
    _createTemplateAnchor(renderer, parentElement, elId) {
        this._renderStore.store(renderer.createTemplateAnchor(parentElement), elId);
    }
    _createText(renderer, parentElement, value, elId) {
        this._renderStore.store(renderer.createText(parentElement, value), elId);
    }
    _projectNodes(renderer, parentElement, nodes) {
        renderer.projectNodes(parentElement, nodes);
    }
    _attachViewAfter(renderer, node, viewRootNodes) {
        renderer.attachViewAfter(node, viewRootNodes);
    }
    _detachView(renderer, viewRootNodes) {
        renderer.detachView(viewRootNodes);
    }
    _destroyView(renderer, hostElement, viewAllNodes) {
        renderer.destroyView(hostElement, viewAllNodes);
        for (var i = 0; i < viewAllNodes.length; i++) {
            this._renderStore.remove(viewAllNodes[i]);
        }
    }
    _setElementProperty(renderer, renderElement, propertyName, propertyValue) {
        renderer.setElementProperty(renderElement, propertyName, propertyValue);
    }
    _setElementAttribute(renderer, renderElement, attributeName, attributeValue) {
        renderer.setElementAttribute(renderElement, attributeName, attributeValue);
    }
    _setBindingDebugInfo(renderer, renderElement, propertyName, propertyValue) {
        renderer.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    }
    _setElementClass(renderer, renderElement, className, isAdd) {
        renderer.setElementClass(renderElement, className, isAdd);
    }
    _setElementStyle(renderer, renderElement, styleName, styleValue) {
        renderer.setElementStyle(renderElement, styleName, styleValue);
    }
    _invokeElementMethod(renderer, renderElement, methodName, args) {
        renderer.invokeElementMethod(renderElement, methodName, args);
    }
    _setText(renderer, renderNode, text) {
        renderer.setText(renderNode, text);
    }
    _listen(renderer, renderElement, eventName, unlistenId) {
        var unregisterCallback = renderer.listen(renderElement, eventName, (event) => this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event));
        this._renderStore.store(unregisterCallback, unlistenId);
    }
    _listenGlobal(renderer, eventTarget, eventName, unlistenId) {
        var unregisterCallback = renderer.listenGlobal(eventTarget, eventName, (event) => this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event));
        this._renderStore.store(unregisterCallback, unlistenId);
    }
    _listenDone(renderer, unlistenCallback) { unlistenCallback(); }
};
MessageBasedRenderer = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [ServiceMessageBrokerFactory, MessageBus, Serializer, RenderStore, RootRenderer])
], MessageBasedRenderer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVlHN1NDUmJsLnRtcC9hbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXIudHMiXSwibmFtZXMiOlsiTWVzc2FnZUJhc2VkUmVuZGVyZXIiLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5jb25zdHJ1Y3RvciIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLnN0YXJ0IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3JlbmRlckNvbXBvbmVudCIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9zZWxlY3RSb290RWxlbWVudCIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9jcmVhdGVFbGVtZW50IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2NyZWF0ZVZpZXdSb290IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2NyZWF0ZVRlbXBsYXRlQW5jaG9yIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2NyZWF0ZVRleHQiLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5fcHJvamVjdE5vZGVzIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2F0dGFjaFZpZXdBZnRlciIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9kZXRhY2hWaWV3IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2Rlc3Ryb3lWaWV3IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldEVsZW1lbnRQcm9wZXJ0eSIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9zZXRFbGVtZW50QXR0cmlidXRlIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldEJpbmRpbmdEZWJ1Z0luZm8iLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5fc2V0RWxlbWVudENsYXNzIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldEVsZW1lbnRTdHlsZSIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9pbnZva2VFbGVtZW50TWV0aG9kIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldFRleHQiLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5fbGlzdGVuIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2xpc3Rlbkdsb2JhbCIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9saXN0ZW5Eb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQjtPQUN4QyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QztPQUMvRCxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSw0Q0FBNEM7T0FDNUYsRUFBQyxZQUFZLEVBQVksbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEI7T0FDakYsRUFBQyxhQUFhLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSwrQ0FBK0M7T0FFdEYsRUFBQyxJQUFJLEVBQUMsTUFBTSxRQUFRO09BQ3BCLEVBQUMsZUFBZSxFQUFDLE1BQU0sOENBQThDO09BQ3JFLEVBQUMsV0FBVyxFQUFDLE1BQU0sOENBQThDO09BQ2pFLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSx3REFBd0Q7QUFFbEc7SUFJRUEsWUFBb0JBLGNBQTJDQSxFQUFVQSxJQUFnQkEsRUFDckVBLFdBQXVCQSxFQUFVQSxZQUF5QkEsRUFDMURBLGFBQTJCQTtRQUYzQkMsbUJBQWNBLEdBQWRBLGNBQWNBLENBQTZCQTtRQUFVQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFZQTtRQUNyRUEsZ0JBQVdBLEdBQVhBLFdBQVdBLENBQVlBO1FBQVVBLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFhQTtRQUMxREEsa0JBQWFBLEdBQWJBLGFBQWFBLENBQWNBO0lBQUdBLENBQUNBO0lBRW5ERCxLQUFLQTtRQUNIRSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxtQkFBbUJBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7UUFDdkVBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1FBQ3JD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a0taO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFBSSU1JVElWRSwgUmVuZGVyU3RvcmVPYmplY3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1Jvb3RSZW5kZXJlciwgUmVuZGVyZXIsIFJlbmRlckNvbXBvbmVudFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtFVkVOVF9DSEFOTkVMLCBSRU5ERVJFUl9DSEFOTkVMfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtiaW5kfSBmcm9tICcuL2JpbmQnO1xuaW1wb3J0IHtFdmVudERpc3BhdGNoZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS9ldmVudF9kaXNwYXRjaGVyJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJhc2VkUmVuZGVyZXIge1xuICBwcml2YXRlIF9ldmVudERpc3BhdGNoZXI6IEV2ZW50RGlzcGF0Y2hlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9icm9rZXJGYWN0b3J5OiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIHByaXZhdGUgX2J1czogTWVzc2FnZUJ1cyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHJpdmF0ZSBfcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9yb290UmVuZGVyZXI6IFJvb3RSZW5kZXJlcikge31cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICB2YXIgYnJva2VyID0gdGhpcy5fYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJFTkRFUkVSX0NIQU5ORUwpO1xuICAgIHRoaXMuX2J1cy5pbml0Q2hhbm5lbChFVkVOVF9DSEFOTkVMKTtcbiAgICB0aGlzLl9ldmVudERpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKHRoaXMuX2J1cy50byhFVkVOVF9DSEFOTkVMKSwgdGhpcy5fc2VyaWFsaXplcik7XG5cbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJyZW5kZXJDb21wb25lbnRcIiwgW1JlbmRlckNvbXBvbmVudFR5cGUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fcmVuZGVyQ29tcG9uZW50LCB0aGlzKSk7XG5cbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZWxlY3RSb290RWxlbWVudFwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZWxlY3RSb290RWxlbWVudCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImNyZWF0ZUVsZW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2NyZWF0ZUVsZW1lbnQsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJjcmVhdGVWaWV3Um9vdFwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2NyZWF0ZVZpZXdSb290LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiY3JlYXRlVGVtcGxhdGVBbmNob3JcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9jcmVhdGVUZW1wbGF0ZUFuY2hvciwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImNyZWF0ZVRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2NyZWF0ZVRleHQsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJwcm9qZWN0Tm9kZXNcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3RdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3Byb2plY3ROb2RlcywgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImF0dGFjaFZpZXdBZnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fYXR0YWNoVmlld0FmdGVyLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiZGV0YWNoVmlld1wiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9kZXRhY2hWaWV3LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiZGVzdHJveVZpZXdcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3RdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2Rlc3Ryb3lWaWV3LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0RWxlbWVudFByb3BlcnR5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZXRFbGVtZW50UHJvcGVydHksIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZXRFbGVtZW50QXR0cmlidXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZXRFbGVtZW50QXR0cmlidXRlLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0QmluZGluZ0RlYnVnSW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fc2V0QmluZGluZ0RlYnVnSW5mbywgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInNldEVsZW1lbnRDbGFzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fc2V0RWxlbWVudENsYXNzLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0RWxlbWVudFN0eWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZXRFbGVtZW50U3R5bGUsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJpbnZva2VFbGVtZW50TWV0aG9kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9pbnZva2VFbGVtZW50TWV0aG9kLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0VGV4dFwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NldFRleHQsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJsaXN0ZW5cIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2xpc3RlbiwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImxpc3Rlbkdsb2JhbFwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2xpc3Rlbkdsb2JhbCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImxpc3RlbkRvbmVcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fbGlzdGVuRG9uZSwgdGhpcykpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVuZGVyQ29tcG9uZW50KHJlbmRlckNvbXBvbmVudFR5cGU6IFJlbmRlckNvbXBvbmVudFR5cGUsIHJlbmRlcmVySWQ6IG51bWJlcikge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXMuX3Jvb3RSZW5kZXJlci5yZW5kZXJDb21wb25lbnQocmVuZGVyQ29tcG9uZW50VHlwZSk7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIsIHJlbmRlcmVySWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0Um9vdEVsZW1lbnQocmVuZGVyZXI6IFJlbmRlcmVyLCBzZWxlY3Rvcjogc3RyaW5nLCBlbElkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyZW5kZXJlci5zZWxlY3RSb290RWxlbWVudChzZWxlY3RvciksIGVsSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRWxlbWVudChyZW5kZXJlcjogUmVuZGVyZXIsIHBhcmVudEVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBlbElkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyZW5kZXJlci5jcmVhdGVFbGVtZW50KHBhcmVudEVsZW1lbnQsIG5hbWUpLCBlbElkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVZpZXdSb290KHJlbmRlcmVyOiBSZW5kZXJlciwgaG9zdEVsZW1lbnQ6IGFueSwgZWxJZDogbnVtYmVyKSB7XG4gICAgdmFyIHZpZXdSb290ID0gcmVuZGVyZXIuY3JlYXRlVmlld1Jvb3QoaG9zdEVsZW1lbnQpO1xuICAgIGlmICh0aGlzLl9yZW5kZXJTdG9yZS5zZXJpYWxpemUoaG9zdEVsZW1lbnQpICE9PSBlbElkKSB7XG4gICAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh2aWV3Um9vdCwgZWxJZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVGVtcGxhdGVBbmNob3IocmVuZGVyZXI6IFJlbmRlcmVyLCBwYXJlbnRFbGVtZW50OiBhbnksIGVsSWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLmNyZWF0ZVRlbXBsYXRlQW5jaG9yKHBhcmVudEVsZW1lbnQpLCBlbElkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVRleHQocmVuZGVyZXI6IFJlbmRlcmVyLCBwYXJlbnRFbGVtZW50OiBhbnksIHZhbHVlOiBzdHJpbmcsIGVsSWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLmNyZWF0ZVRleHQocGFyZW50RWxlbWVudCwgdmFsdWUpLCBlbElkKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb2plY3ROb2RlcyhyZW5kZXJlcjogUmVuZGVyZXIsIHBhcmVudEVsZW1lbnQ6IGFueSwgbm9kZXM6IGFueVtdKSB7XG4gICAgcmVuZGVyZXIucHJvamVjdE5vZGVzKHBhcmVudEVsZW1lbnQsIG5vZGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaFZpZXdBZnRlcihyZW5kZXJlcjogUmVuZGVyZXIsIG5vZGU6IGFueSwgdmlld1Jvb3ROb2RlczogYW55W10pIHtcbiAgICByZW5kZXJlci5hdHRhY2hWaWV3QWZ0ZXIobm9kZSwgdmlld1Jvb3ROb2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIF9kZXRhY2hWaWV3KHJlbmRlcmVyOiBSZW5kZXJlciwgdmlld1Jvb3ROb2RlczogYW55W10pIHtcbiAgICByZW5kZXJlci5kZXRhY2hWaWV3KHZpZXdSb290Tm9kZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveVZpZXcocmVuZGVyZXI6IFJlbmRlcmVyLCBob3N0RWxlbWVudDogYW55LCB2aWV3QWxsTm9kZXM6IGFueVtdKSB7XG4gICAgcmVuZGVyZXIuZGVzdHJveVZpZXcoaG9zdEVsZW1lbnQsIHZpZXdBbGxOb2Rlcyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3QWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX3JlbmRlclN0b3JlLnJlbW92ZSh2aWV3QWxsTm9kZXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnRQcm9wZXJ0eShyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlOiBhbnkpIHtcbiAgICByZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkocmVuZGVyRWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIGF0dHJpYnV0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgcmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlOiBzdHJpbmcpIHtcbiAgICByZW5kZXJlci5zZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlckVsZW1lbnQsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRFbGVtZW50Q2xhc3MocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNBZGQ6IGJvb2xlYW4pIHtcbiAgICByZW5kZXJlci5zZXRFbGVtZW50Q2xhc3MocmVuZGVyRWxlbWVudCwgY2xhc3NOYW1lLCBpc0FkZCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRFbGVtZW50U3R5bGUocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHJlbmRlckVsZW1lbnQsIHN0eWxlTmFtZSwgc3R5bGVWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9pbnZva2VFbGVtZW50TWV0aG9kKHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogYW55W10pIHtcbiAgICByZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHJlbmRlckVsZW1lbnQsIG1ldGhvZE5hbWUsIGFyZ3MpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VGV4dChyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlck5vZGU6IGFueSwgdGV4dDogc3RyaW5nKSB7XG4gICAgcmVuZGVyZXIuc2V0VGV4dChyZW5kZXJOb2RlLCB0ZXh0KTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlbihyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIHVubGlzdGVuSWQ6IG51bWJlcikge1xuICAgIHZhciB1bnJlZ2lzdGVyQ2FsbGJhY2sgPSByZW5kZXJlci5saXN0ZW4ocmVuZGVyRWxlbWVudCwgZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLl9ldmVudERpc3BhdGNoZXIuZGlzcGF0Y2hSZW5kZXJFdmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJFbGVtZW50LCBudWxsLCBldmVudE5hbWUsIGV2ZW50KSk7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUodW5yZWdpc3RlckNhbGxiYWNrLCB1bmxpc3RlbklkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3Rlbkdsb2JhbChyZW5kZXJlcjogUmVuZGVyZXIsIGV2ZW50VGFyZ2V0OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5saXN0ZW5JZDogbnVtYmVyKSB7XG4gICAgdmFyIHVucmVnaXN0ZXJDYWxsYmFjayA9IHJlbmRlcmVyLmxpc3Rlbkdsb2JhbChcbiAgICAgICAgZXZlbnRUYXJnZXQsIGV2ZW50TmFtZSxcbiAgICAgICAgKGV2ZW50KSA9PiB0aGlzLl9ldmVudERpc3BhdGNoZXIuZGlzcGF0Y2hSZW5kZXJFdmVudChudWxsLCBldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudCkpO1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHVucmVnaXN0ZXJDYWxsYmFjaywgdW5saXN0ZW5JZCk7XG4gIH1cblxuICBwcml2YXRlIF9saXN0ZW5Eb25lKHJlbmRlcmVyOiBSZW5kZXJlciwgdW5saXN0ZW5DYWxsYmFjazogRnVuY3Rpb24pIHsgdW5saXN0ZW5DYWxsYmFjaygpOyB9XG59XG4iXX0=