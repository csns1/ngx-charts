import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
let YAxisComponent = class YAxisComponent {
    constructor() {
        this.showGridLines = false;
        this.yOrient = 'left';
        this.yAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.yAxisClassName = 'y axis';
        this.labelOffset = 15;
        this.fill = 'none';
        this.stroke = '#CCC';
        this.tickStroke = '#CCC';
        this.strokeWidth = 1;
        this.padding = 5;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.offset = -(this.yAxisOffset + this.padding);
        if (this.yOrient === 'right') {
            this.labelOffset = 65;
            this.transform = `translate(${this.offset + this.dims.width} , 0)`;
        }
        else {
            this.offset = this.offset;
            this.transform = `translate(${this.offset} , 0)`;
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
    }
    emitTicksWidth({ width }) {
        if (width !== this.labelOffset && this.yOrient === 'right') {
            this.labelOffset = width + this.labelOffset;
            setTimeout(() => {
                this.dimensionsChanged.emit({ width });
            }, 0);
        }
        else if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(() => {
                this.dimensionsChanged.emit({ width });
            }, 0);
        }
    }
};
__decorate([
    Input()
], YAxisComponent.prototype, "yScale", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "dims", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "trimTicks", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "maxTickLength", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "tickFormatting", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "ticks", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "showGridLines", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "showLabel", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "labelText", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "yAxisTickInterval", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "yAxisTickCount", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "yOrient", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "referenceLines", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "showRefLines", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "showRefLabels", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "yAxisOffset", void 0);
__decorate([
    Output()
], YAxisComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    ViewChild(YAxisTicksComponent)
], YAxisComponent.prototype, "ticksComponent", void 0);
YAxisComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-y-axis]',
        template: `
    <svg:g [attr.class]="yAxisClassName" [attr.transform]="transform">
      <svg:g
        ngx-charts-y-axis-ticks
        *ngIf="yScale"
        [trimTicks]="trimTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickValues]="ticks"
        [tickStroke]="tickStroke"
        [scale]="yScale"
        [orient]="yOrient"
        [showGridLines]="showGridLines"
        [gridLineWidth]="dims.width"
        [referenceLines]="referenceLines"
        [showRefLines]="showRefLines"
        [showRefLabels]="showRefLabels"
        [height]="dims.height"
        (dimensionsChanged)="emitTicksWidth($event)"
      />

      <svg:g
        ngx-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="yOrient"
        [height]="dims.height"
        [width]="dims.width"
      ></svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], YAxisComponent);
export { YAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3ktYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUVULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQXVDL0QsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUEzQjtRQU9XLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBS3RCLFlBQU8sR0FBVyxNQUFNLENBQUM7UUFJekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxtQkFBYyxHQUFXLFFBQVEsQ0FBQztRQUlsQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBQ3RCLFdBQU0sR0FBVyxNQUFNLENBQUM7UUFDeEIsZUFBVSxHQUFXLE1BQU0sQ0FBQztRQUM1QixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBb0N0QixDQUFDO0lBaENDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxPQUFPLENBQUM7U0FDcEU7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsSUFBSSxDQUFDLE1BQU0sT0FBTyxDQUFDO1NBQ2xEO1FBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtZQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRTtRQUN0QixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDNUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN6QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDUDthQUFNLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN6QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDUDtJQUNILENBQUM7Q0FDRixDQUFBO0FBL0RVO0lBQVIsS0FBSyxFQUFFOzhDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7NENBQU07QUFDTDtJQUFSLEtBQUssRUFBRTtpREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7cURBQXVCO0FBQ3RCO0lBQVIsS0FBSyxFQUFFO3NEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzZDQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7cURBQXVCO0FBQ3RCO0lBQVIsS0FBSyxFQUFFO2lEQUFXO0FBQ1Y7SUFBUixLQUFLLEVBQUU7aURBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTt5REFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7c0RBQXFCO0FBQ3BCO0lBQVIsS0FBSyxFQUFFOytDQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTtzREFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTtvREFBYztBQUNiO0lBQVIsS0FBSyxFQUFFO3FEQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7bURBQXlCO0FBQ3ZCO0lBQVQsTUFBTSxFQUFFO3lEQUF3QztBQWFqQjtJQUEvQixTQUFTLENBQUMsbUJBQW1CLENBQUM7c0RBQXFDO0FBOUJ6RCxjQUFjO0lBckMxQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ1Q7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csY0FBYyxDQWdFMUI7U0FoRVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFZpZXdDaGlsZCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFlBeGlzVGlja3NDb21wb25lbnQgfSBmcm9tICcuL3ktYXhpcy10aWNrcy5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMteS1heGlzXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZyBbYXR0ci5jbGFzc109XCJ5QXhpc0NsYXNzTmFtZVwiIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIj5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy15LWF4aXMtdGlja3NcclxuICAgICAgICAqbmdJZj1cInlTY2FsZVwiXHJcbiAgICAgICAgW3RyaW1UaWNrc109XCJ0cmltVGlja3NcIlxyXG4gICAgICAgIFttYXhUaWNrTGVuZ3RoXT1cIm1heFRpY2tMZW5ndGhcIlxyXG4gICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ0aWNrRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgW3RpY2tBcmd1bWVudHNdPVwidGlja0FyZ3VtZW50c1wiXHJcbiAgICAgICAgW3RpY2tWYWx1ZXNdPVwidGlja3NcIlxyXG4gICAgICAgIFt0aWNrU3Ryb2tlXT1cInRpY2tTdHJva2VcIlxyXG4gICAgICAgIFtzY2FsZV09XCJ5U2NhbGVcIlxyXG4gICAgICAgIFtvcmllbnRdPVwieU9yaWVudFwiXHJcbiAgICAgICAgW3Nob3dHcmlkTGluZXNdPVwic2hvd0dyaWRMaW5lc1wiXHJcbiAgICAgICAgW2dyaWRMaW5lV2lkdGhdPVwiZGltcy53aWR0aFwiXHJcbiAgICAgICAgW3JlZmVyZW5jZUxpbmVzXT1cInJlZmVyZW5jZUxpbmVzXCJcclxuICAgICAgICBbc2hvd1JlZkxpbmVzXT1cInNob3dSZWZMaW5lc1wiXHJcbiAgICAgICAgW3Nob3dSZWZMYWJlbHNdPVwic2hvd1JlZkxhYmVsc1wiXHJcbiAgICAgICAgW2hlaWdodF09XCJkaW1zLmhlaWdodFwiXHJcbiAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cImVtaXRUaWNrc1dpZHRoKCRldmVudClcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1heGlzLWxhYmVsXHJcbiAgICAgICAgKm5nSWY9XCJzaG93TGFiZWxcIlxyXG4gICAgICAgIFtsYWJlbF09XCJsYWJlbFRleHRcIlxyXG4gICAgICAgIFtvZmZzZXRdPVwibGFiZWxPZmZzZXRcIlxyXG4gICAgICAgIFtvcmllbnRdPVwieU9yaWVudFwiXHJcbiAgICAgICAgW2hlaWdodF09XCJkaW1zLmhlaWdodFwiXHJcbiAgICAgICAgW3dpZHRoXT1cImRpbXMud2lkdGhcIlxyXG4gICAgICA+PC9zdmc6Zz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgWUF4aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIHlTY2FsZTtcclxuICBASW5wdXQoKSBkaW1zO1xyXG4gIEBJbnB1dCgpIHRyaW1UaWNrczogYm9vbGVhbjtcclxuICBASW5wdXQoKSBtYXhUaWNrTGVuZ3RoOiBudW1iZXI7XHJcbiAgQElucHV0KCkgdGlja0Zvcm1hdHRpbmc7XHJcbiAgQElucHV0KCkgdGlja3M6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHNob3dHcmlkTGluZXMgPSBmYWxzZTtcclxuICBASW5wdXQoKSBzaG93TGFiZWw7XHJcbiAgQElucHV0KCkgbGFiZWxUZXh0O1xyXG4gIEBJbnB1dCgpIHlBeGlzVGlja0ludGVydmFsO1xyXG4gIEBJbnB1dCgpIHlBeGlzVGlja0NvdW50OiBhbnk7XHJcbiAgQElucHV0KCkgeU9yaWVudDogc3RyaW5nID0gJ2xlZnQnO1xyXG4gIEBJbnB1dCgpIHJlZmVyZW5jZUxpbmVzO1xyXG4gIEBJbnB1dCgpIHNob3dSZWZMaW5lcztcclxuICBASW5wdXQoKSBzaG93UmVmTGFiZWxzO1xyXG4gIEBJbnB1dCgpIHlBeGlzT2Zmc2V0OiBudW1iZXIgPSAwO1xyXG4gIEBPdXRwdXQoKSBkaW1lbnNpb25zQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgeUF4aXNDbGFzc05hbWU6IHN0cmluZyA9ICd5IGF4aXMnO1xyXG4gIHRpY2tBcmd1bWVudHM6IGFueTtcclxuICBvZmZzZXQ6IGFueTtcclxuICB0cmFuc2Zvcm06IGFueTtcclxuICBsYWJlbE9mZnNldDogbnVtYmVyID0gMTU7XHJcbiAgZmlsbDogc3RyaW5nID0gJ25vbmUnO1xyXG4gIHN0cm9rZTogc3RyaW5nID0gJyNDQ0MnO1xyXG4gIHRpY2tTdHJva2U6IHN0cmluZyA9ICcjQ0NDJztcclxuICBzdHJva2VXaWR0aDogbnVtYmVyID0gMTtcclxuICBwYWRkaW5nOiBudW1iZXIgPSA1O1xyXG5cclxuICBAVmlld0NoaWxkKFlBeGlzVGlja3NDb21wb25lbnQpIHRpY2tzQ29tcG9uZW50OiBZQXhpc1RpY2tzQ29tcG9uZW50O1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vZmZzZXQgPSAtKHRoaXMueUF4aXNPZmZzZXQgKyB0aGlzLnBhZGRpbmcpO1xyXG4gICAgaWYgKHRoaXMueU9yaWVudCA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gNjU7XHJcbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMub2Zmc2V0ICsgdGhpcy5kaW1zLndpZHRofSAsIDApYDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XHJcbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMub2Zmc2V0fSAsIDApYDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy55QXhpc1RpY2tDb3VudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudGlja0FyZ3VtZW50cyA9IFt0aGlzLnlBeGlzVGlja0NvdW50XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVtaXRUaWNrc1dpZHRoKHsgd2lkdGggfSk6IHZvaWQge1xyXG4gICAgaWYgKHdpZHRoICE9PSB0aGlzLmxhYmVsT2Zmc2V0ICYmIHRoaXMueU9yaWVudCA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gd2lkdGggKyB0aGlzLmxhYmVsT2Zmc2V0O1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoeyB3aWR0aCB9KTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9IGVsc2UgaWYgKHdpZHRoICE9PSB0aGlzLmxhYmVsT2Zmc2V0KSB7XHJcbiAgICAgIHRoaXMubGFiZWxPZmZzZXQgPSB3aWR0aDtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zQ2hhbmdlZC5lbWl0KHsgd2lkdGggfSk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=