import { __decorate } from "tslib";
import { Output, EventEmitter, NgZone, Directive, ElementRef } from '@angular/core';
/**
 * Visibility Observer
 */
let VisibilityObserver = class VisibilityObserver {
    constructor(element, zone) {
        this.element = element;
        this.zone = zone;
        this.visible = new EventEmitter();
        this.isVisible = false;
        this.runCheck();
    }
    destroy() {
        clearTimeout(this.timeout);
    }
    onVisibilityChange() {
        // trigger zone recalc for columns
        this.zone.run(() => {
            this.isVisible = true;
            this.visible.emit(true);
        });
    }
    runCheck() {
        const check = () => {
            if (!this.element) {
                return;
            }
            // https://davidwalsh.name/offsetheight-visibility
            const { offsetHeight, offsetWidth } = this.element.nativeElement;
            if (offsetHeight && offsetWidth) {
                clearTimeout(this.timeout);
                this.onVisibilityChange();
            }
            else {
                clearTimeout(this.timeout);
                this.zone.runOutsideAngular(() => {
                    this.timeout = setTimeout(() => check(), 100);
                });
            }
        };
        this.zone.runOutsideAngular(() => {
            this.timeout = setTimeout(() => check());
        });
    }
};
VisibilityObserver.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Output()
], VisibilityObserver.prototype, "visible", void 0);
VisibilityObserver = __decorate([
    Directive({
        selector: 'visibility-observer'
    })
], VisibilityObserver);
export { VisibilityObserver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJpbGl0eS1vYnNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3Zpc2liaWxpdHktb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBGOztHQUVHO0FBSUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFNN0IsWUFBb0IsT0FBbUIsRUFBVSxJQUFZO1FBQXpDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBTG5ELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUcxRCxjQUFTLEdBQVksS0FBSyxDQUFDO1FBR3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsT0FBTztRQUNMLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLE9BQU87YUFDUjtZQUVELGtEQUFrRDtZQUNsRCxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBRWpFLElBQUksWUFBWSxJQUFJLFdBQVcsRUFBRTtnQkFDL0IsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBOztZQXhDOEIsVUFBVTtZQUFnQixNQUFNOztBQUxuRDtJQUFULE1BQU0sRUFBRTttREFBaUQ7QUFEL0Msa0JBQWtCO0lBSDlCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxxQkFBcUI7S0FDaEMsQ0FBQztHQUNXLGtCQUFrQixDQThDOUI7U0E5Q1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE5nWm9uZSwgRGlyZWN0aXZlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogVmlzaWJpbGl0eSBPYnNlcnZlclxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICd2aXNpYmlsaXR5LW9ic2VydmVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlzaWJpbGl0eU9ic2VydmVyIHtcclxuICBAT3V0cHV0KCkgdmlzaWJsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHRpbWVvdXQ6IGFueTtcclxuICBpc1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xyXG4gICAgdGhpcy5ydW5DaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gIH1cclxuXHJcbiAgb25WaXNpYmlsaXR5Q2hhbmdlKCk6IHZvaWQge1xyXG4gICAgLy8gdHJpZ2dlciB6b25lIHJlY2FsYyBmb3IgY29sdW1uc1xyXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgdGhpcy52aXNpYmxlLmVtaXQodHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJ1bkNoZWNrKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2hlY2sgPSAoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5lbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBodHRwczovL2Rhdmlkd2Fsc2gubmFtZS9vZmZzZXRoZWlnaHQtdmlzaWJpbGl0eVxyXG4gICAgICBjb25zdCB7IG9mZnNldEhlaWdodCwgb2Zmc2V0V2lkdGggfSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgICAgaWYgKG9mZnNldEhlaWdodCAmJiBvZmZzZXRXaWR0aCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgICAgIHRoaXMub25WaXNpYmlsaXR5Q2hhbmdlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gY2hlY2soKSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGNoZWNrKCkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==