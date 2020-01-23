import { __decorate } from "tslib";
import { Component, Input, Output, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { scaleBand, scaleLinear } from 'd3-scale';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
let BarVertical2DComponent = class BarVertical2DComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.scaleType = 'ordinal';
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.rotateXAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.groupPadding = 16;
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
        if (this.showDataLabel) {
            this.dims.height -= this.dataLabelMaxHeight.negative;
        }
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0] + this.dataLabelMaxHeight.negative})`;
    }
    onDataLabelMaxHeightChanged(event, groupIndex) {
        if (event.size.negative) {
            this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
        }
        else {
            this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
        }
        if (groupIndex === this.results.length - 1) {
            setTimeout(() => this.update());
        }
    }
    getGroupScale() {
        const spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    }
    getInnerScale() {
        const width = this.groupScale.bandwidth();
        const spacing = this.innerDomain.length / (width / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, width])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    }
    getValueScale() {
        const scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valuesDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getGroupDomain() {
        const domain = [];
        for (const group of this.results) {
            if (!domain.includes(group.label)) {
                domain.push(group.label);
            }
        }
        return domain;
    }
    getInnerDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.label)) {
                    domain.push(d.label);
                }
            }
        }
        return domain;
    }
    getValueDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        const min = Math.min(0, ...domain);
        const max = this.yScaleMax ? Math.max(this.yScaleMax, ...domain) : Math.max(0, ...domain);
        return [min, max];
    }
    groupTransform(group) {
        return `translate(${this.groupScale(group.label)}, 0)`;
    }
    onClick(data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valuesDomain;
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
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valuesDomain;
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
    onActivate(event, group, fromLegend = false) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const items = this.results
            .map(g => g.series)
            .flat()
            .filter(i => {
            if (fromLegend) {
                return i.label === item.name;
            }
            else {
                return i.name === item.name && i.series === item.series;
            }
        });
        this.activeEntries = [...items];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(event, group, fromLegend = false) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        this.activeEntries = this.activeEntries.filter(i => {
            if (fromLegend) {
                return i.label !== item.name;
            }
            else {
                return !(i.name === item.name && i.series === item.series);
            }
        });
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input()
], BarVertical2DComponent.prototype, "legend", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "legendTitle", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "legendPosition", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "xAxis", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "yAxis", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "scaleType", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "gradient", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "showGridLines", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "activeEntries", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "schemeType", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "rotateXAxisTicks", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "groupPadding", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "barPadding", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "roundDomains", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "roundEdges", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "yScaleMax", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Input()
], BarVertical2DComponent.prototype, "noBarWhenZero", void 0);
__decorate([
    Output()
], BarVertical2DComponent.prototype, "activate", void 0);
__decorate([
    Output()
], BarVertical2DComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate')
], BarVertical2DComponent.prototype, "tooltipTemplate", void 0);
BarVertical2DComponent = __decorate([
    Component({
        selector: 'ngx-charts-bar-vertical-2d',
        template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelActivate)="onActivate($event, undefined, true)"
      (legendLabelDeactivate)="onDeactivate($event, undefined, true)"
      (legendLabelClick)="onClick($event)"
    >
      <svg:g [attr.transform]="transform" class="bar-chart chart">
        <svg:g
          ngx-charts-grid-panel-series
          [xScale]="groupScale"
          [yScale]="valueScale"
          [data]="results"
          [dims]="dims"
          orient="vertical"
        ></svg:g>
        <svg:g
          ngx-charts-x-axis
          *ngIf="xAxis"
          [xScale]="groupScale"
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
          [yScale]="valueScale"
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
          *ngFor="let group of results; let index = index; trackBy: trackBy"
          [@animationState]="'active'"
          [attr.transform]="groupTransform(group)"
          [activeEntries]="activeEntries"
          [xScale]="innerScale"
          [yScale]="valueScale"
          [colors]="colors"
          [series]="group.series"
          [dims]="dims"
          [gradient]="gradient"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipTemplate]="tooltipTemplate"
          [showDataLabel]="showDataLabel"
          [dataLabelFormatting]="dataLabelFormatting"
          [seriesName]="group.name"
          [roundEdges]="roundEdges"
          [animations]="animations"
          [noBarWhenZero]="noBarWhenZero"
          (select)="onClick($event, group)"
          (activate)="onActivate($event, group)"
          (deactivate)="onDeactivate($event, group)"
          (dataLabelHeightChanged)="onDataLabelMaxHeightChanged($event, index)"
        />
      </svg:g>
    </ngx-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1,
                        transform: '*'
                    }),
                    animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ],
        styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarVertical2DComponent);
export { BarVertical2DComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLXZlcnRpY2FsLTJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9iYXItdmVydGljYWwtMmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsdUJBQXVCLEVBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBZ0dwRSxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLGtCQUFrQjtJQUE5RDs7UUFDVyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsZ0JBQVcsR0FBVyxRQUFRLENBQUM7UUFDL0IsbUJBQWMsR0FBVyxPQUFPLENBQUM7UUFPakMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsY0FBUyxHQUFHLFNBQVMsQ0FBQztRQUV0QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixrQkFBYSxHQUFVLEVBQUUsQ0FBQztRQUUxQixtQkFBYyxHQUFZLElBQUksQ0FBQztRQUMvQixtQkFBYyxHQUFZLElBQUksQ0FBQztRQUMvQixxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsdUJBQWtCLEdBQVcsRUFBRSxDQUFDO1FBQ2hDLHVCQUFr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QUMvQyxVQUFVLEVBQUU7WUFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQ25CLEtBQUssQ0FBQzt3QkFDSixPQUFPLEVBQUUsQ0FBQzt3QkFDVixTQUFTLEVBQUUsR0FBRztxQkFDZixDQUFDO29CQUNGLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztpQkFDM0QsQ0FBQzthQUNILENBQUM7U0FDSDs7S0FDRixDQUFDO0dBQ1csc0JBQXNCLENBMlFsQztTQTNRWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBzY2FsZUJhbmQsIHNjYWxlTGluZWFyIH0gZnJvbSAnZDMtc2NhbGUnO1xyXG5cclxuaW1wb3J0IHsgY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMsIFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3ZpZXctZGltZW5zaW9ucy5oZWxwZXInO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xyXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWJhci12ZXJ0aWNhbC0yZCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0XHJcbiAgICAgIFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiXHJcbiAgICAgIFtzaG93TGVnZW5kXT1cImxlZ2VuZFwiXHJcbiAgICAgIFtsZWdlbmRPcHRpb25zXT1cImxlZ2VuZE9wdGlvbnNcIlxyXG4gICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcclxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgIChsZWdlbmRMYWJlbEFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50LCB1bmRlZmluZWQsIHRydWUpXCJcclxuICAgICAgKGxlZ2VuZExhYmVsRGVhY3RpdmF0ZSk9XCJvbkRlYWN0aXZhdGUoJGV2ZW50LCB1bmRlZmluZWQsIHRydWUpXCJcclxuICAgICAgKGxlZ2VuZExhYmVsQ2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgID5cclxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cImJhci1jaGFydCBjaGFydFwiPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1ncmlkLXBhbmVsLXNlcmllc1xyXG4gICAgICAgICAgW3hTY2FsZV09XCJncm91cFNjYWxlXCJcclxuICAgICAgICAgIFt5U2NhbGVdPVwidmFsdWVTY2FsZVwiXHJcbiAgICAgICAgICBbZGF0YV09XCJyZXN1bHRzXCJcclxuICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxyXG4gICAgICAgICAgb3JpZW50PVwidmVydGljYWxcIlxyXG4gICAgICAgID48L3N2ZzpnPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy14LWF4aXNcclxuICAgICAgICAgICpuZ0lmPVwieEF4aXNcIlxyXG4gICAgICAgICAgW3hTY2FsZV09XCJncm91cFNjYWxlXCJcclxuICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxyXG4gICAgICAgICAgW3Nob3dMYWJlbF09XCJzaG93WEF4aXNMYWJlbFwiXHJcbiAgICAgICAgICBbbGFiZWxUZXh0XT1cInhBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW3RyaW1UaWNrc109XCJ0cmltWEF4aXNUaWNrc1wiXHJcbiAgICAgICAgICBbcm90YXRlVGlja3NdPVwicm90YXRlWEF4aXNUaWNrc1wiXHJcbiAgICAgICAgICBbbWF4VGlja0xlbmd0aF09XCJtYXhYQXhpc1RpY2tMZW5ndGhcIlxyXG4gICAgICAgICAgW3RpY2tGb3JtYXR0aW5nXT1cInhBeGlzVGlja0Zvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgW3RpY2tzXT1cInhBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW3hBeGlzT2Zmc2V0XT1cImRhdGFMYWJlbE1heEhlaWdodC5uZWdhdGl2ZVwiXHJcbiAgICAgICAgICAoZGltZW5zaW9uc0NoYW5nZWQpPVwidXBkYXRlWEF4aXNIZWlnaHQoJGV2ZW50KVwiXHJcbiAgICAgICAgPjwvc3ZnOmc+XHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLXktYXhpc1xyXG4gICAgICAgICAgKm5nSWY9XCJ5QXhpc1wiXHJcbiAgICAgICAgICBbeVNjYWxlXT1cInZhbHVlU2NhbGVcIlxyXG4gICAgICAgICAgW2RpbXNdPVwiZGltc1wiXHJcbiAgICAgICAgICBbc2hvd0dyaWRMaW5lc109XCJzaG93R3JpZExpbmVzXCJcclxuICAgICAgICAgIFtzaG93TGFiZWxdPVwic2hvd1lBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW2xhYmVsVGV4dF09XCJ5QXhpc0xhYmVsXCJcclxuICAgICAgICAgIFt0cmltVGlja3NdPVwidHJpbVlBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4WUF4aXNUaWNrTGVuZ3RoXCJcclxuICAgICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ5QXhpc1RpY2tGb3JtYXR0aW5nXCJcclxuICAgICAgICAgIFt0aWNrc109XCJ5QXhpc1RpY2tzXCJcclxuICAgICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJ1cGRhdGVZQXhpc1dpZHRoKCRldmVudClcIlxyXG4gICAgICAgID48L3N2ZzpnPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1zZXJpZXMtdmVydGljYWxcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBncm91cCBvZiByZXN1bHRzOyBsZXQgaW5kZXggPSBpbmRleDsgdHJhY2tCeTogdHJhY2tCeVwiXHJcbiAgICAgICAgICBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCJcclxuICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJncm91cFRyYW5zZm9ybShncm91cClcIlxyXG4gICAgICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXHJcbiAgICAgICAgICBbeFNjYWxlXT1cImlubmVyU2NhbGVcIlxyXG4gICAgICAgICAgW3lTY2FsZV09XCJ2YWx1ZVNjYWxlXCJcclxuICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcclxuICAgICAgICAgIFtzZXJpZXNdPVwiZ3JvdXAuc2VyaWVzXCJcclxuICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxyXG4gICAgICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcclxuICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcclxuICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgIFtzaG93RGF0YUxhYmVsXT1cInNob3dEYXRhTGFiZWxcIlxyXG4gICAgICAgICAgW2RhdGFMYWJlbEZvcm1hdHRpbmddPVwiZGF0YUxhYmVsRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbc2VyaWVzTmFtZV09XCJncm91cC5uYW1lXCJcclxuICAgICAgICAgIFtyb3VuZEVkZ2VzXT1cInJvdW5kRWRnZXNcIlxyXG4gICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICBbbm9CYXJXaGVuWmVyb109XCJub0JhcldoZW5aZXJvXCJcclxuICAgICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQsIGdyb3VwKVwiXHJcbiAgICAgICAgICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQsIGdyb3VwKVwiXHJcbiAgICAgICAgICAoZGVhY3RpdmF0ZSk9XCJvbkRlYWN0aXZhdGUoJGV2ZW50LCBncm91cClcIlxyXG4gICAgICAgICAgKGRhdGFMYWJlbEhlaWdodENoYW5nZWQpPVwib25EYXRhTGFiZWxNYXhIZWlnaHRDaGFuZ2VkKCRldmVudCwgaW5kZXgpXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L3N2ZzpnPlxyXG4gICAgPC9uZ3gtY2hhcnRzLWNoYXJ0PlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICcqJ1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoNTAwLCBzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlKDApJyB9KSlcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFyVmVydGljYWwyRENvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgbGVnZW5kID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbGVnZW5kVGl0bGU6IHN0cmluZyA9ICdMZWdlbmQnO1xyXG4gIEBJbnB1dCgpIGxlZ2VuZFBvc2l0aW9uOiBzdHJpbmcgPSAncmlnaHQnO1xyXG4gIEBJbnB1dCgpIHhBeGlzO1xyXG4gIEBJbnB1dCgpIHlBeGlzO1xyXG4gIEBJbnB1dCgpIHNob3dYQXhpc0xhYmVsO1xyXG4gIEBJbnB1dCgpIHNob3dZQXhpc0xhYmVsO1xyXG4gIEBJbnB1dCgpIHhBeGlzTGFiZWw7XHJcbiAgQElucHV0KCkgeUF4aXNMYWJlbDtcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBzY2FsZVR5cGUgPSAnb3JkaW5hbCc7XHJcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W10gPSBbXTtcclxuICBASW5wdXQoKSBzY2hlbWVUeXBlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdHJpbVhBeGlzVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHRyaW1ZQXhpc1RpY2tzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSByb3RhdGVYQXhpc1RpY2tzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBtYXhYQXhpc1RpY2tMZW5ndGg6IG51bWJlciA9IDE2O1xyXG4gIEBJbnB1dCgpIG1heFlBeGlzVGlja0xlbmd0aDogbnVtYmVyID0gMTY7XHJcbiAgQElucHV0KCkgeEF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIHlBeGlzVGlja0Zvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSB4QXhpc1RpY2tzOiBhbnlbXTtcclxuICBASW5wdXQoKSB5QXhpc1RpY2tzOiBhbnlbXTtcclxuICBASW5wdXQoKSBncm91cFBhZGRpbmcgPSAxNjtcclxuICBASW5wdXQoKSBiYXJQYWRkaW5nID0gODtcclxuICBASW5wdXQoKSByb3VuZERvbWFpbnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSByb3VuZEVkZ2VzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSB5U2NhbGVNYXg6IG51bWJlcjtcclxuICBASW5wdXQoKSBzaG93RGF0YUxhYmVsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGF0YUxhYmVsRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIG5vQmFyV2hlblplcm86IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJykgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBkaW1zOiBWaWV3RGltZW5zaW9ucztcclxuICBncm91cERvbWFpbjogYW55W107XHJcbiAgaW5uZXJEb21haW46IGFueVtdO1xyXG4gIHZhbHVlc0RvbWFpbjogYW55W107XHJcbiAgZ3JvdXBTY2FsZTogYW55O1xyXG4gIGlubmVyU2NhbGU6IGFueTtcclxuICB2YWx1ZVNjYWxlOiBhbnk7XHJcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XHJcbiAgY29sb3JzOiBDb2xvckhlbHBlcjtcclxuICBtYXJnaW4gPSBbMTAsIDIwLCAxMCwgMjBdO1xyXG4gIHhBeGlzSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gIHlBeGlzV2lkdGg6IG51bWJlciA9IDA7XHJcbiAgbGVnZW5kT3B0aW9uczogYW55O1xyXG4gIGRhdGFMYWJlbE1heEhlaWdodDogYW55ID0geyBuZWdhdGl2ZTogMCwgcG9zaXRpdmU6IDAgfTtcclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudXBkYXRlKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLnNob3dEYXRhTGFiZWwpIHtcclxuICAgICAgdGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQgPSB7IG5lZ2F0aXZlOiAwLCBwb3NpdGl2ZTogMCB9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5tYXJnaW4gPSBbMTAgKyB0aGlzLmRhdGFMYWJlbE1heEhlaWdodC5wb3NpdGl2ZSwgMjAsIDEwICsgdGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQubmVnYXRpdmUsIDIwXTtcclxuXHJcbiAgICB0aGlzLmRpbXMgPSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XHJcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG4gICAgICBtYXJnaW5zOiB0aGlzLm1hcmdpbixcclxuICAgICAgc2hvd1hBeGlzOiB0aGlzLnhBeGlzLFxyXG4gICAgICBzaG93WUF4aXM6IHRoaXMueUF4aXMsXHJcbiAgICAgIHhBeGlzSGVpZ2h0OiB0aGlzLnhBeGlzSGVpZ2h0LFxyXG4gICAgICB5QXhpc1dpZHRoOiB0aGlzLnlBeGlzV2lkdGgsXHJcbiAgICAgIHNob3dYTGFiZWw6IHRoaXMuc2hvd1hBeGlzTGFiZWwsXHJcbiAgICAgIHNob3dZTGFiZWw6IHRoaXMuc2hvd1lBeGlzTGFiZWwsXHJcbiAgICAgIHNob3dMZWdlbmQ6IHRoaXMubGVnZW5kLFxyXG4gICAgICBsZWdlbmRUeXBlOiB0aGlzLnNjaGVtZVR5cGUsXHJcbiAgICAgIGxlZ2VuZFBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5zaG93RGF0YUxhYmVsKSB7XHJcbiAgICAgIHRoaXMuZGltcy5oZWlnaHQgLT0gdGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQubmVnYXRpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5mb3JtYXREYXRlcygpO1xyXG5cclxuICAgIHRoaXMuZ3JvdXBEb21haW4gPSB0aGlzLmdldEdyb3VwRG9tYWluKCk7XHJcbiAgICB0aGlzLmlubmVyRG9tYWluID0gdGhpcy5nZXRJbm5lckRvbWFpbigpO1xyXG4gICAgdGhpcy52YWx1ZXNEb21haW4gPSB0aGlzLmdldFZhbHVlRG9tYWluKCk7XHJcblxyXG4gICAgdGhpcy5ncm91cFNjYWxlID0gdGhpcy5nZXRHcm91cFNjYWxlKCk7XHJcbiAgICB0aGlzLmlubmVyU2NhbGUgPSB0aGlzLmdldElubmVyU2NhbGUoKTtcclxuICAgIHRoaXMudmFsdWVTY2FsZSA9IHRoaXMuZ2V0VmFsdWVTY2FsZSgpO1xyXG5cclxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XHJcbiAgICB0aGlzLmxlZ2VuZE9wdGlvbnMgPSB0aGlzLmdldExlZ2VuZE9wdGlvbnMoKTtcclxuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMuZGltcy54T2Zmc2V0fSAsICR7dGhpcy5tYXJnaW5bMF0gKyB0aGlzLmRhdGFMYWJlbE1heEhlaWdodC5uZWdhdGl2ZX0pYDtcclxuICB9XHJcblxyXG4gIG9uRGF0YUxhYmVsTWF4SGVpZ2h0Q2hhbmdlZChldmVudCwgZ3JvdXBJbmRleCkge1xyXG4gICAgaWYgKGV2ZW50LnNpemUubmVnYXRpdmUpIHtcclxuICAgICAgdGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQubmVnYXRpdmUgPSBNYXRoLm1heCh0aGlzLmRhdGFMYWJlbE1heEhlaWdodC5uZWdhdGl2ZSwgZXZlbnQuc2l6ZS5oZWlnaHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQucG9zaXRpdmUgPSBNYXRoLm1heCh0aGlzLmRhdGFMYWJlbE1heEhlaWdodC5wb3NpdGl2ZSwgZXZlbnQuc2l6ZS5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGdyb3VwSW5kZXggPT09IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRHcm91cFNjYWxlKCk6IGFueSB7XHJcbiAgICBjb25zdCBzcGFjaW5nID0gdGhpcy5ncm91cERvbWFpbi5sZW5ndGggLyAodGhpcy5kaW1zLmhlaWdodCAvIHRoaXMuZ3JvdXBQYWRkaW5nICsgMSk7XHJcblxyXG4gICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgIC5yYW5nZVJvdW5kKFswLCB0aGlzLmRpbXMud2lkdGhdKVxyXG4gICAgICAucGFkZGluZ0lubmVyKHNwYWNpbmcpXHJcbiAgICAgIC5wYWRkaW5nT3V0ZXIoc3BhY2luZyAvIDIpXHJcbiAgICAgIC5kb21haW4odGhpcy5ncm91cERvbWFpbik7XHJcbiAgfVxyXG5cclxuICBnZXRJbm5lclNjYWxlKCk6IGFueSB7XHJcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ3JvdXBTY2FsZS5iYW5kd2lkdGgoKTtcclxuICAgIGNvbnN0IHNwYWNpbmcgPSB0aGlzLmlubmVyRG9tYWluLmxlbmd0aCAvICh3aWR0aCAvIHRoaXMuYmFyUGFkZGluZyArIDEpO1xyXG4gICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgIC5yYW5nZVJvdW5kKFswLCB3aWR0aF0pXHJcbiAgICAgIC5wYWRkaW5nSW5uZXIoc3BhY2luZylcclxuICAgICAgLmRvbWFpbih0aGlzLmlubmVyRG9tYWluKTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlU2NhbGUoKTogYW55IHtcclxuICAgIGNvbnN0IHNjYWxlID0gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAucmFuZ2UoW3RoaXMuZGltcy5oZWlnaHQsIDBdKVxyXG4gICAgICAuZG9tYWluKHRoaXMudmFsdWVzRG9tYWluKTtcclxuICAgIHJldHVybiB0aGlzLnJvdW5kRG9tYWlucyA/IHNjYWxlLm5pY2UoKSA6IHNjYWxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0R3JvdXBEb21haW4oKSB7XHJcbiAgICBjb25zdCBkb21haW4gPSBbXTtcclxuICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5yZXN1bHRzKSB7XHJcbiAgICAgIGlmICghZG9tYWluLmluY2x1ZGVzKGdyb3VwLmxhYmVsKSkge1xyXG4gICAgICAgIGRvbWFpbi5wdXNoKGdyb3VwLmxhYmVsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkb21haW47XHJcbiAgfVxyXG5cclxuICBnZXRJbm5lckRvbWFpbigpIHtcclxuICAgIGNvbnN0IGRvbWFpbiA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLnJlc3VsdHMpIHtcclxuICAgICAgZm9yIChjb25zdCBkIG9mIGdyb3VwLnNlcmllcykge1xyXG4gICAgICAgIGlmICghZG9tYWluLmluY2x1ZGVzKGQubGFiZWwpKSB7XHJcbiAgICAgICAgICBkb21haW4ucHVzaChkLmxhYmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZG9tYWluO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWVEb21haW4oKSB7XHJcbiAgICBjb25zdCBkb21haW4gPSBbXTtcclxuICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5yZXN1bHRzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgZCBvZiBncm91cC5zZXJpZXMpIHtcclxuICAgICAgICBpZiAoIWRvbWFpbi5pbmNsdWRlcyhkLnZhbHVlKSkge1xyXG4gICAgICAgICAgZG9tYWluLnB1c2goZC52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWluID0gTWF0aC5taW4oMCwgLi4uZG9tYWluKTtcclxuICAgIGNvbnN0IG1heCA9IHRoaXMueVNjYWxlTWF4ID8gTWF0aC5tYXgodGhpcy55U2NhbGVNYXgsIC4uLmRvbWFpbikgOiBNYXRoLm1heCgwLCAuLi5kb21haW4pO1xyXG5cclxuICAgIHJldHVybiBbbWluLCBtYXhdO1xyXG4gIH1cclxuXHJcbiAgZ3JvdXBUcmFuc2Zvcm0oZ3JvdXApIHtcclxuICAgIHJldHVybiBgdHJhbnNsYXRlKCR7dGhpcy5ncm91cFNjYWxlKGdyb3VwLmxhYmVsKX0sIDApYDtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSwgZ3JvdXA/KSB7XHJcbiAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgZGF0YS5zZXJpZXMgPSBncm91cC5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbS5uYW1lO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xyXG4gICAgbGV0IGRvbWFpbjtcclxuICAgIGlmICh0aGlzLnNjaGVtZVR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICBkb21haW4gPSB0aGlzLmlubmVyRG9tYWluO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tYWluID0gdGhpcy52YWx1ZXNEb21haW47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsIHRoaXMuc2NoZW1lVHlwZSwgZG9tYWluLCB0aGlzLmN1c3RvbUNvbG9ycyk7XHJcbiAgfVxyXG5cclxuICBnZXRMZWdlbmRPcHRpb25zKCkge1xyXG4gICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgc2NhbGVUeXBlOiB0aGlzLnNjaGVtZVR5cGUsXHJcbiAgICAgIGNvbG9yczogdW5kZWZpbmVkLFxyXG4gICAgICBkb21haW46IFtdLFxyXG4gICAgICB0aXRsZTogdW5kZWZpbmVkLFxyXG4gICAgICBwb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxyXG4gICAgfTtcclxuICAgIGlmIChvcHRzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XHJcbiAgICAgIG9wdHMuZG9tYWluID0gdGhpcy5pbm5lckRvbWFpbjtcclxuICAgICAgb3B0cy5jb2xvcnMgPSB0aGlzLmNvbG9ycztcclxuICAgICAgb3B0cy50aXRsZSA9IHRoaXMubGVnZW5kVGl0bGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcHRzLmRvbWFpbiA9IHRoaXMudmFsdWVzRG9tYWluO1xyXG4gICAgICBvcHRzLmNvbG9ycyA9IHRoaXMuY29sb3JzLnNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRzO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlWUF4aXNXaWR0aCh7IHdpZHRoIH0pIHtcclxuICAgIHRoaXMueUF4aXNXaWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVhBeGlzSGVpZ2h0KHsgaGVpZ2h0IH0pIHtcclxuICAgIHRoaXMueEF4aXNIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgb25BY3RpdmF0ZShldmVudCwgZ3JvdXAsIGZyb21MZWdlbmQgPSBmYWxzZSkge1xyXG4gICAgY29uc3QgaXRlbSA9IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KTtcclxuICAgIGlmIChncm91cCkge1xyXG4gICAgICBpdGVtLnNlcmllcyA9IGdyb3VwLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnJlc3VsdHNcclxuICAgICAgLm1hcChnID0+IGcuc2VyaWVzKVxyXG4gICAgICAuZmxhdCgpXHJcbiAgICAgIC5maWx0ZXIoaSA9PiB7XHJcbiAgICAgICAgaWYgKGZyb21MZWdlbmQpIHtcclxuICAgICAgICAgIHJldHVybiBpLmxhYmVsID09PSBpdGVtLm5hbWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBpLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBpLnNlcmllcyA9PT0gaXRlbS5zZXJpZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbLi4uaXRlbXNdO1xyXG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcclxuICB9XHJcblxyXG4gIG9uRGVhY3RpdmF0ZShldmVudCwgZ3JvdXAsIGZyb21MZWdlbmQgPSBmYWxzZSkge1xyXG4gICAgY29uc3QgaXRlbSA9IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KTtcclxuICAgIGlmIChncm91cCkge1xyXG4gICAgICBpdGVtLnNlcmllcyA9IGdyb3VwLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbHRlcihpID0+IHtcclxuICAgICAgaWYgKGZyb21MZWdlbmQpIHtcclxuICAgICAgICByZXR1cm4gaS5sYWJlbCAhPT0gaXRlbS5uYW1lO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAhKGkubmFtZSA9PT0gaXRlbS5uYW1lICYmIGkuc2VyaWVzID09PSBpdGVtLnNlcmllcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcclxuICB9XHJcbn1cclxuIl19