import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { brushX } from 'd3-brush';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { select, event as d3event } from 'd3-selection';
import { id } from '../..//utils/id';
let Timeline = class Timeline {
    constructor(element, cd) {
        this.cd = cd;
        this.height = 50;
        this.select = new EventEmitter();
        this.onDomainChange = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
        if (!this.initialized) {
            this.addBrush();
            this.initialized = true;
        }
    }
    update() {
        this.dims = this.getDims();
        this.height = this.dims.height;
        const offsetY = this.view[1] - this.height;
        this.xDomain = this.getXDomain();
        this.xScale = this.getXScale();
        if (this.brush) {
            this.updateBrush();
        }
        this.transform = `translate(0 , ${offsetY})`;
        this.filterId = 'filter' + id().toString();
        this.filter = `url(#${this.filterId})`;
        this.cd.markForCheck();
    }
    getXDomain() {
        let values = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        let domain = [];
        if (this.scaleType === 'time') {
            const min = Math.min(...values);
            const max = Math.max(...values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(v => Number(v));
            const min = Math.min(...values);
            const max = Math.max(...values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    }
    getXScale() {
        let scale;
        if (this.scaleType === 'time') {
            scale = scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    }
    addBrush() {
        if (this.brush)
            return;
        const height = this.height;
        const width = this.view[0];
        this.brush = brushX()
            .extent([
            [0, 0],
            [width, height]
        ])
            .on('brush end', () => {
            const selection = d3event.selection || this.xScale.range();
            const newDomain = selection.map(this.xScale.invert);
            this.onDomainChange.emit(newDomain);
            this.cd.markForCheck();
        });
        select(this.element)
            .select('.brush')
            .call(this.brush);
    }
    updateBrush() {
        if (!this.brush)
            return;
        const height = this.height;
        const width = this.view[0];
        this.brush.extent([
            [0, 0],
            [width, height]
        ]);
        select(this.element)
            .select('.brush')
            .call(this.brush);
        // clear hardcoded properties so they can be defined by CSS
        select(this.element)
            .select('.selection')
            .attr('fill', undefined)
            .attr('stroke', undefined)
            .attr('fill-opacity', undefined);
        this.cd.markForCheck();
    }
    getDims() {
        const width = this.view[0];
        const dims = {
            width,
            height: this.height
        };
        return dims;
    }
};
Timeline.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], Timeline.prototype, "view", void 0);
__decorate([
    Input()
], Timeline.prototype, "state", void 0);
__decorate([
    Input()
], Timeline.prototype, "results", void 0);
__decorate([
    Input()
], Timeline.prototype, "scheme", void 0);
__decorate([
    Input()
], Timeline.prototype, "customColors", void 0);
__decorate([
    Input()
], Timeline.prototype, "legend", void 0);
__decorate([
    Input()
], Timeline.prototype, "miniChart", void 0);
__decorate([
    Input()
], Timeline.prototype, "autoScale", void 0);
__decorate([
    Input()
], Timeline.prototype, "scaleType", void 0);
__decorate([
    Input()
], Timeline.prototype, "height", void 0);
__decorate([
    Output()
], Timeline.prototype, "select", void 0);
__decorate([
    Output()
], Timeline.prototype, "onDomainChange", void 0);
Timeline = __decorate([
    Component({
        selector: 'g[ngx-charts-timeline]',
        template: `
    <svg:g class="timeline" [attr.transform]="transform">
      <svg:filter [attr.id]="filterId">
        <svg:feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"
        />
      </svg:filter>
      <svg:g class="embedded-chart">
        <ng-content></ng-content>
      </svg:g>
      <svg:rect x="0" [attr.width]="view[0]" y="0" [attr.height]="height" class="brush-background" />
      <svg:g class="brush"></svg:g>
    </svg:g>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".timeline .brush-background{fill:rgba(0,0,0,.05)}.timeline .brush .selection{fill:rgba(0,0,0,.1);stroke-width:1px;stroke:#888}.timeline .brush .handle{fill-opacity:0}.timeline .embedded-chart{opacity:.6}"]
    })
], Timeline);
export { Timeline };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBd0JyQyxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBeUJuQixZQUFZLE9BQW1CLEVBQVUsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFmckQsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUVuQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFROUMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFLM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFD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SXNCLFVBQVU7WUFBYyxpQkFBaUI7O0FBeEJyRDtJQUFSLEtBQUssRUFBRTtzQ0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFO3VDQUFPO0FBQ047SUFBUixLQUFLLEVBQUU7eUNBQVM7QUFDUjtJQUFSLEtBQUssRUFBRTt3Q0FBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOzhDQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7d0NBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTsyQ0FBVztBQUNWO0lBQVIsS0FBSyxFQUFFOzJDQUFXO0FBQ1Y7SUFBUixLQUFLLEVBQUU7MkNBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTt3Q0FBcUI7QUFFbkI7SUFBVCxNQUFNLEVBQUU7d0NBQTZCO0FBQzVCO0lBQVQsTUFBTSxFQUFFO2dEQUFxQztBQWJuQyxRQUFRO0lBdEJwQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7UUFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDaEQsQ0FBQztHQUNXLFFBQVEsQ0FxS3BCO1NBcktZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgYnJ1c2hYIH0gZnJvbSAnZDMtYnJ1c2gnO1xyXG5pbXBvcnQgeyBzY2FsZUxpbmVhciwgc2NhbGVUaW1lLCBzY2FsZVBvaW50IH0gZnJvbSAnZDMtc2NhbGUnO1xyXG5pbXBvcnQgeyBzZWxlY3QsIGV2ZW50IGFzIGQzZXZlbnQgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uLy4uLy91dGlscy9pZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy10aW1lbGluZV0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmcgY2xhc3M9XCJ0aW1lbGluZVwiIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIj5cclxuICAgICAgPHN2ZzpmaWx0ZXIgW2F0dHIuaWRdPVwiZmlsdGVySWRcIj5cclxuICAgICAgICA8c3ZnOmZlQ29sb3JNYXRyaXhcclxuICAgICAgICAgIGluPVwiU291cmNlR3JhcGhpY1wiXHJcbiAgICAgICAgICB0eXBlPVwibWF0cml4XCJcclxuICAgICAgICAgIHZhbHVlcz1cIjAuMzMzMyAwLjMzMzMgMC4zMzMzIDAgMCAwLjMzMzMgMC4zMzMzIDAuMzMzMyAwIDAgMC4zMzMzIDAuMzMzMyAwLjMzMzMgMCAwIDAgMCAwIDEgMFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9zdmc6ZmlsdGVyPlxyXG4gICAgICA8c3ZnOmcgY2xhc3M9XCJlbWJlZGRlZC1jaGFydFwiPlxyXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgICAgPHN2ZzpyZWN0IHg9XCIwXCIgW2F0dHIud2lkdGhdPVwidmlld1swXVwiIHk9XCIwXCIgW2F0dHIuaGVpZ2h0XT1cImhlaWdodFwiIGNsYXNzPVwiYnJ1c2gtYmFja2dyb3VuZFwiIC8+XHJcbiAgICAgIDxzdmc6ZyBjbGFzcz1cImJydXNoXCI+PC9zdmc6Zz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lbGluZS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSB2aWV3O1xyXG4gIEBJbnB1dCgpIHN0YXRlO1xyXG4gIEBJbnB1dCgpIHJlc3VsdHM7XHJcbiAgQElucHV0KCkgc2NoZW1lO1xyXG4gIEBJbnB1dCgpIGN1c3RvbUNvbG9ycztcclxuICBASW5wdXQoKSBsZWdlbmQ7XHJcbiAgQElucHV0KCkgbWluaUNoYXJ0O1xyXG4gIEBJbnB1dCgpIGF1dG9TY2FsZTtcclxuICBASW5wdXQoKSBzY2FsZVR5cGU7XHJcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXIgPSA1MDtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgb25Eb21haW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIGRpbXM6IGFueTtcclxuICB4RG9tYWluOiBhbnlbXTtcclxuICB4U2NhbGU6IGFueTtcclxuICBicnVzaDogYW55O1xyXG4gIHRyYW5zZm9ybTogc3RyaW5nO1xyXG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgZmlsdGVySWQ6IGFueTtcclxuICBmaWx0ZXI6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIHRoaXMuYWRkQnJ1c2goKTtcclxuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpbXMgPSB0aGlzLmdldERpbXMoKTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5kaW1zLmhlaWdodDtcclxuICAgIGNvbnN0IG9mZnNldFkgPSB0aGlzLnZpZXdbMV0gLSB0aGlzLmhlaWdodDtcclxuXHJcbiAgICB0aGlzLnhEb21haW4gPSB0aGlzLmdldFhEb21haW4oKTtcclxuICAgIHRoaXMueFNjYWxlID0gdGhpcy5nZXRYU2NhbGUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5icnVzaCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZUJydXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKDAgLCAke29mZnNldFl9KWA7XHJcblxyXG4gICAgdGhpcy5maWx0ZXJJZCA9ICdmaWx0ZXInICsgaWQoKS50b1N0cmluZygpO1xyXG4gICAgdGhpcy5maWx0ZXIgPSBgdXJsKCMke3RoaXMuZmlsdGVySWR9KWA7XHJcblxyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldFhEb21haW4oKTogYW55W10ge1xyXG4gICAgbGV0IHZhbHVlcyA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgcmVzdWx0cyBvZiB0aGlzLnJlc3VsdHMpIHtcclxuICAgICAgZm9yIChjb25zdCBkIG9mIHJlc3VsdHMuc2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZXMuaW5jbHVkZXMoZC5uYW1lKSkge1xyXG4gICAgICAgICAgdmFsdWVzLnB1c2goZC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgZG9tYWluID0gW107XHJcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xyXG4gICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpO1xyXG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xyXG4gICAgICBkb21haW4gPSBbbWluLCBtYXhdO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgdmFsdWVzID0gdmFsdWVzLm1hcCh2ID0+IE51bWJlcih2KSk7XHJcbiAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLnZhbHVlcyk7XHJcbiAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLnZhbHVlcyk7XHJcbiAgICAgIGRvbWFpbiA9IFttaW4sIG1heF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb21haW4gPSB2YWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRvbWFpbjtcclxuICB9XHJcblxyXG4gIGdldFhTY2FsZSgpIHtcclxuICAgIGxldCBzY2FsZTtcclxuXHJcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xyXG4gICAgICBzY2FsZSA9IHNjYWxlVGltZSgpXHJcbiAgICAgICAgLnJhbmdlKFswLCB0aGlzLmRpbXMud2lkdGhdKVxyXG4gICAgICAgIC5kb21haW4odGhpcy54RG9tYWluKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIHNjYWxlID0gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5yYW5nZShbMCwgdGhpcy5kaW1zLndpZHRoXSlcclxuICAgICAgICAuZG9tYWluKHRoaXMueERvbWFpbik7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnb3JkaW5hbCcpIHtcclxuICAgICAgc2NhbGUgPSBzY2FsZVBvaW50KClcclxuICAgICAgICAucmFuZ2UoWzAsIHRoaXMuZGltcy53aWR0aF0pXHJcbiAgICAgICAgLnBhZGRpbmcoMC4xKVxyXG4gICAgICAgIC5kb21haW4odGhpcy54RG9tYWluKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2NhbGU7XHJcbiAgfVxyXG5cclxuICBhZGRCcnVzaCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmJydXNoKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMudmlld1swXTtcclxuXHJcbiAgICB0aGlzLmJydXNoID0gYnJ1c2hYKClcclxuICAgICAgLmV4dGVudChbXHJcbiAgICAgICAgWzAsIDBdLFxyXG4gICAgICAgIFt3aWR0aCwgaGVpZ2h0XVxyXG4gICAgICBdKVxyXG4gICAgICAub24oJ2JydXNoIGVuZCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBkM2V2ZW50LnNlbGVjdGlvbiB8fCB0aGlzLnhTY2FsZS5yYW5nZSgpO1xyXG4gICAgICAgIGNvbnN0IG5ld0RvbWFpbiA9IHNlbGVjdGlvbi5tYXAodGhpcy54U2NhbGUuaW52ZXJ0KTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkRvbWFpbkNoYW5nZS5lbWl0KG5ld0RvbWFpbik7XHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgc2VsZWN0KHRoaXMuZWxlbWVudClcclxuICAgICAgLnNlbGVjdCgnLmJydXNoJylcclxuICAgICAgLmNhbGwodGhpcy5icnVzaCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVCcnVzaCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5icnVzaCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLnZpZXdbMF07XHJcblxyXG4gICAgdGhpcy5icnVzaC5leHRlbnQoW1xyXG4gICAgICBbMCwgMF0sXHJcbiAgICAgIFt3aWR0aCwgaGVpZ2h0XVxyXG4gICAgXSk7XHJcbiAgICBzZWxlY3QodGhpcy5lbGVtZW50KVxyXG4gICAgICAuc2VsZWN0KCcuYnJ1c2gnKVxyXG4gICAgICAuY2FsbCh0aGlzLmJydXNoKTtcclxuXHJcbiAgICAvLyBjbGVhciBoYXJkY29kZWQgcHJvcGVydGllcyBzbyB0aGV5IGNhbiBiZSBkZWZpbmVkIGJ5IENTU1xyXG4gICAgc2VsZWN0KHRoaXMuZWxlbWVudClcclxuICAgICAgLnNlbGVjdCgnLnNlbGVjdGlvbicpXHJcbiAgICAgIC5hdHRyKCdmaWxsJywgdW5kZWZpbmVkKVxyXG4gICAgICAuYXR0cignc3Ryb2tlJywgdW5kZWZpbmVkKVxyXG4gICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgdW5kZWZpbmVkKTtcclxuXHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGltcygpOiBhbnkge1xyXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLnZpZXdbMF07XHJcblxyXG4gICAgY29uc3QgZGltcyA9IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHRcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRpbXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==