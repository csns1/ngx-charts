import { __decorate } from "tslib";
import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { reduceTicks } from './ticks.helper';
import { roundedRect } from '../../common/shape.helper';
let YAxisTicksComponent = class YAxisTicksComponent {
    constructor() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.trimTicks = true;
        this.maxTickLength = 16;
        this.showGridLines = false;
        this.showRefLabels = false;
        this.showRefLines = false;
        this.dimensionsChanged = new EventEmitter();
        this.innerTickSize = 6;
        this.tickPadding = 3;
        this.verticalSpacing = 20;
        this.textAnchor = 'middle';
        this.width = 0;
        this.outerTickSize = 6;
        this.rotateLabels = false;
        this.referenceLineLength = 0;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngAfterViewInit() {
        setTimeout(() => this.updateDims());
    }
    updateDims() {
        const width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
        if (width !== this.width) {
            this.width = width;
            this.dimensionsChanged.emit({ width });
            setTimeout(() => this.updateDims());
        }
    }
    update() {
        let scale;
        const sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
        this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        this.adjustedScale = scale.bandwidth
            ? function (d) {
                return scale(d) + scale.bandwidth() * 0.5;
            }
            : scale;
        if (this.showRefLines && this.referenceLines) {
            this.setReferencelines();
        }
        switch (this.orient) {
            case 'top':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'bottom':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'left':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'end';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            case 'right':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'start';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            default:
        }
        setTimeout(() => this.updateDims());
    }
    setReferencelines() {
        this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(item => item.value)));
        this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(item => item.value)));
        this.referenceLineLength = this.referenceLines.length;
        this.referenceAreaPath = roundedRect(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax, 0, [
            false,
            false,
            false,
            false
        ]);
    }
    getTicks() {
        let ticks;
        const maxTicks = this.getMaxTicks(20);
        const maxScaleTicks = this.getMaxTicks(50);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    }
    getMaxTicks(tickHeight) {
        return Math.floor(this.height / tickHeight);
    }
    tickTransform(tick) {
        return `translate(${this.adjustedScale(tick)},${this.verticalSpacing})`;
    }
    gridLineTransform() {
        return `translate(5,0)`;
    }
    tickTrim(label) {
        return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
    }
};
__decorate([
    Input()
], YAxisTicksComponent.prototype, "scale", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "orient", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickArguments", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickValues", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickStroke", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "trimTicks", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "maxTickLength", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickFormatting", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "showGridLines", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "gridLineWidth", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "height", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "referenceLines", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "showRefLabels", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "showRefLines", void 0);
__decorate([
    Output()
], YAxisTicksComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    ViewChild('ticksel')
], YAxisTicksComponent.prototype, "ticksElement", void 0);
YAxisTicksComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-y-axis-ticks]',
        template: `
    <svg:g #ticksel>
      <svg:g *ngFor="let tick of ticks" class="tick" [attr.transform]="transform(tick)">
        <title>{{ tickFormat(tick) }}</title>
        <svg:text
          stroke-width="0.01"
          [attr.dy]="dy"
          [attr.x]="x1"
          [attr.y]="y1"
          [attr.text-anchor]="textAnchor"
          [style.font-size]="'12px'"
        >
          {{ tickTrim(tickFormat(tick)) }}
        </svg:text>
      </svg:g>
    </svg:g>

    <svg:path
      *ngIf="referenceLineLength > 1 && refMax && refMin && showRefLines"
      class="reference-area"
      [attr.d]="referenceAreaPath"
      [attr.transform]="gridLineTransform()"
    />
    <svg:g *ngFor="let tick of ticks" [attr.transform]="transform(tick)">
      <svg:g *ngIf="showGridLines" [attr.transform]="gridLineTransform()">
        <svg:line
          *ngIf="orient === 'left'"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth"
        />
        <svg:line
          *ngIf="orient === 'right'"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="-gridLineWidth"
        />
      </svg:g>
    </svg:g>

    <svg:g *ngFor="let refLine of referenceLines">
      <svg:g *ngIf="showRefLines" [attr.transform]="transform(refLine.value)">
        <svg:line
          class="refline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth"
          [attr.transform]="gridLineTransform()"
        />
        <svg:g *ngIf="showRefLabels">
          <title>{{ tickTrim(tickFormat(refLine.value)) }}</title>
          <svg:text
            class="refline-label"
            [attr.dy]="dy"
            [attr.y]="-6"
            [attr.x]="gridLineWidth"
            [attr.text-anchor]="textAnchor"
          >
            {{ refLine.name }}
          </svg:text>
        </svg:g>
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], YAxisTicksComponent);
export { YAxisTicksComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLXRpY2tzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3ktYXhpcy10aWNrcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFHTixTQUFTLEVBQ1QsWUFBWSxFQUVaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQXFFeEQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFBaEM7UUFHVyxrQkFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBRTNCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBSXRCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTdCLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsa0JBQWEsR0FBUSxDQUFDLENBQUM7UUFDdkIsZ0JBQVcsR0FBUSxDQUFDLENBQUM7UUFFckIsb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFDN0IsZUFBVSxHQUFRLFFBQVEsQ0FBQztRQVUzQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRzlCLHdCQUFtQixHQUFXLENBQUMsQ0FBQztJQXNKbEMsQ0FBQztJQWpK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QUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3ZFLENBQUM7Q0FDRixDQUFBO0FBMUxVO0lBQVIsS0FBSyxFQUFFO2tEQUFPO0FBQ047SUFBUixLQUFLLEVBQUU7bURBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTswREFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7dURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO3VEQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTtzREFBMkI7QUFDMUI7SUFBUixLQUFLLEVBQUU7MERBQTRCO0FBQzNCO0lBQVIsS0FBSyxFQUFFOzJEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzBEQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTswREFBZTtBQUNkO0lBQVIsS0FBSyxFQUFFO21EQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7MkRBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7MERBQWdDO0FBQy9CO0lBQVIsS0FBSyxFQUFFO3lEQUErQjtBQUU3QjtJQUFULE1BQU0sRUFBRTs4REFBd0M7QUF3QjNCO0lBQXJCLFNBQVMsQ0FBQyxTQUFTLENBQUM7eURBQTBCO0FBeENwQyxtQkFBbUI7SUFuRS9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw0QkFBNEI7UUFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThEVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxtQkFBbUIsQ0EyTC9CO1NBM0xZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgRWxlbWVudFJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi90cmltLWxhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IHJlZHVjZVRpY2tzIH0gZnJvbSAnLi90aWNrcy5oZWxwZXInO1xyXG5pbXBvcnQgeyByb3VuZGVkUmVjdCB9IGZyb20gJy4uLy4uL2NvbW1vbi9zaGFwZS5oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMteS1heGlzLXRpY2tzXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZyAjdGlja3NlbD5cclxuICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRpY2tzXCIgY2xhc3M9XCJ0aWNrXCIgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybSh0aWNrKVwiPlxyXG4gICAgICAgIDx0aXRsZT57eyB0aWNrRm9ybWF0KHRpY2spIH19PC90aXRsZT5cclxuICAgICAgICA8c3ZnOnRleHRcclxuICAgICAgICAgIHN0cm9rZS13aWR0aD1cIjAuMDFcIlxyXG4gICAgICAgICAgW2F0dHIuZHldPVwiZHlcIlxyXG4gICAgICAgICAgW2F0dHIueF09XCJ4MVwiXHJcbiAgICAgICAgICBbYXR0ci55XT1cInkxXCJcclxuICAgICAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxyXG4gICAgICAgICAgW3N0eWxlLmZvbnQtc2l6ZV09XCInMTJweCdcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt7IHRpY2tUcmltKHRpY2tGb3JtYXQodGljaykpIH19XHJcbiAgICAgICAgPC9zdmc6dGV4dD5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgIDwvc3ZnOmc+XHJcblxyXG4gICAgPHN2ZzpwYXRoXHJcbiAgICAgICpuZ0lmPVwicmVmZXJlbmNlTGluZUxlbmd0aCA+IDEgJiYgcmVmTWF4ICYmIHJlZk1pbiAmJiBzaG93UmVmTGluZXNcIlxyXG4gICAgICBjbGFzcz1cInJlZmVyZW5jZS1hcmVhXCJcclxuICAgICAgW2F0dHIuZF09XCJyZWZlcmVuY2VBcmVhUGF0aFwiXHJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJncmlkTGluZVRyYW5zZm9ybSgpXCJcclxuICAgIC8+XHJcbiAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHRpY2sgb2YgdGlja3NcIiBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtKHRpY2spXCI+XHJcbiAgICAgIDxzdmc6ZyAqbmdJZj1cInNob3dHcmlkTGluZXNcIiBbYXR0ci50cmFuc2Zvcm1dPVwiZ3JpZExpbmVUcmFuc2Zvcm0oKVwiPlxyXG4gICAgICAgIDxzdmc6bGluZVxyXG4gICAgICAgICAgKm5nSWY9XCJvcmllbnQgPT09ICdsZWZ0J1wiXHJcbiAgICAgICAgICBjbGFzcz1cImdyaWRsaW5lLXBhdGggZ3JpZGxpbmUtcGF0aC1ob3Jpem9udGFsXCJcclxuICAgICAgICAgIHgxPVwiMFwiXHJcbiAgICAgICAgICBbYXR0ci54Ml09XCJncmlkTGluZVdpZHRoXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxzdmc6bGluZVxyXG4gICAgICAgICAgKm5nSWY9XCJvcmllbnQgPT09ICdyaWdodCdcIlxyXG4gICAgICAgICAgY2xhc3M9XCJncmlkbGluZS1wYXRoIGdyaWRsaW5lLXBhdGgtaG9yaXpvbnRhbFwiXHJcbiAgICAgICAgICB4MT1cIjBcIlxyXG4gICAgICAgICAgW2F0dHIueDJdPVwiLWdyaWRMaW5lV2lkdGhcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICA8L3N2ZzpnPlxyXG5cclxuICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgcmVmTGluZSBvZiByZWZlcmVuY2VMaW5lc1wiPlxyXG4gICAgICA8c3ZnOmcgKm5nSWY9XCJzaG93UmVmTGluZXNcIiBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtKHJlZkxpbmUudmFsdWUpXCI+XHJcbiAgICAgICAgPHN2ZzpsaW5lXHJcbiAgICAgICAgICBjbGFzcz1cInJlZmxpbmUtcGF0aCBncmlkbGluZS1wYXRoLWhvcml6b250YWxcIlxyXG4gICAgICAgICAgeDE9XCIwXCJcclxuICAgICAgICAgIFthdHRyLngyXT1cImdyaWRMaW5lV2lkdGhcIlxyXG4gICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cImdyaWRMaW5lVHJhbnNmb3JtKClcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPHN2ZzpnICpuZ0lmPVwic2hvd1JlZkxhYmVsc1wiPlxyXG4gICAgICAgICAgPHRpdGxlPnt7IHRpY2tUcmltKHRpY2tGb3JtYXQocmVmTGluZS52YWx1ZSkpIH19PC90aXRsZT5cclxuICAgICAgICAgIDxzdmc6dGV4dFxyXG4gICAgICAgICAgICBjbGFzcz1cInJlZmxpbmUtbGFiZWxcIlxyXG4gICAgICAgICAgICBbYXR0ci5keV09XCJkeVwiXHJcbiAgICAgICAgICAgIFthdHRyLnldPVwiLTZcIlxyXG4gICAgICAgICAgICBbYXR0ci54XT1cImdyaWRMaW5lV2lkdGhcIlxyXG4gICAgICAgICAgICBbYXR0ci50ZXh0LWFuY2hvcl09XCJ0ZXh0QW5jaG9yXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3sgcmVmTGluZS5uYW1lIH19XHJcbiAgICAgICAgICA8L3N2Zzp0ZXh0PlxyXG4gICAgICAgIDwvc3ZnOmc+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFlBeGlzVGlja3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIHNjYWxlO1xyXG4gIEBJbnB1dCgpIG9yaWVudDtcclxuICBASW5wdXQoKSB0aWNrQXJndW1lbnRzID0gWzVdO1xyXG4gIEBJbnB1dCgpIHRpY2tWYWx1ZXM6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHRpY2tTdHJva2UgPSAnI2NjYyc7XHJcbiAgQElucHV0KCkgdHJpbVRpY2tzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBtYXhUaWNrTGVuZ3RoOiBudW1iZXIgPSAxNjtcclxuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZztcclxuICBASW5wdXQoKSBzaG93R3JpZExpbmVzID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZ3JpZExpbmVXaWR0aDtcclxuICBASW5wdXQoKSBoZWlnaHQ7XHJcbiAgQElucHV0KCkgcmVmZXJlbmNlTGluZXM7XHJcbiAgQElucHV0KCkgc2hvd1JlZkxhYmVsczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHNob3dSZWZMaW5lczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgZGltZW5zaW9uc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGlubmVyVGlja1NpemU6IGFueSA9IDY7XHJcbiAgdGlja1BhZGRpbmc6IGFueSA9IDM7XHJcbiAgdGlja1NwYWNpbmc6IGFueTtcclxuICB2ZXJ0aWNhbFNwYWNpbmc6IG51bWJlciA9IDIwO1xyXG4gIHRleHRBbmNob3I6IGFueSA9ICdtaWRkbGUnO1xyXG4gIGR5OiBhbnk7XHJcbiAgeDE6IGFueTtcclxuICB4MjogYW55O1xyXG4gIHkxOiBhbnk7XHJcbiAgeTI6IGFueTtcclxuICBhZGp1c3RlZFNjYWxlOiBhbnk7XHJcbiAgdHJhbnNmb3JtOiAobzogYW55KSA9PiBzdHJpbmc7XHJcbiAgdGlja0Zvcm1hdDogKG86IGFueSkgPT4gc3RyaW5nO1xyXG4gIHRpY2tzOiBhbnk7XHJcbiAgd2lkdGg6IG51bWJlciA9IDA7XHJcbiAgb3V0ZXJUaWNrU2l6ZTogbnVtYmVyID0gNjtcclxuICByb3RhdGVMYWJlbHM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICByZWZNYXg6IG51bWJlcjtcclxuICByZWZNaW46IG51bWJlcjtcclxuICByZWZlcmVuY2VMaW5lTGVuZ3RoOiBudW1iZXIgPSAwO1xyXG4gIHJlZmVyZW5jZUFyZWFQYXRoOiBzdHJpbmc7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ3RpY2tzZWwnKSB0aWNrc0VsZW1lbnQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlRGltcygpKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZURpbXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCB3aWR0aCA9IHBhcnNlSW50KHRoaXMudGlja3NFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgsIDEwKTtcclxuICAgIGlmICh3aWR0aCAhPT0gdGhpcy53aWR0aCkge1xyXG4gICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgIHRoaXMuZGltZW5zaW9uc0NoYW5nZWQuZW1pdCh7IHdpZHRoIH0pO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlRGltcygpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIGxldCBzY2FsZTtcclxuICAgIGNvbnN0IHNpZ24gPSB0aGlzLm9yaWVudCA9PT0gJ3RvcCcgfHwgdGhpcy5vcmllbnQgPT09ICdyaWdodCcgPyAtMSA6IDE7XHJcbiAgICB0aGlzLnRpY2tTcGFjaW5nID0gTWF0aC5tYXgodGhpcy5pbm5lclRpY2tTaXplLCAwKSArIHRoaXMudGlja1BhZGRpbmc7XHJcblxyXG4gICAgc2NhbGUgPSB0aGlzLnNjYWxlO1xyXG4gICAgdGhpcy50aWNrcyA9IHRoaXMuZ2V0VGlja3MoKTtcclxuXHJcbiAgICBpZiAodGhpcy50aWNrRm9ybWF0dGluZykge1xyXG4gICAgICB0aGlzLnRpY2tGb3JtYXQgPSB0aGlzLnRpY2tGb3JtYXR0aW5nO1xyXG4gICAgfSBlbHNlIGlmIChzY2FsZS50aWNrRm9ybWF0KSB7XHJcbiAgICAgIHRoaXMudGlja0Zvcm1hdCA9IHNjYWxlLnRpY2tGb3JtYXQuYXBwbHkoc2NhbGUsIHRoaXMudGlja0FyZ3VtZW50cyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRpY2tGb3JtYXQgPSBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgaWYgKGQuY29uc3RydWN0b3IubmFtZSA9PT0gJ0RhdGUnKSB7XHJcbiAgICAgICAgICByZXR1cm4gZC50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGQudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkanVzdGVkU2NhbGUgPSBzY2FsZS5iYW5kd2lkdGhcclxuICAgICAgPyBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICByZXR1cm4gc2NhbGUoZCkgKyBzY2FsZS5iYW5kd2lkdGgoKSAqIDAuNTtcclxuICAgICAgICB9XHJcbiAgICAgIDogc2NhbGU7XHJcblxyXG4gICAgaWYgKHRoaXMuc2hvd1JlZkxpbmVzICYmIHRoaXMucmVmZXJlbmNlTGluZXMpIHtcclxuICAgICAgdGhpcy5zZXRSZWZlcmVuY2VsaW5lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAodGhpcy5vcmllbnQpIHtcclxuICAgICAgY2FzZSAndG9wJzpcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IGZ1bmN0aW9uKHRpY2spIHtcclxuICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyB0aGlzLmFkanVzdGVkU2NhbGUodGljaykgKyAnLDApJztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdtaWRkbGUnO1xyXG4gICAgICAgIHRoaXMueTIgPSB0aGlzLmlubmVyVGlja1NpemUgKiBzaWduO1xyXG4gICAgICAgIHRoaXMueTEgPSB0aGlzLnRpY2tTcGFjaW5nICogc2lnbjtcclxuICAgICAgICB0aGlzLmR5ID0gc2lnbiA8IDAgPyAnMGVtJyA6ICcuNzFlbSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBmdW5jdGlvbih0aWNrKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgdGhpcy5hZGp1c3RlZFNjYWxlKHRpY2spICsgJywwKSc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnbWlkZGxlJztcclxuICAgICAgICB0aGlzLnkyID0gdGhpcy5pbm5lclRpY2tTaXplICogc2lnbjtcclxuICAgICAgICB0aGlzLnkxID0gdGhpcy50aWNrU3BhY2luZyAqIHNpZ247XHJcbiAgICAgICAgdGhpcy5keSA9IHNpZ24gPCAwID8gJzBlbScgOiAnLjcxZW0nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IGZ1bmN0aW9uKHRpY2spIHtcclxuICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKDAsJyArIHRoaXMuYWRqdXN0ZWRTY2FsZSh0aWNrKSArICcpJztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdlbmQnO1xyXG4gICAgICAgIHRoaXMueDIgPSB0aGlzLmlubmVyVGlja1NpemUgKiAtc2lnbjtcclxuICAgICAgICB0aGlzLngxID0gdGhpcy50aWNrU3BhY2luZyAqIC1zaWduO1xyXG4gICAgICAgIHRoaXMuZHkgPSAnLjMyZW0nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBmdW5jdGlvbih0aWNrKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmFkanVzdGVkU2NhbGUodGljaykgKyAnKSc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnc3RhcnQnO1xyXG4gICAgICAgIHRoaXMueDIgPSB0aGlzLmlubmVyVGlja1NpemUgKiAtc2lnbjtcclxuICAgICAgICB0aGlzLngxID0gdGhpcy50aWNrU3BhY2luZyAqIC1zaWduO1xyXG4gICAgICAgIHRoaXMuZHkgPSAnLjMyZW0nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgfVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZURpbXMoKSk7XHJcbiAgfVxyXG5cclxuICBzZXRSZWZlcmVuY2VsaW5lcygpOiB2b2lkIHtcclxuICAgIHRoaXMucmVmTWluID0gdGhpcy5hZGp1c3RlZFNjYWxlKFxyXG4gICAgICBNYXRoLm1pbi5hcHBseShcclxuICAgICAgICBudWxsLFxyXG4gICAgICAgIHRoaXMucmVmZXJlbmNlTGluZXMubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSlcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIHRoaXMucmVmTWF4ID0gdGhpcy5hZGp1c3RlZFNjYWxlKFxyXG4gICAgICBNYXRoLm1heC5hcHBseShcclxuICAgICAgICBudWxsLFxyXG4gICAgICAgIHRoaXMucmVmZXJlbmNlTGluZXMubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSlcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIHRoaXMucmVmZXJlbmNlTGluZUxlbmd0aCA9IHRoaXMucmVmZXJlbmNlTGluZXMubGVuZ3RoO1xyXG5cclxuICAgIHRoaXMucmVmZXJlbmNlQXJlYVBhdGggPSByb3VuZGVkUmVjdCgwLCB0aGlzLnJlZk1heCwgdGhpcy5ncmlkTGluZVdpZHRoLCB0aGlzLnJlZk1pbiAtIHRoaXMucmVmTWF4LCAwLCBbXHJcbiAgICAgIGZhbHNlLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIGZhbHNlXHJcbiAgICBdKTtcclxuICB9XHJcblxyXG4gIGdldFRpY2tzKCk6IGFueSB7XHJcbiAgICBsZXQgdGlja3M7XHJcbiAgICBjb25zdCBtYXhUaWNrcyA9IHRoaXMuZ2V0TWF4VGlja3MoMjApO1xyXG4gICAgY29uc3QgbWF4U2NhbGVUaWNrcyA9IHRoaXMuZ2V0TWF4VGlja3MoNTApO1xyXG5cclxuICAgIGlmICh0aGlzLnRpY2tWYWx1ZXMpIHtcclxuICAgICAgdGlja3MgPSB0aGlzLnRpY2tWYWx1ZXM7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGUudGlja3MpIHtcclxuICAgICAgdGlja3MgPSB0aGlzLnNjYWxlLnRpY2tzLmFwcGx5KHRoaXMuc2NhbGUsIFttYXhTY2FsZVRpY2tzXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aWNrcyA9IHRoaXMuc2NhbGUuZG9tYWluKCk7XHJcbiAgICAgIHRpY2tzID0gcmVkdWNlVGlja3ModGlja3MsIG1heFRpY2tzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGlja3M7XHJcbiAgfVxyXG5cclxuICBnZXRNYXhUaWNrcyh0aWNrSGVpZ2h0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5oZWlnaHQgLyB0aWNrSGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIHRpY2tUcmFuc2Zvcm0odGljayk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSgke3RoaXMuYWRqdXN0ZWRTY2FsZSh0aWNrKX0sJHt0aGlzLnZlcnRpY2FsU3BhY2luZ30pYDtcclxuICB9XHJcblxyXG4gIGdyaWRMaW5lVHJhbnNmb3JtKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSg1LDApYDtcclxuICB9XHJcblxyXG4gIHRpY2tUcmltKGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudHJpbVRpY2tzID8gdHJpbUxhYmVsKGxhYmVsLCB0aGlzLm1heFRpY2tMZW5ndGgpIDogbGFiZWw7XHJcbiAgfVxyXG59XHJcbiJdfQ==