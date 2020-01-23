import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LinearGaugeComponent } from './linear-gauge.component';
import { GaugeComponent } from './gauge.component';
import { GaugeArcComponent } from './gauge-arc.component';
import { GaugeAxisComponent } from './gauge-axis.component';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { BarChartModule } from '../bar-chart/bar-chart.module';
let GaugeModule = class GaugeModule {
};
GaugeModule = __decorate([
    NgModule({
        imports: [ChartCommonModule, PieChartModule, BarChartModule],
        declarations: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent],
        exports: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent]
    })
], GaugeModule);
export { GaugeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvZ2F1Z2UvZ2F1Z2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBTy9ELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7Q0FBRyxDQUFBO0FBQWQsV0FBVztJQUx2QixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFDO1FBQzVELFlBQVksRUFBRSxDQUFDLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQztRQUMzRixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUM7S0FDdkYsQ0FBQztHQUNXLFdBQVcsQ0FBRztTQUFkLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlJztcclxuaW1wb3J0IHsgTGluZWFyR2F1Z2VDb21wb25lbnQgfSBmcm9tICcuL2xpbmVhci1nYXVnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHYXVnZUNvbXBvbmVudCB9IGZyb20gJy4vZ2F1Z2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR2F1Z2VBcmNDb21wb25lbnQgfSBmcm9tICcuL2dhdWdlLWFyYy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHYXVnZUF4aXNDb21wb25lbnQgfSBmcm9tICcuL2dhdWdlLWF4aXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGllQ2hhcnRNb2R1bGUgfSBmcm9tICcuLi9waWUtY2hhcnQvcGllLWNoYXJ0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IEJhckNoYXJ0TW9kdWxlIH0gZnJvbSAnLi4vYmFyLWNoYXJ0L2Jhci1jaGFydC5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGUsIFBpZUNoYXJ0TW9kdWxlLCBCYXJDaGFydE1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTGluZWFyR2F1Z2VDb21wb25lbnQsIEdhdWdlQ29tcG9uZW50LCBHYXVnZUFyY0NvbXBvbmVudCwgR2F1Z2VBeGlzQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbTGluZWFyR2F1Z2VDb21wb25lbnQsIEdhdWdlQ29tcG9uZW50LCBHYXVnZUFyY0NvbXBvbmVudCwgR2F1Z2VBeGlzQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2F1Z2VNb2R1bGUge31cclxuIl19