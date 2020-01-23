import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { TooltipService } from '../tooltip/tooltip.service';
var ChartComponent = /** @class */ (function () {
    function ChartComponent() {
        this.showLegend = false;
        this.animations = true;
        this.legendLabelClick = new EventEmitter();
        this.legendLabelActivate = new EventEmitter();
        this.legendLabelDeactivate = new EventEmitter();
    }
    ChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    ChartComponent.prototype.update = function () {
        var legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (!this.legendOptions || this.legendOptions.position === 'right') {
                if (this.legendType === 'scaleLegend') {
                    legendColumns = 1;
                }
                else {
                    legendColumns = 2;
                }
            }
        }
        var chartColumns = 12 - legendColumns;
        this.chartWidth = Math.floor((this.view[0] * chartColumns) / 12.0);
        this.legendWidth =
            !this.legendOptions || this.legendOptions.position === 'right'
                ? Math.floor((this.view[0] * legendColumns) / 12.0)
                : this.chartWidth;
    };
    ChartComponent.prototype.getLegendType = function () {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    };
    __decorate([
        Input()
    ], ChartComponent.prototype, "view", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "showLegend", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "legendOptions", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "legendData", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "legendType", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], ChartComponent.prototype, "legendLabelClick", void 0);
    __decorate([
        Output()
    ], ChartComponent.prototype, "legendLabelActivate", void 0);
    __decorate([
        Output()
    ], ChartComponent.prototype, "legendLabelDeactivate", void 0);
    ChartComponent = __decorate([
        Component({
            providers: [TooltipService],
            selector: 'ngx-charts-chart',
            template: "\n    <div class=\"ngx-charts-outer\" [style.width.px]=\"view[0]\" [@animationState]=\"'active'\" [@.disabled]=\"!animations\">\n      <svg class=\"ngx-charts\" [attr.width]=\"chartWidth\" [attr.height]=\"view[1]\">\n        <ng-content></ng-content>\n      </svg>\n      <ngx-charts-scale-legend\n        *ngIf=\"showLegend && legendType === 'scaleLegend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [valueRange]=\"legendOptions.domain\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n      >\n      </ngx-charts-scale-legend>\n      <ngx-charts-legend\n        *ngIf=\"showLegend && legendType === 'legend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [data]=\"legendOptions.domain\"\n        [title]=\"legendOptions.title\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n        [activeEntries]=\"activeEntries\"\n        (labelClick)=\"legendLabelClick.emit($event)\"\n        (labelActivate)=\"legendLabelActivate.emit($event)\"\n        (labelDeactivate)=\"legendLabelDeactivate.emit($event)\"\n      >\n      </ngx-charts-legend>\n    </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [style({ opacity: 0 }), animate('500ms 100ms', style({ opacity: 1 }))])
                ])
            ]
        })
    ], ChartComponent);
    return ChartComponent;
}());
export { ChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NoYXJ0cy9jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLHVCQUF1QixFQUN2QixZQUFZLEVBQ1osTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUE0QzVEO0lBQUE7UUFFVyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBU25CLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIscUJBQWdCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekQsd0JBQW1CLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUQsMEJBQXFCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QzFFLENBQUM7SUFsQ0Msb0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO2dCQUNsRSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssYUFBYSxFQUFFO29CQUNyQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDTCxhQUFhLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjthQUNGO1NBQ0Y7UUFFRCxJQUFNLFlBQVksR0FBRyxFQUFFLEdBQUcsYUFBYSxDQUFDO1FBRXhDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFdBQVc7WUFDZCxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssT0FBTztnQkFDNUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDeEIsQ0FBQztJQUVELHNDQUFhLEdBQWI7UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUM3QyxPQUFPLGFBQWEsQ0FBQztTQUN0QjthQUFNO1lBQ0wsT0FBTyxRQUFRLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBckRRO1FBQVIsS0FBSyxFQUFFO2dEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7c0RBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO3lEQUFvQjtJQUduQjtRQUFSLEtBQUssRUFBRTtnREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO3NEQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7c0RBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFO2tEQUFhO0lBQ1o7UUFBUixLQUFLLEVBQUU7eURBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO3NEQUE0QjtJQUUxQjtRQUFULE1BQU0sRUFBRTs0REFBMEQ7SUFDekQ7UUFBVCxNQUFNLEVBQUU7K0RBQTZEO0lBQzVEO1FBQVQsTUFBTSxFQUFFO2lFQUErRDtJQWY3RCxjQUFjO1FBMUMxQixTQUFTLENBQUM7WUFDVCxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDM0IsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixRQUFRLEVBQUUsK3lDQStCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFVBQVUsRUFBRTtnQkFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0YsQ0FBQzthQUNIO1NBQ0YsQ0FBQztPQUNXLGNBQWMsQ0F1RDFCO0lBQUQscUJBQUM7Q0FBQSxBQXZERCxJQXVEQztTQXZEWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBUb29sdGlwU2VydmljZSB9IGZyb20gJy4uL3Rvb2x0aXAvdG9vbHRpcC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHByb3ZpZGVyczogW1Rvb2x0aXBTZXJ2aWNlXSxcclxuICBzZWxlY3RvcjogJ25neC1jaGFydHMtY2hhcnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LWNoYXJ0cy1vdXRlclwiIFtzdHlsZS53aWR0aC5weF09XCJ2aWV3WzBdXCIgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiIFtALmRpc2FibGVkXT1cIiFhbmltYXRpb25zXCI+XHJcbiAgICAgIDxzdmcgY2xhc3M9XCJuZ3gtY2hhcnRzXCIgW2F0dHIud2lkdGhdPVwiY2hhcnRXaWR0aFwiIFthdHRyLmhlaWdodF09XCJ2aWV3WzFdXCI+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICA8L3N2Zz5cclxuICAgICAgPG5neC1jaGFydHMtc2NhbGUtbGVnZW5kXHJcbiAgICAgICAgKm5nSWY9XCJzaG93TGVnZW5kICYmIGxlZ2VuZFR5cGUgPT09ICdzY2FsZUxlZ2VuZCdcIlxyXG4gICAgICAgIGNsYXNzPVwiY2hhcnQtbGVnZW5kXCJcclxuICAgICAgICBbaG9yaXpvbnRhbF09XCJsZWdlbmRPcHRpb25zICYmIGxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09ICdiZWxvdydcIlxyXG4gICAgICAgIFt2YWx1ZVJhbmdlXT1cImxlZ2VuZE9wdGlvbnMuZG9tYWluXCJcclxuICAgICAgICBbY29sb3JzXT1cImxlZ2VuZE9wdGlvbnMuY29sb3JzXCJcclxuICAgICAgICBbaGVpZ2h0XT1cInZpZXdbMV1cIlxyXG4gICAgICAgIFt3aWR0aF09XCJsZWdlbmRXaWR0aFwiXHJcbiAgICAgID5cclxuICAgICAgPC9uZ3gtY2hhcnRzLXNjYWxlLWxlZ2VuZD5cclxuICAgICAgPG5neC1jaGFydHMtbGVnZW5kXHJcbiAgICAgICAgKm5nSWY9XCJzaG93TGVnZW5kICYmIGxlZ2VuZFR5cGUgPT09ICdsZWdlbmQnXCJcclxuICAgICAgICBjbGFzcz1cImNoYXJ0LWxlZ2VuZFwiXHJcbiAgICAgICAgW2hvcml6b250YWxdPVwibGVnZW5kT3B0aW9ucyAmJiBsZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSAnYmVsb3cnXCJcclxuICAgICAgICBbZGF0YV09XCJsZWdlbmRPcHRpb25zLmRvbWFpblwiXHJcbiAgICAgICAgW3RpdGxlXT1cImxlZ2VuZE9wdGlvbnMudGl0bGVcIlxyXG4gICAgICAgIFtjb2xvcnNdPVwibGVnZW5kT3B0aW9ucy5jb2xvcnNcIlxyXG4gICAgICAgIFtoZWlnaHRdPVwidmlld1sxXVwiXHJcbiAgICAgICAgW3dpZHRoXT1cImxlZ2VuZFdpZHRoXCJcclxuICAgICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcclxuICAgICAgICAobGFiZWxDbGljayk9XCJsZWdlbmRMYWJlbENsaWNrLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICAgKGxhYmVsQWN0aXZhdGUpPVwibGVnZW5kTGFiZWxBY3RpdmF0ZS5lbWl0KCRldmVudClcIlxyXG4gICAgICAgIChsYWJlbERlYWN0aXZhdGUpPVwibGVnZW5kTGFiZWxEZWFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgID5cclxuICAgICAgPC9uZ3gtY2hhcnRzLWxlZ2VuZD5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJzUwMG1zIDEwMG1zJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKV0pXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSB2aWV3O1xyXG4gIEBJbnB1dCgpIHNob3dMZWdlbmQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBsZWdlbmRPcHRpb25zOiBhbnk7XHJcblxyXG4gIC8vIHJlbW92ZVxyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgbGVnZW5kRGF0YTtcclxuICBASW5wdXQoKSBsZWdlbmRUeXBlOiBhbnk7XHJcbiAgQElucHV0KCkgY29sb3JzOiBhbnk7XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBsZWdlbmRMYWJlbENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgbGVnZW5kTGFiZWxBY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGxlZ2VuZExhYmVsRGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNoYXJ0V2lkdGg6IGFueTtcclxuICB0aXRsZTogYW55O1xyXG4gIGxlZ2VuZFdpZHRoOiBhbnk7XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICBsZXQgbGVnZW5kQ29sdW1ucyA9IDA7XHJcbiAgICBpZiAodGhpcy5zaG93TGVnZW5kKSB7XHJcbiAgICAgIHRoaXMubGVnZW5kVHlwZSA9IHRoaXMuZ2V0TGVnZW5kVHlwZSgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmxlZ2VuZE9wdGlvbnMgfHwgdGhpcy5sZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSAncmlnaHQnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGVnZW5kVHlwZSA9PT0gJ3NjYWxlTGVnZW5kJykge1xyXG4gICAgICAgICAgbGVnZW5kQ29sdW1ucyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxlZ2VuZENvbHVtbnMgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNoYXJ0Q29sdW1ucyA9IDEyIC0gbGVnZW5kQ29sdW1ucztcclxuXHJcbiAgICB0aGlzLmNoYXJ0V2lkdGggPSBNYXRoLmZsb29yKCh0aGlzLnZpZXdbMF0gKiBjaGFydENvbHVtbnMpIC8gMTIuMCk7XHJcbiAgICB0aGlzLmxlZ2VuZFdpZHRoID1cclxuICAgICAgIXRoaXMubGVnZW5kT3B0aW9ucyB8fCB0aGlzLmxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09ICdyaWdodCdcclxuICAgICAgICA/IE1hdGguZmxvb3IoKHRoaXMudmlld1swXSAqIGxlZ2VuZENvbHVtbnMpIC8gMTIuMClcclxuICAgICAgICA6IHRoaXMuY2hhcnRXaWR0aDtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZFR5cGUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmxlZ2VuZE9wdGlvbnMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICByZXR1cm4gJ3NjYWxlTGVnZW5kJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnbGVnZW5kJztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19