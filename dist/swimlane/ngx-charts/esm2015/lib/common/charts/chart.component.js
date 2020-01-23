import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { TooltipService } from '../tooltip/tooltip.service';
let ChartComponent = class ChartComponent {
    constructor() {
        this.showLegend = false;
        this.animations = true;
        this.legendLabelClick = new EventEmitter();
        this.legendLabelActivate = new EventEmitter();
        this.legendLabelDeactivate = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        let legendColumns = 0;
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
        const chartColumns = 12 - legendColumns;
        this.chartWidth = Math.floor((this.view[0] * chartColumns) / 12.0);
        this.legendWidth =
            !this.legendOptions || this.legendOptions.position === 'right'
                ? Math.floor((this.view[0] * legendColumns) / 12.0)
                : this.chartWidth;
    }
    getLegendType() {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
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
        template: `
    <div class="ngx-charts-outer" [style.width.px]="view[0]" [@animationState]="'active'" [@.disabled]="!animations">
      <svg class="ngx-charts" [attr.width]="chartWidth" [attr.height]="view[1]">
        <ng-content></ng-content>
      </svg>
      <ngx-charts-scale-legend
        *ngIf="showLegend && legendType === 'scaleLegend'"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === 'below'"
        [valueRange]="legendOptions.domain"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
      >
      </ngx-charts-scale-legend>
      <ngx-charts-legend
        *ngIf="showLegend && legendType === 'legend'"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === 'below'"
        [data]="legendOptions.domain"
        [title]="legendOptions.title"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
        [activeEntries]="activeEntries"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)"
      >
      </ngx-charts-legend>
    </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':enter', [style({ opacity: 0 }), animate('500ms 100ms', style({ opacity: 1 }))])
            ])
        ]
    })
], ChartComponent);
export { ChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NoYXJ0cy9jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLHVCQUF1QixFQUN2QixZQUFZLEVBQ1osTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUE0QzVELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFBM0I7UUFFVyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBU25CLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIscUJBQWdCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekQsd0JBQW1CLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUQsMEJBQXFCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QzFFLENBQUM7SUFsQ0MsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO2dCQUNsRSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssYUFBYSxFQUFFO29CQUNyQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDTCxhQUFhLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjthQUNGO1NBQ0Y7UUFFRCxNQUFNLFlBQVksR0FBRyxFQUFFLEdBQUcsYUFBYSxDQUFDO1FBRXhDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFdBQVc7WUFDZCxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssT0FBTztnQkFDNUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDeEIsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUM3QyxPQUFPLGFBQWEsQ0FBQztTQUN0QjthQUFNO1lBQ0wsT0FBTyxRQUFRLENBQUM7U0FDakI7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXREVTtJQUFSLEtBQUssRUFBRTs0Q0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFO2tEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTtxREFBb0I7QUFHbkI7SUFBUixLQUFLLEVBQUU7NENBQU07QUFDTDtJQUFSLEtBQUssRUFBRTtrREFBWTtBQUNYO0lBQVIsS0FBSyxFQUFFO2tEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs4Q0FBYTtBQUNaO0lBQVIsS0FBSyxFQUFFO3FEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTtrREFBNEI7QUFFMUI7SUFBVCxNQUFNLEVBQUU7d0RBQTBEO0FBQ3pEO0lBQVQsTUFBTSxFQUFFOzJEQUE2RDtBQUM1RDtJQUFULE1BQU0sRUFBRTs2REFBK0Q7QUFmN0QsY0FBYztJQTFDMUIsU0FBUyxDQUFDO1FBQ1QsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO1FBQzNCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07UUFDL0MsVUFBVSxFQUFFO1lBQ1YsT0FBTyxDQUFDLGdCQUFnQixFQUFFO2dCQUN4QixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0YsQ0FBQztTQUNIO0tBQ0YsQ0FBQztHQUNXLGNBQWMsQ0F1RDFCO1NBdkRZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFRvb2x0aXBTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbHRpcC90b29sdGlwLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgcHJvdmlkZXJzOiBbVG9vbHRpcFNlcnZpY2VdLFxyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1jaGFydCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJuZ3gtY2hhcnRzLW91dGVyXCIgW3N0eWxlLndpZHRoLnB4XT1cInZpZXdbMF1cIiBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCIgW0AuZGlzYWJsZWRdPVwiIWFuaW1hdGlvbnNcIj5cclxuICAgICAgPHN2ZyBjbGFzcz1cIm5neC1jaGFydHNcIiBbYXR0ci53aWR0aF09XCJjaGFydFdpZHRoXCIgW2F0dHIuaGVpZ2h0XT1cInZpZXdbMV1cIj5cclxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgICA8bmd4LWNoYXJ0cy1zY2FsZS1sZWdlbmRcclxuICAgICAgICAqbmdJZj1cInNob3dMZWdlbmQgJiYgbGVnZW5kVHlwZSA9PT0gJ3NjYWxlTGVnZW5kJ1wiXHJcbiAgICAgICAgY2xhc3M9XCJjaGFydC1sZWdlbmRcIlxyXG4gICAgICAgIFtob3Jpem9udGFsXT1cImxlZ2VuZE9wdGlvbnMgJiYgbGVnZW5kT3B0aW9ucy5wb3NpdGlvbiA9PT0gJ2JlbG93J1wiXHJcbiAgICAgICAgW3ZhbHVlUmFuZ2VdPVwibGVnZW5kT3B0aW9ucy5kb21haW5cIlxyXG4gICAgICAgIFtjb2xvcnNdPVwibGVnZW5kT3B0aW9ucy5jb2xvcnNcIlxyXG4gICAgICAgIFtoZWlnaHRdPVwidmlld1sxXVwiXHJcbiAgICAgICAgW3dpZHRoXT1cImxlZ2VuZFdpZHRoXCJcclxuICAgICAgPlxyXG4gICAgICA8L25neC1jaGFydHMtc2NhbGUtbGVnZW5kPlxyXG4gICAgICA8bmd4LWNoYXJ0cy1sZWdlbmRcclxuICAgICAgICAqbmdJZj1cInNob3dMZWdlbmQgJiYgbGVnZW5kVHlwZSA9PT0gJ2xlZ2VuZCdcIlxyXG4gICAgICAgIGNsYXNzPVwiY2hhcnQtbGVnZW5kXCJcclxuICAgICAgICBbaG9yaXpvbnRhbF09XCJsZWdlbmRPcHRpb25zICYmIGxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09ICdiZWxvdydcIlxyXG4gICAgICAgIFtkYXRhXT1cImxlZ2VuZE9wdGlvbnMuZG9tYWluXCJcclxuICAgICAgICBbdGl0bGVdPVwibGVnZW5kT3B0aW9ucy50aXRsZVwiXHJcbiAgICAgICAgW2NvbG9yc109XCJsZWdlbmRPcHRpb25zLmNvbG9yc1wiXHJcbiAgICAgICAgW2hlaWdodF09XCJ2aWV3WzFdXCJcclxuICAgICAgICBbd2lkdGhdPVwibGVnZW5kV2lkdGhcIlxyXG4gICAgICAgIFthY3RpdmVFbnRyaWVzXT1cImFjdGl2ZUVudHJpZXNcIlxyXG4gICAgICAgIChsYWJlbENsaWNrKT1cImxlZ2VuZExhYmVsQ2xpY2suZW1pdCgkZXZlbnQpXCJcclxuICAgICAgICAobGFiZWxBY3RpdmF0ZSk9XCJsZWdlbmRMYWJlbEFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICAgKGxhYmVsRGVhY3RpdmF0ZSk9XCJsZWdlbmRMYWJlbERlYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgPlxyXG4gICAgICA8L25neC1jaGFydHMtbGVnZW5kPlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcclxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW3N0eWxlKHsgb3BhY2l0eTogMCB9KSwgYW5pbWF0ZSgnNTAwbXMgMTAwbXMnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXSlcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIHZpZXc7XHJcbiAgQElucHV0KCkgc2hvd0xlZ2VuZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGxlZ2VuZE9wdGlvbnM6IGFueTtcclxuXHJcbiAgLy8gcmVtb3ZlXHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSBsZWdlbmREYXRhO1xyXG4gIEBJbnB1dCgpIGxlZ2VuZFR5cGU6IGFueTtcclxuICBASW5wdXQoKSBjb2xvcnM6IGFueTtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIGxlZ2VuZExhYmVsQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBsZWdlbmRMYWJlbEFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgbGVnZW5kTGFiZWxEZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY2hhcnRXaWR0aDogYW55O1xyXG4gIHRpdGxlOiBhbnk7XHJcbiAgbGVnZW5kV2lkdGg6IGFueTtcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIGxldCBsZWdlbmRDb2x1bW5zID0gMDtcclxuICAgIGlmICh0aGlzLnNob3dMZWdlbmQpIHtcclxuICAgICAgdGhpcy5sZWdlbmRUeXBlID0gdGhpcy5nZXRMZWdlbmRUeXBlKCk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMubGVnZW5kT3B0aW9ucyB8fCB0aGlzLmxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09ICdyaWdodCcpIHtcclxuICAgICAgICBpZiAodGhpcy5sZWdlbmRUeXBlID09PSAnc2NhbGVMZWdlbmQnKSB7XHJcbiAgICAgICAgICBsZWdlbmRDb2x1bW5zID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGVnZW5kQ29sdW1ucyA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2hhcnRDb2x1bW5zID0gMTIgLSBsZWdlbmRDb2x1bW5zO1xyXG5cclxuICAgIHRoaXMuY2hhcnRXaWR0aCA9IE1hdGguZmxvb3IoKHRoaXMudmlld1swXSAqIGNoYXJ0Q29sdW1ucykgLyAxMi4wKTtcclxuICAgIHRoaXMubGVnZW5kV2lkdGggPVxyXG4gICAgICAhdGhpcy5sZWdlbmRPcHRpb25zIHx8IHRoaXMubGVnZW5kT3B0aW9ucy5wb3NpdGlvbiA9PT0gJ3JpZ2h0J1xyXG4gICAgICAgID8gTWF0aC5mbG9vcigodGhpcy52aWV3WzBdICogbGVnZW5kQ29sdW1ucykgLyAxMi4wKVxyXG4gICAgICAgIDogdGhpcy5jaGFydFdpZHRoO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kVHlwZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMubGVnZW5kT3B0aW9ucy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIHJldHVybiAnc2NhbGVMZWdlbmQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdsZWdlbmQnO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=