import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
var YAxisComponent = /** @class */ (function () {
    function YAxisComponent() {
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
    YAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisComponent.prototype.update = function () {
        this.offset = -(this.yAxisOffset + this.padding);
        if (this.yOrient === 'right') {
            this.labelOffset = 65;
            this.transform = "translate(" + (this.offset + this.dims.width) + " , 0)";
        }
        else {
            this.offset = this.offset;
            this.transform = "translate(" + this.offset + " , 0)";
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
    };
    YAxisComponent.prototype.emitTicksWidth = function (_a) {
        var _this = this;
        var width = _a.width;
        if (width !== this.labelOffset && this.yOrient === 'right') {
            this.labelOffset = width + this.labelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
        else if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
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
            template: "\n    <svg:g [attr.class]=\"yAxisClassName\" [attr.transform]=\"transform\">\n      <svg:g\n        ngx-charts-y-axis-ticks\n        *ngIf=\"yScale\"\n        [trimTicks]=\"trimTicks\"\n        [maxTickLength]=\"maxTickLength\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickValues]=\"ticks\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [referenceLines]=\"referenceLines\"\n        [showRefLines]=\"showRefLines\"\n        [showRefLabels]=\"showRefLabels\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g\n        ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], YAxisComponent);
    return YAxisComponent;
}());
export { YAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3ktYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUVULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQXVDL0Q7SUFBQTtRQU9XLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBS3RCLFlBQU8sR0FBVyxNQUFNLENBQUM7UUFJekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxtQkFBYyxHQUFXLFFBQVEsQ0FBQztRQUlsQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBQ3RCLFdBQU0sR0FBVyxNQUFNLENBQUM7UUFDeEIsZUFBVSxHQUFXLE1BQU0sQ0FBQztRQUM1QixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBb0N0QixDQUFDO0lBaENDLG9DQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWEsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBTyxDQUFDO1NBQ3BFO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFhLElBQUksQ0FBQyxNQUFNLFVBQU8sQ0FBQztTQUNsRDtRQUVELElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUU7WUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCx1Q0FBYyxHQUFkLFVBQWUsRUFBUztRQUF4QixpQkFZQztZQVpnQixnQkFBSztRQUNwQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDNUMsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLENBQUM7WUFDekMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1A7YUFBTSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLFVBQVUsQ0FBQztnQkFDVCxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNQO0lBQ0gsQ0FBQztJQTlEUTtRQUFSLEtBQUssRUFBRTtrREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFO2dEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7cURBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO3lEQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTswREFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTtpREFBYztJQUNiO1FBQVIsS0FBSyxFQUFFO3lEQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTtxREFBVztJQUNWO1FBQVIsS0FBSyxFQUFFO3FEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7NkRBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzBEQUFxQjtJQUNwQjtRQUFSLEtBQUssRUFBRTttREFBMEI7SUFDekI7UUFBUixLQUFLLEVBQUU7MERBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7d0RBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTt5REFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFO3VEQUF5QjtJQUN2QjtRQUFULE1BQU0sRUFBRTs2REFBd0M7SUFhakI7UUFBL0IsU0FBUyxDQUFDLG1CQUFtQixDQUFDOzBEQUFxQztJQTlCekQsY0FBYztRQXJDMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxRQUFRLEVBQUUsb2dDQWdDVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxjQUFjLENBZ0UxQjtJQUFELHFCQUFDO0NBQUEsQUFoRUQsSUFnRUM7U0FoRVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFZpZXdDaGlsZCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFlBeGlzVGlja3NDb21wb25lbnQgfSBmcm9tICcuL3ktYXhpcy10aWNrcy5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMteS1heGlzXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZyBbYXR0ci5jbGFzc109XCJ5QXhpc0NsYXNzTmFtZVwiIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIj5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy15LWF4aXMtdGlja3NcclxuICAgICAgICAqbmdJZj1cInlTY2FsZVwiXHJcbiAgICAgICAgW3RyaW1UaWNrc109XCJ0cmltVGlja3NcIlxyXG4gICAgICAgIFttYXhUaWNrTGVuZ3RoXT1cIm1heFRpY2tMZW5ndGhcIlxyXG4gICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ0aWNrRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgW3RpY2tBcmd1bWVudHNdPVwidGlja0FyZ3VtZW50c1wiXHJcbiAgICAgICAgW3RpY2tWYWx1ZXNdPVwidGlja3NcIlxyXG4gICAgICAgIFt0aWNrU3Ryb2tlXT1cInRpY2tTdHJva2VcIlxyXG4gICAgICAgIFtzY2FsZV09XCJ5U2NhbGVcIlxyXG4gICAgICAgIFtvcmllbnRdPVwieU9yaWVudFwiXHJcbiAgICAgICAgW3Nob3dHcmlkTGluZXNdPVwic2hvd0dyaWRMaW5lc1wiXHJcbiAgICAgICAgW2dyaWRMaW5lV2lkdGhdPVwiZGltcy53aWR0aFwiXHJcbiAgICAgICAgW3JlZmVyZW5jZUxpbmVzXT1cInJlZmVyZW5jZUxpbmVzXCJcclxuICAgICAgICBbc2hvd1JlZkxpbmVzXT1cInNob3dSZWZMaW5lc1wiXHJcbiAgICAgICAgW3Nob3dSZWZMYWJlbHNdPVwic2hvd1JlZkxhYmVsc1wiXHJcbiAgICAgICAgW2hlaWdodF09XCJkaW1zLmhlaWdodFwiXHJcbiAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cImVtaXRUaWNrc1dpZHRoKCRldmVudClcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1heGlzLWxhYmVsXHJcbiAgICAgICAgKm5nSWY9XCJzaG93TGFiZWxcIlxyXG4gICAgICAgIFtsYWJlbF09XCJsYWJlbFRleHRcIlxyXG4gICAgICAgIFtvZmZzZXRdPVwibGFiZWxPZmZzZXRcIlxyXG4gICAgICAgIFtvcmllbnRdPVwieU9yaWVudFwiXHJcbiAgICAgICAgW2hlaWdodF09XCJkaW1zLmhlaWdodFwiXHJcbiAgICAgICAgW3dpZHRoXT1cImRpbXMud2lkdGhcIlxyXG4gICAgICA+PC9zdmc6Zz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgWUF4aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIHlTY2FsZTtcclxuICBASW5wdXQoKSBkaW1zO1xyXG4gIEBJbnB1dCgpIHRyaW1UaWNrczogYm9vbGVhbjtcclxuICBASW5wdXQoKSBtYXhUaWNrTGVuZ3RoOiBudW1iZXI7XHJcbiAgQElucHV0KCkgdGlja0Zvcm1hdHRpbmc7XHJcbiAgQElucHV0KCkgdGlja3M6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHNob3dHcmlkTGluZXMgPSBmYWxzZTtcclxuICBASW5wdXQoKSBzaG93TGFiZWw7XHJcbiAgQElucHV0KCkgbGFiZWxUZXh0O1xyXG4gIEBJbnB1dCgpIHlBeGlzVGlja0ludGVydmFsO1xyXG4gIEBJbnB1dCgpIHlBeGlzVGlja0NvdW50OiBhbnk7XHJcbiAgQElucHV0KCkgeU9yaWVudDogc3RyaW5nID0gJ2xlZnQnO1xyXG4gIEBJbnB1dCgpIHJlZmVyZW5jZUxpbmVzO1xyXG4gIEBJbnB1dCgpIHNob3dSZWZMaW5lcztcclxuICBASW5wdXQoKSBzaG93UmVmTGFiZWxzO1xyXG4gIEBJbnB1dCgpIHlBeGlzT2Zmc2V0OiBudW1iZXIgPSAwO1xyXG4gIEBPdXRwdXQoKSBkaW1lbnNpb25zQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgeUF4aXNDbGFzc05hbWU6IHN0cmluZyA9ICd5IGF4aXMnO1xyXG4gIHRpY2tBcmd1bWVudHM6IGFueTtcclxuICBvZmZzZXQ6IGFueTtcclxuICB0cmFuc2Zvcm06IGFueTtcclxuICBsYWJlbE9mZnNldDogbnVtYmVyID0gMTU7XHJcbiAgZmlsbDogc3RyaW5nID0gJ25vbmUnO1xyXG4gIHN0cm9rZTogc3RyaW5nID0gJyNDQ0MnO1xyXG4gIHRpY2tTdHJva2U6IHN0cmluZyA9ICcjQ0NDJztcclxuICBzdHJva2VXaWR0aDogbnVtYmVyID0gMTtcclxuICBwYWRkaW5nOiBudW1iZXIgPSA1O1xyXG5cclxuICBAVmlld0NoaWxkKFlBeGlzVGlja3NDb21wb25lbnQpIHRpY2tzQ29tcG9uZW50OiBZQXhpc1RpY2tzQ29tcG9uZW50O1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vZmZzZXQgPSAtKHRoaXMueUF4aXNPZmZzZXQgKyB0aGlzLnBhZGRpbmcpO1xyXG4gICAgaWYgKHRoaXMueU9yaWVudCA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gNjU7XHJcbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMub2Zmc2V0ICsgdGhpcy5kaW1zLndpZHRofSAsIDApYDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XHJcbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMub2Zmc2V0fSAsIDApYDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy55QXhpc1RpY2tDb3VudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudGlja0FyZ3VtZW50cyA9IFt0aGlzLnlBeGlzVGlja0NvdW50XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVtaXRUaWNrc1dpZHRoKHsgd2lkdGggfSk6IHZvaWQge1xyXG4gICAgaWYgKHdpZHRoICE9PSB0aGlzLmxhYmVsT2Zmc2V0ICYmIHRoaXMueU9yaWVudCA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gd2lkdGggKyB0aGlzLmxhYmVsT2Zmc2V0O1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoeyB3aWR0aCB9KTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9IGVsc2UgaWYgKHdpZHRoICE9PSB0aGlzLmxhYmVsT2Zmc2V0KSB7XHJcbiAgICAgIHRoaXMubGFiZWxPZmZzZXQgPSB3aWR0aDtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zQ2hhbmdlZC5lbWl0KHsgd2lkdGggfSk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=