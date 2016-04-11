var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ElementAst, BoundDirectivePropertyAst, DirectiveAst } from 'angular2/compiler';
import { AstTransformer, LiteralArray, LiteralPrimitive } from 'angular2/src/core/change_detection/parser/ast';
import { BaseException } from 'angular2/src/facade/exceptions';
import { Injectable } from 'angular2/core';
import { Parser } from 'angular2/src/core/change_detection/parser/parser';
/**
 * e.g., './User', 'Modal' in ./User[Modal(param: value)]
 */
class FixedPart {
    constructor(value) {
        this.value = value;
    }
}
/**
 * The square bracket
 */
class AuxiliaryStart {
    constructor() {
    }
}
/**
 * The square bracket
 */
class AuxiliaryEnd {
    constructor() {
    }
}
/**
 * e.g., param:value in ./User[Modal(param: value)]
 */
class Params {
    constructor(ast) {
        this.ast = ast;
    }
}
class RouterLinkLexer {
    constructor(parser, exp) {
        this.parser = parser;
        this.exp = exp;
        this.index = 0;
    }
    tokenize() {
        let tokens = [];
        while (this.index < this.exp.length) {
            tokens.push(this._parseToken());
        }
        return tokens;
    }
    _parseToken() {
        let c = this.exp[this.index];
        if (c == '[') {
            this.index++;
            return new AuxiliaryStart();
        }
        else if (c == ']') {
            this.index++;
            return new AuxiliaryEnd();
        }
        else if (c == '(') {
            return this._parseParams();
        }
        else if (c == '/' && this.index !== 0) {
            this.index++;
            return this._parseFixedPart();
        }
        else {
            return this._parseFixedPart();
        }
    }
    _parseParams() {
        let start = this.index;
        for (; this.index < this.exp.length; ++this.index) {
            let c = this.exp[this.index];
            if (c == ')') {
                let paramsContent = this.exp.substring(start + 1, this.index);
                this.index++;
                return new Params(this.parser.parseBinding(`{${paramsContent}}`, null).ast);
            }
        }
        throw new BaseException("Cannot find ')'");
    }
    _parseFixedPart() {
        let start = this.index;
        let sawNonSlash = false;
        for (; this.index < this.exp.length; ++this.index) {
            let c = this.exp[this.index];
            if (c == '(' || c == '[' || c == ']' || (c == '/' && sawNonSlash)) {
                break;
            }
            if (c != '.' && c != '/') {
                sawNonSlash = true;
            }
        }
        let fixed = this.exp.substring(start, this.index);
        if (start === this.index || !sawNonSlash || fixed.startsWith('//')) {
            throw new BaseException("Invalid router link");
        }
        return new FixedPart(fixed);
    }
}
class RouterLinkAstGenerator {
    constructor(tokens) {
        this.tokens = tokens;
        this.index = 0;
    }
    generate() { return this._genAuxiliary(); }
    _genAuxiliary() {
        let arr = [];
        for (; this.index < this.tokens.length; this.index++) {
            let r = this.tokens[this.index];
            if (r instanceof FixedPart) {
                arr.push(new LiteralPrimitive(r.value));
            }
            else if (r instanceof Params) {
                arr.push(r.ast);
            }
            else if (r instanceof AuxiliaryEnd) {
                break;
            }
            else if (r instanceof AuxiliaryStart) {
                this.index++;
                arr.push(this._genAuxiliary());
            }
        }
        return new LiteralArray(arr);
    }
}
class RouterLinkAstTransformer extends AstTransformer {
    constructor(parser) {
        super();
        this.parser = parser;
    }
    visitQuote(ast) {
        if (ast.prefix == "route") {
            return parseRouterLinkExpression(this.parser, ast.uninterpretedExpression);
        }
        else {
            return super.visitQuote(ast);
        }
    }
}
export function parseRouterLinkExpression(parser, exp) {
    let tokens = new RouterLinkLexer(parser, exp.trim()).tokenize();
    return new RouterLinkAstGenerator(tokens).generate();
}
/**
 * A compiler plugin that implements the router link DSL.
 */
export let RouterLinkTransform = class {
    constructor(parser) {
        this.astTransformer = new RouterLinkAstTransformer(parser);
    }
    visitNgContent(ast, context) { return ast; }
    visitEmbeddedTemplate(ast, context) { return ast; }
    visitElement(ast, context) {
        let updatedChildren = ast.children.map(c => c.visit(this, context));
        let updatedInputs = ast.inputs.map(c => c.visit(this, context));
        let updatedDirectives = ast.directives.map(c => c.visit(this, context));
        return new ElementAst(ast.name, ast.attrs, updatedInputs, ast.outputs, ast.exportAsVars, updatedDirectives, updatedChildren, ast.ngContentIndex, ast.sourceSpan);
    }
    visitVariable(ast, context) { return ast; }
    visitEvent(ast, context) { return ast; }
    visitElementProperty(ast, context) { return ast; }
    visitAttr(ast, context) { return ast; }
    visitBoundText(ast, context) { return ast; }
    visitText(ast, context) { return ast; }
    visitDirective(ast, context) {
        let updatedInputs = ast.inputs.map(c => c.visit(this, context));
        return new DirectiveAst(ast.directive, updatedInputs, ast.hostProperties, ast.hostEvents, ast.exportAsVars, ast.sourceSpan);
    }
    visitDirectiveProperty(ast, context) {
        let transformedValue = ast.value.visit(this.astTransformer);
        return new BoundDirectivePropertyAst(ast.directiveName, ast.templateName, transformedValue, ast.sourceSpan);
    }
};
RouterLinkTransform = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [Parser])
], RouterLinkTransform);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmtfdHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1ZRzdTQ1JibC50bXAvYW5ndWxhcjIvc3JjL3JvdXRlci9kaXJlY3RpdmVzL3JvdXRlcl9saW5rX3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6WyJGaXhlZFBhcnQiLCJGaXhlZFBhcnQuY29uc3RydWN0b3IiLCJBdXhpbGlhcnlTdGFydCIsIkF1eGlsaWFyeVN0YXJ0LmNvbnN0cnVjdG9yIiwiQXV4aWxpYXJ5RW5kIiwiQXV4aWxpYXJ5RW5kLmNvbnN0cnVjdG9yIiwiUGFyYW1zIiwiUGFyYW1zLmNvbnN0cnVjdG9yIiwiUm91dGVyTGlua0xleGVyIiwiUm91dGVyTGlua0xleGVyLmNvbnN0cnVjdG9yIiwiUm91dGVyTGlua0xleGVyLnRva2VuaXplIiwiUm91dGVyTGlua0xleGVyLl9wYXJzZVRva2VuIiwiUm91dGVyTGlua0xleGVyLl9wYXJzZVBhcmFtcyIsIlJvdXRlckxpbmtMZXhlci5fcGFyc2VGaXhlZFBhcnQiLCJSb3V0ZXJMaW5rQXN0R2VuZXJhdG9yIiwiUm91dGVyTGlua0FzdEdlbmVyYXRvci5jb25zdHJ1Y3RvciIsIlJvdXRlckxpbmtBc3RHZW5lcmF0b3IuZ2VuZXJhdGUiLCJSb3V0ZXJMaW5rQXN0R2VuZXJhdG9yLl9nZW5BdXhpbGlhcnkiLCJSb3V0ZXJMaW5rQXN0VHJhbnNmb3JtZXIiLCJSb3V0ZXJMaW5rQXN0VHJhbnNmb3JtZXIuY29uc3RydWN0b3IiLCJSb3V0ZXJMaW5rQXN0VHJhbnNmb3JtZXIudmlzaXRRdW90ZSIsInBhcnNlUm91dGVyTGlua0V4cHJlc3Npb24iLCJSb3V0ZXJMaW5rVHJhbnNmb3JtIiwiUm91dGVyTGlua1RyYW5zZm9ybS5jb25zdHJ1Y3RvciIsIlJvdXRlckxpbmtUcmFuc2Zvcm0udmlzaXROZ0NvbnRlbnQiLCJSb3V0ZXJMaW5rVHJhbnNmb3JtLnZpc2l0RW1iZWRkZWRUZW1wbGF0ZSIsIlJvdXRlckxpbmtUcmFuc2Zvcm0udmlzaXRFbGVtZW50IiwiUm91dGVyTGlua1RyYW5zZm9ybS52aXNpdFZhcmlhYmxlIiwiUm91dGVyTGlua1RyYW5zZm9ybS52aXNpdEV2ZW50IiwiUm91dGVyTGlua1RyYW5zZm9ybS52aXNpdEVsZW1lbnRQcm9wZXJ0eSIsIlJvdXRlckxpbmtUcmFuc2Zvcm0udmlzaXRBdHRyIiwiUm91dGVyTGlua1RyYW5zZm9ybS52aXNpdEJvdW5kVGV4dCIsIlJvdXRlckxpbmtUcmFuc2Zvcm0udmlzaXRUZXh0IiwiUm91dGVyTGlua1RyYW5zZm9ybS52aXNpdERpcmVjdGl2ZSIsIlJvdXRlckxpbmtUcmFuc2Zvcm0udmlzaXREaXJlY3RpdmVQcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O09BQU8sRUFFTCxVQUFVLEVBQ1YseUJBQXlCLEVBQ3pCLFlBQVksRUFFYixNQUFNLG1CQUFtQjtPQUNuQixFQUNMLGNBQWMsRUFJZCxZQUFZLEVBQ1osZ0JBQWdCLEVBRWpCLE1BQU0sK0NBQStDO09BQy9DLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDO09BQ3JELEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZTtPQUNqQyxFQUFDLE1BQU0sRUFBQyxNQUFNLGtEQUFrRDtBQUV2RTs7R0FFRztBQUNIO0lBQ0VBLFlBQW1CQSxLQUFhQTtRQUFiQyxVQUFLQSxHQUFMQSxLQUFLQSxDQUFRQTtJQUFHQSxDQUFDQTtBQUN0Q0QsQ0FBQ0E7QUFFRDs7R0FFRztBQUNIO0lBQ0VFO0lBQWVDLENBQUNBO0FBQ2xCRCxDQUFDQTtBQUVEOztHQUVHO0FBQ0g7SUFDRUU7SUFBZUMsQ0FBQ0E7QUFDbEJELENBQUNBO0FBRUQ7O0dBRUc7QUFDSDtJQUNFRSxZQUFtQkEsR0FBUUE7UUFBUkMsUUFBR0EsR0FBSEEsR0FBR0EsQ0FBS0E7SUFBR0EsQ0FBQ0E7QUFDakNELENBQUNBO0FBRUQ7SUFHRUUsWUFBb0JBLE1BQWNBLEVBQVVBLEdBQVdBO1FBQW5DQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFRQTtRQUFVQSxRQUFHQSxHQUFIQSxHQUFHQSxDQUFRQTtRQUZ2REEsVUFBS0EsR0FBV0EsQ0FBQ0EsQ0FBQ0E7SUFFd0NBLENBQUNBO0lBRTNERCxRQUFRQTtRQUNORSxJQUFJQSxNQUFNQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNoQkEsT0FBT0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFDcENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBLENBQUNBO1FBQ2xDQSxDQUFDQTtRQUNEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtJQUNoQkEsQ0FBQ0E7SUFFT0YsV0FBV0E7UUFDakJHLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQzdCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNiQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtZQUNiQSxNQUFNQSxDQUFDQSxJQUFJQSxjQUFjQSxFQUFFQSxDQUFDQTtRQUU5QkEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDcEJBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1lBQ2JBLE1BQU1BLENBQUNBLElBQUlBLFlBQVlBLEVBQUVBLENBQUNBO1FBRTVCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0E7UUFFN0JBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLEtBQUtBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtZQUNiQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtRQUVoQ0EsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDTkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7UUFDaENBLENBQUNBO0lBQ0hBLENBQUNBO0lBRU9ILFlBQVlBO1FBQ2xCSSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN2QkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDbERBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQzdCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDYkEsSUFBSUEsYUFBYUEsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzlEQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtnQkFDYkEsTUFBTUEsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsYUFBYUEsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDOUVBLENBQUNBO1FBQ0hBLENBQUNBO1FBQ0RBLE1BQU1BLElBQUlBLGFBQWFBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7SUFDN0NBLENBQUNBO0lBRU9KLGVBQWVBO1FBQ3JCSyxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN2QkEsSUFBSUEsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFHeEJBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLE1BQU1BLEVBQUVBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1lBQ2xEQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUU3QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xFQSxLQUFLQSxDQUFDQTtZQUNSQSxDQUFDQTtZQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDekJBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3JCQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVEQSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUVsREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsV0FBV0Es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R0FBR0EsQ0FBQ0EsU0FBU0EsRUFBRUEsYUFBYUEsRUFBRUEsR0FBR0EsQ0FBQ0EsY0FBY0EsRUFBRUEsR0FBR0EsQ0FBQ0EsVUFBVUEsRUFDaEVBLEdBQUdBLENBQUNBLFlBQVlBLEVBQUVBLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO0lBQzVEQSxDQUFDQTtJQUVEWCxzQkFBc0JBLENBQUNBLEdBQThCQSxFQUFFQSxPQUFZQTtRQUNqRVksSUFBSUEsZ0JBQWdCQSxHQUFHQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtRQUM1REEsTUFBTUEsQ0FBQ0EsSUFBSUEseUJBQXlCQSxDQUFDQSxHQUFHQSxDQUFDQSxhQUFhQSxFQUFFQSxHQUFHQSxDQUFDQSxZQUFZQSxFQUFFQSxnQkFBZ0JBLEVBQ3JEQSxHQUFHQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtJQUN2REEsQ0FBQ0E7QUFDSFosQ0FBQ0E7QUF6Q0Q7SUFBQyxVQUFVLEVBQUU7O3dCQXlDWjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgVGVtcGxhdGVBc3RWaXNpdG9yLFxuICBFbGVtZW50QXN0LFxuICBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0LFxuICBEaXJlY3RpdmVBc3QsXG4gIEJvdW5kRWxlbWVudFByb3BlcnR5QXN0XG59IGZyb20gJ2FuZ3VsYXIyL2NvbXBpbGVyJztcbmltcG9ydCB7XG4gIEFzdFRyYW5zZm9ybWVyLFxuICBRdW90ZSxcbiAgQVNULFxuICBFbXB0eUV4cHIsXG4gIExpdGVyYWxBcnJheSxcbiAgTGl0ZXJhbFByaW1pdGl2ZSxcbiAgQVNUV2l0aFNvdXJjZVxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL3BhcnNlci9hc3QnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7UGFyc2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL3BhcnNlci9wYXJzZXInO1xuXG4vKipcbiAqIGUuZy4sICcuL1VzZXInLCAnTW9kYWwnIGluIC4vVXNlcltNb2RhbChwYXJhbTogdmFsdWUpXVxuICovXG5jbGFzcyBGaXhlZFBhcnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IHN0cmluZykge31cbn1cblxuLyoqXG4gKiBUaGUgc3F1YXJlIGJyYWNrZXRcbiAqL1xuY2xhc3MgQXV4aWxpYXJ5U3RhcnQge1xuICBjb25zdHJ1Y3RvcigpIHt9XG59XG5cbi8qKlxuICogVGhlIHNxdWFyZSBicmFja2V0XG4gKi9cbmNsYXNzIEF1eGlsaWFyeUVuZCB7XG4gIGNvbnN0cnVjdG9yKCkge31cbn1cblxuLyoqXG4gKiBlLmcuLCBwYXJhbTp2YWx1ZSBpbiAuL1VzZXJbTW9kYWwocGFyYW06IHZhbHVlKV1cbiAqL1xuY2xhc3MgUGFyYW1zIHtcbiAgY29uc3RydWN0b3IocHVibGljIGFzdDogQVNUKSB7fVxufVxuXG5jbGFzcyBSb3V0ZXJMaW5rTGV4ZXIge1xuICBpbmRleDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcnNlcjogUGFyc2VyLCBwcml2YXRlIGV4cDogc3RyaW5nKSB7fVxuXG4gIHRva2VuaXplKCk6IEFycmF5PEZpeGVkUGFydCB8IEF1eGlsaWFyeVN0YXJ0IHwgQXV4aWxpYXJ5RW5kIHwgUGFyYW1zPiB7XG4gICAgbGV0IHRva2VucyA9IFtdO1xuICAgIHdoaWxlICh0aGlzLmluZGV4IDwgdGhpcy5leHAubGVuZ3RoKSB7XG4gICAgICB0b2tlbnMucHVzaCh0aGlzLl9wYXJzZVRva2VuKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUb2tlbigpIHtcbiAgICBsZXQgYyA9IHRoaXMuZXhwW3RoaXMuaW5kZXhdO1xuICAgIGlmIChjID09ICdbJykge1xuICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgcmV0dXJuIG5ldyBBdXhpbGlhcnlTdGFydCgpO1xuXG4gICAgfSBlbHNlIGlmIChjID09ICddJykge1xuICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgcmV0dXJuIG5ldyBBdXhpbGlhcnlFbmQoKTtcblxuICAgIH0gZWxzZSBpZiAoYyA9PSAnKCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wYXJzZVBhcmFtcygpO1xuXG4gICAgfSBlbHNlIGlmIChjID09ICcvJyAmJiB0aGlzLmluZGV4ICE9PSAwKSB7XG4gICAgICB0aGlzLmluZGV4Kys7XG4gICAgICByZXR1cm4gdGhpcy5fcGFyc2VGaXhlZFBhcnQoKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGFyc2VGaXhlZFBhcnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVBhcmFtcygpIHtcbiAgICBsZXQgc3RhcnQgPSB0aGlzLmluZGV4O1xuICAgIGZvciAoOyB0aGlzLmluZGV4IDwgdGhpcy5leHAubGVuZ3RoOyArK3RoaXMuaW5kZXgpIHtcbiAgICAgIGxldCBjID0gdGhpcy5leHBbdGhpcy5pbmRleF07XG4gICAgICBpZiAoYyA9PSAnKScpIHtcbiAgICAgICAgbGV0IHBhcmFtc0NvbnRlbnQgPSB0aGlzLmV4cC5zdWJzdHJpbmcoc3RhcnQgKyAxLCB0aGlzLmluZGV4KTtcbiAgICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgICByZXR1cm4gbmV3IFBhcmFtcyh0aGlzLnBhcnNlci5wYXJzZUJpbmRpbmcoYHske3BhcmFtc0NvbnRlbnR9fWAsIG51bGwpLmFzdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFwiQ2Fubm90IGZpbmQgJyknXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VGaXhlZFBhcnQoKSB7XG4gICAgbGV0IHN0YXJ0ID0gdGhpcy5pbmRleDtcbiAgICBsZXQgc2F3Tm9uU2xhc2ggPSBmYWxzZTtcblxuXG4gICAgZm9yICg7IHRoaXMuaW5kZXggPCB0aGlzLmV4cC5sZW5ndGg7ICsrdGhpcy5pbmRleCkge1xuICAgICAgbGV0IGMgPSB0aGlzLmV4cFt0aGlzLmluZGV4XTtcblxuICAgICAgaWYgKGMgPT0gJygnIHx8IGMgPT0gJ1snIHx8IGMgPT0gJ10nIHx8IChjID09ICcvJyAmJiBzYXdOb25TbGFzaCkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChjICE9ICcuJyAmJiBjICE9ICcvJykge1xuICAgICAgICBzYXdOb25TbGFzaCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGZpeGVkID0gdGhpcy5leHAuc3Vic3RyaW5nKHN0YXJ0LCB0aGlzLmluZGV4KTtcblxuICAgIGlmIChzdGFydCA9PT0gdGhpcy5pbmRleCB8fCAhc2F3Tm9uU2xhc2ggfHwgZml4ZWQuc3RhcnRzV2l0aCgnLy8nKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXCJJbnZhbGlkIHJvdXRlciBsaW5rXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRml4ZWRQYXJ0KGZpeGVkKTtcbiAgfVxufVxuXG5jbGFzcyBSb3V0ZXJMaW5rQXN0R2VuZXJhdG9yIHtcbiAgaW5kZXg6IG51bWJlciA9IDA7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9rZW5zOiBhbnlbXSkge31cblxuICBnZW5lcmF0ZSgpOiBBU1QgeyByZXR1cm4gdGhpcy5fZ2VuQXV4aWxpYXJ5KCk7IH1cblxuICBwcml2YXRlIF9nZW5BdXhpbGlhcnkoKTogQVNUIHtcbiAgICBsZXQgYXJyID0gW107XG4gICAgZm9yICg7IHRoaXMuaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGg7IHRoaXMuaW5kZXgrKykge1xuICAgICAgbGV0IHIgPSB0aGlzLnRva2Vuc1t0aGlzLmluZGV4XTtcblxuICAgICAgaWYgKHIgaW5zdGFuY2VvZiBGaXhlZFBhcnQpIHtcbiAgICAgICAgYXJyLnB1c2gobmV3IExpdGVyYWxQcmltaXRpdmUoci52YWx1ZSkpO1xuXG4gICAgICB9IGVsc2UgaWYgKHIgaW5zdGFuY2VvZiBQYXJhbXMpIHtcbiAgICAgICAgYXJyLnB1c2goci5hc3QpO1xuXG4gICAgICB9IGVsc2UgaWYgKHIgaW5zdGFuY2VvZiBBdXhpbGlhcnlFbmQpIHtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIH0gZWxzZSBpZiAociBpbnN0YW5jZW9mIEF1eGlsaWFyeVN0YXJ0KSB7XG4gICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgYXJyLnB1c2godGhpcy5fZ2VuQXV4aWxpYXJ5KCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgTGl0ZXJhbEFycmF5KGFycik7XG4gIH1cbn1cblxuY2xhc3MgUm91dGVyTGlua0FzdFRyYW5zZm9ybWVyIGV4dGVuZHMgQXN0VHJhbnNmb3JtZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcnNlcjogUGFyc2VyKSB7IHN1cGVyKCk7IH1cblxuICB2aXNpdFF1b3RlKGFzdDogUXVvdGUpOiBBU1Qge1xuICAgIGlmIChhc3QucHJlZml4ID09IFwicm91dGVcIikge1xuICAgICAgcmV0dXJuIHBhcnNlUm91dGVyTGlua0V4cHJlc3Npb24odGhpcy5wYXJzZXIsIGFzdC51bmludGVycHJldGVkRXhwcmVzc2lvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci52aXNpdFF1b3RlKGFzdCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJvdXRlckxpbmtFeHByZXNzaW9uKHBhcnNlcjogUGFyc2VyLCBleHA6IHN0cmluZyk6IEFTVCB7XG4gIGxldCB0b2tlbnMgPSBuZXcgUm91dGVyTGlua0xleGVyKHBhcnNlciwgZXhwLnRyaW0oKSkudG9rZW5pemUoKTtcbiAgcmV0dXJuIG5ldyBSb3V0ZXJMaW5rQXN0R2VuZXJhdG9yKHRva2VucykuZ2VuZXJhdGUoKTtcbn1cblxuLyoqXG4gKiBBIGNvbXBpbGVyIHBsdWdpbiB0aGF0IGltcGxlbWVudHMgdGhlIHJvdXRlciBsaW5rIERTTC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvdXRlckxpbmtUcmFuc2Zvcm0gaW1wbGVtZW50cyBUZW1wbGF0ZUFzdFZpc2l0b3Ige1xuICBwcml2YXRlIGFzdFRyYW5zZm9ybWVyO1xuXG4gIGNvbnN0cnVjdG9yKHBhcnNlcjogUGFyc2VyKSB7IHRoaXMuYXN0VHJhbnNmb3JtZXIgPSBuZXcgUm91dGVyTGlua0FzdFRyYW5zZm9ybWVyKHBhcnNlcik7IH1cblxuICB2aXNpdE5nQ29udGVudChhc3Q6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0RW1iZWRkZWRUZW1wbGF0ZShhc3Q6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0RWxlbWVudChhc3Q6IEVsZW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgbGV0IHVwZGF0ZWRDaGlsZHJlbiA9IGFzdC5jaGlsZHJlbi5tYXAoYyA9PiBjLnZpc2l0KHRoaXMsIGNvbnRleHQpKTtcbiAgICBsZXQgdXBkYXRlZElucHV0cyA9IGFzdC5pbnB1dHMubWFwKGMgPT4gYy52aXNpdCh0aGlzLCBjb250ZXh0KSk7XG4gICAgbGV0IHVwZGF0ZWREaXJlY3RpdmVzID0gYXN0LmRpcmVjdGl2ZXMubWFwKGMgPT4gYy52aXNpdCh0aGlzLCBjb250ZXh0KSk7XG4gICAgcmV0dXJuIG5ldyBFbGVtZW50QXN0KGFzdC5uYW1lLCBhc3QuYXR0cnMsIHVwZGF0ZWRJbnB1dHMsIGFzdC5vdXRwdXRzLCBhc3QuZXhwb3J0QXNWYXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRGlyZWN0aXZlcywgdXBkYXRlZENoaWxkcmVuLCBhc3QubmdDb250ZW50SW5kZXgsIGFzdC5zb3VyY2VTcGFuKTtcbiAgfVxuXG4gIHZpc2l0VmFyaWFibGUoYXN0OiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdEV2ZW50KGFzdDogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRFbGVtZW50UHJvcGVydHkoYXN0OiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdEF0dHIoYXN0OiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdEJvdW5kVGV4dChhc3Q6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0VGV4dChhc3Q6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0RGlyZWN0aXZlKGFzdDogRGlyZWN0aXZlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGxldCB1cGRhdGVkSW5wdXRzID0gYXN0LmlucHV0cy5tYXAoYyA9PiBjLnZpc2l0KHRoaXMsIGNvbnRleHQpKTtcbiAgICByZXR1cm4gbmV3IERpcmVjdGl2ZUFzdChhc3QuZGlyZWN0aXZlLCB1cGRhdGVkSW5wdXRzLCBhc3QuaG9zdFByb3BlcnRpZXMsIGFzdC5ob3N0RXZlbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5leHBvcnRBc1ZhcnMsIGFzdC5zb3VyY2VTcGFuKTtcbiAgfVxuXG4gIHZpc2l0RGlyZWN0aXZlUHJvcGVydHkoYXN0OiBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGxldCB0cmFuc2Zvcm1lZFZhbHVlID0gYXN0LnZhbHVlLnZpc2l0KHRoaXMuYXN0VHJhbnNmb3JtZXIpO1xuICAgIHJldHVybiBuZXcgQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdChhc3QuZGlyZWN0aXZlTmFtZSwgYXN0LnRlbXBsYXRlTmFtZSwgdHJhbnNmb3JtZWRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN0LnNvdXJjZVNwYW4pO1xuICB9XG59Il19