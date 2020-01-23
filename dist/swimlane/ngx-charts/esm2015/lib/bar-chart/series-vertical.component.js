import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
export var D0Types;
(function (D0Types) {
    D0Types["positive"] = "positive";
    D0Types["negative"] = "negative";
})(D0Types || (D0Types = {}));
let SeriesVerticalComponent = class SeriesVerticalComponent {
    constructor() {
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
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateTooltipSettings();
        let width;
        if (this.series.length) {
            width = this.xScale.bandwidth();
        }
        width = Math.round(width);
        const yScaleMin = Math.max(this.yScale.domain()[0], 0);
        const d0 = {
            [D0Types.positive]: 0,
            [D0Types.negative]: 0
        };
        let d0Type = D0Types.positive;
        let total;
        if (this.type === 'normalized') {
            total = this.series.map(d => d.value).reduce((sum, d) => sum + d, 0);
        }
        this.bars = this.series.map((d, index) => {
            let value = d.value;
            const label = this.getLabel(d);
            const formattedLabel = formatLabel(label);
            const roundEdges = this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            const bar = {
                value,
                label,
                roundEdges,
                data: d,
                width,
                formattedLabel,
                height: 0,
                x: 0,
                y: 0
            };
            if (this.type === 'standard') {
                bar.height = Math.abs(this.yScale(value) - this.yScale(yScaleMin));
                bar.x = this.xScale(label);
                if (value < 0) {
                    bar.y = this.yScale(0);
                }
                else {
                    bar.y = this.yScale(value);
                }
            }
            else if (this.type === 'stacked') {
                const offset0 = d0[d0Type];
                const offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.height = this.yScale(offset0) - this.yScale(offset1);
                bar.x = 0;
                bar.y = this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (this.type === 'normalized') {
                let offset0 = d0[d0Type];
                let offset1 = offset0 + value;
                d0[d0Type] += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.height = this.yScale(offset0) - this.yScale(offset1);
                bar.x = 0;
                bar.y = this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (this.colors.scaleType === 'ordinal') {
                bar.color = this.colors.getColor(label);
            }
            else {
                if (this.type === 'standard') {
                    bar.color = this.colors.getColor(value);
                    bar.gradientStops = this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = this.colors.getColor(bar.offset1);
                    bar.gradientStops = this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            let tooltipLabel = formattedLabel;
            bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
            if (this.seriesName) {
                tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
                bar.data.series = this.seriesName;
                bar.ariaLabel = this.seriesName + ' ' + bar.ariaLabel;
            }
            bar.tooltipText = this.tooltipDisabled
                ? undefined
                : `
        <span class="tooltip-label">${escapeLabel(tooltipLabel)}</span>
        <span class="tooltip-val">${value.toLocaleString()}</span>
      `;
            return bar;
        });
        this.updateDataLabels();
    }
    updateDataLabels() {
        if (this.type === 'stacked') {
            this.barsForDataLabels = [];
            const section = {};
            section.series = this.seriesName;
            const totalPositive = this.series.map(d => d.value).reduce((sum, d) => (d > 0 ? sum + d : sum), 0);
            const totalNegative = this.series.map(d => d.value).reduce((sum, d) => (d < 0 ? sum + d : sum), 0);
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
            this.barsForDataLabels = this.series.map(d => {
                const section = {};
                section.series = this.seriesName ? this.seriesName : d.label;
                section.total = d.value;
                section.x = this.xScale(d.label);
                section.y = this.yScale(0);
                section.height = this.yScale(section.total) - this.yScale(0);
                section.width = this.xScale.bandwidth();
                return section;
            });
        }
    }
    updateTooltipSettings() {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }
    onClick(data) {
        this.select.emit(data);
    }
    getLabel(dataItem) {
        if (dataItem.label) {
            return dataItem.label;
        }
        return dataItem.name;
    }
    trackBy(index, bar) {
        return bar.label;
    }
    trackDataLabelBy(index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    }
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
        template: `
    <svg:g
      ngx-charts-bar
      *ngFor="let bar of bars; trackBy: trackBy"
      [@animationState]="'active'"
      [@.disabled]="!animations"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [stops]="bar.gradientStops"
      [data]="bar.data"
      [orientation]="'vertical'"
      [roundEdges]="bar.roundEdges"
      [gradient]="gradient"
      [ariaLabel]="bar.ariaLabel"
      [isActive]="isActive(bar.data)"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTemplate ? undefined : bar.tooltipText"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="bar.data"
      [noBarWhenZero]="noBarWhenZero"
      [animations]="animations"
    ></svg:g>
    <svg:g *ngIf="showDataLabel">
      <svg:g
        ngx-charts-bar-label
        *ngFor="let b of barsForDataLabels; let i = index; trackBy: trackDataLabelBy"
        [barX]="b.x"
        [barY]="b.y"
        [barWidth]="b.width"
        [barHeight]="b.height"
        [value]="b.total"
        [valueFormatting]="dataLabelFormatting"
        [orientation]="'vertical'"
        (dimensionsChanged)="dataLabelHeightChanged.emit({ size: $event, index: i })"
      />
    </svg:g>
  `,
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
export { SeriesVerticalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzLXZlcnRpY2FsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9zZXJpZXMtdmVydGljYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFhLHVCQUF1QixFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2xFLE1BQU0sQ0FBTixJQUFZLE9BR1g7QUFIRCxXQUFZLE9BQU87SUFDakIsZ0NBQXFCLENBQUE7SUFDckIsZ0NBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUhXLE9BQU8sS0FBUCxPQUFPLFFBR2xCO0FBOERELElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBQXBDO1FBRVcsU0FBSSxHQUFHLFVBQVUsQ0FBQztRQVFsQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUdqQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRTdCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLDJCQUFzQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFRdEQsc0JBQWlCLEdBQWtHLEVBQUUsQ0FBQztJQW9MeEgsQ0FBQztJQWxMQyxXQUFXLENBQUMsT0FBTztRQUNqQixJQUFJLENBQUMsTUFBTSxF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QWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLFVBQVUsRUFBRTtZQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDeEIsVUFBVSxDQUFDLFFBQVEsRUFBRTtvQkFDbkIsS0FBSyxDQUFDO3dCQUNKLE9BQU8sRUFBRSxDQUFDO3FCQUNYLENBQUM7b0JBQ0YsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDcEMsQ0FBQzthQUNILENBQUM7U0FDSDtLQUNGLENBQUM7R0FDVyx1QkFBdUIsQ0FpTm5DO1NBak5ZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBmb3JtYXRMYWJlbCwgZXNjYXBlTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcclxuaW1wb3J0IHsgRGF0YUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XHJcblxyXG5leHBvcnQgZW51bSBEMFR5cGVzIHtcclxuICBwb3NpdGl2ZSA9ICdwb3NpdGl2ZScsXHJcbiAgbmVnYXRpdmUgPSAnbmVnYXRpdmUnXHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXNlcmllcy12ZXJ0aWNhbF0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmdcclxuICAgICAgbmd4LWNoYXJ0cy1iYXJcclxuICAgICAgKm5nRm9yPVwibGV0IGJhciBvZiBiYXJzOyB0cmFja0J5OiB0cmFja0J5XCJcclxuICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXHJcbiAgICAgIFtALmRpc2FibGVkXT1cIiFhbmltYXRpb25zXCJcclxuICAgICAgW3dpZHRoXT1cImJhci53aWR0aFwiXHJcbiAgICAgIFtoZWlnaHRdPVwiYmFyLmhlaWdodFwiXHJcbiAgICAgIFt4XT1cImJhci54XCJcclxuICAgICAgW3ldPVwiYmFyLnlcIlxyXG4gICAgICBbZmlsbF09XCJiYXIuY29sb3JcIlxyXG4gICAgICBbc3RvcHNdPVwiYmFyLmdyYWRpZW50U3RvcHNcIlxyXG4gICAgICBbZGF0YV09XCJiYXIuZGF0YVwiXHJcbiAgICAgIFtvcmllbnRhdGlvbl09XCIndmVydGljYWwnXCJcclxuICAgICAgW3JvdW5kRWRnZXNdPVwiYmFyLnJvdW5kRWRnZXNcIlxyXG4gICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxyXG4gICAgICBbYXJpYUxhYmVsXT1cImJhci5hcmlhTGFiZWxcIlxyXG4gICAgICBbaXNBY3RpdmVdPVwiaXNBY3RpdmUoYmFyLmRhdGEpXCJcclxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxyXG4gICAgICBuZ3gtdG9vbHRpcFxyXG4gICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxyXG4gICAgICBbdG9vbHRpcFR5cGVdPVwidG9vbHRpcFR5cGVcIlxyXG4gICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGJhci50b29sdGlwVGV4dFwiXHJcbiAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgW3Rvb2x0aXBDb250ZXh0XT1cImJhci5kYXRhXCJcclxuICAgICAgW25vQmFyV2hlblplcm9dPVwibm9CYXJXaGVuWmVyb1wiXHJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgPjwvc3ZnOmc+XHJcbiAgICA8c3ZnOmcgKm5nSWY9XCJzaG93RGF0YUxhYmVsXCI+XHJcbiAgICAgIDxzdmc6Z1xyXG4gICAgICAgIG5neC1jaGFydHMtYmFyLWxhYmVsXHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGIgb2YgYmFyc0ZvckRhdGFMYWJlbHM7IGxldCBpID0gaW5kZXg7IHRyYWNrQnk6IHRyYWNrRGF0YUxhYmVsQnlcIlxyXG4gICAgICAgIFtiYXJYXT1cImIueFwiXHJcbiAgICAgICAgW2JhclldPVwiYi55XCJcclxuICAgICAgICBbYmFyV2lkdGhdPVwiYi53aWR0aFwiXHJcbiAgICAgICAgW2JhckhlaWdodF09XCJiLmhlaWdodFwiXHJcbiAgICAgICAgW3ZhbHVlXT1cImIudG90YWxcIlxyXG4gICAgICAgIFt2YWx1ZUZvcm1hdHRpbmddPVwiZGF0YUxhYmVsRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgW29yaWVudGF0aW9uXT1cIid2ZXJ0aWNhbCdcIlxyXG4gICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJkYXRhTGFiZWxIZWlnaHRDaGFuZ2VkLmVtaXQoeyBzaXplOiAkZXZlbnQsIGluZGV4OiBpIH0pXCJcclxuICAgICAgLz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKDUwMCwgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXJpZXNWZXJ0aWNhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgZGltcztcclxuICBASW5wdXQoKSB0eXBlID0gJ3N0YW5kYXJkJztcclxuICBASW5wdXQoKSBzZXJpZXM7XHJcbiAgQElucHV0KCkgeFNjYWxlO1xyXG4gIEBJbnB1dCgpIHlTY2FsZTtcclxuICBASW5wdXQoKSBjb2xvcnM7XHJcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XHJcbiAgQElucHV0KCkgc2VyaWVzTmFtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBASW5wdXQoKSByb3VuZEVkZ2VzOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHNob3dEYXRhTGFiZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBkYXRhTGFiZWxGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgbm9CYXJXaGVuWmVybzogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkYXRhTGFiZWxIZWlnaHRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmc7XHJcbiAgdG9vbHRpcFR5cGU6IHN0cmluZztcclxuXHJcbiAgYmFyczogYW55O1xyXG4gIHg6IGFueTtcclxuICB5OiBhbnk7XHJcbiAgYmFyc0ZvckRhdGFMYWJlbHM6IEFycmF5PHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyOyB0b3RhbDogbnVtYmVyOyBzZXJpZXM6IHN0cmluZyB9PiA9IFtdO1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGVUb29sdGlwU2V0dGluZ3MoKTtcclxuICAgIGxldCB3aWR0aDtcclxuICAgIGlmICh0aGlzLnNlcmllcy5sZW5ndGgpIHtcclxuICAgICAgd2lkdGggPSB0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKTtcclxuICAgIH1cclxuICAgIHdpZHRoID0gTWF0aC5yb3VuZCh3aWR0aCk7XHJcbiAgICBjb25zdCB5U2NhbGVNaW4gPSBNYXRoLm1heCh0aGlzLnlTY2FsZS5kb21haW4oKVswXSwgMCk7XHJcblxyXG4gICAgY29uc3QgZDAgPSB7XHJcbiAgICAgIFtEMFR5cGVzLnBvc2l0aXZlXTogMCxcclxuICAgICAgW0QwVHlwZXMubmVnYXRpdmVdOiAwXHJcbiAgICB9O1xyXG4gICAgbGV0IGQwVHlwZSA9IEQwVHlwZXMucG9zaXRpdmU7XHJcblxyXG4gICAgbGV0IHRvdGFsO1xyXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ25vcm1hbGl6ZWQnKSB7XHJcbiAgICAgIHRvdGFsID0gdGhpcy5zZXJpZXMubWFwKGQgPT4gZC52YWx1ZSkucmVkdWNlKChzdW0sIGQpID0+IHN1bSArIGQsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYmFycyA9IHRoaXMuc2VyaWVzLm1hcCgoZCwgaW5kZXgpID0+IHtcclxuICAgICAgbGV0IHZhbHVlID0gZC52YWx1ZTtcclxuICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdldExhYmVsKGQpO1xyXG4gICAgICBjb25zdCBmb3JtYXR0ZWRMYWJlbCA9IGZvcm1hdExhYmVsKGxhYmVsKTtcclxuICAgICAgY29uc3Qgcm91bmRFZGdlcyA9IHRoaXMucm91bmRFZGdlcztcclxuICAgICAgZDBUeXBlID0gdmFsdWUgPiAwID8gRDBUeXBlcy5wb3NpdGl2ZSA6IEQwVHlwZXMubmVnYXRpdmU7XHJcblxyXG4gICAgICBjb25zdCBiYXI6IGFueSA9IHtcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgICBsYWJlbCxcclxuICAgICAgICByb3VuZEVkZ2VzLFxyXG4gICAgICAgIGRhdGE6IGQsXHJcbiAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgZm9ybWF0dGVkTGFiZWwsXHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIHg6IDAsXHJcbiAgICAgICAgeTogMFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3N0YW5kYXJkJykge1xyXG4gICAgICAgIGJhci5oZWlnaHQgPSBNYXRoLmFicyh0aGlzLnlTY2FsZSh2YWx1ZSkgLSB0aGlzLnlTY2FsZSh5U2NhbGVNaW4pKTtcclxuICAgICAgICBiYXIueCA9IHRoaXMueFNjYWxlKGxhYmVsKTtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgYmFyLnkgPSB0aGlzLnlTY2FsZSgwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYmFyLnkgPSB0aGlzLnlTY2FsZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ3N0YWNrZWQnKSB7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0MCA9IGQwW2QwVHlwZV07XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0MSA9IG9mZnNldDAgKyB2YWx1ZTtcclxuICAgICAgICBkMFtkMFR5cGVdICs9IHZhbHVlO1xyXG5cclxuICAgICAgICBiYXIuaGVpZ2h0ID0gdGhpcy55U2NhbGUob2Zmc2V0MCkgLSB0aGlzLnlTY2FsZShvZmZzZXQxKTtcclxuICAgICAgICBiYXIueCA9IDA7XHJcbiAgICAgICAgYmFyLnkgPSB0aGlzLnlTY2FsZShvZmZzZXQxKTtcclxuICAgICAgICBiYXIub2Zmc2V0MCA9IG9mZnNldDA7XHJcbiAgICAgICAgYmFyLm9mZnNldDEgPSBvZmZzZXQxO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ25vcm1hbGl6ZWQnKSB7XHJcbiAgICAgICAgbGV0IG9mZnNldDAgPSBkMFtkMFR5cGVdO1xyXG4gICAgICAgIGxldCBvZmZzZXQxID0gb2Zmc2V0MCArIHZhbHVlO1xyXG4gICAgICAgIGQwW2QwVHlwZV0gKz0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0b3RhbCA+IDApIHtcclxuICAgICAgICAgIG9mZnNldDAgPSAob2Zmc2V0MCAqIDEwMCkgLyB0b3RhbDtcclxuICAgICAgICAgIG9mZnNldDEgPSAob2Zmc2V0MSAqIDEwMCkgLyB0b3RhbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb2Zmc2V0MCA9IDA7XHJcbiAgICAgICAgICBvZmZzZXQxID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJhci5oZWlnaHQgPSB0aGlzLnlTY2FsZShvZmZzZXQwKSAtIHRoaXMueVNjYWxlKG9mZnNldDEpO1xyXG4gICAgICAgIGJhci54ID0gMDtcclxuICAgICAgICBiYXIueSA9IHRoaXMueVNjYWxlKG9mZnNldDEpO1xyXG4gICAgICAgIGJhci5vZmZzZXQwID0gb2Zmc2V0MDtcclxuICAgICAgICBiYXIub2Zmc2V0MSA9IG9mZnNldDE7XHJcbiAgICAgICAgdmFsdWUgPSAob2Zmc2V0MSAtIG9mZnNldDApLnRvRml4ZWQoMikgKyAnJSc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICAgIGJhci5jb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnc3RhbmRhcmQnKSB7XHJcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcih2YWx1ZSk7XHJcbiAgICAgICAgICBiYXIuZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHModmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihiYXIub2Zmc2V0MSk7XHJcbiAgICAgICAgICBiYXIuZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHMoYmFyLm9mZnNldDEsIGJhci5vZmZzZXQwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB0b29sdGlwTGFiZWwgPSBmb3JtYXR0ZWRMYWJlbDtcclxuICAgICAgYmFyLmFyaWFMYWJlbCA9IGZvcm1hdHRlZExhYmVsICsgJyAnICsgdmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgaWYgKHRoaXMuc2VyaWVzTmFtZSkge1xyXG4gICAgICAgIHRvb2x0aXBMYWJlbCA9IGAke3RoaXMuc2VyaWVzTmFtZX0g4oCiICR7Zm9ybWF0dGVkTGFiZWx9YDtcclxuICAgICAgICBiYXIuZGF0YS5zZXJpZXMgPSB0aGlzLnNlcmllc05hbWU7XHJcbiAgICAgICAgYmFyLmFyaWFMYWJlbCA9IHRoaXMuc2VyaWVzTmFtZSArICcgJyArIGJhci5hcmlhTGFiZWw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJhci50b29sdGlwVGV4dCA9IHRoaXMudG9vbHRpcERpc2FibGVkXHJcbiAgICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgICA6IGBcclxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2VzY2FwZUxhYmVsKHRvb2x0aXBMYWJlbCl9PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxyXG4gICAgICBgO1xyXG5cclxuICAgICAgcmV0dXJuIGJhcjtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudXBkYXRlRGF0YUxhYmVscygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGF0YUxhYmVscygpIHtcclxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFja2VkJykge1xyXG4gICAgICB0aGlzLmJhcnNGb3JEYXRhTGFiZWxzID0gW107XHJcbiAgICAgIGNvbnN0IHNlY3Rpb246IGFueSA9IHt9O1xyXG4gICAgICBzZWN0aW9uLnNlcmllcyA9IHRoaXMuc2VyaWVzTmFtZTtcclxuICAgICAgY29uc3QgdG90YWxQb3NpdGl2ZSA9IHRoaXMuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiAoZCA+IDAgPyBzdW0gKyBkIDogc3VtKSwgMCk7XHJcbiAgICAgIGNvbnN0IHRvdGFsTmVnYXRpdmUgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKHN1bSwgZCkgPT4gKGQgPCAwID8gc3VtICsgZCA6IHN1bSksIDApO1xyXG4gICAgICBzZWN0aW9uLnRvdGFsID0gdG90YWxQb3NpdGl2ZSArIHRvdGFsTmVnYXRpdmU7XHJcbiAgICAgIHNlY3Rpb24ueCA9IDA7XHJcbiAgICAgIHNlY3Rpb24ueSA9IDA7XHJcbiAgICAgIGlmIChzZWN0aW9uLnRvdGFsID4gMCkge1xyXG4gICAgICAgIHNlY3Rpb24uaGVpZ2h0ID0gdGhpcy55U2NhbGUodG90YWxQb3NpdGl2ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VjdGlvbi5oZWlnaHQgPSB0aGlzLnlTY2FsZSh0b3RhbE5lZ2F0aXZlKTtcclxuICAgICAgfVxyXG4gICAgICBzZWN0aW9uLndpZHRoID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgIHRoaXMuYmFyc0ZvckRhdGFMYWJlbHMucHVzaChzZWN0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYmFyc0ZvckRhdGFMYWJlbHMgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbjogYW55ID0ge307XHJcbiAgICAgICAgc2VjdGlvbi5zZXJpZXMgPSB0aGlzLnNlcmllc05hbWUgPyB0aGlzLnNlcmllc05hbWUgOiBkLmxhYmVsO1xyXG4gICAgICAgIHNlY3Rpb24udG90YWwgPSBkLnZhbHVlO1xyXG4gICAgICAgIHNlY3Rpb24ueCA9IHRoaXMueFNjYWxlKGQubGFiZWwpO1xyXG4gICAgICAgIHNlY3Rpb24ueSA9IHRoaXMueVNjYWxlKDApO1xyXG4gICAgICAgIHNlY3Rpb24uaGVpZ2h0ID0gdGhpcy55U2NhbGUoc2VjdGlvbi50b3RhbCkgLSB0aGlzLnlTY2FsZSgwKTtcclxuICAgICAgICBzZWN0aW9uLndpZHRoID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb247XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlVG9vbHRpcFNldHRpbmdzKCkge1xyXG4gICAgdGhpcy50b29sdGlwUGxhY2VtZW50ID0gdGhpcy50b29sdGlwRGlzYWJsZWQgPyB1bmRlZmluZWQgOiAndG9wJztcclxuICAgIHRoaXMudG9vbHRpcFR5cGUgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6ICd0b29sdGlwJztcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lICYmIGVudHJ5LnNlcmllcyA9PT0gZC5zZXJpZXM7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGE6IERhdGFJdGVtKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGFiZWwoZGF0YUl0ZW0pOiBzdHJpbmcge1xyXG4gICAgaWYgKGRhdGFJdGVtLmxhYmVsKSB7XHJcbiAgICAgIHJldHVybiBkYXRhSXRlbS5sYWJlbDtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhSXRlbS5uYW1lO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeShpbmRleCwgYmFyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBiYXIubGFiZWw7XHJcbiAgfVxyXG5cclxuICB0cmFja0RhdGFMYWJlbEJ5KGluZGV4LCBiYXJMYWJlbCkge1xyXG4gICAgcmV0dXJuIGluZGV4ICsgJyMnICsgYmFyTGFiZWwuc2VyaWVzICsgJyMnICsgYmFyTGFiZWwudG90YWw7XHJcbiAgfVxyXG59XHJcbiJdfQ==