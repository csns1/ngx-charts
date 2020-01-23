import { __decorate, __extends, __read, __spread, __values } from "tslib";
import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostListener, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { curveLinear } from 'd3-shape';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { id } from '../utils/id';
import { getUniqueXDomainValues, getScaleType } from '../common/domain.helper';
var LineChartComponent = /** @class */ (function (_super) {
    __extends(LineChartComponent, _super);
    function LineChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.showGridLines = true;
        _this.curve = curveLinear;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.showRefLines = false;
        _this.showRefLabels = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        return _this;
    }
    LineChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
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
        if (this.timeline) {
            this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = "url(#" + this.clipPathId + ")";
    };
    LineChartComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    LineChartComponent.prototype.getXDomain = function () {
        var values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        var domain = [];
        if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
        }
        var min;
        var max;
        if (this.scaleType === 'time' || this.scaleType === 'linear') {
            min = this.xScaleMin ? this.xScaleMin : Math.min.apply(Math, __spread(values));
            max = this.xScaleMax ? this.xScaleMax : Math.max.apply(Math, __spread(values));
        }
        if (this.scaleType === 'time') {
            domain = [new Date(min), new Date(max)];
            this.xSet = __spread(values).sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            domain = [min, max];
            // Use compare function to sort numbers numerically
            this.xSet = __spread(values).sort(function (a, b) { return a - b; });
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    };
    LineChartComponent.prototype.getYDomain = function () {
        var e_1, _a, e_2, _b;
        var domain = [];
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var results = _d.value;
                try {
                    for (var _e = (e_2 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (domain.indexOf(d.value) < 0) {
                            domain.push(d.value);
                        }
                        if (d.min !== undefined) {
                            this.hasRange = true;
                            if (domain.indexOf(d.min) < 0) {
                                domain.push(d.min);
                            }
                        }
                        if (d.max !== undefined) {
                            this.hasRange = true;
                            if (domain.indexOf(d.max) < 0) {
                                domain.push(d.max);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var values = __spread(domain);
        if (!this.autoScale) {
            values.push(0);
        }
        var min = this.yScaleMin ? this.yScaleMin : Math.min.apply(Math, __spread(values));
        var max = this.yScaleMax ? this.yScaleMax : Math.max.apply(Math, __spread(values));
        return [min, max];
    };
    LineChartComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    LineChartComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = scaleTime()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear()
                .range([0, width])
                .domain(domain);
            if (this.roundDomains) {
                scale = scale.nice();
            }
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .range([0, width])
                .padding(0.1)
                .domain(domain);
        }
        return scale;
    };
    LineChartComponent.prototype.getYScale = function (domain, height) {
        var scale = scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    LineChartComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    LineChartComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    LineChartComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    LineChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    LineChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    LineChartComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    LineChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    LineChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    LineChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    LineChartComponent.prototype.onActivate = function (item) {
        this.deactivateAll();
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item];
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    LineChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = __spread(this.activeEntries);
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    LineChartComponent.prototype.deactivateAll = function () {
        var e_3, _a;
        this.activeEntries = __spread(this.activeEntries);
        try {
            for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                var entry = _c.value;
                this.deactivate.emit({ value: entry, entries: [] });
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.activeEntries = [];
    };
    __decorate([
        Input()
    ], LineChartComponent.prototype, "legend", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xAxis", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yAxis", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "autoScale", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "timeline", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "curve", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "schemeType", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "rangeFillOpacity", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "showRefLines", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "referenceLines", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "showRefLabels", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xScaleMin", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xScaleMax", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yScaleMin", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yScaleMax", void 0);
    __decorate([
        Output()
    ], LineChartComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], LineChartComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate')
    ], LineChartComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        ContentChild('seriesTooltipTemplate')
    ], LineChartComponent.prototype, "seriesTooltipTemplate", void 0);
    __decorate([
        HostListener('mouseleave')
    ], LineChartComponent.prototype, "hideCircles", null);
    LineChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-line-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"line-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          [referenceLines]=\"referenceLines\"\n          [showRefLines]=\"showRefLines\"\n          [showRefLabels]=\"showRefLabels\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\" [@animationState]=\"'active'\">\n            <svg:g\n              ngx-charts-line-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [curve]=\"curve\"\n              [rangeFillOpacity]=\"rangeFillOpacity\"\n              [hasRange]=\"hasRange\"\n              [animations]=\"animations\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g\n              ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results\">\n              <svg:g\n                ngx-charts-circle-series\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [activeEntries]=\"activeEntries\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g\n        ngx-charts-timeline\n        *ngIf=\"timeline && scaleType != 'ordinal'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [scaleType]=\"scaleType\"\n        [legend]=\"legend\"\n        (onDomainChange)=\"updateDomain($event)\"\n      >\n        <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n          <svg:g\n            ngx-charts-line-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [curve]=\"curve\"\n            [hasRange]=\"hasRange\"\n            [animations]=\"animations\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({
                            opacity: 0
                        }))
                    ])
                ])
            ],
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
        })
    ], LineChartComponent);
    return LineChartComponent;
}(BaseChartComponent));
export { LineChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9saW5lLWNoYXJ0L2xpbmUtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdkMsT0FBTyxFQUFFLHVCQUF1QixFQUFrQixNQUFNLGtDQUFrQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQTRKL0U7SUFBd0Msc0NBQWtCO0lBQTFEO1FBQUEscUVBNlVDO1FBM1VVLGlCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLG9CQUFjLEdBQVcsT0FBTyxDQUFDO1FBVWpDLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLFdBQUssR0FBUSxXQUFXLENBQUM7UUFDekIsbUJBQWEsR0FBVSxFQUFFLENBQUM7UUFHMUIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0Isb0JBQWMsR0FB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QVMsQ0FBQztZQUNULFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsUUFBUSxFQUFFLG90SkFvSVQ7WUFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxVQUFVLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLGdCQUFnQixFQUFFO29CQUN4QixVQUFVLENBQUMsUUFBUSxFQUFFO3dCQUNuQixLQUFLLENBQUM7NEJBQ0osT0FBTyxFQUFFLENBQUM7eUJBQ1gsQ0FBQzt3QkFDRixPQUFPLENBQ0wsR0FBRyxFQUNILEtBQUssQ0FBQzs0QkFDSixPQUFPLEVBQUUsQ0FBQzt5QkFDWCxDQUFDLENBQ0g7cUJBQ0YsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7O1NBQ0YsQ0FBQztPQUNXLGtCQUFrQixDQTZVOUI7SUFBRCx5QkFBQztDQUFBLEFBN1VELENBQXdDLGtCQUFrQixHQTZVekQ7U0E3VVksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IHNjYWxlTGluZWFyLCBzY2FsZVRpbWUsIHNjYWxlUG9pbnQgfSBmcm9tICdkMy1zY2FsZSc7XHJcbmltcG9ydCB7IGN1cnZlTGluZWFyIH0gZnJvbSAnZDMtc2hhcGUnO1xyXG5cclxuaW1wb3J0IHsgY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMsIFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3ZpZXctZGltZW5zaW9ucy5oZWxwZXInO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xyXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcclxuaW1wb3J0IHsgZ2V0VW5pcXVlWERvbWFpblZhbHVlcywgZ2V0U2NhbGVUeXBlIH0gZnJvbSAnLi4vY29tbW9uL2RvbWFpbi5oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWxpbmUtY2hhcnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmd4LWNoYXJ0cy1jaGFydFxyXG4gICAgICBbdmlld109XCJbd2lkdGgsIGhlaWdodF1cIlxyXG4gICAgICBbc2hvd0xlZ2VuZF09XCJsZWdlbmRcIlxyXG4gICAgICBbbGVnZW5kT3B0aW9uc109XCJsZWdlbmRPcHRpb25zXCJcclxuICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXHJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAobGVnZW5kTGFiZWxDbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAobGVnZW5kTGFiZWxBY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIlxyXG4gICAgICAobGVnZW5kTGFiZWxEZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgID5cclxuICAgICAgPHN2ZzpkZWZzPlxyXG4gICAgICAgIDxzdmc6Y2xpcFBhdGggW2F0dHIuaWRdPVwiY2xpcFBhdGhJZFwiPlxyXG4gICAgICAgICAgPHN2ZzpyZWN0XHJcbiAgICAgICAgICAgIFthdHRyLndpZHRoXT1cImRpbXMud2lkdGggKyAxMFwiXHJcbiAgICAgICAgICAgIFthdHRyLmhlaWdodF09XCJkaW1zLmhlaWdodCArIDEwXCJcclxuICAgICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cIid0cmFuc2xhdGUoLTUsIC01KSdcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L3N2ZzpjbGlwUGF0aD5cclxuICAgICAgPC9zdmc6ZGVmcz5cclxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cImxpbmUtY2hhcnQgY2hhcnRcIj5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMteC1heGlzXHJcbiAgICAgICAgICAqbmdJZj1cInhBeGlzXCJcclxuICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcclxuICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxyXG4gICAgICAgICAgW3Nob3dHcmlkTGluZXNdPVwic2hvd0dyaWRMaW5lc1wiXHJcbiAgICAgICAgICBbc2hvd0xhYmVsXT1cInNob3dYQXhpc0xhYmVsXCJcclxuICAgICAgICAgIFtsYWJlbFRleHRdPVwieEF4aXNMYWJlbFwiXHJcbiAgICAgICAgICBbdHJpbVRpY2tzXT1cInRyaW1YQXhpc1RpY2tzXCJcclxuICAgICAgICAgIFtyb3RhdGVUaWNrc109XCJyb3RhdGVYQXhpc1RpY2tzXCJcclxuICAgICAgICAgIFttYXhUaWNrTGVuZ3RoXT1cIm1heFhBeGlzVGlja0xlbmd0aFwiXHJcbiAgICAgICAgICBbdGlja0Zvcm1hdHRpbmddPVwieEF4aXNUaWNrRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbdGlja3NdPVwieEF4aXNUaWNrc1wiXHJcbiAgICAgICAgICAoZGltZW5zaW9uc0NoYW5nZWQpPVwidXBkYXRlWEF4aXNIZWlnaHQoJGV2ZW50KVwiXHJcbiAgICAgICAgPjwvc3ZnOmc+XHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLXktYXhpc1xyXG4gICAgICAgICAgKm5nSWY9XCJ5QXhpc1wiXHJcbiAgICAgICAgICBbeVNjYWxlXT1cInlTY2FsZVwiXHJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgIFtzaG93R3JpZExpbmVzXT1cInNob3dHcmlkTGluZXNcIlxyXG4gICAgICAgICAgW3Nob3dMYWJlbF09XCJzaG93WUF4aXNMYWJlbFwiXHJcbiAgICAgICAgICBbbGFiZWxUZXh0XT1cInlBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW3RyaW1UaWNrc109XCJ0cmltWUF4aXNUaWNrc1wiXHJcbiAgICAgICAgICBbbWF4VGlja0xlbmd0aF09XCJtYXhZQXhpc1RpY2tMZW5ndGhcIlxyXG4gICAgICAgICAgW3RpY2tGb3JtYXR0aW5nXT1cInlBeGlzVGlja0Zvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgW3RpY2tzXT1cInlBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW3JlZmVyZW5jZUxpbmVzXT1cInJlZmVyZW5jZUxpbmVzXCJcclxuICAgICAgICAgIFtzaG93UmVmTGluZXNdPVwic2hvd1JlZkxpbmVzXCJcclxuICAgICAgICAgIFtzaG93UmVmTGFiZWxzXT1cInNob3dSZWZMYWJlbHNcIlxyXG4gICAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cInVwZGF0ZVlBeGlzV2lkdGgoJGV2ZW50KVwiXHJcbiAgICAgICAgPjwvc3ZnOmc+XHJcbiAgICAgICAgPHN2ZzpnIFthdHRyLmNsaXAtcGF0aF09XCJjbGlwUGF0aFwiPlxyXG4gICAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBzZXJpZXMgb2YgcmVzdWx0czsgdHJhY2tCeTogdHJhY2tCeVwiIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIj5cclxuICAgICAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICAgICAgbmd4LWNoYXJ0cy1saW5lLXNlcmllc1xyXG4gICAgICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcclxuICAgICAgICAgICAgICBbeVNjYWxlXT1cInlTY2FsZVwiXHJcbiAgICAgICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxyXG4gICAgICAgICAgICAgIFtkYXRhXT1cInNlcmllc1wiXHJcbiAgICAgICAgICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXHJcbiAgICAgICAgICAgICAgW3NjYWxlVHlwZV09XCJzY2FsZVR5cGVcIlxyXG4gICAgICAgICAgICAgIFtjdXJ2ZV09XCJjdXJ2ZVwiXHJcbiAgICAgICAgICAgICAgW3JhbmdlRmlsbE9wYWNpdHldPVwicmFuZ2VGaWxsT3BhY2l0eVwiXHJcbiAgICAgICAgICAgICAgW2hhc1JhbmdlXT1cImhhc1JhbmdlXCJcclxuICAgICAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvc3ZnOmc+XHJcblxyXG4gICAgICAgICAgPHN2ZzpnICpuZ0lmPVwiIXRvb2x0aXBEaXNhYmxlZFwiIChtb3VzZWxlYXZlKT1cImhpZGVDaXJjbGVzKClcIj5cclxuICAgICAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICAgICAgbmd4LWNoYXJ0cy10b29sdGlwLWFyZWFcclxuICAgICAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgICAgICBbeFNldF09XCJ4U2V0XCJcclxuICAgICAgICAgICAgICBbeFNjYWxlXT1cInhTY2FsZVwiXHJcbiAgICAgICAgICAgICAgW3lTY2FsZV09XCJ5U2NhbGVcIlxyXG4gICAgICAgICAgICAgIFtyZXN1bHRzXT1cInJlc3VsdHNcIlxyXG4gICAgICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcclxuICAgICAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJzZXJpZXNUb29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgIChob3Zlcik9XCJ1cGRhdGVIb3ZlcmVkVmVydGljYWwoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHNlcmllcyBvZiByZXN1bHRzXCI+XHJcbiAgICAgICAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICAgICAgICBuZ3gtY2hhcnRzLWNpcmNsZS1zZXJpZXNcclxuICAgICAgICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcclxuICAgICAgICAgICAgICAgIFt5U2NhbGVdPVwieVNjYWxlXCJcclxuICAgICAgICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcclxuICAgICAgICAgICAgICAgIFtkYXRhXT1cInNlcmllc1wiXHJcbiAgICAgICAgICAgICAgICBbc2NhbGVUeXBlXT1cInNjYWxlVHlwZVwiXHJcbiAgICAgICAgICAgICAgICBbdmlzaWJsZVZhbHVlXT1cImhvdmVyZWRWZXJ0aWNhbFwiXHJcbiAgICAgICAgICAgICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcclxuICAgICAgICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcclxuICAgICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgIChhY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgKGRlYWN0aXZhdGUpPVwib25EZWFjdGl2YXRlKCRldmVudClcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvc3ZnOmc+XHJcbiAgICAgICAgICA8L3N2ZzpnPlxyXG4gICAgICAgIDwvc3ZnOmc+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICAgIDxzdmc6Z1xyXG4gICAgICAgIG5neC1jaGFydHMtdGltZWxpbmVcclxuICAgICAgICAqbmdJZj1cInRpbWVsaW5lICYmIHNjYWxlVHlwZSAhPSAnb3JkaW5hbCdcIlxyXG4gICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0aW1lbGluZVRyYW5zZm9ybVwiXHJcbiAgICAgICAgW3Jlc3VsdHNdPVwicmVzdWx0c1wiXHJcbiAgICAgICAgW3ZpZXddPVwiW3RpbWVsaW5lV2lkdGgsIGhlaWdodF1cIlxyXG4gICAgICAgIFtoZWlnaHRdPVwidGltZWxpbmVIZWlnaHRcIlxyXG4gICAgICAgIFtzY2hlbWVdPVwic2NoZW1lXCJcclxuICAgICAgICBbY3VzdG9tQ29sb3JzXT1cImN1c3RvbUNvbG9yc1wiXHJcbiAgICAgICAgW3NjYWxlVHlwZV09XCJzY2FsZVR5cGVcIlxyXG4gICAgICAgIFtsZWdlbmRdPVwibGVnZW5kXCJcclxuICAgICAgICAob25Eb21haW5DaGFuZ2UpPVwidXBkYXRlRG9tYWluKCRldmVudClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBzZXJpZXMgb2YgcmVzdWx0czsgdHJhY2tCeTogdHJhY2tCeVwiPlxyXG4gICAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICAgIG5neC1jaGFydHMtbGluZS1zZXJpZXNcclxuICAgICAgICAgICAgW3hTY2FsZV09XCJ0aW1lbGluZVhTY2FsZVwiXHJcbiAgICAgICAgICAgIFt5U2NhbGVdPVwidGltZWxpbmVZU2NhbGVcIlxyXG4gICAgICAgICAgICBbY29sb3JzXT1cImNvbG9yc1wiXHJcbiAgICAgICAgICAgIFtkYXRhXT1cInNlcmllc1wiXHJcbiAgICAgICAgICAgIFtzY2FsZVR5cGVdPVwic2NhbGVUeXBlXCJcclxuICAgICAgICAgICAgW2N1cnZlXT1cImN1cnZlXCJcclxuICAgICAgICAgICAgW2hhc1JhbmdlXT1cImhhc1JhbmdlXCJcclxuICAgICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvc3ZnOmc+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICA8L25neC1jaGFydHMtY2hhcnQ+XHJcbiAgYCxcclxuICBzdHlsZVVybHM6IFsnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xyXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgICA1MDAsXHJcbiAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaW5lQ2hhcnRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGxlZ2VuZDtcclxuICBASW5wdXQoKSBsZWdlbmRUaXRsZTogc3RyaW5nID0gJ0xlZ2VuZCc7XHJcbiAgQElucHV0KCkgbGVnZW5kUG9zaXRpb246IHN0cmluZyA9ICdyaWdodCc7XHJcbiAgQElucHV0KCkgeEF4aXM7XHJcbiAgQElucHV0KCkgeUF4aXM7XHJcbiAgQElucHV0KCkgc2hvd1hBeGlzTGFiZWw7XHJcbiAgQElucHV0KCkgc2hvd1lBeGlzTGFiZWw7XHJcbiAgQElucHV0KCkgeEF4aXNMYWJlbDtcclxuICBASW5wdXQoKSB5QXhpc0xhYmVsO1xyXG4gIEBJbnB1dCgpIGF1dG9TY2FsZTtcclxuICBASW5wdXQoKSB0aW1lbGluZTtcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzaG93R3JpZExpbmVzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBjdXJ2ZTogYW55ID0gY3VydmVMaW5lYXI7XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W10gPSBbXTtcclxuICBASW5wdXQoKSBzY2hlbWVUeXBlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcmFuZ2VGaWxsT3BhY2l0eTogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHRyaW1YQXhpc1RpY2tzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSB0cmltWUF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgcm90YXRlWEF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgbWF4WEF4aXNUaWNrTGVuZ3RoOiBudW1iZXIgPSAxNjtcclxuICBASW5wdXQoKSBtYXhZQXhpc1RpY2tMZW5ndGg6IG51bWJlciA9IDE2O1xyXG4gIEBJbnB1dCgpIHhBeGlzVGlja0Zvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSB5QXhpc1RpY2tGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgeEF4aXNUaWNrczogYW55W107XHJcbiAgQElucHV0KCkgeUF4aXNUaWNrczogYW55W107XHJcbiAgQElucHV0KCkgcm91bmREb21haW5zOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc2hvd1JlZkxpbmVzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcmVmZXJlbmNlTGluZXM6IGFueTtcclxuICBASW5wdXQoKSBzaG93UmVmTGFiZWxzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSB4U2NhbGVNaW46IGFueTtcclxuICBASW5wdXQoKSB4U2NhbGVNYXg6IGFueTtcclxuICBASW5wdXQoKSB5U2NhbGVNaW46IG51bWJlcjtcclxuICBASW5wdXQoKSB5U2NhbGVNYXg6IG51bWJlcjtcclxuXHJcbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoJ3Rvb2x0aXBUZW1wbGF0ZScpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBAQ29udGVudENoaWxkKCdzZXJpZXNUb29sdGlwVGVtcGxhdGUnKSBzZXJpZXNUb29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xyXG4gIHhTZXQ6IGFueTtcclxuICB4RG9tYWluOiBhbnk7XHJcbiAgeURvbWFpbjogYW55O1xyXG4gIHNlcmllc0RvbWFpbjogYW55O1xyXG4gIHlTY2FsZTogYW55O1xyXG4gIHhTY2FsZTogYW55O1xyXG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XHJcbiAgc2NhbGVUeXBlOiBzdHJpbmc7XHJcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XHJcbiAgY2xpcFBhdGg6IHN0cmluZztcclxuICBjbGlwUGF0aElkOiBzdHJpbmc7XHJcbiAgc2VyaWVzOiBhbnk7XHJcbiAgYXJlYVBhdGg6IGFueTtcclxuICBtYXJnaW4gPSBbMTAsIDIwLCAxMCwgMjBdO1xyXG4gIGhvdmVyZWRWZXJ0aWNhbDogYW55OyAvLyB0aGUgdmFsdWUgb2YgdGhlIHggYXhpcyB0aGF0IGlzIGhvdmVyZWQgb3ZlclxyXG4gIHhBeGlzSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gIHlBeGlzV2lkdGg6IG51bWJlciA9IDA7XHJcbiAgZmlsdGVyZWREb21haW46IGFueTtcclxuICBsZWdlbmRPcHRpb25zOiBhbnk7XHJcbiAgaGFzUmFuZ2U6IGJvb2xlYW47IC8vIHdoZXRoZXIgdGhlIGxpbmUgaGFzIGEgbWluLW1heCByYW5nZSBhcm91bmQgaXRcclxuICB0aW1lbGluZVdpZHRoOiBhbnk7XHJcbiAgdGltZWxpbmVIZWlnaHQ6IG51bWJlciA9IDUwO1xyXG4gIHRpbWVsaW5lWFNjYWxlOiBhbnk7XHJcbiAgdGltZWxpbmVZU2NhbGU6IGFueTtcclxuICB0aW1lbGluZVhEb21haW46IGFueTtcclxuICB0aW1lbGluZVRyYW5zZm9ybTogYW55O1xyXG4gIHRpbWVsaW5lUGFkZGluZzogbnVtYmVyID0gMTA7XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG5cclxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcclxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXHJcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXHJcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luLFxyXG4gICAgICBzaG93WEF4aXM6IHRoaXMueEF4aXMsXHJcbiAgICAgIHNob3dZQXhpczogdGhpcy55QXhpcyxcclxuICAgICAgeEF4aXNIZWlnaHQ6IHRoaXMueEF4aXNIZWlnaHQsXHJcbiAgICAgIHlBeGlzV2lkdGg6IHRoaXMueUF4aXNXaWR0aCxcclxuICAgICAgc2hvd1hMYWJlbDogdGhpcy5zaG93WEF4aXNMYWJlbCxcclxuICAgICAgc2hvd1lMYWJlbDogdGhpcy5zaG93WUF4aXNMYWJlbCxcclxuICAgICAgc2hvd0xlZ2VuZDogdGhpcy5sZWdlbmQsXHJcbiAgICAgIGxlZ2VuZFR5cGU6IHRoaXMuc2NoZW1lVHlwZSxcclxuICAgICAgbGVnZW5kUG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnRpbWVsaW5lKSB7XHJcbiAgICAgIHRoaXMuZGltcy5oZWlnaHQgLT0gdGhpcy50aW1lbGluZUhlaWdodCArIHRoaXMubWFyZ2luWzJdICsgdGhpcy50aW1lbGluZVBhZGRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy54RG9tYWluID0gdGhpcy5nZXRYRG9tYWluKCk7XHJcbiAgICBpZiAodGhpcy5maWx0ZXJlZERvbWFpbikge1xyXG4gICAgICB0aGlzLnhEb21haW4gPSB0aGlzLmZpbHRlcmVkRG9tYWluO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMueURvbWFpbiA9IHRoaXMuZ2V0WURvbWFpbigpO1xyXG4gICAgdGhpcy5zZXJpZXNEb21haW4gPSB0aGlzLmdldFNlcmllc0RvbWFpbigpO1xyXG5cclxuICAgIHRoaXMueFNjYWxlID0gdGhpcy5nZXRYU2NhbGUodGhpcy54RG9tYWluLCB0aGlzLmRpbXMud2lkdGgpO1xyXG4gICAgdGhpcy55U2NhbGUgPSB0aGlzLmdldFlTY2FsZSh0aGlzLnlEb21haW4sIHRoaXMuZGltcy5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlVGltZWxpbmUoKTtcclxuXHJcbiAgICB0aGlzLnNldENvbG9ycygpO1xyXG4gICAgdGhpcy5sZWdlbmRPcHRpb25zID0gdGhpcy5nZXRMZWdlbmRPcHRpb25zKCk7XHJcblxyXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy5kaW1zLnhPZmZzZXR9ICwgJHt0aGlzLm1hcmdpblswXX0pYDtcclxuXHJcbiAgICB0aGlzLmNsaXBQYXRoSWQgPSAnY2xpcCcgKyBpZCgpLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLmNsaXBQYXRoID0gYHVybCgjJHt0aGlzLmNsaXBQYXRoSWR9KWA7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVUaW1lbGluZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRpbWVsaW5lKSB7XHJcbiAgICAgIHRoaXMudGltZWxpbmVXaWR0aCA9IHRoaXMuZGltcy53aWR0aDtcclxuICAgICAgdGhpcy50aW1lbGluZVhEb21haW4gPSB0aGlzLmdldFhEb21haW4oKTtcclxuICAgICAgdGhpcy50aW1lbGluZVhTY2FsZSA9IHRoaXMuZ2V0WFNjYWxlKHRoaXMudGltZWxpbmVYRG9tYWluLCB0aGlzLnRpbWVsaW5lV2lkdGgpO1xyXG4gICAgICB0aGlzLnRpbWVsaW5lWVNjYWxlID0gdGhpcy5nZXRZU2NhbGUodGhpcy55RG9tYWluLCB0aGlzLnRpbWVsaW5lSGVpZ2h0KTtcclxuICAgICAgdGhpcy50aW1lbGluZVRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLmRpbXMueE9mZnNldH0sICR7LXRoaXMubWFyZ2luWzJdfSlgO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0WERvbWFpbigpOiBhbnlbXSB7XHJcbiAgICBsZXQgdmFsdWVzID0gZ2V0VW5pcXVlWERvbWFpblZhbHVlcyh0aGlzLnJlc3VsdHMpO1xyXG5cclxuICAgIHRoaXMuc2NhbGVUeXBlID0gZ2V0U2NhbGVUeXBlKHZhbHVlcyk7XHJcbiAgICBsZXQgZG9tYWluID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMubWFwKHYgPT4gTnVtYmVyKHYpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbWluO1xyXG4gICAgbGV0IG1heDtcclxuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnIHx8IHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICBtaW4gPSB0aGlzLnhTY2FsZU1pbiA/IHRoaXMueFNjYWxlTWluIDogTWF0aC5taW4oLi4udmFsdWVzKTtcclxuXHJcbiAgICAgIG1heCA9IHRoaXMueFNjYWxlTWF4ID8gdGhpcy54U2NhbGVNYXggOiBNYXRoLm1heCguLi52YWx1ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XHJcbiAgICAgIGRvbWFpbiA9IFtuZXcgRGF0ZShtaW4pLCBuZXcgRGF0ZShtYXgpXTtcclxuICAgICAgdGhpcy54U2V0ID0gWy4uLnZhbHVlc10uc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFEYXRlID0gYS5nZXRUaW1lKCk7XHJcbiAgICAgICAgY29uc3QgYkRhdGUgPSBiLmdldFRpbWUoKTtcclxuICAgICAgICBpZiAoYURhdGUgPiBiRGF0ZSkgcmV0dXJuIDE7XHJcbiAgICAgICAgaWYgKGJEYXRlID4gYURhdGUpIHJldHVybiAtMTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICBkb21haW4gPSBbbWluLCBtYXhdO1xyXG4gICAgICAvLyBVc2UgY29tcGFyZSBmdW5jdGlvbiB0byBzb3J0IG51bWJlcnMgbnVtZXJpY2FsbHlcclxuICAgICAgdGhpcy54U2V0ID0gWy4uLnZhbHVlc10uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tYWluID0gdmFsdWVzO1xyXG4gICAgICB0aGlzLnhTZXQgPSB2YWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRvbWFpbjtcclxuICB9XHJcblxyXG4gIGdldFlEb21haW4oKTogYW55W10ge1xyXG4gICAgY29uc3QgZG9tYWluID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdHMgb2YgdGhpcy5yZXN1bHRzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgZCBvZiByZXN1bHRzLnNlcmllcykge1xyXG4gICAgICAgIGlmIChkb21haW4uaW5kZXhPZihkLnZhbHVlKSA8IDApIHtcclxuICAgICAgICAgIGRvbWFpbi5wdXNoKGQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZC5taW4gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5oYXNSYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoZG9tYWluLmluZGV4T2YoZC5taW4pIDwgMCkge1xyXG4gICAgICAgICAgICBkb21haW4ucHVzaChkLm1pbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkLm1heCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLmhhc1JhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgIGlmIChkb21haW4uaW5kZXhPZihkLm1heCkgPCAwKSB7XHJcbiAgICAgICAgICAgIGRvbWFpbi5wdXNoKGQubWF4KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWx1ZXMgPSBbLi4uZG9tYWluXTtcclxuICAgIGlmICghdGhpcy5hdXRvU2NhbGUpIHtcclxuICAgICAgdmFsdWVzLnB1c2goMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWluID0gdGhpcy55U2NhbGVNaW4gPyB0aGlzLnlTY2FsZU1pbiA6IE1hdGgubWluKC4uLnZhbHVlcyk7XHJcblxyXG4gICAgY29uc3QgbWF4ID0gdGhpcy55U2NhbGVNYXggPyB0aGlzLnlTY2FsZU1heCA6IE1hdGgubWF4KC4uLnZhbHVlcyk7XHJcblxyXG4gICAgcmV0dXJuIFttaW4sIG1heF07XHJcbiAgfVxyXG5cclxuICBnZXRTZXJpZXNEb21haW4oKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0cy5tYXAoZCA9PiBkLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0WFNjYWxlKGRvbWFpbiwgd2lkdGgpOiBhbnkge1xyXG4gICAgbGV0IHNjYWxlO1xyXG5cclxuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XHJcbiAgICAgIHNjYWxlID0gc2NhbGVUaW1lKClcclxuICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcclxuICAgICAgICAuZG9tYWluKGRvbWFpbik7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICBzY2FsZSA9IHNjYWxlTGluZWFyKClcclxuICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcclxuICAgICAgICAuZG9tYWluKGRvbWFpbik7XHJcblxyXG4gICAgICBpZiAodGhpcy5yb3VuZERvbWFpbnMpIHtcclxuICAgICAgICBzY2FsZSA9IHNjYWxlLm5pY2UoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XHJcbiAgICAgIHNjYWxlID0gc2NhbGVQb2ludCgpXHJcbiAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXHJcbiAgICAgICAgLnBhZGRpbmcoMC4xKVxyXG4gICAgICAgIC5kb21haW4oZG9tYWluKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2NhbGU7XHJcbiAgfVxyXG5cclxuICBnZXRZU2NhbGUoZG9tYWluLCBoZWlnaHQpOiBhbnkge1xyXG4gICAgY29uc3Qgc2NhbGUgPSBzY2FsZUxpbmVhcigpXHJcbiAgICAgIC5yYW5nZShbaGVpZ2h0LCAwXSlcclxuICAgICAgLmRvbWFpbihkb21haW4pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnJvdW5kRG9tYWlucyA/IHNjYWxlLm5pY2UoKSA6IHNjYWxlO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRG9tYWluKGRvbWFpbik6IHZvaWQge1xyXG4gICAgdGhpcy5maWx0ZXJlZERvbWFpbiA9IGRvbWFpbjtcclxuICAgIHRoaXMueERvbWFpbiA9IHRoaXMuZmlsdGVyZWREb21haW47XHJcbiAgICB0aGlzLnhTY2FsZSA9IHRoaXMuZ2V0WFNjYWxlKHRoaXMueERvbWFpbiwgdGhpcy5kaW1zLndpZHRoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUhvdmVyZWRWZXJ0aWNhbChpdGVtKTogdm9pZCB7XHJcbiAgICB0aGlzLmhvdmVyZWRWZXJ0aWNhbCA9IGl0ZW0udmFsdWU7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVBbGwoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxyXG4gIGhpZGVDaXJjbGVzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ob3ZlcmVkVmVydGljYWwgPSBudWxsO1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsKCk7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBpdGVtLm5hbWU7XHJcbiAgfVxyXG5cclxuICBzZXRDb2xvcnMoKTogdm9pZCB7XHJcbiAgICBsZXQgZG9tYWluO1xyXG4gICAgaWYgKHRoaXMuc2NoZW1lVHlwZSA9PT0gJ29yZGluYWwnKSB7XHJcbiAgICAgIGRvbWFpbiA9IHRoaXMuc2VyaWVzRG9tYWluO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tYWluID0gdGhpcy55RG9tYWluO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCB0aGlzLnNjaGVtZVR5cGUsIGRvbWFpbiwgdGhpcy5jdXN0b21Db2xvcnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kT3B0aW9ucygpIHtcclxuICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgIHNjYWxlVHlwZTogdGhpcy5zY2hlbWVUeXBlLFxyXG4gICAgICBjb2xvcnM6IHVuZGVmaW5lZCxcclxuICAgICAgZG9tYWluOiBbXSxcclxuICAgICAgdGl0bGU6IHVuZGVmaW5lZCxcclxuICAgICAgcG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cclxuICAgIH07XHJcbiAgICBpZiAob3B0cy5zY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICBvcHRzLmRvbWFpbiA9IHRoaXMuc2VyaWVzRG9tYWluO1xyXG4gICAgICBvcHRzLmNvbG9ycyA9IHRoaXMuY29sb3JzO1xyXG4gICAgICBvcHRzLnRpdGxlID0gdGhpcy5sZWdlbmRUaXRsZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdHMuZG9tYWluID0gdGhpcy55RG9tYWluO1xyXG4gICAgICBvcHRzLmNvbG9ycyA9IHRoaXMuY29sb3JzLnNjYWxlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdHM7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVZQXhpc1dpZHRoKHsgd2lkdGggfSk6IHZvaWQge1xyXG4gICAgdGhpcy55QXhpc1dpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlWEF4aXNIZWlnaHQoeyBoZWlnaHQgfSk6IHZvaWQge1xyXG4gICAgdGhpcy54QXhpc0hlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICBvbkFjdGl2YXRlKGl0ZW0pIHtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZUFsbCgpO1xyXG5cclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoaWR4ID4gLTEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFtpdGVtXTtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XHJcbiAgfVxyXG5cclxuICBvbkRlYWN0aXZhdGUoaXRlbSkge1xyXG4gICAgY29uc3QgaWR4ID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmRJbmRleChkID0+IHtcclxuICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lICYmIGQudmFsdWUgPT09IGl0ZW0udmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbLi4udGhpcy5hY3RpdmVFbnRyaWVzXTtcclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlQWxsKCkge1xyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gWy4uLnRoaXMuYWN0aXZlRW50cmllc107XHJcbiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIHRoaXMuYWN0aXZlRW50cmllcykge1xyXG4gICAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBlbnRyeSwgZW50cmllczogW10gfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbXTtcclxuICB9XHJcbn1cclxuIl19