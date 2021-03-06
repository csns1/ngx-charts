import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { PolarChartComponent } from './polar-chart.component';
import { PolarSeriesComponent } from './polar-series.component';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { LineChartModule } from '../line-chart/line-chart.module';
var PolarChartModule = /** @class */ (function () {
    function PolarChartModule() {
    }
    PolarChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule, PieChartModule, LineChartModule],
            declarations: [PolarChartComponent, PolarSeriesComponent],
            exports: [PolarChartComponent, PolarSeriesComponent]
        })
    ], PolarChartModule);
    return PolarChartModule;
}());
export { PolarChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sYXItY2hhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvcG9sYXItY2hhcnQvcG9sYXItY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPbEU7SUFBQTtJQUErQixDQUFDO0lBQW5CLGdCQUFnQjtRQUw1QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDO1lBQzdELFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDO1lBQ3pELE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDO1NBQ3JELENBQUM7T0FDVyxnQkFBZ0IsQ0FBRztJQUFELHVCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IFBvbGFyQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL3BvbGFyLWNoYXJ0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBvbGFyU2VyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9wb2xhci1zZXJpZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGllQ2hhcnRNb2R1bGUgfSBmcm9tICcuLi9waWUtY2hhcnQvcGllLWNoYXJ0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IExpbmVDaGFydE1vZHVsZSB9IGZyb20gJy4uL2xpbmUtY2hhcnQvbGluZS1jaGFydC5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGUsIFBpZUNoYXJ0TW9kdWxlLCBMaW5lQ2hhcnRNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1BvbGFyQ2hhcnRDb21wb25lbnQsIFBvbGFyU2VyaWVzQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbUG9sYXJDaGFydENvbXBvbmVudCwgUG9sYXJTZXJpZXNDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQb2xhckNoYXJ0TW9kdWxlIHt9XHJcbiJdfQ==