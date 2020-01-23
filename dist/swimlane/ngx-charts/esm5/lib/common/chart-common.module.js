import { __decorate, __read, __spread } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './charts/chart.component';
import { BaseChartComponent } from './base-chart.component';
import { AxesModule } from './axes/axes.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { CircleSeriesComponent } from './circle-series.component';
import { CircleComponent } from './circle.component';
import { GridPanelComponent } from './grid-panel.component';
import { GridPanelSeriesComponent } from './grid-panel-series.component';
import { SvgLinearGradientComponent } from './svg-linear-gradient.component';
import { SvgRadialGradientComponent } from './svg-radial-gradient.component';
import { AreaComponent } from './area.component';
import { CountUpDirective } from './count/count.directive';
import { TooltipArea } from './tooltip-area.component';
import { Timeline } from './timeline/timeline.component';
import { VisibilityObserver } from '../utils/visibility-observer';
import { LegendComponent } from './legend/legend.component';
import { LegendEntryComponent } from './legend/legend-entry.component';
import { ScaleLegendComponent } from './legend/scale-legend.component';
import { AdvancedLegendComponent } from './legend/advanced-legend.component';
var COMPONENTS = [
    AreaComponent,
    BaseChartComponent,
    CountUpDirective,
    TooltipArea,
    ChartComponent,
    LegendComponent,
    LegendEntryComponent,
    ScaleLegendComponent,
    CircleComponent,
    CircleSeriesComponent,
    GridPanelComponent,
    GridPanelSeriesComponent,
    SvgLinearGradientComponent,
    SvgRadialGradientComponent,
    Timeline,
    AdvancedLegendComponent
];
var ChartCommonModule = /** @class */ (function () {
    function ChartCommonModule() {
    }
    ChartCommonModule = __decorate([
        NgModule({
            imports: [CommonModule, AxesModule, TooltipModule],
            declarations: __spread(COMPONENTS, [VisibilityObserver]),
            exports: __spread([CommonModule, AxesModule, TooltipModule], COMPONENTS, [VisibilityObserver])
        })
    ], ChartCommonModule);
    return ChartCommonModule;
}());
export { ChartCommonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTdFLElBQU0sVUFBVSxHQUFHO0lBQ2pCLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxjQUFjO0lBQ2QsZUFBZTtJQUNmLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQiwwQkFBMEI7SUFDMUIsUUFBUTtJQUNSLHVCQUF1QjtDQUN4QixDQUFDO0FBT0Y7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGlCQUFpQjtRQUw3QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQztZQUNsRCxZQUFZLFdBQU0sVUFBVSxHQUFFLGtCQUFrQixFQUFDO1lBQ2pELE9BQU8sWUFBRyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsR0FBSyxVQUFVLEdBQUUsa0JBQWtCLEVBQUM7U0FDdEYsQ0FBQztPQUNXLGlCQUFpQixDQUFHO0lBQUQsd0JBQUM7Q0FBQSxBQUFqQyxJQUFpQztTQUFwQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2NoYXJ0cy9jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY2hhcnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXhlc01vZHVsZSB9IGZyb20gJy4vYXhlcy9heGVzLm1vZHVsZSc7XHJcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICcuL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBDaXJjbGVTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL2NpcmNsZS1zZXJpZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2lyY2xlQ29tcG9uZW50IH0gZnJvbSAnLi9jaXJjbGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR3JpZFBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLXBhbmVsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdyaWRQYW5lbFNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC1wYW5lbC1zZXJpZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3ZnTGluZWFyR3JhZGllbnRDb21wb25lbnQgfSBmcm9tICcuL3N2Zy1saW5lYXItZ3JhZGllbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3ZnUmFkaWFsR3JhZGllbnRDb21wb25lbnQgfSBmcm9tICcuL3N2Zy1yYWRpYWwtZ3JhZGllbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXJlYUNvbXBvbmVudCB9IGZyb20gJy4vYXJlYS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb3VudFVwRGlyZWN0aXZlIH0gZnJvbSAnLi9jb3VudC9jb3VudC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUb29sdGlwQXJlYSB9IGZyb20gJy4vdG9vbHRpcC1hcmVhLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVsaW5lIH0gZnJvbSAnLi90aW1lbGluZS90aW1lbGluZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWaXNpYmlsaXR5T2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscy92aXNpYmlsaXR5LW9ic2VydmVyJztcclxuaW1wb3J0IHsgTGVnZW5kQ29tcG9uZW50IH0gZnJvbSAnLi9sZWdlbmQvbGVnZW5kLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExlZ2VuZEVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi9sZWdlbmQvbGVnZW5kLWVudHJ5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNjYWxlTGVnZW5kQ29tcG9uZW50IH0gZnJvbSAnLi9sZWdlbmQvc2NhbGUtbGVnZW5kLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFkdmFuY2VkTGVnZW5kQ29tcG9uZW50IH0gZnJvbSAnLi9sZWdlbmQvYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCBDT01QT05FTlRTID0gW1xyXG4gIEFyZWFDb21wb25lbnQsXHJcbiAgQmFzZUNoYXJ0Q29tcG9uZW50LFxyXG4gIENvdW50VXBEaXJlY3RpdmUsXHJcbiAgVG9vbHRpcEFyZWEsXHJcbiAgQ2hhcnRDb21wb25lbnQsXHJcbiAgTGVnZW5kQ29tcG9uZW50LFxyXG4gIExlZ2VuZEVudHJ5Q29tcG9uZW50LFxyXG4gIFNjYWxlTGVnZW5kQ29tcG9uZW50LFxyXG4gIENpcmNsZUNvbXBvbmVudCxcclxuICBDaXJjbGVTZXJpZXNDb21wb25lbnQsXHJcbiAgR3JpZFBhbmVsQ29tcG9uZW50LFxyXG4gIEdyaWRQYW5lbFNlcmllc0NvbXBvbmVudCxcclxuICBTdmdMaW5lYXJHcmFkaWVudENvbXBvbmVudCxcclxuICBTdmdSYWRpYWxHcmFkaWVudENvbXBvbmVudCxcclxuICBUaW1lbGluZSxcclxuICBBZHZhbmNlZExlZ2VuZENvbXBvbmVudFxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBeGVzTW9kdWxlLCBUb29sdGlwTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFsuLi5DT01QT05FTlRTLCBWaXNpYmlsaXR5T2JzZXJ2ZXJdLFxyXG4gIGV4cG9ydHM6IFtDb21tb25Nb2R1bGUsIEF4ZXNNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIC4uLkNPTVBPTkVOVFMsIFZpc2liaWxpdHlPYnNlcnZlcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIENoYXJ0Q29tbW9uTW9kdWxlIHt9XHJcbiJdfQ==