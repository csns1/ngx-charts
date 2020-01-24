import { __decorate, __values } from "tslib";
import { ElementRef, NgZone, ChangeDetectorRef, Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { VisibilityObserver } from '../utils/visibility-observer';
var BaseChartComponent = /** @class */ (function () {
    function BaseChartComponent(chartElement, zone, cd) {
        this.chartElement = chartElement;
        this.zone = zone;
        this.cd = cd;
        this.scheme = 'cool';
        this.schemeType = 'ordinal';
        this.animations = true;
        this.select = new EventEmitter();
    }
    BaseChartComponent.prototype.ngAfterViewInit = function () {
        this.bindWindowResizeEvent();
        // listen for visibility of the element for hidden by default scenario
        this.visibilityObserver = new VisibilityObserver(this.chartElement, this.zone);
        this.visibilityObserver.visible.subscribe(this.update.bind(this));
    };
    BaseChartComponent.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        if (this.visibilityObserver) {
            this.visibilityObserver.visible.unsubscribe();
            this.visibilityObserver.destroy();
        }
    };
    BaseChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BaseChartComponent.prototype.update = function () {
        if (this.results) {
            this.results = this.cloneData(this.results);
        }
        else {
            this.results = [];
        }
        if (this.view) {
            this.width = this.view[0];
            this.height = this.view[1];
        }
        else {
            var dims = this.getContainerDims();
            if (dims) {
                this.width = dims.width;
                this.height = dims.height;
            }
        }
        // default values if width or height are 0 or undefined
        if (!this.width) {
            this.width = 600;
        }
        if (!this.height) {
            this.height = 400;
        }
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        if (this.cd) {
            this.cd.markForCheck();
        }
    };
    BaseChartComponent.prototype.getContainerDims = function () {
        var width;
        var height;
        var hostElem = this.chartElement.nativeElement;
        if (hostElem.parentNode !== null) {
            // Get the container dimensions
            var dims = hostElem.parentNode.getBoundingClientRect();
            width = dims.width;
            height = dims.height;
        }
        if (width && height) {
            return { width: width, height: height };
        }
        return null;
    };
    /**
     * Converts all date objects that appear as name
     * into formatted date strings
     */
    BaseChartComponent.prototype.formatDates = function () {
        for (var i = 0; i < this.results.length; i++) {
            var g = this.results[i];
            g.label = g.name;
            if (g.label instanceof Date) {
                g.label = g.label.toLocaleDateString();
            }
            if (g.series) {
                for (var j = 0; j < g.series.length; j++) {
                    var d = g.series[j];
                    d.label = d.name;
                    if (d.label instanceof Date) {
                        d.label = d.label.toLocaleDateString();
                    }
                }
            }
        }
    };
    BaseChartComponent.prototype.unbindEvents = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    };
    BaseChartComponent.prototype.bindWindowResizeEvent = function () {
        // const source = observableFromEvent(window, 'resize');
        // const subscription = source.pipe(debounceTime(200)).subscribe(e => {
        //   this.update();
        //   if (this.cd) {
        //     this.cd.markForCheck();
        //   }
        // });
        // this.resizeSubscription = subscription;
    };
    /**
     * Clones the data into a new object
     *
     * @memberOf BaseChart
     */
    BaseChartComponent.prototype.cloneData = function (data) {
        var e_1, _a, e_2, _b;
        var results = [];
        try {
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var item = data_1_1.value;
                var copy = {
                    name: item['name']
                };
                if (item['value'] !== undefined) {
                    copy['value'] = item['value'];
                }
                if (item['series'] !== undefined) {
                    copy['series'] = [];
                    try {
                        for (var _c = (e_2 = void 0, __values(item['series'])), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var seriesItem = _d.value;
                            var seriesItemCopy = Object.assign({}, seriesItem);
                            copy['series'].push(seriesItemCopy);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                if (item['extra'] !== undefined) {
                    copy['extra'] = JSON.parse(JSON.stringify(item['extra']));
                }
                results.push(copy);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return results;
    };
    BaseChartComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "results", void 0);
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "view", void 0);
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "scheme", void 0);
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "schemeType", void 0);
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "customColors", void 0);
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], BaseChartComponent.prototype, "select", void 0);
    BaseChartComponent = __decorate([
        Component({
            selector: 'base-chart',
            template: "\n    <div></div>\n  "
        })
    ], BaseChartComponent);
    return BaseChartComponent;
}());
export { BaseChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osYUFBYSxFQUNiLFNBQVMsRUFDVCxTQUFTLEVBQ1QsYUFBYSxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBUWxFO0lBZUUsNEJBQXNCLFlBQXdCLEVBQVksSUFBWSxFQUFZLEVBQXFCO1FBQWpGLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFZLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBWjlGLFdBQU0sR0FBUSxNQUFNLENBQUM7UUFDckIsZUFBVSxHQUFXLFNBQVMsQ0FBQztRQUUvQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBT29FLENBQUM7SUFFM0csNENBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTdCLHNFQUFzRTtRQUN0RSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVELHdDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELG1DQUFNLEdBQU47UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QzthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDbkI7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNyQyxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUMzQjtTQUNGO1FBRUQsdURBQXVEO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNuQjtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0QyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELDZDQUFnQixHQUFoQjtRQUNFLElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxNQUFNLENBQUM7UUFDWCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVqRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ2hDLCtCQUErQjtZQUMvQixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDekQsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7UUFFRCxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7WUFDbkIsT0FBTyxFQUFFLEtBQUssT0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUM7U0FDMUI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSCx3Q0FBVyxHQUFYO1FBQ0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxJQUFJLEVBQUU7Z0JBQzNCLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQ3hDO1lBRUQsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUNaLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDeEMsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksSUFBSSxFQUFFO3dCQUMzQixDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztxQkFDeEM7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVTLHlDQUFZLEdBQXRCO1FBQ0UsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVPLGtEQUFxQixHQUE3QjtRQUNFLHdEQUF3RDtRQUN4RCx1RUFBdUU7UUFDdkUsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQiw4QkFBOEI7UUFDOUIsTUFBTTtRQUNOLE1BQU07UUFDTiwwQ0FBMEM7SUFDNUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxzQ0FBUyxHQUFqQixVQUFrQixJQUFJOztRQUNwQixJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7O1lBRW5CLEtBQW1CLElBQUEsU0FBQSxTQUFBLElBQUksQ0FBQSwwQkFBQSw0Q0FBRTtnQkFBcEIsSUFBTSxJQUFJLGlCQUFBO2dCQUNiLElBQU0sSUFBSSxHQUFHO29CQUNYLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNuQixDQUFDO2dCQUVGLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDL0I7Z0JBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDOzt3QkFDcEIsS0FBeUIsSUFBQSxvQkFBQSxTQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFBLGdCQUFBLDRCQUFFOzRCQUFwQyxJQUFNLFVBQVUsV0FBQTs0QkFDbkIsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7NEJBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7eUJBQ3JDOzs7Ozs7Ozs7aUJBQ0Y7Z0JBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzNEO2dCQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEI7Ozs7Ozs7OztRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O2dCQXRKbUMsVUFBVTtnQkFBa0IsTUFBTTtnQkFBZ0IsaUJBQWlCOztJQWQ5RjtRQUFSLEtBQUssRUFBRTt1REFBYztJQUNiO1FBQVIsS0FBSyxFQUFFO29EQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTtzREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7MERBQWdDO0lBQy9CO1FBQVIsS0FBSyxFQUFFOzREQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTswREFBNEI7SUFFMUI7UUFBVCxNQUFNLEVBQUU7c0RBQTZCO0lBUjNCLGtCQUFrQjtRQU45QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsdUJBRVQ7U0FDRixDQUFDO09BQ1csa0JBQWtCLENBc0s5QjtJQUFELHlCQUFDO0NBQUEsQUF0S0QsSUFzS0M7U0F0S1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRWxlbWVudFJlZixcbiAgTmdab25lLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmltcG9ydCB7IFZpc2liaWxpdHlPYnNlcnZlciB9IGZyb20gJy4uL3V0aWxzL3Zpc2liaWxpdHktb2JzZXJ2ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiYXNlLWNoYXJ0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PjwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEJhc2VDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcmVzdWx0czogYW55O1xuICBASW5wdXQoKSB2aWV3OiBbbnVtYmVyLCBudW1iZXJdO1xuICBASW5wdXQoKSBzY2hlbWU6IGFueSA9ICdjb29sJztcbiAgQElucHV0KCkgc2NoZW1lVHlwZTogc3RyaW5nID0gJ29yZGluYWwnO1xuICBASW5wdXQoKSBjdXN0b21Db2xvcnM6IGFueTtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgcmVzaXplU3Vic2NyaXB0aW9uOiBhbnk7XG4gIHZpc2liaWxpdHlPYnNlcnZlcjogVmlzaWJpbGl0eU9ic2VydmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjaGFydEVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYmluZFdpbmRvd1Jlc2l6ZUV2ZW50KCk7XG5cbiAgICAvLyBsaXN0ZW4gZm9yIHZpc2liaWxpdHkgb2YgdGhlIGVsZW1lbnQgZm9yIGhpZGRlbiBieSBkZWZhdWx0IHNjZW5hcmlvXG4gICAgdGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIgPSBuZXcgVmlzaWJpbGl0eU9ic2VydmVyKHRoaXMuY2hhcnRFbGVtZW50LCB0aGlzLnpvbmUpO1xuICAgIHRoaXMudmlzaWJpbGl0eU9ic2VydmVyLnZpc2libGUuc3Vic2NyaWJlKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgICBpZiAodGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMudmlzaWJpbGl0eU9ic2VydmVyLnZpc2libGUudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMudmlzaWJpbGl0eU9ic2VydmVyLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZXN1bHRzKSB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSB0aGlzLmNsb25lRGF0YSh0aGlzLnJlc3VsdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSBbXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICB0aGlzLndpZHRoID0gdGhpcy52aWV3WzBdO1xuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLnZpZXdbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpbXMgPSB0aGlzLmdldENvbnRhaW5lckRpbXMoKTtcbiAgICAgIGlmIChkaW1zKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSBkaW1zLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGRpbXMuaGVpZ2h0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmF1bHQgdmFsdWVzIGlmIHdpZHRoIG9yIGhlaWdodCBhcmUgMCBvciB1bmRlZmluZWRcbiAgICBpZiAoIXRoaXMud2lkdGgpIHtcbiAgICAgIHRoaXMud2lkdGggPSA2MDA7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhlaWdodCkge1xuICAgICAgdGhpcy5oZWlnaHQgPSA0MDA7XG4gICAgfVxuXG4gICAgdGhpcy53aWR0aCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCk7XG4gICAgdGhpcy5oZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0KTtcblxuICAgIGlmICh0aGlzLmNkKSB7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIGdldENvbnRhaW5lckRpbXMoKTogYW55IHtcbiAgICBsZXQgd2lkdGg7XG4gICAgbGV0IGhlaWdodDtcbiAgICBjb25zdCBob3N0RWxlbSA9IHRoaXMuY2hhcnRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAoaG9zdEVsZW0ucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgLy8gR2V0IHRoZSBjb250YWluZXIgZGltZW5zaW9uc1xuICAgICAgY29uc3QgZGltcyA9IGhvc3RFbGVtLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB3aWR0aCA9IGRpbXMud2lkdGg7XG4gICAgICBoZWlnaHQgPSBkaW1zLmhlaWdodDtcbiAgICB9XG5cbiAgICBpZiAod2lkdGggJiYgaGVpZ2h0KSB7XG4gICAgICByZXR1cm4geyB3aWR0aCwgaGVpZ2h0IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYWxsIGRhdGUgb2JqZWN0cyB0aGF0IGFwcGVhciBhcyBuYW1lXG4gICAqIGludG8gZm9ybWF0dGVkIGRhdGUgc3RyaW5nc1xuICAgKi9cbiAgZm9ybWF0RGF0ZXMoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGcgPSB0aGlzLnJlc3VsdHNbaV07XG4gICAgICBnLmxhYmVsID0gZy5uYW1lO1xuICAgICAgaWYgKGcubGFiZWwgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIGcubGFiZWwgPSBnLmxhYmVsLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZy5zZXJpZXMpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBnLnNlcmllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNvbnN0IGQgPSBnLnNlcmllc1tqXTtcbiAgICAgICAgICBkLmxhYmVsID0gZC5uYW1lO1xuICAgICAgICAgIGlmIChkLmxhYmVsIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgZC5sYWJlbCA9IGQubGFiZWwudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHVuYmluZEV2ZW50cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZXNpemVTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBiaW5kV2luZG93UmVzaXplRXZlbnQoKTogdm9pZCB7XG4gICAgLy8gY29uc3Qgc291cmNlID0gb2JzZXJ2YWJsZUZyb21FdmVudCh3aW5kb3csICdyZXNpemUnKTtcbiAgICAvLyBjb25zdCBzdWJzY3JpcHRpb24gPSBzb3VyY2UucGlwZShkZWJvdW5jZVRpbWUoMjAwKSkuc3Vic2NyaWJlKGUgPT4ge1xuICAgIC8vICAgdGhpcy51cGRhdGUoKTtcbiAgICAvLyAgIGlmICh0aGlzLmNkKSB7XG4gICAgLy8gICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gICAgLy8gdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSBzdWJzY3JpcHRpb247XG4gIH1cblxuICAvKipcbiAgICogQ2xvbmVzIHRoZSBkYXRhIGludG8gYSBuZXcgb2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBCYXNlQ2hhcnRcbiAgICovXG4gIHByaXZhdGUgY2xvbmVEYXRhKGRhdGEpOiBhbnkge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBkYXRhKSB7XG4gICAgICBjb25zdCBjb3B5ID0ge1xuICAgICAgICBuYW1lOiBpdGVtWyduYW1lJ11cbiAgICAgIH07XG5cbiAgICAgIGlmIChpdGVtWyd2YWx1ZSddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29weVsndmFsdWUnXSA9IGl0ZW1bJ3ZhbHVlJ107XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWydzZXJpZXMnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvcHlbJ3NlcmllcyddID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgc2VyaWVzSXRlbSBvZiBpdGVtWydzZXJpZXMnXSkge1xuICAgICAgICAgIGNvbnN0IHNlcmllc0l0ZW1Db3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgc2VyaWVzSXRlbSk7XG4gICAgICAgICAgY29weVsnc2VyaWVzJ10ucHVzaChzZXJpZXNJdGVtQ29weSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bJ2V4dHJhJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb3B5WydleHRyYSddID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpdGVtWydleHRyYSddKSk7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdHMucHVzaChjb3B5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxufVxuIl19