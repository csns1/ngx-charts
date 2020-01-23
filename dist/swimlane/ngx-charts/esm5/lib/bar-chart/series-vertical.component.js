import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
export var D0Types;
(function (D0Types) {
    D0Types["positive"] = "positive";
    D0Types["negative"] = "negative";
})(D0Types || (D0Types = {}));
var SeriesVerticalComponent = /** @class */ (function () {
    function SeriesVerticalComponent() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelHeightChanged = new EventEmitter();
        this.barsForDataLabels = [];
    }
    SeriesVerticalComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesVerticalComponent.prototype.update = function () {
        var _a;
        var _this = this;
        this.updateTooltipSettings();
        var width;
        if (this.series.length) {
            width = this.xScale.bandwidth();
        }
        width = Math.round(width);
        var yScaleMin = Math.max(this.yScale.domain()[0], 0);
        var d0 = (_a = {},
            _a[D0Types.positive] = 0,
            _a[D0Types.negative] = 0,
            _a);
        var d0Type = D0Types.positive;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = _this.getLabel(d);
            var formattedLabel = formatLabel(label);
            var roundEdges = _this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            var bar = {
                value: value,
                label: label,
                roundEdges: roundEdges,
                data: d,
                width: width,
                formattedLabel: formattedLabel,
                height: 0,
                x: 0,
                y: 0
            };
            if (_this.type === 'standard') {
                bar.height = Math.abs(_this.yScale(value) - _this.yScale(yScaleMin));
                bar.x = _this.xScale(label);
                if (value < 0) {
                    bar.y = _this.yScale(0);
                }
                else {
                    bar.y = _this.yScale(value);
                }
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0[d0Type];
                var offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (_this.type === 'normalized') {
                var offset0 = d0[d0Type];
                var offset1 = offset0 + value;
                d0[d0Type] += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (_this.colors.scaleType === 'ordinal') {
                bar.color = _this.colors.getColor(label);
            }
            else {
                if (_this.type === 'standard') {
                    bar.color = _this.colors.getColor(value);
                    bar.gradientStops = _this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = _this.colors.getColor(bar.offset1);
                    bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            var tooltipLabel = formattedLabel;
            bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
            if (_this.seriesName) {
                tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                bar.data.series = _this.seriesName;
                bar.ariaLabel = _this.seriesName + ' ' + bar.ariaLabel;
            }
            bar.tooltipText = _this.tooltipDisabled
                ? undefined
                : "\n        <span class=\"tooltip-label\">" + escapeLabel(tooltipLabel) + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
            return bar;
        });
        this.updateDataLabels();
    };
    SeriesVerticalComponent.prototype.updateDataLabels = function () {
        var _this = this;
        if (this.type === 'stacked') {
            this.barsForDataLabels = [];
            var section = {};
            section.series = this.seriesName;
            var totalPositive = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d > 0 ? sum + d : sum); }, 0);
            var totalNegative = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d < 0 ? sum + d : sum); }, 0);
            section.total = totalPositive + totalNegative;
            section.x = 0;
            section.y = 0;
            if (section.total > 0) {
                section.height = this.yScale(totalPositive);
            }
            else {
                section.height = this.yScale(totalNegative);
            }
            section.width = this.xScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(function (d) {
                var section = {};
                section.series = _this.seriesName ? _this.seriesName : d.label;
                section.total = d.value;
                section.x = _this.xScale(d.label);
                section.y = _this.yScale(0);
                section.height = _this.yScale(section.total) - _this.yScale(0);
                section.width = _this.xScale.bandwidth();
                return section;
            });
        }
    };
    SeriesVerticalComponent.prototype.updateTooltipSettings = function () {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    };
    SeriesVerticalComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    SeriesVerticalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    SeriesVerticalComponent.prototype.getLabel = function (dataItem) {
        if (dataItem.label) {
            return dataItem.label;
        }
        return dataItem.name;
    };
    SeriesVerticalComponent.prototype.trackBy = function (index, bar) {
        return bar.label;
    };
    SeriesVerticalComponent.prototype.trackDataLabelBy = function (index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    };
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "dims", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "type", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "series", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "xScale", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "yScale", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "seriesName", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "roundEdges", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "animations", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "showDataLabel", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output()
    ], SeriesVerticalComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], SeriesVerticalComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], SeriesVerticalComponent.prototype, "deactivate", void 0);
    __decorate([
        Output()
    ], SeriesVerticalComponent.prototype, "dataLabelHeightChanged", void 0);
    SeriesVerticalComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-series-vertical]',
            template: "\n    <svg:g\n      ngx-charts-bar\n      *ngFor=\"let bar of bars; trackBy: trackBy\"\n      [@animationState]=\"'active'\"\n      [@.disabled]=\"!animations\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'vertical'\"\n      [roundEdges]=\"bar.roundEdges\"\n      [gradient]=\"gradient\"\n      [ariaLabel]=\"bar.ariaLabel\"\n      [isActive]=\"isActive(bar.data)\"\n      (select)=\"onClick($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\"\n      [noBarWhenZero]=\"noBarWhenZero\"\n      [animations]=\"animations\"\n    ></svg:g>\n    <svg:g *ngIf=\"showDataLabel\">\n      <svg:g\n        ngx-charts-bar-label\n        *ngFor=\"let b of barsForDataLabels; let i = index; trackBy: trackDataLabelBy\"\n        [barX]=\"b.x\"\n        [barY]=\"b.y\"\n        [barWidth]=\"b.width\"\n        [barHeight]=\"b.height\"\n        [value]=\"b.total\"\n        [valueFormatting]=\"dataLabelFormatting\"\n        [orientation]=\"'vertical'\"\n        (dimensionsChanged)=\"dataLabelHeightChanged.emit({ size: $event, index: i })\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({ opacity: 0 }))
                    ])
                ])
            ]
        })
    ], SeriesVerticalComponent);
    return SeriesVerticalComponent;
}());
export { SeriesVerticalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzLXZlcnRpY2FsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9zZXJpZXMtdmVydGljYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFhLHVCQUF1QixFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2xFLE1BQU0sQ0FBTixJQUFZLE9BR1g7QUFIRCxXQUFZLE9BQU87SUFDakIsZ0NBQXFCLENBQUE7SUFDckIsZ0NBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUhXLE9BQU8sS0FBUCxPQUFPLFFBR2xCO0FBOEREO0lBQUE7UUFFVyxTQUFJLEdBQUcsVUFBVSxDQUFDO1FBUWxCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR2pDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFN0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsMkJBQXNCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVF0RCxzQkFBaUIsR0FBa0csRUFBRSxDQUFDO0lBb0x4SCxDQUFDO0lBbExDLDZDQUFXLEdBQVgsVUFBWSxPQUFPO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQs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WUFDekMsUUFBUSxFQUFFLDRpREE2Q1Q7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxVQUFVLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLGdCQUFnQixFQUFFO29CQUN4QixVQUFVLENBQUMsUUFBUSxFQUFFO3dCQUNuQixLQUFLLENBQUM7NEJBQ0osT0FBTyxFQUFFLENBQUM7eUJBQ1gsQ0FBQzt3QkFDRixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNwQyxDQUFDO2lCQUNILENBQUM7YUFDSDtTQUNGLENBQUM7T0FDVyx1QkFBdUIsQ0FpTm5DO0lBQUQsOEJBQUM7Q0FBQSxBQWpORCxJQWlOQztTQWpOWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgZm9ybWF0TGFiZWwsIGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IERhdGFJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xyXG5cclxuZXhwb3J0IGVudW0gRDBUeXBlcyB7XHJcbiAgcG9zaXRpdmUgPSAncG9zaXRpdmUnLFxyXG4gIG5lZ2F0aXZlID0gJ25lZ2F0aXZlJ1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1zZXJpZXMtdmVydGljYWxdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnXHJcbiAgICAgIG5neC1jaGFydHMtYmFyXHJcbiAgICAgICpuZ0Zvcj1cImxldCBiYXIgb2YgYmFyczsgdHJhY2tCeTogdHJhY2tCeVwiXHJcbiAgICAgIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIlxyXG4gICAgICBbQC5kaXNhYmxlZF09XCIhYW5pbWF0aW9uc1wiXHJcbiAgICAgIFt3aWR0aF09XCJiYXIud2lkdGhcIlxyXG4gICAgICBbaGVpZ2h0XT1cImJhci5oZWlnaHRcIlxyXG4gICAgICBbeF09XCJiYXIueFwiXHJcbiAgICAgIFt5XT1cImJhci55XCJcclxuICAgICAgW2ZpbGxdPVwiYmFyLmNvbG9yXCJcclxuICAgICAgW3N0b3BzXT1cImJhci5ncmFkaWVudFN0b3BzXCJcclxuICAgICAgW2RhdGFdPVwiYmFyLmRhdGFcIlxyXG4gICAgICBbb3JpZW50YXRpb25dPVwiJ3ZlcnRpY2FsJ1wiXHJcbiAgICAgIFtyb3VuZEVkZ2VzXT1cImJhci5yb3VuZEVkZ2VzXCJcclxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcclxuICAgICAgW2FyaWFMYWJlbF09XCJiYXIuYXJpYUxhYmVsXCJcclxuICAgICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlKGJhci5kYXRhKVwiXHJcbiAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgbmd4LXRvb2x0aXBcclxuICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcclxuICAgICAgW3Rvb2x0aXBUeXBlXT1cInRvb2x0aXBUeXBlXCJcclxuICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiBiYXIudG9vbHRpcFRleHRcIlxyXG4gICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgIFt0b29sdGlwQ29udGV4dF09XCJiYXIuZGF0YVwiXHJcbiAgICAgIFtub0JhcldoZW5aZXJvXT1cIm5vQmFyV2hlblplcm9cIlxyXG4gICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgID48L3N2ZzpnPlxyXG4gICAgPHN2ZzpnICpuZ0lmPVwic2hvd0RhdGFMYWJlbFwiPlxyXG4gICAgICA8c3ZnOmdcclxuICAgICAgICBuZ3gtY2hhcnRzLWJhci1sYWJlbFxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBiIG9mIGJhcnNGb3JEYXRhTGFiZWxzOyBsZXQgaSA9IGluZGV4OyB0cmFja0J5OiB0cmFja0RhdGFMYWJlbEJ5XCJcclxuICAgICAgICBbYmFyWF09XCJiLnhcIlxyXG4gICAgICAgIFtiYXJZXT1cImIueVwiXHJcbiAgICAgICAgW2JhcldpZHRoXT1cImIud2lkdGhcIlxyXG4gICAgICAgIFtiYXJIZWlnaHRdPVwiYi5oZWlnaHRcIlxyXG4gICAgICAgIFt2YWx1ZV09XCJiLnRvdGFsXCJcclxuICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cImRhdGFMYWJlbEZvcm1hdHRpbmdcIlxyXG4gICAgICAgIFtvcmllbnRhdGlvbl09XCIndmVydGljYWwnXCJcclxuICAgICAgICAoZGltZW5zaW9uc0NoYW5nZWQpPVwiZGF0YUxhYmVsSGVpZ2h0Q2hhbmdlZC5lbWl0KHsgc2l6ZTogJGV2ZW50LCBpbmRleDogaSB9KVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXHJcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYW5pbWF0ZSg1MDAsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VyaWVzVmVydGljYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGRpbXM7XHJcbiAgQElucHV0KCkgdHlwZSA9ICdzdGFuZGFyZCc7XHJcbiAgQElucHV0KCkgc2VyaWVzO1xyXG4gIEBJbnB1dCgpIHhTY2FsZTtcclxuICBASW5wdXQoKSB5U2NhbGU7XHJcbiAgQElucHV0KCkgY29sb3JzO1xyXG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHNlcmllc05hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQElucHV0KCkgcm91bmRFZGdlczogYm9vbGVhbjtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzaG93RGF0YUxhYmVsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGF0YUxhYmVsRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIG5vQmFyV2hlblplcm86IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGF0YUxhYmVsSGVpZ2h0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgdG9vbHRpcFBsYWNlbWVudDogc3RyaW5nO1xyXG4gIHRvb2x0aXBUeXBlOiBzdHJpbmc7XHJcblxyXG4gIGJhcnM6IGFueTtcclxuICB4OiBhbnk7XHJcbiAgeTogYW55O1xyXG4gIGJhcnNGb3JEYXRhTGFiZWxzOiBBcnJheTx7IHg6IG51bWJlcjsgeTogbnVtYmVyOyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlcjsgdG90YWw6IG51bWJlcjsgc2VyaWVzOiBzdHJpbmcgfT4gPSBbXTtcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlVG9vbHRpcFNldHRpbmdzKCk7XHJcbiAgICBsZXQgd2lkdGg7XHJcbiAgICBpZiAodGhpcy5zZXJpZXMubGVuZ3RoKSB7XHJcbiAgICAgIHdpZHRoID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICB9XHJcbiAgICB3aWR0aCA9IE1hdGgucm91bmQod2lkdGgpO1xyXG4gICAgY29uc3QgeVNjYWxlTWluID0gTWF0aC5tYXgodGhpcy55U2NhbGUuZG9tYWluKClbMF0sIDApO1xyXG5cclxuICAgIGNvbnN0IGQwID0ge1xyXG4gICAgICBbRDBUeXBlcy5wb3NpdGl2ZV06IDAsXHJcbiAgICAgIFtEMFR5cGVzLm5lZ2F0aXZlXTogMFxyXG4gICAgfTtcclxuICAgIGxldCBkMFR5cGUgPSBEMFR5cGVzLnBvc2l0aXZlO1xyXG5cclxuICAgIGxldCB0b3RhbDtcclxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdub3JtYWxpemVkJykge1xyXG4gICAgICB0b3RhbCA9IHRoaXMuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiBzdW0gKyBkLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJhcnMgPSB0aGlzLnNlcmllcy5tYXAoKGQsIGluZGV4KSA9PiB7XHJcbiAgICAgIGxldCB2YWx1ZSA9IGQudmFsdWU7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5nZXRMYWJlbChkKTtcclxuICAgICAgY29uc3QgZm9ybWF0dGVkTGFiZWwgPSBmb3JtYXRMYWJlbChsYWJlbCk7XHJcbiAgICAgIGNvbnN0IHJvdW5kRWRnZXMgPSB0aGlzLnJvdW5kRWRnZXM7XHJcbiAgICAgIGQwVHlwZSA9IHZhbHVlID4gMCA/IEQwVHlwZXMucG9zaXRpdmUgOiBEMFR5cGVzLm5lZ2F0aXZlO1xyXG5cclxuICAgICAgY29uc3QgYmFyOiBhbnkgPSB7XHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgcm91bmRFZGdlcyxcclxuICAgICAgICBkYXRhOiBkLFxyXG4gICAgICAgIHdpZHRoLFxyXG4gICAgICAgIGZvcm1hdHRlZExhYmVsLFxyXG4gICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICB4OiAwLFxyXG4gICAgICAgIHk6IDBcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFuZGFyZCcpIHtcclxuICAgICAgICBiYXIuaGVpZ2h0ID0gTWF0aC5hYnModGhpcy55U2NhbGUodmFsdWUpIC0gdGhpcy55U2NhbGUoeVNjYWxlTWluKSk7XHJcbiAgICAgICAgYmFyLnggPSB0aGlzLnhTY2FsZShsYWJlbCk7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA8IDApIHtcclxuICAgICAgICAgIGJhci55ID0gdGhpcy55U2NhbGUoMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGJhci55ID0gdGhpcy55U2NhbGUodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdzdGFja2VkJykge1xyXG4gICAgICAgIGNvbnN0IG9mZnNldDAgPSBkMFtkMFR5cGVdO1xyXG4gICAgICAgIGNvbnN0IG9mZnNldDEgPSBvZmZzZXQwICsgdmFsdWU7XHJcbiAgICAgICAgZDBbZDBUeXBlXSArPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgYmFyLmhlaWdodCA9IHRoaXMueVNjYWxlKG9mZnNldDApIC0gdGhpcy55U2NhbGUob2Zmc2V0MSk7XHJcbiAgICAgICAgYmFyLnggPSAwO1xyXG4gICAgICAgIGJhci55ID0gdGhpcy55U2NhbGUob2Zmc2V0MSk7XHJcbiAgICAgICAgYmFyLm9mZnNldDAgPSBvZmZzZXQwO1xyXG4gICAgICAgIGJhci5vZmZzZXQxID0gb2Zmc2V0MTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdub3JtYWxpemVkJykge1xyXG4gICAgICAgIGxldCBvZmZzZXQwID0gZDBbZDBUeXBlXTtcclxuICAgICAgICBsZXQgb2Zmc2V0MSA9IG9mZnNldDAgKyB2YWx1ZTtcclxuICAgICAgICBkMFtkMFR5cGVdICs9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodG90YWwgPiAwKSB7XHJcbiAgICAgICAgICBvZmZzZXQwID0gKG9mZnNldDAgKiAxMDApIC8gdG90YWw7XHJcbiAgICAgICAgICBvZmZzZXQxID0gKG9mZnNldDEgKiAxMDApIC8gdG90YWw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9mZnNldDAgPSAwO1xyXG4gICAgICAgICAgb2Zmc2V0MSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiYXIuaGVpZ2h0ID0gdGhpcy55U2NhbGUob2Zmc2V0MCkgLSB0aGlzLnlTY2FsZShvZmZzZXQxKTtcclxuICAgICAgICBiYXIueCA9IDA7XHJcbiAgICAgICAgYmFyLnkgPSB0aGlzLnlTY2FsZShvZmZzZXQxKTtcclxuICAgICAgICBiYXIub2Zmc2V0MCA9IG9mZnNldDA7XHJcbiAgICAgICAgYmFyLm9mZnNldDEgPSBvZmZzZXQxO1xyXG4gICAgICAgIHZhbHVlID0gKG9mZnNldDEgLSBvZmZzZXQwKS50b0ZpeGVkKDIpICsgJyUnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSAnb3JkaW5hbCcpIHtcclxuICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihsYWJlbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3N0YW5kYXJkJykge1xyXG4gICAgICAgICAgYmFyLmNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IodmFsdWUpO1xyXG4gICAgICAgICAgYmFyLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYmFyLmNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IoYmFyLm9mZnNldDEpO1xyXG4gICAgICAgICAgYmFyLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKGJhci5vZmZzZXQxLCBiYXIub2Zmc2V0MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgdG9vbHRpcExhYmVsID0gZm9ybWF0dGVkTGFiZWw7XHJcbiAgICAgIGJhci5hcmlhTGFiZWwgPSBmb3JtYXR0ZWRMYWJlbCArICcgJyArIHZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgIGlmICh0aGlzLnNlcmllc05hbWUpIHtcclxuICAgICAgICB0b29sdGlwTGFiZWwgPSBgJHt0aGlzLnNlcmllc05hbWV9IOKAoiAke2Zvcm1hdHRlZExhYmVsfWA7XHJcbiAgICAgICAgYmFyLmRhdGEuc2VyaWVzID0gdGhpcy5zZXJpZXNOYW1lO1xyXG4gICAgICAgIGJhci5hcmlhTGFiZWwgPSB0aGlzLnNlcmllc05hbWUgKyAnICcgKyBiYXIuYXJpYUxhYmVsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBiYXIudG9vbHRpcFRleHQgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZFxyXG4gICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgOiBgXHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtlc2NhcGVMYWJlbCh0b29sdGlwTGFiZWwpfTwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHt2YWx1ZS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cclxuICAgICAgYDtcclxuXHJcbiAgICAgIHJldHVybiBiYXI7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZURhdGFMYWJlbHMoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZURhdGFMYWJlbHMoKSB7XHJcbiAgICBpZiAodGhpcy50eXBlID09PSAnc3RhY2tlZCcpIHtcclxuICAgICAgdGhpcy5iYXJzRm9yRGF0YUxhYmVscyA9IFtdO1xyXG4gICAgICBjb25zdCBzZWN0aW9uOiBhbnkgPSB7fTtcclxuICAgICAgc2VjdGlvbi5zZXJpZXMgPSB0aGlzLnNlcmllc05hbWU7XHJcbiAgICAgIGNvbnN0IHRvdGFsUG9zaXRpdmUgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKHN1bSwgZCkgPT4gKGQgPiAwID8gc3VtICsgZCA6IHN1bSksIDApO1xyXG4gICAgICBjb25zdCB0b3RhbE5lZ2F0aXZlID0gdGhpcy5zZXJpZXMubWFwKGQgPT4gZC52YWx1ZSkucmVkdWNlKChzdW0sIGQpID0+IChkIDwgMCA/IHN1bSArIGQgOiBzdW0pLCAwKTtcclxuICAgICAgc2VjdGlvbi50b3RhbCA9IHRvdGFsUG9zaXRpdmUgKyB0b3RhbE5lZ2F0aXZlO1xyXG4gICAgICBzZWN0aW9uLnggPSAwO1xyXG4gICAgICBzZWN0aW9uLnkgPSAwO1xyXG4gICAgICBpZiAoc2VjdGlvbi50b3RhbCA+IDApIHtcclxuICAgICAgICBzZWN0aW9uLmhlaWdodCA9IHRoaXMueVNjYWxlKHRvdGFsUG9zaXRpdmUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlY3Rpb24uaGVpZ2h0ID0gdGhpcy55U2NhbGUodG90YWxOZWdhdGl2ZSk7XHJcbiAgICAgIH1cclxuICAgICAgc2VjdGlvbi53aWR0aCA9IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpO1xyXG4gICAgICB0aGlzLmJhcnNGb3JEYXRhTGFiZWxzLnB1c2goc2VjdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmJhcnNGb3JEYXRhTGFiZWxzID0gdGhpcy5zZXJpZXMubWFwKGQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb246IGFueSA9IHt9O1xyXG4gICAgICAgIHNlY3Rpb24uc2VyaWVzID0gdGhpcy5zZXJpZXNOYW1lID8gdGhpcy5zZXJpZXNOYW1lIDogZC5sYWJlbDtcclxuICAgICAgICBzZWN0aW9uLnRvdGFsID0gZC52YWx1ZTtcclxuICAgICAgICBzZWN0aW9uLnggPSB0aGlzLnhTY2FsZShkLmxhYmVsKTtcclxuICAgICAgICBzZWN0aW9uLnkgPSB0aGlzLnlTY2FsZSgwKTtcclxuICAgICAgICBzZWN0aW9uLmhlaWdodCA9IHRoaXMueVNjYWxlKHNlY3Rpb24udG90YWwpIC0gdGhpcy55U2NhbGUoMCk7XHJcbiAgICAgICAgc2VjdGlvbi53aWR0aCA9IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpO1xyXG4gICAgICAgIHJldHVybiBzZWN0aW9uO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVRvb2x0aXBTZXR0aW5ncygpIHtcclxuICAgIHRoaXMudG9vbHRpcFBsYWNlbWVudCA9IHRoaXMudG9vbHRpcERpc2FibGVkID8gdW5kZWZpbmVkIDogJ3RvcCc7XHJcbiAgICB0aGlzLnRvb2x0aXBUeXBlID0gdGhpcy50b29sdGlwRGlzYWJsZWQgPyB1bmRlZmluZWQgOiAndG9vbHRpcCc7XHJcbiAgfVxyXG5cclxuICBpc0FjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcclxuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZSAmJiBlbnRyeS5zZXJpZXMgPT09IGQuc2VyaWVzO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgb25DbGljayhkYXRhOiBEYXRhSXRlbSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcblxyXG4gIGdldExhYmVsKGRhdGFJdGVtKTogc3RyaW5nIHtcclxuICAgIGlmIChkYXRhSXRlbS5sYWJlbCkge1xyXG4gICAgICByZXR1cm4gZGF0YUl0ZW0ubGFiZWw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YUl0ZW0ubmFtZTtcclxuICB9XHJcblxyXG4gIHRyYWNrQnkoaW5kZXgsIGJhcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYmFyLmxhYmVsO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tEYXRhTGFiZWxCeShpbmRleCwgYmFyTGFiZWwpIHtcclxuICAgIHJldHVybiBpbmRleCArICcjJyArIGJhckxhYmVsLnNlcmllcyArICcjJyArIGJhckxhYmVsLnRvdGFsO1xyXG4gIH1cclxufVxyXG4iXX0=