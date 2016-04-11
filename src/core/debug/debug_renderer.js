'use strict';var lang_1 = require('angular2/src/facade/lang');
var debug_node_1 = require('angular2/src/core/debug/debug_node');
var DebugDomRootRenderer = (function () {
    function DebugDomRootRenderer(_delegate) {
        this._delegate = _delegate;
    }
    DebugDomRootRenderer.prototype.renderComponent = function (componentProto) {
        return new DebugDomRenderer(this, this._delegate.renderComponent(componentProto));
    };
    return DebugDomRootRenderer;
})();
exports.DebugDomRootRenderer = DebugDomRootRenderer;
var DebugDomRenderer = (function () {
    function DebugDomRenderer(_rootRenderer, _delegate) {
        this._rootRenderer = _rootRenderer;
        this._delegate = _delegate;
    }
    DebugDomRenderer.prototype.renderComponent = function (componentType) {
        return this._rootRenderer.renderComponent(componentType);
    };
    DebugDomRenderer.prototype.selectRootElement = function (selector) {
        var nativeEl = this._delegate.selectRootElement(selector);
        var debugEl = new debug_node_1.DebugElement(nativeEl, null);
        debug_node_1.indexDebugNode(debugEl);
        return nativeEl;
    };
    DebugDomRenderer.prototype.createElement = function (parentElement, name) {
        var nativeEl = this._delegate.createElement(parentElement, name);
        var debugEl = new debug_node_1.DebugElement(nativeEl, debug_node_1.getDebugNode(parentElement));
        debugEl.name = name;
        debug_node_1.indexDebugNode(debugEl);
        return nativeEl;
    };
    DebugDomRenderer.prototype.createViewRoot = function (hostElement) { return this._delegate.createViewRoot(hostElement); };
    DebugDomRenderer.prototype.createTemplateAnchor = function (parentElement) {
        var comment = this._delegate.createTemplateAnchor(parentElement);
        var debugEl = new debug_node_1.DebugNode(comment, debug_node_1.getDebugNode(parentElement));
        debug_node_1.indexDebugNode(debugEl);
        return comment;
    };
    DebugDomRenderer.prototype.createText = function (parentElement, value) {
        var text = this._delegate.createText(parentElement, value);
        var debugEl = new debug_node_1.DebugNode(text, debug_node_1.getDebugNode(parentElement));
        debug_node_1.indexDebugNode(debugEl);
        return text;
    };
    DebugDomRenderer.prototype.projectNodes = function (parentElement, nodes) {
        var debugParent = debug_node_1.getDebugNode(parentElement);
        if (lang_1.isPresent(debugParent) && debugParent instanceof debug_node_1.DebugElement) {
            var debugElement = debugParent;
            nodes.forEach(function (node) { debugElement.addChild(debug_node_1.getDebugNode(node)); });
        }
        this._delegate.projectNodes(parentElement, nodes);
    };
    DebugDomRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
        var debugNode = debug_node_1.getDebugNode(node);
        if (lang_1.isPresent(debugNode)) {
            var debugParent = debugNode.parent;
            if (viewRootNodes.length > 0 && lang_1.isPresent(debugParent)) {
                var debugViewRootNodes = [];
                viewRootNodes.forEach(function (rootNode) { return debugViewRootNodes.push(debug_node_1.getDebugNode(rootNode)); });
                debugParent.insertChildrenAfter(debugNode, debugViewRootNodes);
            }
        }
        this._delegate.attachViewAfter(node, viewRootNodes);
    };
    DebugDomRenderer.prototype.detachView = function (viewRootNodes) {
        viewRootNodes.forEach(function (node) {
            var debugNode = debug_node_1.getDebugNode(node);
            if (lang_1.isPresent(debugNode) && lang_1.isPresent(debugNode.parent)) {
                debugNode.parent.removeChild(debugNode);
            }
        });
        this._delegate.detachView(viewRootNodes);
    };
    DebugDomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
        viewAllNodes.forEach(function (node) { debug_node_1.removeDebugNodeFromIndex(debug_node_1.getDebugNode(node)); });
        this._delegate.destroyView(hostElement, viewAllNodes);
    };
    DebugDomRenderer.prototype.listen = function (renderElement, name, callback) {
        var debugEl = debug_node_1.getDebugNode(renderElement);
        if (lang_1.isPresent(debugEl)) {
            debugEl.listeners.push(new debug_node_1.EventListener(name, callback));
        }
        return this._delegate.listen(renderElement, name, callback);
    };
    DebugDomRenderer.prototype.listenGlobal = function (target, name, callback) {
        return this._delegate.listenGlobal(target, name, callback);
    };
    DebugDomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        var debugEl = debug_node_1.getDebugNode(renderElement);
        if (lang_1.isPresent(debugEl) && debugEl instanceof debug_node_1.DebugElement) {
            debugEl.properties.set(propertyName, propertyValue);
        }
        this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
    };
    DebugDomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
        var debugEl = debug_node_1.getDebugNode(renderElement);
        if (lang_1.isPresent(debugEl) && debugEl instanceof debug_node_1.DebugElement) {
            debugEl.attributes.set(attributeName, attributeValue);
        }
        this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
    };
    /**
     * Used only in debug mode to serialize property changes to comment nodes,
     * such as <template> placeholders.
     */
    DebugDomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
        this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    };
    /**
     * Used only in development mode to set information needed by the DebugNode for this element.
     */
    DebugDomRenderer.prototype.setElementDebugInfo = function (renderElement, info) {
        var debugEl = debug_node_1.getDebugNode(renderElement);
        debugEl.setDebugInfo(info);
        this._delegate.setElementDebugInfo(renderElement, info);
    };
    DebugDomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        this._delegate.setElementClass(renderElement, className, isAdd);
    };
    DebugDomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        this._delegate.setElementStyle(renderElement, styleName, styleValue);
    };
    DebugDomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        this._delegate.invokeElementMethod(renderElement, methodName, args);
    };
    DebugDomRenderer.prototype.setText = function (renderNode, text) { this._delegate.setText(renderNode, text); };
    return DebugDomRenderer;
})();
exports.DebugDomRenderer = DebugDomRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWdfcmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUdPWHZYa2FHLnRtcC9hbmd1bGFyMi9zcmMvY29yZS9kZWJ1Zy9kZWJ1Z19yZW5kZXJlci50cyJdLCJuYW1lcyI6WyJEZWJ1Z0RvbVJvb3RSZW5kZXJlciIsIkRlYnVnRG9tUm9vdFJlbmRlcmVyLmNvbnN0cnVjdG9yIiwiRGVidWdEb21Sb290UmVuZGVyZXIucmVuZGVyQ29tcG9uZW50IiwiRGVidWdEb21SZW5kZXJlciIsIkRlYnVnRG9tUmVuZGVyZXIuY29uc3RydWN0b3IiLCJEZWJ1Z0RvbVJlbmRlcmVyLnJlbmRlckNvbXBvbmVudCIsIkRlYnVnRG9tUmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQiLCJEZWJ1Z0RvbVJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQiLCJEZWJ1Z0RvbVJlbmRlcmVyLmNyZWF0ZVZpZXdSb290IiwiRGVidWdEb21SZW5kZXJlci5jcmVhdGVUZW1wbGF0ZUFuY2hvciIsIkRlYnVnRG9tUmVuZGVyZXIuY3JlYXRlVGV4dCIsIkRlYnVnRG9tUmVuZGVyZXIucHJvamVjdE5vZGVzIiwiRGVidWdEb21SZW5kZXJlci5hdHRhY2hWaWV3QWZ0ZXIiLCJEZWJ1Z0RvbVJlbmRlcmVyLmRldGFjaFZpZXciLCJEZWJ1Z0RvbVJlbmRlcmVyLmRlc3Ryb3lWaWV3IiwiRGVidWdEb21SZW5kZXJlci5saXN0ZW4iLCJEZWJ1Z0RvbVJlbmRlcmVyLmxpc3Rlbkdsb2JhbCIsIkRlYnVnRG9tUmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5IiwiRGVidWdEb21SZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlIiwiRGVidWdEb21SZW5kZXJlci5zZXRCaW5kaW5nRGVidWdJbmZvIiwiRGVidWdEb21SZW5kZXJlci5zZXRFbGVtZW50RGVidWdJbmZvIiwiRGVidWdEb21SZW5kZXJlci5zZXRFbGVtZW50Q2xhc3MiLCJEZWJ1Z0RvbVJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSIsIkRlYnVnRG9tUmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCIsIkRlYnVnRG9tUmVuZGVyZXIuc2V0VGV4dCJdLCJtYXBwaW5ncyI6IkFBQUEscUJBQXdCLDBCQUEwQixDQUFDLENBQUE7QUFPbkQsMkJBT08sb0NBQW9DLENBQUMsQ0FBQTtBQUU1QztJQUNFQSw4QkFBb0JBLFNBQXVCQTtRQUF2QkMsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBY0E7SUFBR0EsQ0FBQ0E7SUFFL0NELDhDQUFlQSxHQUFmQSxVQUFnQkEsY0FBbUNBO1FBQ2pERSxNQUFNQSxDQUFDQSxJQUFJQSxnQkFBZ0JBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGVBQWVBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBO0lBQ3BGQSxDQUFDQTtJQUNIRiwyQkFBQ0E7QUFBREEsQ0FBQ0EsQUFORCxJQU1DO0FBTlksNEJBQW9CLHVCQU1oQyxDQUFBO0FBRUQ7SUFDRUcsMEJBQW9CQSxhQUFtQ0EsRUFBVUEsU0FBbUJBO1FBQWhFQyxrQkFBYUEsR0FBYkEsYUFBYUEsQ0FBc0JBO1FBQVVBLGNBQVNBLEdBQVRBLFNBQVNBLENBQVVBO0lBQUdBLENBQUNBO0lBRXhGRCwwQ0FBZUEsR0FBZkEsVUFBZ0JBLGFBQWtDQTtRQUNoREUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7SUFDM0RBLENBQUNBO0lBRURGLDRDQUFpQkEsR0FBakJBLFVBQWtCQSxRQUFnQkE7UUFDaENHLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDMURBLElBQUlBLE9BQU9BLEdBQUdBLElBQUlBLHlCQUFZQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUMvQ0EsMkJBQWNBLENB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QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1xuICBSZW5kZXJlcixcbiAgUm9vdFJlbmRlcmVyLFxuICBSZW5kZXJDb21wb25lbnRUeXBlLFxuICBSZW5kZXJEZWJ1Z0luZm9cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5pbXBvcnQge1xuICBEZWJ1Z05vZGUsXG4gIERlYnVnRWxlbWVudCxcbiAgRXZlbnRMaXN0ZW5lcixcbiAgZ2V0RGVidWdOb2RlLFxuICBpbmRleERlYnVnTm9kZSxcbiAgcmVtb3ZlRGVidWdOb2RlRnJvbUluZGV4XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RlYnVnL2RlYnVnX25vZGUnO1xuXG5leHBvcnQgY2xhc3MgRGVidWdEb21Sb290UmVuZGVyZXIgaW1wbGVtZW50cyBSb290UmVuZGVyZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kZWxlZ2F0ZTogUm9vdFJlbmRlcmVyKSB7fVxuXG4gIHJlbmRlckNvbXBvbmVudChjb21wb25lbnRQcm90bzogUmVuZGVyQ29tcG9uZW50VHlwZSk6IFJlbmRlcmVyIHtcbiAgICByZXR1cm4gbmV3IERlYnVnRG9tUmVuZGVyZXIodGhpcywgdGhpcy5fZGVsZWdhdGUucmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudFByb3RvKSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlYnVnRG9tUmVuZGVyZXIgaW1wbGVtZW50cyBSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Jvb3RSZW5kZXJlcjogRGVidWdEb21Sb290UmVuZGVyZXIsIHByaXZhdGUgX2RlbGVnYXRlOiBSZW5kZXJlcikge31cblxuICByZW5kZXJDb21wb25lbnQoY29tcG9uZW50VHlwZTogUmVuZGVyQ29tcG9uZW50VHlwZSk6IFJlbmRlcmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcm9vdFJlbmRlcmVyLnJlbmRlckNvbXBvbmVudChjb21wb25lbnRUeXBlKTtcbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiBhbnkge1xuICAgIHZhciBuYXRpdmVFbCA9IHRoaXMuX2RlbGVnYXRlLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yKTtcbiAgICB2YXIgZGVidWdFbCA9IG5ldyBEZWJ1Z0VsZW1lbnQobmF0aXZlRWwsIG51bGwpO1xuICAgIGluZGV4RGVidWdOb2RlKGRlYnVnRWwpO1xuICAgIHJldHVybiBuYXRpdmVFbDtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQocGFyZW50RWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHZhciBuYXRpdmVFbCA9IHRoaXMuX2RlbGVnYXRlLmNyZWF0ZUVsZW1lbnQocGFyZW50RWxlbWVudCwgbmFtZSk7XG4gICAgdmFyIGRlYnVnRWwgPSBuZXcgRGVidWdFbGVtZW50KG5hdGl2ZUVsLCBnZXREZWJ1Z05vZGUocGFyZW50RWxlbWVudCkpO1xuICAgIGRlYnVnRWwubmFtZSA9IG5hbWU7XG4gICAgaW5kZXhEZWJ1Z05vZGUoZGVidWdFbCk7XG4gICAgcmV0dXJuIG5hdGl2ZUVsO1xuICB9XG5cbiAgY3JlYXRlVmlld1Jvb3QoaG9zdEVsZW1lbnQ6IGFueSk6IGFueSB7IHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5jcmVhdGVWaWV3Um9vdChob3N0RWxlbWVudCk7IH1cblxuICBjcmVhdGVUZW1wbGF0ZUFuY2hvcihwYXJlbnRFbGVtZW50OiBhbnkpOiBhbnkge1xuICAgIHZhciBjb21tZW50ID0gdGhpcy5fZGVsZWdhdGUuY3JlYXRlVGVtcGxhdGVBbmNob3IocGFyZW50RWxlbWVudCk7XG4gICAgdmFyIGRlYnVnRWwgPSBuZXcgRGVidWdOb2RlKGNvbW1lbnQsIGdldERlYnVnTm9kZShwYXJlbnRFbGVtZW50KSk7XG4gICAgaW5kZXhEZWJ1Z05vZGUoZGVidWdFbCk7XG4gICAgcmV0dXJuIGNvbW1lbnQ7XG4gIH1cblxuICBjcmVhdGVUZXh0KHBhcmVudEVsZW1lbnQ6IGFueSwgdmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgdmFyIHRleHQgPSB0aGlzLl9kZWxlZ2F0ZS5jcmVhdGVUZXh0KHBhcmVudEVsZW1lbnQsIHZhbHVlKTtcbiAgICB2YXIgZGVidWdFbCA9IG5ldyBEZWJ1Z05vZGUodGV4dCwgZ2V0RGVidWdOb2RlKHBhcmVudEVsZW1lbnQpKTtcbiAgICBpbmRleERlYnVnTm9kZShkZWJ1Z0VsKTtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHByb2plY3ROb2RlcyhwYXJlbnRFbGVtZW50OiBhbnksIG5vZGVzOiBhbnlbXSkge1xuICAgIHZhciBkZWJ1Z1BhcmVudCA9IGdldERlYnVnTm9kZShwYXJlbnRFbGVtZW50KTtcbiAgICBpZiAoaXNQcmVzZW50KGRlYnVnUGFyZW50KSAmJiBkZWJ1Z1BhcmVudCBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgbGV0IGRlYnVnRWxlbWVudCA9IGRlYnVnUGFyZW50O1xuICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4geyBkZWJ1Z0VsZW1lbnQuYWRkQ2hpbGQoZ2V0RGVidWdOb2RlKG5vZGUpKTsgfSk7XG4gICAgfVxuICAgIHRoaXMuX2RlbGVnYXRlLnByb2plY3ROb2RlcyhwYXJlbnRFbGVtZW50LCBub2Rlcyk7XG4gIH1cblxuICBhdHRhY2hWaWV3QWZ0ZXIobm9kZTogYW55LCB2aWV3Um9vdE5vZGVzOiBhbnlbXSkge1xuICAgIHZhciBkZWJ1Z05vZGUgPSBnZXREZWJ1Z05vZGUobm9kZSk7XG4gICAgaWYgKGlzUHJlc2VudChkZWJ1Z05vZGUpKSB7XG4gICAgICB2YXIgZGVidWdQYXJlbnQgPSBkZWJ1Z05vZGUucGFyZW50O1xuICAgICAgaWYgKHZpZXdSb290Tm9kZXMubGVuZ3RoID4gMCAmJiBpc1ByZXNlbnQoZGVidWdQYXJlbnQpKSB7XG4gICAgICAgIHZhciBkZWJ1Z1ZpZXdSb290Tm9kZXM6IERlYnVnTm9kZVtdID0gW107XG4gICAgICAgIHZpZXdSb290Tm9kZXMuZm9yRWFjaCgocm9vdE5vZGUpID0+IGRlYnVnVmlld1Jvb3ROb2Rlcy5wdXNoKGdldERlYnVnTm9kZShyb290Tm9kZSkpKTtcbiAgICAgICAgZGVidWdQYXJlbnQuaW5zZXJ0Q2hpbGRyZW5BZnRlcihkZWJ1Z05vZGUsIGRlYnVnVmlld1Jvb3ROb2Rlcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2RlbGVnYXRlLmF0dGFjaFZpZXdBZnRlcihub2RlLCB2aWV3Um9vdE5vZGVzKTtcbiAgfVxuXG4gIGRldGFjaFZpZXcodmlld1Jvb3ROb2RlczogYW55W10pIHtcbiAgICB2aWV3Um9vdE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHZhciBkZWJ1Z05vZGUgPSBnZXREZWJ1Z05vZGUobm9kZSk7XG4gICAgICBpZiAoaXNQcmVzZW50KGRlYnVnTm9kZSkgJiYgaXNQcmVzZW50KGRlYnVnTm9kZS5wYXJlbnQpKSB7XG4gICAgICAgIGRlYnVnTm9kZS5wYXJlbnQucmVtb3ZlQ2hpbGQoZGVidWdOb2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5kZXRhY2hWaWV3KHZpZXdSb290Tm9kZXMpO1xuICB9XG5cbiAgZGVzdHJveVZpZXcoaG9zdEVsZW1lbnQ6IGFueSwgdmlld0FsbE5vZGVzOiBhbnlbXSkge1xuICAgIHZpZXdBbGxOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7IHJlbW92ZURlYnVnTm9kZUZyb21JbmRleChnZXREZWJ1Z05vZGUobm9kZSkpOyB9KTtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5kZXN0cm95Vmlldyhob3N0RWxlbWVudCwgdmlld0FsbE5vZGVzKTtcbiAgfVxuXG4gIGxpc3RlbihyZW5kZXJFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHZhciBkZWJ1Z0VsID0gZ2V0RGVidWdOb2RlKHJlbmRlckVsZW1lbnQpO1xuICAgIGlmIChpc1ByZXNlbnQoZGVidWdFbCkpIHtcbiAgICAgIGRlYnVnRWwubGlzdGVuZXJzLnB1c2gobmV3IEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmxpc3RlbihyZW5kZXJFbGVtZW50LCBuYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBsaXN0ZW5HbG9iYWwodGFyZ2V0OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5saXN0ZW5HbG9iYWwodGFyZ2V0LCBuYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBzZXRFbGVtZW50UHJvcGVydHkocmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KSB7XG4gICAgdmFyIGRlYnVnRWwgPSBnZXREZWJ1Z05vZGUocmVuZGVyRWxlbWVudCk7XG4gICAgaWYgKGlzUHJlc2VudChkZWJ1Z0VsKSAmJiBkZWJ1Z0VsIGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICBkZWJ1Z0VsLnByb3BlcnRpZXMuc2V0KHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuX2RlbGVnYXRlLnNldEVsZW1lbnRQcm9wZXJ0eShyZW5kZXJFbGVtZW50LCBwcm9wZXJ0eU5hbWUsIHByb3BlcnR5VmFsdWUpO1xuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50OiBhbnksIGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgYXR0cmlidXRlVmFsdWU6IHN0cmluZykge1xuICAgIHZhciBkZWJ1Z0VsID0gZ2V0RGVidWdOb2RlKHJlbmRlckVsZW1lbnQpO1xuICAgIGlmIChpc1ByZXNlbnQoZGVidWdFbCkgJiYgZGVidWdFbCBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgZGVidWdFbC5hdHRyaWJ1dGVzLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuX2RlbGVnYXRlLnNldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyRWxlbWVudCwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgb25seSBpbiBkZWJ1ZyBtb2RlIHRvIHNlcmlhbGl6ZSBwcm9wZXJ0eSBjaGFuZ2VzIHRvIGNvbW1lbnQgbm9kZXMsXG4gICAqIHN1Y2ggYXMgPHRlbXBsYXRlPiBwbGFjZWhvbGRlcnMuXG4gICAqL1xuICBzZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlckVsZW1lbnQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHByb3BlcnR5VmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2RlbGVnYXRlLnNldEJpbmRpbmdEZWJ1Z0luZm8ocmVuZGVyRWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIG9ubHkgaW4gZGV2ZWxvcG1lbnQgbW9kZSB0byBzZXQgaW5mb3JtYXRpb24gbmVlZGVkIGJ5IHRoZSBEZWJ1Z05vZGUgZm9yIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIHNldEVsZW1lbnREZWJ1Z0luZm8ocmVuZGVyRWxlbWVudDogYW55LCBpbmZvOiBSZW5kZXJEZWJ1Z0luZm8pIHtcbiAgICB2YXIgZGVidWdFbCA9IGdldERlYnVnTm9kZShyZW5kZXJFbGVtZW50KTtcbiAgICBkZWJ1Z0VsLnNldERlYnVnSW5mbyhpbmZvKTtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5zZXRFbGVtZW50RGVidWdJbmZvKHJlbmRlckVsZW1lbnQsIGluZm8pO1xuICB9XG5cbiAgc2V0RWxlbWVudENsYXNzKHJlbmRlckVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcsIGlzQWRkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGVsZWdhdGUuc2V0RWxlbWVudENsYXNzKHJlbmRlckVsZW1lbnQsIGNsYXNzTmFtZSwgaXNBZGQpO1xuICB9XG5cbiAgc2V0RWxlbWVudFN0eWxlKHJlbmRlckVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2RlbGVnYXRlLnNldEVsZW1lbnRTdHlsZShyZW5kZXJFbGVtZW50LCBzdHlsZU5hbWUsIHN0eWxlVmFsdWUpO1xuICB9XG5cbiAgaW52b2tlRWxlbWVudE1ldGhvZChyZW5kZXJFbGVtZW50OiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgYXJnczogYW55W10pIHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5pbnZva2VFbGVtZW50TWV0aG9kKHJlbmRlckVsZW1lbnQsIG1ldGhvZE5hbWUsIGFyZ3MpO1xuICB9XG5cbiAgc2V0VGV4dChyZW5kZXJOb2RlOiBhbnksIHRleHQ6IHN0cmluZykgeyB0aGlzLl9kZWxlZ2F0ZS5zZXRUZXh0KHJlbmRlck5vZGUsIHRleHQpOyB9XG59XG4iXX0=