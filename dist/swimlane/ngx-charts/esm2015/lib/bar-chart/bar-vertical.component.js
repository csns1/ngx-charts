import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation, Output, EventEmitter, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { scaleBand, scaleLinear } from 'd3-scale';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
let BarVerticalComponent = class BarVerticalComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.rotateXAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.barPadding = 8;
        this.roundDomains = false;
        this.roundEdges = true;
        this.showDataLabel = false;
        this.noBarWhenZero = true;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.dataLabelMaxHeight = { negative: 0, positive: 0 };
    }
    update() {
        super.update();
        if (!this.showDataLabel) {
            this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        }
        this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        if (this.showDataLabel) {
            this.dims.height -= this.dataLabelMaxHeight.negative;
        }
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0] + this.dataLabelMaxHeight.negative})`;
    }
    getXScale() {
        this.xDomain = this.getXDomain();
        const spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
        return scaleBand()
            .range([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.xDomain);
    }
    getYScale() {
        this.yDomain = this.getYDomain();
        const scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getXDomain() {
        return this.results.map(d => d.label);
    }
    getYDomain() {
        const values = this.results.map(d => d.value);
        let min = this.yScaleMin ? Math.min(this.yScaleMin, ...values) : Math.min(0, ...values);
        if (this.yAxisTicks && !this.yAxisTicks.some(isNaN)) {
            min = Math.min(min, ...this.yAxisTicks);
        }
        let max = this.yScaleMax ? Math.max(this.yScaleMax, ...values) : Math.max(0, ...values);
        if (this.yAxisTicks && !this.yAxisTicks.some(isNaN)) {
            max = Math.max(max, ...this.yAxisTicks);
        }
        return [min, max];
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.xDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.xDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onDataLabelMaxHeightChanged(event) {
        if (event.size.negative) {
            this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
        }
        else {
            this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
        }
        if (event.index === this.results.length - 1) {
            setTimeout(() => this.update());
        }
    }
    onActivate(item, fromLegend = false) {
        item = this.results.find(d => {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item, fromLegend = false) {
        item = this.results.find(d => {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input()
], BarVerticalComponent.prototype, "legend", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "legendTitle", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "legendPosition", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "xAxis", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "yAxis", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "gradient", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "showGridLines", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "activeEntries", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "schemeType", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "rotateXAxisTicks", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "barPadding", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "roundDomains", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "roundEdges", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "yScaleMax", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "yScaleMin", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Input()
], BarVerticalComponent.prototype, "noBarWhenZero", void 0);
__decorate([
    Output()
], BarVerticalComponent.prototype, "activate", void 0);
__decorate([
    Output()
], BarVerticalComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate')
], BarVerticalComponent.prototype, "tooltipTemplate", void 0);
BarVerticalComponent = __decorate([
    Component({
        selector: 'ngx-charts-bar-vertical',
        template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event, true)"
      (legendLabelDeactivate)="onDeactivate($event, true)"
    >
      <svg:g [attr.transform]="transform" class="bar-chart chart">
        <svg:g
          ngx-charts-x-axis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [trimTicks]="trimXAxisTicks"
          [rotateTicks]="rotateXAxisTicks"
          [maxTickLength]="maxXAxisTickLength"
          [tickFormatting]="xAxisTickFormatting"
          [ticks]="xAxisTicks"
          [xAxisOffset]="dataLabelMaxHeight.negative"
          (dimensionsChanged)="updateXAxisHeight($event)"
        ></svg:g>
        <svg:g
          ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [trimTicks]="trimYAxisTicks"
          [maxTickLength]="maxYAxisTickLength"
          [tickFormatting]="yAxisTickFormatting"
          [ticks]="yAxisTicks"
          (dimensionsChanged)="updateYAxisWidth($event)"
        ></svg:g>
        <svg:g
          ngx-charts-series-vertical
          [xScale]="xScale"
          [yScale]="yScale"
          [colors]="colors"
          [series]="results"
          [dims]="dims"
          [gradient]="gradient"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipTemplate]="tooltipTemplate"
          [showDataLabel]="showDataLabel"
          [dataLabelFormatting]="dataLabelFormatting"
          [activeEntries]="activeEntries"
          [roundEdges]="roundEdges"
          [animations]="animations"
          [noBarWhenZero]="noBarWhenZero"
          (activate)="onActivate($event)"
          (deactivate)="onDeactivate($event)"
          (select)="onClick($event)"
          (dataLabelHeightChanged)="onDataLabelMaxHeightChanged($event)"
        ></svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarVerticalComponent);
export { BarVerticalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLXZlcnRpY2FsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9iYXItdmVydGljYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFDakIsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWxELE9BQU8sRUFBRSx1QkFBdUIsRUFBa0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUEwRXBFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsa0JBQWtCO0lBQTVEOztRQUNXLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixtQkFBYyxHQUFXLE9BQU8sQ0FBQztRQU9qQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUVqQyxrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixrQkFBYSxHQUFVLEVBQUUsQ0FBQztRQUUxQixtQkFBYyxHQUFZLElBQUksQ0FBQztRQUMvQixtQkFBYyxHQUFZLElBQUksQ0FBQztRQUMvQixxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsdUJBQWtCLEdBQVcsRUFBRSxDQUFDO1FBQ2hDLHVCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUtoQyxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUczQixrQkFB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LGlCQUFpQixDQUFDLElBQUk7O0tBQ3RDLENBQUM7R0FDVyxvQkFBb0IsQ0F5TmhDO1NBek5ZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHNjYWxlQmFuZCwgc2NhbGVMaW5lYXIgfSBmcm9tICdkMy1zY2FsZSc7XHJcblxyXG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucywgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XHJcbmltcG9ydCB7IEJhc2VDaGFydENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGFJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWJhci12ZXJ0aWNhbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0XHJcbiAgICAgIFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiXHJcbiAgICAgIFtzaG93TGVnZW5kXT1cImxlZ2VuZFwiXHJcbiAgICAgIFtsZWdlbmRPcHRpb25zXT1cImxlZ2VuZE9wdGlvbnNcIlxyXG4gICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcclxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgIChsZWdlbmRMYWJlbENsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAgIChsZWdlbmRMYWJlbEFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50LCB0cnVlKVwiXHJcbiAgICAgIChsZWdlbmRMYWJlbERlYWN0aXZhdGUpPVwib25EZWFjdGl2YXRlKCRldmVudCwgdHJ1ZSlcIlxyXG4gICAgPlxyXG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiIGNsYXNzPVwiYmFyLWNoYXJ0IGNoYXJ0XCI+XHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLXgtYXhpc1xyXG4gICAgICAgICAgKm5nSWY9XCJ4QXhpc1wiXHJcbiAgICAgICAgICBbeFNjYWxlXT1cInhTY2FsZVwiXHJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgIFtzaG93TGFiZWxdPVwic2hvd1hBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW2xhYmVsVGV4dF09XCJ4QXhpc0xhYmVsXCJcclxuICAgICAgICAgIFt0cmltVGlja3NdPVwidHJpbVhBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW3JvdGF0ZVRpY2tzXT1cInJvdGF0ZVhBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4WEF4aXNUaWNrTGVuZ3RoXCJcclxuICAgICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ4QXhpc1RpY2tGb3JtYXR0aW5nXCJcclxuICAgICAgICAgIFt0aWNrc109XCJ4QXhpc1RpY2tzXCJcclxuICAgICAgICAgIFt4QXhpc09mZnNldF09XCJkYXRhTGFiZWxNYXhIZWlnaHQubmVnYXRpdmVcIlxyXG4gICAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cInVwZGF0ZVhBeGlzSGVpZ2h0KCRldmVudClcIlxyXG4gICAgICAgID48L3N2ZzpnPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy15LWF4aXNcclxuICAgICAgICAgICpuZ0lmPVwieUF4aXNcIlxyXG4gICAgICAgICAgW3lTY2FsZV09XCJ5U2NhbGVcIlxyXG4gICAgICAgICAgW2RpbXNdPVwiZGltc1wiXHJcbiAgICAgICAgICBbc2hvd0dyaWRMaW5lc109XCJzaG93R3JpZExpbmVzXCJcclxuICAgICAgICAgIFtzaG93TGFiZWxdPVwic2hvd1lBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW2xhYmVsVGV4dF09XCJ5QXhpc0xhYmVsXCJcclxuICAgICAgICAgIFt0cmltVGlja3NdPVwidHJpbVlBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4WUF4aXNUaWNrTGVuZ3RoXCJcclxuICAgICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ5QXhpc1RpY2tGb3JtYXR0aW5nXCJcclxuICAgICAgICAgIFt0aWNrc109XCJ5QXhpc1RpY2tzXCJcclxuICAgICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJ1cGRhdGVZQXhpc1dpZHRoKCRldmVudClcIlxyXG4gICAgICAgID48L3N2ZzpnPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1zZXJpZXMtdmVydGljYWxcclxuICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcclxuICAgICAgICAgIFt5U2NhbGVdPVwieVNjYWxlXCJcclxuICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcclxuICAgICAgICAgIFtzZXJpZXNdPVwicmVzdWx0c1wiXHJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgIFtncmFkaWVudF09XCJncmFkaWVudFwiXHJcbiAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbc2hvd0RhdGFMYWJlbF09XCJzaG93RGF0YUxhYmVsXCJcclxuICAgICAgICAgIFtkYXRhTGFiZWxGb3JtYXR0aW5nXT1cImRhdGFMYWJlbEZvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXHJcbiAgICAgICAgICBbcm91bmRFZGdlc109XCJyb3VuZEVkZ2VzXCJcclxuICAgICAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAgICAgW25vQmFyV2hlblplcm9dPVwibm9CYXJXaGVuWmVyb1wiXHJcbiAgICAgICAgICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgICAgICAgIChkZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgIChkYXRhTGFiZWxIZWlnaHRDaGFuZ2VkKT1cIm9uRGF0YUxhYmVsTWF4SGVpZ2h0Q2hhbmdlZCgkZXZlbnQpXCJcclxuICAgICAgICA+PC9zdmc6Zz5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgIDwvbmd4LWNoYXJ0cy1jaGFydD5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHN0eWxlVXJsczogWycuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIEJhclZlcnRpY2FsQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSBsZWdlbmQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBsZWdlbmRUaXRsZTogc3RyaW5nID0gJ0xlZ2VuZCc7XHJcbiAgQElucHV0KCkgbGVnZW5kUG9zaXRpb246IHN0cmluZyA9ICdyaWdodCc7XHJcbiAgQElucHV0KCkgeEF4aXM7XHJcbiAgQElucHV0KCkgeUF4aXM7XHJcbiAgQElucHV0KCkgc2hvd1hBeGlzTGFiZWw7XHJcbiAgQElucHV0KCkgc2hvd1lBeGlzTGFiZWw7XHJcbiAgQElucHV0KCkgeEF4aXNMYWJlbDtcclxuICBASW5wdXQoKSB5QXhpc0xhYmVsO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNob3dHcmlkTGluZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdID0gW107XHJcbiAgQElucHV0KCkgc2NoZW1lVHlwZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHRyaW1YQXhpc1RpY2tzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSB0cmltWUF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgcm90YXRlWEF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgbWF4WEF4aXNUaWNrTGVuZ3RoOiBudW1iZXIgPSAxNjtcclxuICBASW5wdXQoKSBtYXhZQXhpc1RpY2tMZW5ndGg6IG51bWJlciA9IDE2O1xyXG4gIEBJbnB1dCgpIHhBeGlzVGlja0Zvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSB5QXhpc1RpY2tGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgeEF4aXNUaWNrczogYW55W107XHJcbiAgQElucHV0KCkgeUF4aXNUaWNrczogYW55W107XHJcbiAgQElucHV0KCkgYmFyUGFkZGluZyA9IDg7XHJcbiAgQElucHV0KCkgcm91bmREb21haW5zOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcm91bmRFZGdlczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgeVNjYWxlTWF4OiBudW1iZXI7XHJcbiAgQElucHV0KCkgeVNjYWxlTWluOiBudW1iZXI7XHJcbiAgQElucHV0KCkgc2hvd0RhdGFMYWJlbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRhdGFMYWJlbEZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBub0JhcldoZW5aZXJvOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoJ3Rvb2x0aXBUZW1wbGF0ZScpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgZGltczogVmlld0RpbWVuc2lvbnM7XHJcbiAgeFNjYWxlOiBhbnk7XHJcbiAgeVNjYWxlOiBhbnk7XHJcbiAgeERvbWFpbjogYW55O1xyXG4gIHlEb21haW46IGFueTtcclxuICB0cmFuc2Zvcm06IHN0cmluZztcclxuICBjb2xvcnM6IENvbG9ySGVscGVyO1xyXG4gIG1hcmdpbjogYW55W10gPSBbMTAsIDIwLCAxMCwgMjBdO1xyXG4gIHhBeGlzSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gIHlBeGlzV2lkdGg6IG51bWJlciA9IDA7XHJcbiAgbGVnZW5kT3B0aW9uczogYW55O1xyXG4gIGRhdGFMYWJlbE1heEhlaWdodDogYW55ID0geyBuZWdhdGl2ZTogMCwgcG9zaXRpdmU6IDAgfTtcclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudXBkYXRlKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLnNob3dEYXRhTGFiZWwpIHtcclxuICAgICAgdGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQgPSB7IG5lZ2F0aXZlOiAwLCBwb3NpdGl2ZTogMCB9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5tYXJnaW4gPSBbMTAgKyB0aGlzLmRhdGFMYWJlbE1heEhlaWdodC5wb3NpdGl2ZSwgMjAsIDEwICsgdGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQubmVnYXRpdmUsIDIwXTtcclxuXHJcbiAgICB0aGlzLmRpbXMgPSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XHJcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG4gICAgICBtYXJnaW5zOiB0aGlzLm1hcmdpbixcclxuICAgICAgc2hvd1hBeGlzOiB0aGlzLnhBeGlzLFxyXG4gICAgICBzaG93WUF4aXM6IHRoaXMueUF4aXMsXHJcbiAgICAgIHhBeGlzSGVpZ2h0OiB0aGlzLnhBeGlzSGVpZ2h0LFxyXG4gICAgICB5QXhpc1dpZHRoOiB0aGlzLnlBeGlzV2lkdGgsXHJcbiAgICAgIHNob3dYTGFiZWw6IHRoaXMuc2hvd1hBeGlzTGFiZWwsXHJcbiAgICAgIHNob3dZTGFiZWw6IHRoaXMuc2hvd1lBeGlzTGFiZWwsXHJcbiAgICAgIHNob3dMZWdlbmQ6IHRoaXMubGVnZW5kLFxyXG4gICAgICBsZWdlbmRUeXBlOiB0aGlzLnNjaGVtZVR5cGUsXHJcbiAgICAgIGxlZ2VuZFBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmZvcm1hdERhdGVzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2hvd0RhdGFMYWJlbCkge1xyXG4gICAgICB0aGlzLmRpbXMuaGVpZ2h0IC09IHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0Lm5lZ2F0aXZlO1xyXG4gICAgfVxyXG4gICAgdGhpcy54U2NhbGUgPSB0aGlzLmdldFhTY2FsZSgpO1xyXG4gICAgdGhpcy55U2NhbGUgPSB0aGlzLmdldFlTY2FsZSgpO1xyXG5cclxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XHJcbiAgICB0aGlzLmxlZ2VuZE9wdGlvbnMgPSB0aGlzLmdldExlZ2VuZE9wdGlvbnMoKTtcclxuXHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLmRpbXMueE9mZnNldH0gLCAke3RoaXMubWFyZ2luWzBdICsgdGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQubmVnYXRpdmV9KWA7XHJcbiAgfVxyXG5cclxuICBnZXRYU2NhbGUoKTogYW55IHtcclxuICAgIHRoaXMueERvbWFpbiA9IHRoaXMuZ2V0WERvbWFpbigpO1xyXG4gICAgY29uc3Qgc3BhY2luZyA9IHRoaXMueERvbWFpbi5sZW5ndGggLyAodGhpcy5kaW1zLndpZHRoIC8gdGhpcy5iYXJQYWRkaW5nICsgMSk7XHJcbiAgICByZXR1cm4gc2NhbGVCYW5kKClcclxuICAgICAgLnJhbmdlKFswLCB0aGlzLmRpbXMud2lkdGhdKVxyXG4gICAgICAucGFkZGluZ0lubmVyKHNwYWNpbmcpXHJcbiAgICAgIC5kb21haW4odGhpcy54RG9tYWluKTtcclxuICB9XHJcblxyXG4gIGdldFlTY2FsZSgpOiBhbnkge1xyXG4gICAgdGhpcy55RG9tYWluID0gdGhpcy5nZXRZRG9tYWluKCk7XHJcbiAgICBjb25zdCBzY2FsZSA9IHNjYWxlTGluZWFyKClcclxuICAgICAgLnJhbmdlKFt0aGlzLmRpbXMuaGVpZ2h0LCAwXSlcclxuICAgICAgLmRvbWFpbih0aGlzLnlEb21haW4pO1xyXG4gICAgcmV0dXJuIHRoaXMucm91bmREb21haW5zID8gc2NhbGUubmljZSgpIDogc2NhbGU7XHJcbiAgfVxyXG5cclxuICBnZXRYRG9tYWluKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC5sYWJlbCk7XHJcbiAgfVxyXG5cclxuICBnZXRZRG9tYWluKCk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy5yZXN1bHRzLm1hcChkID0+IGQudmFsdWUpO1xyXG5cclxuICAgIGxldCBtaW4gPSB0aGlzLnlTY2FsZU1pbiA/IE1hdGgubWluKHRoaXMueVNjYWxlTWluLCAuLi52YWx1ZXMpIDogTWF0aC5taW4oMCwgLi4udmFsdWVzKTtcclxuICAgIGlmICh0aGlzLnlBeGlzVGlja3MgJiYgIXRoaXMueUF4aXNUaWNrcy5zb21lKGlzTmFOKSkge1xyXG4gICAgICBtaW4gPSBNYXRoLm1pbihtaW4sIC4uLnRoaXMueUF4aXNUaWNrcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1heCA9IHRoaXMueVNjYWxlTWF4ID8gTWF0aC5tYXgodGhpcy55U2NhbGVNYXgsIC4uLnZhbHVlcykgOiBNYXRoLm1heCgwLCAuLi52YWx1ZXMpO1xyXG4gICAgaWYgKHRoaXMueUF4aXNUaWNrcyAmJiAhdGhpcy55QXhpc1RpY2tzLnNvbWUoaXNOYU4pKSB7XHJcbiAgICAgIG1heCA9IE1hdGgubWF4KG1heCwgLi4udGhpcy55QXhpc1RpY2tzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbbWluLCBtYXhdO1xyXG4gIH1cclxuXHJcbiAgb25DbGljayhkYXRhOiBEYXRhSXRlbSkge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcblxyXG4gIHNldENvbG9ycygpOiB2b2lkIHtcclxuICAgIGxldCBkb21haW47XHJcbiAgICBpZiAodGhpcy5zY2hlbWVUeXBlID09PSAnb3JkaW5hbCcpIHtcclxuICAgICAgZG9tYWluID0gdGhpcy54RG9tYWluO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tYWluID0gdGhpcy55RG9tYWluO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCB0aGlzLnNjaGVtZVR5cGUsIGRvbWFpbiwgdGhpcy5jdXN0b21Db2xvcnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kT3B0aW9ucygpIHtcclxuICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgIHNjYWxlVHlwZTogdGhpcy5zY2hlbWVUeXBlLFxyXG4gICAgICBjb2xvcnM6IHVuZGVmaW5lZCxcclxuICAgICAgZG9tYWluOiBbXSxcclxuICAgICAgdGl0bGU6IHVuZGVmaW5lZCxcclxuICAgICAgcG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cclxuICAgIH07XHJcbiAgICBpZiAob3B0cy5zY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICBvcHRzLmRvbWFpbiA9IHRoaXMueERvbWFpbjtcclxuICAgICAgb3B0cy5jb2xvcnMgPSB0aGlzLmNvbG9ycztcclxuICAgICAgb3B0cy50aXRsZSA9IHRoaXMubGVnZW5kVGl0bGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcHRzLmRvbWFpbiA9IHRoaXMueURvbWFpbjtcclxuICAgICAgb3B0cy5jb2xvcnMgPSB0aGlzLmNvbG9ycy5zY2FsZTtcclxuICAgIH1cclxuICAgIHJldHVybiBvcHRzO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlWUF4aXNXaWR0aCh7IHdpZHRoIH0pOiB2b2lkIHtcclxuICAgIHRoaXMueUF4aXNXaWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVhBeGlzSGVpZ2h0KHsgaGVpZ2h0IH0pOiB2b2lkIHtcclxuICAgIHRoaXMueEF4aXNIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgb25EYXRhTGFiZWxNYXhIZWlnaHRDaGFuZ2VkKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuc2l6ZS5uZWdhdGl2ZSkge1xyXG4gICAgICB0aGlzLmRhdGFMYWJlbE1heEhlaWdodC5uZWdhdGl2ZSA9IE1hdGgubWF4KHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0Lm5lZ2F0aXZlLCBldmVudC5zaXplLmhlaWdodCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRhdGFMYWJlbE1heEhlaWdodC5wb3NpdGl2ZSA9IE1hdGgubWF4KHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0LnBvc2l0aXZlLCBldmVudC5zaXplLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnQuaW5kZXggPT09IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkFjdGl2YXRlKGl0ZW0sIGZyb21MZWdlbmQgPSBmYWxzZSkge1xyXG4gICAgaXRlbSA9IHRoaXMucmVzdWx0cy5maW5kKGQgPT4ge1xyXG4gICAgICBpZiAoZnJvbUxlZ2VuZCkge1xyXG4gICAgICAgIHJldHVybiBkLmxhYmVsID09PSBpdGVtLm5hbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZEluZGV4KGQgPT4ge1xyXG4gICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWUgJiYgZC52YWx1ZSA9PT0gaXRlbS52YWx1ZSAmJiBkLnNlcmllcyA9PT0gaXRlbS5zZXJpZXM7XHJcbiAgICB9KTtcclxuICAgIGlmIChpZHggPiAtMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gW2l0ZW0sIC4uLnRoaXMuYWN0aXZlRW50cmllc107XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xyXG4gIH1cclxuXHJcbiAgb25EZWFjdGl2YXRlKGl0ZW0sIGZyb21MZWdlbmQgPSBmYWxzZSkge1xyXG4gICAgaXRlbSA9IHRoaXMucmVzdWx0cy5maW5kKGQgPT4ge1xyXG4gICAgICBpZiAoZnJvbUxlZ2VuZCkge1xyXG4gICAgICAgIHJldHVybiBkLmxhYmVsID09PSBpdGVtLm5hbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZEluZGV4KGQgPT4ge1xyXG4gICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWUgJiYgZC52YWx1ZSA9PT0gaXRlbS52YWx1ZSAmJiBkLnNlcmllcyA9PT0gaXRlbS5zZXJpZXM7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbLi4udGhpcy5hY3RpdmVFbnRyaWVzXTtcclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==