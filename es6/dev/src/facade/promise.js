export class PromiseCompleter {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
}
export class PromiseWrapper {
    static resolve(obj) { return Promise.resolve(obj); }
    static reject(obj, _) { return Promise.reject(obj); }
    // Note: We can't rename this method into `catch`, as this is not a valid
    // method name in Dart.
    static catchError(promise, onError) {
        return promise.catch(onError);
    }
    static all(promises) {
        if (promises.length == 0)
            return Promise.resolve([]);
        return Promise.all(promises);
    }
    static then(promise, success, rejection) {
        return promise.then(success, rejection);
    }
    static wrap(computation) {
        return new Promise((res, rej) => {
            try {
                res(computation());
            }
            catch (e) {
                rej(e);
            }
        });
    }
    static scheduleMicrotask(computation) {
        PromiseWrapper.then(PromiseWrapper.resolve(null), computation, (_) => { });
    }
    static isPromise(obj) { return obj instanceof Promise; }
    static completer() { return new PromiseCompleter(); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtWUc3U0NSYmwudG1wL2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZS50cyJdLCJuYW1lcyI6WyJQcm9taXNlQ29tcGxldGVyIiwiUHJvbWlzZUNvbXBsZXRlci5jb25zdHJ1Y3RvciIsIlByb21pc2VXcmFwcGVyIiwiUHJvbWlzZVdyYXBwZXIucmVzb2x2ZSIsIlByb21pc2VXcmFwcGVyLnJlamVjdCIsIlByb21pc2VXcmFwcGVyLmNhdGNoRXJyb3IiLCJQcm9taXNlV3JhcHBlci5hbGwiLCJQcm9taXNlV3JhcHBlci50aGVuIiwiUHJvbWlzZVdyYXBwZXIud3JhcCIsIlByb21pc2VXcmFwcGVyLnNjaGVkdWxlTWljcm90YXNrIiwiUHJvbWlzZVdyYXBwZXIuaXNQcm9taXNlIiwiUHJvbWlzZVdyYXBwZXIuY29tcGxldGVyIl0sIm1hcHBpbmdzIjoiQUFDQTtJQUtFQTtRQUNFQyxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQTtZQUNsQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDbkJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEdBQUdBLENBQUNBO1FBQ3BCQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNMQSxDQUFDQTtBQUNIRCxDQUFDQTtBQUVEO0lBQ0VFLE9BQU9BLE9BQU9BLENBQUlBLEdBQU1BLElBQWdCQyxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUV0RUQsT0FBT0EsTUFBTUEsQ0FBQ0EsR0FBUUEsRUFBRUEsQ0FBQ0EsSUFBa0JFLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBRXhFRix5RUFBeUVBO0lBQ3pFQSx1QkFBdUJBO0lBQ3ZCQSxPQUFPQSxVQUFVQSxDQUFJQSxPQUFtQkEsRUFDbkJBLE9BQTJDQTtRQUM5REcsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7SUFDaENBLENBQUNBO0lBRURILE9BQU9BLEdBQUdBLENBQUlBLFFBQTRCQTtRQUN4Q0ksRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDckRBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO0lBQy9CQSxDQUFDQTtJQUVESixPQUFPQSxJQUFJQSxDQUFPQSxPQUFtQkEsRUFBRUEsT0FBeUNBLEVBQzlEQSxTQUEyREE7UUFDM0VLLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO0lBQzFDQSxDQUFDQTtJQUVETCxPQUFPQSxJQUFJQSxDQUFJQSxXQUFvQkE7UUFDakNNLE1BQU1BLENBQUNBLElBQUlBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBO1lBQzFCQSxJQUFJQSxDQUFDQTtnQkFDSEEsR0FBR0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDckJBLENBQUVBO1lBQUFBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNYQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNUQSxDQUFDQTtRQUNIQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNMQSxDQUFDQTtJQUVETixPQUFPQSxpQkFBaUJBLENBQUNBLFdBQXNCQTtRQUM3Q08sY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsV0FBV0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDNUVBLENBQUNBO0lBRURQLE9BQU9BLFNBQVNBLENBQUNBLEdBQVFBLElBQWFRLE1BQU1BLENBQUNBLEdBQUdBLFlBQVlBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO0lBRXRFUixPQUFPQSxTQUFTQSxLQUE2QlMsTUFBTUEsQ0FBQ0EsSUFBSUEsZ0JBQWdCQSxFQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUNsRlQsQ0FBQ0E7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNsYXNzIFByb21pc2VDb21wbGV0ZXI8Uj4ge1xuICBwcm9taXNlOiBQcm9taXNlPFI+O1xuICByZXNvbHZlOiAodmFsdWU/OiBSIHwgUHJvbWlzZUxpa2U8Uj4pID0+IHZvaWQ7XG4gIHJlamVjdDogKGVycm9yPzogYW55LCBzdGFja1RyYWNlPzogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgdGhpcy5yZXNvbHZlID0gcmVzO1xuICAgICAgdGhpcy5yZWplY3QgPSByZWo7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb21pc2VXcmFwcGVyIHtcbiAgc3RhdGljIHJlc29sdmU8VD4ob2JqOiBUKTogUHJvbWlzZTxUPiB7IHJldHVybiBQcm9taXNlLnJlc29sdmUob2JqKTsgfVxuXG4gIHN0YXRpYyByZWplY3Qob2JqOiBhbnksIF8pOiBQcm9taXNlPGFueT4geyByZXR1cm4gUHJvbWlzZS5yZWplY3Qob2JqKTsgfVxuXG4gIC8vIE5vdGU6IFdlIGNhbid0IHJlbmFtZSB0aGlzIG1ldGhvZCBpbnRvIGBjYXRjaGAsIGFzIHRoaXMgaXMgbm90IGEgdmFsaWRcbiAgLy8gbWV0aG9kIG5hbWUgaW4gRGFydC5cbiAgc3RhdGljIGNhdGNoRXJyb3I8VD4ocHJvbWlzZTogUHJvbWlzZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcjogKGVycm9yOiBhbnkpID0+IFQgfCBQcm9taXNlTGlrZTxUPik6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBwcm9taXNlLmNhdGNoKG9uRXJyb3IpO1xuICB9XG5cbiAgc3RhdGljIGFsbDxUPihwcm9taXNlczogKFQgfCBQcm9taXNlPFQ+KVtdKTogUHJvbWlzZTxUW10+IHtcbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09IDApIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICBzdGF0aWMgdGhlbjxULCBVPihwcm9taXNlOiBQcm9taXNlPFQ+LCBzdWNjZXNzOiAodmFsdWU6IFQpID0+IFUgfCBQcm9taXNlTGlrZTxVPixcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0aW9uPzogKGVycm9yOiBhbnksIHN0YWNrPzogYW55KSA9PiBVIHwgUHJvbWlzZUxpa2U8VT4pOiBQcm9taXNlPFU+IHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKHN1Y2Nlc3MsIHJlamVjdGlvbik7XG4gIH1cblxuICBzdGF0aWMgd3JhcDxUPihjb21wdXRhdGlvbjogKCkgPT4gVCk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcyhjb21wdXRhdGlvbigpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqKGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHNjaGVkdWxlTWljcm90YXNrKGNvbXB1dGF0aW9uOiAoKSA9PiBhbnkpOiB2b2lkIHtcbiAgICBQcm9taXNlV3JhcHBlci50aGVuKFByb21pc2VXcmFwcGVyLnJlc29sdmUobnVsbCksIGNvbXB1dGF0aW9uLCAoXykgPT4ge30pO1xuICB9XG5cbiAgc3RhdGljIGlzUHJvbWlzZShvYmo6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gb2JqIGluc3RhbmNlb2YgUHJvbWlzZTsgfVxuXG4gIHN0YXRpYyBjb21wbGV0ZXI8VD4oKTogUHJvbWlzZUNvbXBsZXRlcjxUPiB7IHJldHVybiBuZXcgUHJvbWlzZUNvbXBsZXRlcjxUPigpOyB9XG59XG4iXX0=