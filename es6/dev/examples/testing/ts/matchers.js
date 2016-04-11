import { expect } from 'angular2/testing';
var value;
var element;
var exception;
class OtherClass {
}
class SomeClass {
}
// #docregion toBePromise
expect(value).toBePromise();
// #enddocregion
// #docregion toBeAnInstanceOf
expect(value).toBeAnInstanceOf(SomeClass);
// #enddocregion
// #docregion toHaveText
expect(element).toHaveText('Hello world!');
// #enddocregion
// #docregion toHaveCssClass
expect(element).toHaveCssClass('current');
// #enddocregion
// #docregion toHaveCssStyle
expect(element).toHaveCssStyle({ width: '100px', height: 'auto' });
// #enddocregion
// #docregion toContainError
expect(exception).toContainError('Failed to load');
// #enddocregion
// #docregion toThrowErrorWith
expect(() => { throw 'Failed to load'; }).toThrowErrorWith('Failed to load');
// #enddocregion
// #docregion toImplement
expect(SomeClass).toImplement(OtherClass);
// #enddocregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVlHN1NDUmJsLnRtcC9hbmd1bGFyMi9leGFtcGxlcy90ZXN0aW5nL3RzL21hdGNoZXJzLnRzIl0sIm5hbWVzIjpbIk90aGVyQ2xhc3MiLCJTb21lQ2xhc3MiXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sa0JBQWtCO0FBRXZDLElBQUksS0FBVSxDQUFDO0FBQ2YsSUFBSSxPQUFZLENBQUM7QUFDakIsSUFBSSxTQUFjLENBQUM7QUFFbkI7QUFBMkJBLENBQUNBO0FBQzVCO0FBQWlCQyxDQUFDQTtBQUVsQix5QkFBeUI7QUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzVCLGdCQUFnQjtBQUVoQiw4QkFBOEI7QUFDOUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzFDLGdCQUFnQjtBQUVoQix3QkFBd0I7QUFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMzQyxnQkFBZ0I7QUFFaEIsNEJBQTRCO0FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUMsZ0JBQWdCO0FBRWhCLDRCQUE0QjtBQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztBQUNqRSxnQkFBZ0I7QUFFaEIsNEJBQTRCO0FBQzVCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNuRCxnQkFBZ0I7QUFFaEIsOEJBQThCO0FBQzlCLE1BQU0sQ0FBQyxRQUFRLE1BQU0sZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzdFLGdCQUFnQjtBQUVoQix5QkFBeUI7QUFDekIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2V4cGVjdH0gZnJvbSAnYW5ndWxhcjIvdGVzdGluZyc7XG5cbnZhciB2YWx1ZTogYW55O1xudmFyIGVsZW1lbnQ6IGFueTtcbnZhciBleGNlcHRpb246IGFueTtcblxuYWJzdHJhY3QgY2xhc3MgT3RoZXJDbGFzcyB7fVxuY2xhc3MgU29tZUNsYXNzIHt9XG5cbi8vICNkb2NyZWdpb24gdG9CZVByb21pc2VcbmV4cGVjdCh2YWx1ZSkudG9CZVByb21pc2UoKTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiB0b0JlQW5JbnN0YW5jZU9mXG5leHBlY3QodmFsdWUpLnRvQmVBbkluc3RhbmNlT2YoU29tZUNsYXNzKTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiB0b0hhdmVUZXh0XG5leHBlY3QoZWxlbWVudCkudG9IYXZlVGV4dCgnSGVsbG8gd29ybGQhJyk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gdG9IYXZlQ3NzQ2xhc3NcbmV4cGVjdChlbGVtZW50KS50b0hhdmVDc3NDbGFzcygnY3VycmVudCcpO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvSGF2ZUNzc1N0eWxlXG5leHBlY3QoZWxlbWVudCkudG9IYXZlQ3NzU3R5bGUoe3dpZHRoOiAnMTAwcHgnLCBoZWlnaHQ6ICdhdXRvJ30pO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvQ29udGFpbkVycm9yXG5leHBlY3QoZXhjZXB0aW9uKS50b0NvbnRhaW5FcnJvcignRmFpbGVkIHRvIGxvYWQnKTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiB0b1Rocm93RXJyb3JXaXRoXG5leHBlY3QoKCkgPT4geyB0aHJvdyAnRmFpbGVkIHRvIGxvYWQnOyB9KS50b1Rocm93RXJyb3JXaXRoKCdGYWlsZWQgdG8gbG9hZCcpO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvSW1wbGVtZW50XG5leHBlY3QoU29tZUNsYXNzKS50b0ltcGxlbWVudChPdGhlckNsYXNzKTtcbi8vICNlbmRkb2NyZWdpb25cbiJdfQ==