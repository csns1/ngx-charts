import { __decorate, __extends, __read, __spread, __values } from "tslib";
import { Component, Input, Output, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { scaleBand, scaleLinear } from 'd3-scale';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
var BarVertical2DComponent = /** @class */ (function (_super) {
    __extends(BarVertical2DComponent, _super);
    function BarVertical2DComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.scaleType = 'ordinal';
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.groupPadding = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.roundEdges = true;
        _this.showDataLabel = false;
        _this.noBarWhenZero = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        return _this;
    }
    BarVertical2DComponent.prototype.update = function () {
        _super.prototype.update.call(this);
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
        this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
    };
    BarVertical2DComponent.prototype.onDataLabelMaxHeightChanged = function (event, groupIndex) {
        var _this = this;
        if (event.size.negative) {
            this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
        }
        else {
            this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
        }
        if (groupIndex === this.results.length - 1) {
            setTimeout(function () { return _this.update(); });
        }
    };
    BarVertical2DComponent.prototype.getGroupScale = function () {
        var spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    };
    BarVertical2DComponent.prototype.getInnerScale = function () {
        var width = this.groupScale.bandwidth();
        var spacing = this.innerDomain.length / (width / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, width])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarVertical2DComponent.prototype.getValueScale = function () {
        var scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valuesDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVertical2DComponent.prototype.getGroupDomain = function () {
        var e_1, _a;
        var domain = [];
        try {
            for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                var group = _c.value;
                if (!domain.includes(group.label)) {
                    domain.push(group.label);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return domain;
    };
    BarVertical2DComponent.prototype.getInnerDomain = function () {
        var e_2, _a, e_3, _b;
        var domain = [];
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var group = _d.value;
                try {
                    for (var _e = (e_3 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (!domain.includes(d.label)) {
                            domain.push(d.label);
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return domain;
    };
    BarVertical2DComponent.prototype.getValueDomain = function () {
        var e_4, _a, e_5, _b;
        var domain = [];
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var group = _d.value;
                try {
                    for (var _e = (e_5 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (!domain.includes(d.value)) {
                            domain.push(d.value);
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
        var min = Math.min.apply(Math, __spread([0], domain));
        var max = this.yScaleMax ? Math.max.apply(Math, __spread([this.yScaleMax], domain)) : Math.max.apply(Math, __spread([0], domain));
        return [min, max];
    };
    BarVertical2DComponent.prototype.groupTransform = function (group) {
        return "translate(" + this.groupScale(group.label) + ", 0)";
    };
    BarVertical2DComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarVertical2DComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarVertical2DComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valuesDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVertical2DComponent.prototype.getLegendOptions = function () {
        var opts = {
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
    };
    BarVertical2DComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVertical2DComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVertical2DComponent.prototype.onActivate = function (event, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var items = this.results
            .map(function (g) { return g.series; })
            .flat()
            .filter(function (i) {
            if (fromLegend) {
                return i.label === item.name;
            }
            else {
                return i.name === item.name && i.series === item.series;
            }
        });
        this.activeEntries = __spread(items);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVertical2DComponent.prototype.onDeactivate = function (event, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        this.activeEntries = this.activeEntries.filter(function (i) {
            if (fromLegend) {
                return i.label !== item.name;
            }
            else {
                return !(i.name === item.name && i.series === item.series);
            }
        });
        this.deactivate.emit({ value: item, entries: this.activeEntries });
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
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-grid-panel-series\n          [xScale]=\"groupScale\"\n          [yScale]=\"valueScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"vertical\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"valueScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-series-vertical\n          *ngFor=\"let group of results; let index = index; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n          [activeEntries]=\"activeEntries\"\n          [xScale]=\"innerScale\"\n          [yScale]=\"valueScale\"\n          [colors]=\"colors\"\n          [series]=\"group.series\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [showDataLabel]=\"showDataLabel\"\n          [dataLabelFormatting]=\"dataLabelFormatting\"\n          [seriesName]=\"group.name\"\n          [roundEdges]=\"roundEdges\"\n          [animations]=\"animations\"\n          [noBarWhenZero]=\"noBarWhenZero\"\n          (select)=\"onClick($event, group)\"\n          (activate)=\"onActivate($event, group)\"\n          (deactivate)=\"onDeactivate($event, group)\"\n          (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event, index)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
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
    return BarVertical2DComponent;
}(BaseChartComponent));
export { BarVertical2DComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLXZlcnRpY2FsLTJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9iYXItdmVydGljYWwtMmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsdUJBQXVCLEVBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBZ0dwRTtJQUE0QywwQ0FBa0I7SUFBOUQ7UUFBQSxxRUEyUUM7UUExUVUsWUFBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGlCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLG9CQUFjLEdBQVcsT0FBTyxDQUFDO1FBT2pDLHFCQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGVBQVMsR0FBRyxTQUFTLENBQUM7UUFFdEIsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsbUJBQWEsR0FBVSxFQUFFLENBQUM7UUFFMUIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0Isb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0Isc0JBQWdCLEdBQVksSUFBSSxDQUFDO1FBQ2pDLHdCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUNoQyx3QkFBa0IsR0FBVyxFQUFFLENBQUM7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UUFBUixLQUFLLEVBQUU7dUVBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFO2lFQUErQjtJQUU3QjtRQUFULE1BQU0sRUFBRTs0REFBa0Q7SUFDakQ7UUFBVCxNQUFNLEVBQUU7OERBQW9EO0lBRTVCO1FBQWhDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzttRUFBbUM7SUFyQ3hELHNCQUFzQjtRQTlGbEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxRQUFRLEVBQUUsazNGQTRFVDtZQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFVBQVUsRUFBRTtnQkFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7d0JBQ25CLEtBQUssQ0FBQzs0QkFDSixPQUFPLEVBQUUsQ0FBQzs0QkFDVixTQUFTLEVBQUUsR0FBRzt5QkFDZixDQUFDO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztxQkFDM0QsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7O1NBQ0YsQ0FBQztPQUNXLHNCQUFzQixDQTJRbEM7SUFBRCw2QkFBQztDQUFBLEFBM1FELENBQTRDLGtCQUFrQixHQTJRN0Q7U0EzUVksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgc2NhbGVCYW5kLCBzY2FsZUxpbmVhciB9IGZyb20gJ2QzLXNjYWxlJztcclxuXHJcbmltcG9ydCB7IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zLCBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcclxuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1iYXItdmVydGljYWwtMmQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmd4LWNoYXJ0cy1jaGFydFxyXG4gICAgICBbdmlld109XCJbd2lkdGgsIGhlaWdodF1cIlxyXG4gICAgICBbc2hvd0xlZ2VuZF09XCJsZWdlbmRcIlxyXG4gICAgICBbbGVnZW5kT3B0aW9uc109XCJsZWdlbmRPcHRpb25zXCJcclxuICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXHJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAobGVnZW5kTGFiZWxBY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudCwgdW5kZWZpbmVkLCB0cnVlKVwiXHJcbiAgICAgIChsZWdlbmRMYWJlbERlYWN0aXZhdGUpPVwib25EZWFjdGl2YXRlKCRldmVudCwgdW5kZWZpbmVkLCB0cnVlKVwiXHJcbiAgICAgIChsZWdlbmRMYWJlbENsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXHJcbiAgICA+XHJcbiAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCIgY2xhc3M9XCJiYXItY2hhcnQgY2hhcnRcIj5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMtZ3JpZC1wYW5lbC1zZXJpZXNcclxuICAgICAgICAgIFt4U2NhbGVdPVwiZ3JvdXBTY2FsZVwiXHJcbiAgICAgICAgICBbeVNjYWxlXT1cInZhbHVlU2NhbGVcIlxyXG4gICAgICAgICAgW2RhdGFdPVwicmVzdWx0c1wiXHJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgIG9yaWVudD1cInZlcnRpY2FsXCJcclxuICAgICAgICA+PC9zdmc6Zz5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMteC1heGlzXHJcbiAgICAgICAgICAqbmdJZj1cInhBeGlzXCJcclxuICAgICAgICAgIFt4U2NhbGVdPVwiZ3JvdXBTY2FsZVwiXHJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgIFtzaG93TGFiZWxdPVwic2hvd1hBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW2xhYmVsVGV4dF09XCJ4QXhpc0xhYmVsXCJcclxuICAgICAgICAgIFt0cmltVGlja3NdPVwidHJpbVhBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW3JvdGF0ZVRpY2tzXT1cInJvdGF0ZVhBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4WEF4aXNUaWNrTGVuZ3RoXCJcclxuICAgICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ4QXhpc1RpY2tGb3JtYXR0aW5nXCJcclxuICAgICAgICAgIFt0aWNrc109XCJ4QXhpc1RpY2tzXCJcclxuICAgICAgICAgIFt4QXhpc09mZnNldF09XCJkYXRhTGFiZWxNYXhIZWlnaHQubmVnYXRpdmVcIlxyXG4gICAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cInVwZGF0ZVhBeGlzSGVpZ2h0KCRldmVudClcIlxyXG4gICAgICAgID48L3N2ZzpnPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy15LWF4aXNcclxuICAgICAgICAgICpuZ0lmPVwieUF4aXNcIlxyXG4gICAgICAgICAgW3lTY2FsZV09XCJ2YWx1ZVNjYWxlXCJcclxuICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxyXG4gICAgICAgICAgW3Nob3dHcmlkTGluZXNdPVwic2hvd0dyaWRMaW5lc1wiXHJcbiAgICAgICAgICBbc2hvd0xhYmVsXT1cInNob3dZQXhpc0xhYmVsXCJcclxuICAgICAgICAgIFtsYWJlbFRleHRdPVwieUF4aXNMYWJlbFwiXHJcbiAgICAgICAgICBbdHJpbVRpY2tzXT1cInRyaW1ZQXhpc1RpY2tzXCJcclxuICAgICAgICAgIFttYXhUaWNrTGVuZ3RoXT1cIm1heFlBeGlzVGlja0xlbmd0aFwiXHJcbiAgICAgICAgICBbdGlja0Zvcm1hdHRpbmddPVwieUF4aXNUaWNrRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbdGlja3NdPVwieUF4aXNUaWNrc1wiXHJcbiAgICAgICAgICAoZGltZW5zaW9uc0NoYW5nZWQpPVwidXBkYXRlWUF4aXNXaWR0aCgkZXZlbnQpXCJcclxuICAgICAgICA+PC9zdmc6Zz5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMtc2VyaWVzLXZlcnRpY2FsXHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZ3JvdXAgb2YgcmVzdWx0czsgbGV0IGluZGV4ID0gaW5kZXg7IHRyYWNrQnk6IHRyYWNrQnlcIlxyXG4gICAgICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXHJcbiAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwiZ3JvdXBUcmFuc2Zvcm0oZ3JvdXApXCJcclxuICAgICAgICAgIFthY3RpdmVFbnRyaWVzXT1cImFjdGl2ZUVudHJpZXNcIlxyXG4gICAgICAgICAgW3hTY2FsZV09XCJpbm5lclNjYWxlXCJcclxuICAgICAgICAgIFt5U2NhbGVdPVwidmFsdWVTY2FsZVwiXHJcbiAgICAgICAgICBbY29sb3JzXT1cImNvbG9yc1wiXHJcbiAgICAgICAgICBbc2VyaWVzXT1cImdyb3VwLnNlcmllc1wiXHJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgIFtncmFkaWVudF09XCJncmFkaWVudFwiXHJcbiAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbc2hvd0RhdGFMYWJlbF09XCJzaG93RGF0YUxhYmVsXCJcclxuICAgICAgICAgIFtkYXRhTGFiZWxGb3JtYXR0aW5nXT1cImRhdGFMYWJlbEZvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgW3Nlcmllc05hbWVdPVwiZ3JvdXAubmFtZVwiXHJcbiAgICAgICAgICBbcm91bmRFZGdlc109XCJyb3VuZEVkZ2VzXCJcclxuICAgICAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAgICAgW25vQmFyV2hlblplcm9dPVwibm9CYXJXaGVuWmVyb1wiXHJcbiAgICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50LCBncm91cClcIlxyXG4gICAgICAgICAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50LCBncm91cClcIlxyXG4gICAgICAgICAgKGRlYWN0aXZhdGUpPVwib25EZWFjdGl2YXRlKCRldmVudCwgZ3JvdXApXCJcclxuICAgICAgICAgIChkYXRhTGFiZWxIZWlnaHRDaGFuZ2VkKT1cIm9uRGF0YUxhYmVsTWF4SGVpZ2h0Q2hhbmdlZCgkZXZlbnQsIGluZGV4KVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgIDwvbmd4LWNoYXJ0cy1jaGFydD5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWycuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXHJcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgdHJhbnNmb3JtOiAnKidcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKDUwMCwgc3R5bGUoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICdzY2FsZSgwKScgfSkpXHJcbiAgICAgIF0pXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJhclZlcnRpY2FsMkRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGxlZ2VuZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGxlZ2VuZFRpdGxlOiBzdHJpbmcgPSAnTGVnZW5kJztcclxuICBASW5wdXQoKSBsZWdlbmRQb3NpdGlvbjogc3RyaW5nID0gJ3JpZ2h0JztcclxuICBASW5wdXQoKSB4QXhpcztcclxuICBASW5wdXQoKSB5QXhpcztcclxuICBASW5wdXQoKSBzaG93WEF4aXNMYWJlbDtcclxuICBASW5wdXQoKSBzaG93WUF4aXNMYWJlbDtcclxuICBASW5wdXQoKSB4QXhpc0xhYmVsO1xyXG4gIEBJbnB1dCgpIHlBeGlzTGFiZWw7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc2NhbGVUeXBlID0gJ29yZGluYWwnO1xyXG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNob3dHcmlkTGluZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdID0gW107XHJcbiAgQElucHV0KCkgc2NoZW1lVHlwZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHRyaW1YQXhpc1RpY2tzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSB0cmltWUF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgcm90YXRlWEF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgbWF4WEF4aXNUaWNrTGVuZ3RoOiBudW1iZXIgPSAxNjtcclxuICBASW5wdXQoKSBtYXhZQXhpc1RpY2tMZW5ndGg6IG51bWJlciA9IDE2O1xyXG4gIEBJbnB1dCgpIHhBeGlzVGlja0Zvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSB5QXhpc1RpY2tGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgeEF4aXNUaWNrczogYW55W107XHJcbiAgQElucHV0KCkgeUF4aXNUaWNrczogYW55W107XHJcbiAgQElucHV0KCkgZ3JvdXBQYWRkaW5nID0gMTY7XHJcbiAgQElucHV0KCkgYmFyUGFkZGluZyA9IDg7XHJcbiAgQElucHV0KCkgcm91bmREb21haW5zOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcm91bmRFZGdlczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgeVNjYWxlTWF4OiBudW1iZXI7XHJcbiAgQElucHV0KCkgc2hvd0RhdGFMYWJlbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRhdGFMYWJlbEZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBub0JhcldoZW5aZXJvOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoJ3Rvb2x0aXBUZW1wbGF0ZScpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgZGltczogVmlld0RpbWVuc2lvbnM7XHJcbiAgZ3JvdXBEb21haW46IGFueVtdO1xyXG4gIGlubmVyRG9tYWluOiBhbnlbXTtcclxuICB2YWx1ZXNEb21haW46IGFueVtdO1xyXG4gIGdyb3VwU2NhbGU6IGFueTtcclxuICBpbm5lclNjYWxlOiBhbnk7XHJcbiAgdmFsdWVTY2FsZTogYW55O1xyXG4gIHRyYW5zZm9ybTogc3RyaW5nO1xyXG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XHJcbiAgbWFyZ2luID0gWzEwLCAyMCwgMTAsIDIwXTtcclxuICB4QXhpc0hlaWdodDogbnVtYmVyID0gMDtcclxuICB5QXhpc1dpZHRoOiBudW1iZXIgPSAwO1xyXG4gIGxlZ2VuZE9wdGlvbnM6IGFueTtcclxuICBkYXRhTGFiZWxNYXhIZWlnaHQ6IGFueSA9IHsgbmVnYXRpdmU6IDAsIHBvc2l0aXZlOiAwIH07XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG5cclxuICAgIGlmICghdGhpcy5zaG93RGF0YUxhYmVsKSB7XHJcbiAgICAgIHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0ID0geyBuZWdhdGl2ZTogMCwgcG9zaXRpdmU6IDAgfTtcclxuICAgIH1cclxuICAgIHRoaXMubWFyZ2luID0gWzEwICsgdGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQucG9zaXRpdmUsIDIwLCAxMCArIHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0Lm5lZ2F0aXZlLCAyMF07XHJcblxyXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xyXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW4sXHJcbiAgICAgIHNob3dYQXhpczogdGhpcy54QXhpcyxcclxuICAgICAgc2hvd1lBeGlzOiB0aGlzLnlBeGlzLFxyXG4gICAgICB4QXhpc0hlaWdodDogdGhpcy54QXhpc0hlaWdodCxcclxuICAgICAgeUF4aXNXaWR0aDogdGhpcy55QXhpc1dpZHRoLFxyXG4gICAgICBzaG93WExhYmVsOiB0aGlzLnNob3dYQXhpc0xhYmVsLFxyXG4gICAgICBzaG93WUxhYmVsOiB0aGlzLnNob3dZQXhpc0xhYmVsLFxyXG4gICAgICBzaG93TGVnZW5kOiB0aGlzLmxlZ2VuZCxcclxuICAgICAgbGVnZW5kVHlwZTogdGhpcy5zY2hlbWVUeXBlLFxyXG4gICAgICBsZWdlbmRQb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2hvd0RhdGFMYWJlbCkge1xyXG4gICAgICB0aGlzLmRpbXMuaGVpZ2h0IC09IHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0Lm5lZ2F0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZm9ybWF0RGF0ZXMoKTtcclxuXHJcbiAgICB0aGlzLmdyb3VwRG9tYWluID0gdGhpcy5nZXRHcm91cERvbWFpbigpO1xyXG4gICAgdGhpcy5pbm5lckRvbWFpbiA9IHRoaXMuZ2V0SW5uZXJEb21haW4oKTtcclxuICAgIHRoaXMudmFsdWVzRG9tYWluID0gdGhpcy5nZXRWYWx1ZURvbWFpbigpO1xyXG5cclxuICAgIHRoaXMuZ3JvdXBTY2FsZSA9IHRoaXMuZ2V0R3JvdXBTY2FsZSgpO1xyXG4gICAgdGhpcy5pbm5lclNjYWxlID0gdGhpcy5nZXRJbm5lclNjYWxlKCk7XHJcbiAgICB0aGlzLnZhbHVlU2NhbGUgPSB0aGlzLmdldFZhbHVlU2NhbGUoKTtcclxuXHJcbiAgICB0aGlzLnNldENvbG9ycygpO1xyXG4gICAgdGhpcy5sZWdlbmRPcHRpb25zID0gdGhpcy5nZXRMZWdlbmRPcHRpb25zKCk7XHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLmRpbXMueE9mZnNldH0gLCAke3RoaXMubWFyZ2luWzBdICsgdGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQubmVnYXRpdmV9KWA7XHJcbiAgfVxyXG5cclxuICBvbkRhdGFMYWJlbE1heEhlaWdodENoYW5nZWQoZXZlbnQsIGdyb3VwSW5kZXgpIHtcclxuICAgIGlmIChldmVudC5zaXplLm5lZ2F0aXZlKSB7XHJcbiAgICAgIHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0Lm5lZ2F0aXZlID0gTWF0aC5tYXgodGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQubmVnYXRpdmUsIGV2ZW50LnNpemUuaGVpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0LnBvc2l0aXZlID0gTWF0aC5tYXgodGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQucG9zaXRpdmUsIGV2ZW50LnNpemUuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIGlmIChncm91cEluZGV4ID09PSB0aGlzLnJlc3VsdHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0R3JvdXBTY2FsZSgpOiBhbnkge1xyXG4gICAgY29uc3Qgc3BhY2luZyA9IHRoaXMuZ3JvdXBEb21haW4ubGVuZ3RoIC8gKHRoaXMuZGltcy5oZWlnaHQgLyB0aGlzLmdyb3VwUGFkZGluZyArIDEpO1xyXG5cclxuICAgIHJldHVybiBzY2FsZUJhbmQoKVxyXG4gICAgICAucmFuZ2VSb3VuZChbMCwgdGhpcy5kaW1zLndpZHRoXSlcclxuICAgICAgLnBhZGRpbmdJbm5lcihzcGFjaW5nKVxyXG4gICAgICAucGFkZGluZ091dGVyKHNwYWNpbmcgLyAyKVxyXG4gICAgICAuZG9tYWluKHRoaXMuZ3JvdXBEb21haW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5uZXJTY2FsZSgpOiBhbnkge1xyXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmdyb3VwU2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICBjb25zdCBzcGFjaW5nID0gdGhpcy5pbm5lckRvbWFpbi5sZW5ndGggLyAod2lkdGggLyB0aGlzLmJhclBhZGRpbmcgKyAxKTtcclxuICAgIHJldHVybiBzY2FsZUJhbmQoKVxyXG4gICAgICAucmFuZ2VSb3VuZChbMCwgd2lkdGhdKVxyXG4gICAgICAucGFkZGluZ0lubmVyKHNwYWNpbmcpXHJcbiAgICAgIC5kb21haW4odGhpcy5pbm5lckRvbWFpbik7XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZVNjYWxlKCk6IGFueSB7XHJcbiAgICBjb25zdCBzY2FsZSA9IHNjYWxlTGluZWFyKClcclxuICAgICAgLnJhbmdlKFt0aGlzLmRpbXMuaGVpZ2h0LCAwXSlcclxuICAgICAgLmRvbWFpbih0aGlzLnZhbHVlc0RvbWFpbik7XHJcbiAgICByZXR1cm4gdGhpcy5yb3VuZERvbWFpbnMgPyBzY2FsZS5uaWNlKCkgOiBzY2FsZTtcclxuICB9XHJcblxyXG4gIGdldEdyb3VwRG9tYWluKCkge1xyXG4gICAgY29uc3QgZG9tYWluID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMucmVzdWx0cykge1xyXG4gICAgICBpZiAoIWRvbWFpbi5pbmNsdWRlcyhncm91cC5sYWJlbCkpIHtcclxuICAgICAgICBkb21haW4ucHVzaChncm91cC5sYWJlbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZG9tYWluO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5uZXJEb21haW4oKSB7XHJcbiAgICBjb25zdCBkb21haW4gPSBbXTtcclxuICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5yZXN1bHRzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgZCBvZiBncm91cC5zZXJpZXMpIHtcclxuICAgICAgICBpZiAoIWRvbWFpbi5pbmNsdWRlcyhkLmxhYmVsKSkge1xyXG4gICAgICAgICAgZG9tYWluLnB1c2goZC5sYWJlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRvbWFpbjtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlRG9tYWluKCkge1xyXG4gICAgY29uc3QgZG9tYWluID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMucmVzdWx0cykge1xyXG4gICAgICBmb3IgKGNvbnN0IGQgb2YgZ3JvdXAuc2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKCFkb21haW4uaW5jbHVkZXMoZC52YWx1ZSkpIHtcclxuICAgICAgICAgIGRvbWFpbi5wdXNoKGQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKDAsIC4uLmRvbWFpbik7XHJcbiAgICBjb25zdCBtYXggPSB0aGlzLnlTY2FsZU1heCA/IE1hdGgubWF4KHRoaXMueVNjYWxlTWF4LCAuLi5kb21haW4pIDogTWF0aC5tYXgoMCwgLi4uZG9tYWluKTtcclxuXHJcbiAgICByZXR1cm4gW21pbiwgbWF4XTtcclxuICB9XHJcblxyXG4gIGdyb3VwVHJhbnNmb3JtKGdyb3VwKSB7XHJcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSgke3RoaXMuZ3JvdXBTY2FsZShncm91cC5sYWJlbCl9LCAwKWA7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGEsIGdyb3VwPykge1xyXG4gICAgaWYgKGdyb3VwKSB7XHJcbiAgICAgIGRhdGEuc2VyaWVzID0gZ3JvdXAubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeShpbmRleCwgaXRlbSkge1xyXG4gICAgcmV0dXJuIGl0ZW0ubmFtZTtcclxuICB9XHJcblxyXG4gIHNldENvbG9ycygpOiB2b2lkIHtcclxuICAgIGxldCBkb21haW47XHJcbiAgICBpZiAodGhpcy5zY2hlbWVUeXBlID09PSAnb3JkaW5hbCcpIHtcclxuICAgICAgZG9tYWluID0gdGhpcy5pbm5lckRvbWFpbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvbWFpbiA9IHRoaXMudmFsdWVzRG9tYWluO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCB0aGlzLnNjaGVtZVR5cGUsIGRvbWFpbiwgdGhpcy5jdXN0b21Db2xvcnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kT3B0aW9ucygpIHtcclxuICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgIHNjYWxlVHlwZTogdGhpcy5zY2hlbWVUeXBlLFxyXG4gICAgICBjb2xvcnM6IHVuZGVmaW5lZCxcclxuICAgICAgZG9tYWluOiBbXSxcclxuICAgICAgdGl0bGU6IHVuZGVmaW5lZCxcclxuICAgICAgcG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cclxuICAgIH07XHJcbiAgICBpZiAob3B0cy5zY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICBvcHRzLmRvbWFpbiA9IHRoaXMuaW5uZXJEb21haW47XHJcbiAgICAgIG9wdHMuY29sb3JzID0gdGhpcy5jb2xvcnM7XHJcbiAgICAgIG9wdHMudGl0bGUgPSB0aGlzLmxlZ2VuZFRpdGxlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3B0cy5kb21haW4gPSB0aGlzLnZhbHVlc0RvbWFpbjtcclxuICAgICAgb3B0cy5jb2xvcnMgPSB0aGlzLmNvbG9ycy5zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3B0cztcclxuICB9XHJcblxyXG4gIHVwZGF0ZVlBeGlzV2lkdGgoeyB3aWR0aCB9KSB7XHJcbiAgICB0aGlzLnlBeGlzV2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVYQXhpc0hlaWdodCh7IGhlaWdodCB9KSB7XHJcbiAgICB0aGlzLnhBeGlzSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIG9uQWN0aXZhdGUoZXZlbnQsIGdyb3VwLCBmcm9tTGVnZW5kID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBldmVudCk7XHJcbiAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgaXRlbS5zZXJpZXMgPSBncm91cC5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5yZXN1bHRzXHJcbiAgICAgIC5tYXAoZyA9PiBnLnNlcmllcylcclxuICAgICAgLmZsYXQoKVxyXG4gICAgICAuZmlsdGVyKGkgPT4ge1xyXG4gICAgICAgIGlmIChmcm9tTGVnZW5kKSB7XHJcbiAgICAgICAgICByZXR1cm4gaS5sYWJlbCA9PT0gaXRlbS5uYW1lO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gaS5uYW1lID09PSBpdGVtLm5hbWUgJiYgaS5zZXJpZXMgPT09IGl0ZW0uc2VyaWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gWy4uLml0ZW1zXTtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XHJcbiAgfVxyXG5cclxuICBvbkRlYWN0aXZhdGUoZXZlbnQsIGdyb3VwLCBmcm9tTGVnZW5kID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBldmVudCk7XHJcbiAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgaXRlbS5zZXJpZXMgPSBncm91cC5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IHRoaXMuYWN0aXZlRW50cmllcy5maWx0ZXIoaSA9PiB7XHJcbiAgICAgIGlmIChmcm9tTGVnZW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGkubGFiZWwgIT09IGl0ZW0ubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gIShpLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBpLnNlcmllcyA9PT0gaXRlbS5zZXJpZXMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==