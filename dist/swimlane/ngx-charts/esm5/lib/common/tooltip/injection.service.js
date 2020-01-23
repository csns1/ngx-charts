import { __decorate, __values } from "tslib";
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef, EmbeddedViewRef, Type } from '@angular/core';
import { DomPortalHost, ComponentPortal } from '@angular/cdk/portal';
function isViewContainerRef(x) {
    return x.element;
}
/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 */
var InjectionService = /** @class */ (function () {
    function InjectionService(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    InjectionService_1 = InjectionService;
    /**
     * Sets a default global root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     */
    InjectionService.setGlobalRootViewContainer = function (container) {
        InjectionService_1.globalRootViewContainer = container;
    };
    /**
     * Gets the root view container to inject the component to.
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainer = function () {
        if (this._container)
            return this._container;
        if (InjectionService_1.globalRootViewContainer)
            return InjectionService_1.globalRootViewContainer;
        if (this.applicationRef.components.length)
            return this.applicationRef.components[0];
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer or setGlobalRootViewContainer.');
    };
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.setRootViewContainer = function (container) {
        this._container = container;
    };
    /**
     * Gets the html element for a component ref.
     *
     * @param componentRef
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getComponentRootNode = function (component) {
        if (isViewContainerRef(component)) {
            return component.element.nativeElement;
        }
        if (component.hostView && component.hostView.rootNodes.length > 0) {
            return component.hostView.rootNodes[0];
        }
        // the top most component root node has no `hostView`
        return component.location.nativeElement;
    };
    /**
     * Gets the root component container html element.
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainerNode = function (component) {
        return this.getComponentRootNode(component);
    };
    /**
     * Projects the bindings onto the component
     *
     * @param component
     * @param options
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.projectComponentBindings = function (component, bindings) {
        var e_1, _a, e_2, _b;
        if (bindings) {
            if (bindings.inputs !== undefined) {
                var bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                try {
                    for (var bindingKeys_1 = __values(bindingKeys), bindingKeys_1_1 = bindingKeys_1.next(); !bindingKeys_1_1.done; bindingKeys_1_1 = bindingKeys_1.next()) {
                        var bindingName = bindingKeys_1_1.value;
                        component.instance[bindingName] = bindings.inputs[bindingName];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (bindingKeys_1_1 && !bindingKeys_1_1.done && (_a = bindingKeys_1.return)) _a.call(bindingKeys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (bindings.outputs !== undefined) {
                var eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                try {
                    for (var eventKeys_1 = __values(eventKeys), eventKeys_1_1 = eventKeys_1.next(); !eventKeys_1_1.done; eventKeys_1_1 = eventKeys_1.next()) {
                        var eventName = eventKeys_1_1.value;
                        component.instance[eventName] = bindings.outputs[eventName];
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (eventKeys_1_1 && !eventKeys_1_1.done && (_b = eventKeys_1.return)) _b.call(eventKeys_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        return component;
    };
    /**
     * Appends a component to a adjacent location
     *
     * @param componentClass
     * @param [options={}]
     * @param [location]
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.appendComponent = function (componentClass, bindings, location) {
        if (bindings === void 0) { bindings = {}; }
        if (!location)
            location = this.getRootViewContainer();
        var appendLocation = this.getComponentRootNode(location);
        var portalHost = new DomPortalHost(appendLocation, this.componentFactoryResolver, this.applicationRef, this.injector);
        var portal = new ComponentPortal(componentClass);
        var componentRef = portalHost.attach(portal);
        this.projectComponentBindings(componentRef, bindings);
        return componentRef;
    };
    var InjectionService_1;
    InjectionService.globalRootViewContainer = null;
    InjectionService.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    InjectionService = InjectionService_1 = __decorate([
        Injectable()
    ], InjectionService);
    return InjectionService;
}());
export { InjectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC9pbmplY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixJQUFJLEVBQ0wsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRSxTQUFTLGtCQUFrQixDQUFDLENBQU07SUFDaEMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFFSDtJQWVFLDBCQUNVLGNBQThCLEVBQzlCLHdCQUFrRCxFQUNsRCxRQUFrQjtRQUZsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3pCLENBQUM7eUJBbkJPLGdCQUFnQjtJQUczQjs7Ozs7T0FLRztJQUNJLDJDQUEwQixHQUFqQyxVQUFrQyxTQUEyQjtRQUMzRCxrQkFBZ0IsQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUM7SUFDdkQsQ0FBQztJQVVEOzs7O09BSUc7SUFDSCwrQ0FBb0IsR0FBcEI7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzVDLElBQUksa0JBQWdCLENBQUMsdUJBQXVCO1lBQUUsT0FBTyxrQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQztRQUU5RixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFB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Qzs7SUFqSU0sd0NBQXVCLEdBQXFCLElBQUksQ0FBQzs7Z0JBZTlCLGNBQWM7Z0JBQ0osd0JBQXdCO2dCQUN4QyxRQUFROztJQWxCakIsZ0JBQWdCO1FBRDVCLFVBQVUsRUFBRTtPQUNBLGdCQUFnQixDQW1JNUI7SUFBRCx1QkFBQztDQUFBLEFBbklELElBbUlDO1NBbklZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQXBwbGljYXRpb25SZWYsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBJbmplY3RhYmxlLFxyXG4gIEluamVjdG9yLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgRW1iZWRkZWRWaWV3UmVmLFxyXG4gIFR5cGVcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tUG9ydGFsSG9zdCwgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcblxyXG5mdW5jdGlvbiBpc1ZpZXdDb250YWluZXJSZWYoeDogYW55KTogeCBpcyBWaWV3Q29udGFpbmVyUmVmIHtcclxuICByZXR1cm4geC5lbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogSW5qZWN0aW9uIHNlcnZpY2UgaXMgYSBoZWxwZXIgdG8gYXBwZW5kIGNvbXBvbmVudHNcclxuICogZHluYW1pY2FsbHkgdG8gYSBrbm93biBsb2NhdGlvbiBpbiB0aGUgRE9NLCBtb3N0XHJcbiAqIG5vdGVhYmx5IGZvciBkaWFsb2dzL3Rvb2x0aXBzIGFwcGVuZGluZyB0byBib2R5LlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbmplY3Rpb25TZXJ2aWNlIHtcclxuICBzdGF0aWMgZ2xvYmFsUm9vdFZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGEgZGVmYXVsdCBnbG9iYWwgcm9vdCB2aWV3IGNvbnRhaW5lci4gVGhpcyBpcyB1c2VmdWwgZm9yXHJcbiAgICogdGhpbmdzIGxpa2UgbmdVcGdyYWRlIHRoYXQgZG9lc24ndCBoYXZlIGEgQXBwbGljYXRpb25SZWYgcm9vdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb250YWluZXJcclxuICAgKi9cclxuICBzdGF0aWMgc2V0R2xvYmFsUm9vdFZpZXdDb250YWluZXIoY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKTogdm9pZCB7XHJcbiAgICBJbmplY3Rpb25TZXJ2aWNlLmdsb2JhbFJvb3RWaWV3Q29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSByb290IHZpZXcgY29udGFpbmVyIHRvIGluamVjdCB0aGUgY29tcG9uZW50IHRvLlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcclxuICAgKi9cclxuICBnZXRSb290Vmlld0NvbnRhaW5lcigpOiBWaWV3Q29udGFpbmVyUmVmIHwgQ29tcG9uZW50UmVmPGFueT4ge1xyXG4gICAgaWYgKHRoaXMuX2NvbnRhaW5lcikgcmV0dXJuIHRoaXMuX2NvbnRhaW5lcjtcclxuICAgIGlmIChJbmplY3Rpb25TZXJ2aWNlLmdsb2JhbFJvb3RWaWV3Q29udGFpbmVyKSByZXR1cm4gSW5qZWN0aW9uU2VydmljZS5nbG9iYWxSb290Vmlld0NvbnRhaW5lcjtcclxuXHJcbiAgICBpZiAodGhpcy5hcHBsaWNhdGlvblJlZi5jb21wb25lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuYXBwbGljYXRpb25SZWYuY29tcG9uZW50c1swXTtcclxuXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICdWaWV3IENvbnRhaW5lciBub3QgZm91bmQhIG5nVXBncmFkZSBuZWVkcyB0byBtYW51YWxseSBzZXQgdGhpcyB2aWEgc2V0Um9vdFZpZXdDb250YWluZXIgb3Igc2V0R2xvYmFsUm9vdFZpZXdDb250YWluZXIuJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlcyB0aGUgZGVmYXVsdCByb290IHZpZXcgY29udGFpbmVyLiBUaGlzIGlzIHVzZWZ1bCBmb3JcclxuICAgKiB0aGluZ3MgbGlrZSBuZ1VwZ3JhZGUgdGhhdCBkb2Vzbid0IGhhdmUgYSBBcHBsaWNhdGlvblJlZiByb290LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNvbnRhaW5lclxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcclxuICAgKi9cclxuICBzZXRSb290Vmlld0NvbnRhaW5lcihjb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpOiB2b2lkIHtcclxuICAgIHRoaXMuX2NvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGh0bWwgZWxlbWVudCBmb3IgYSBjb21wb25lbnQgcmVmLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNvbXBvbmVudFJlZlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcclxuICAgKi9cclxuICBnZXRDb21wb25lbnRSb290Tm9kZShjb21wb25lbnQ6IFZpZXdDb250YWluZXJSZWYgfCBDb21wb25lbnRSZWY8YW55Pik6IEhUTUxFbGVtZW50IHtcclxuICAgIGlmIChpc1ZpZXdDb250YWluZXJSZWYoY29tcG9uZW50KSkge1xyXG4gICAgICByZXR1cm4gY29tcG9uZW50LmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmIChjb21wb25lbnQuaG9zdFZpZXcgJiYgKGNvbXBvbmVudC5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIChjb21wb25lbnQuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGUgdG9wIG1vc3QgY29tcG9uZW50IHJvb3Qgbm9kZSBoYXMgbm8gYGhvc3RWaWV3YFxyXG4gICAgcmV0dXJuIGNvbXBvbmVudC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgcm9vdCBjb21wb25lbnQgY29udGFpbmVyIGh0bWwgZWxlbWVudC5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXHJcbiAgICovXHJcbiAgZ2V0Um9vdFZpZXdDb250YWluZXJOb2RlKGNvbXBvbmVudDogVmlld0NvbnRhaW5lclJlZiB8IENvbXBvbmVudFJlZjxhbnk+KTogSFRNTEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29tcG9uZW50Um9vdE5vZGUoY29tcG9uZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3RzIHRoZSBiaW5kaW5ncyBvbnRvIHRoZSBjb21wb25lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb21wb25lbnRcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcclxuICAgKi9cclxuICBwcm9qZWN0Q29tcG9uZW50QmluZGluZ3MoY29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PiwgYmluZGluZ3M6IGFueSk6IENvbXBvbmVudFJlZjxhbnk+IHtcclxuICAgIGlmIChiaW5kaW5ncykge1xyXG4gICAgICBpZiAoYmluZGluZ3MuaW5wdXRzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBiaW5kaW5nS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJpbmRpbmdzLmlucHV0cyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBiaW5kaW5nTmFtZSBvZiBiaW5kaW5nS2V5cykge1xyXG4gICAgICAgICAgY29tcG9uZW50Lmluc3RhbmNlW2JpbmRpbmdOYW1lXSA9IGJpbmRpbmdzLmlucHV0c1tiaW5kaW5nTmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYmluZGluZ3Mub3V0cHV0cyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmluZGluZ3Mub3V0cHV0cyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudE5hbWUgb2YgZXZlbnRLZXlzKSB7XHJcbiAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbZXZlbnROYW1lXSA9IGJpbmRpbmdzLm91dHB1dHNbZXZlbnROYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwZW5kcyBhIGNvbXBvbmVudCB0byBhIGFkamFjZW50IGxvY2F0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29tcG9uZW50Q2xhc3NcclxuICAgKiBAcGFyYW0gW29wdGlvbnM9e31dXHJcbiAgICogQHBhcmFtIFtsb2NhdGlvbl1cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXHJcbiAgICovXHJcbiAgYXBwZW5kQ29tcG9uZW50PFQ+KGNvbXBvbmVudENsYXNzOiBUeXBlPFQ+LCBiaW5kaW5nczogYW55ID0ge30sIGxvY2F0aW9uPzogYW55KTogQ29tcG9uZW50UmVmPGFueT4ge1xyXG4gICAgaWYgKCFsb2NhdGlvbikgbG9jYXRpb24gPSB0aGlzLmdldFJvb3RWaWV3Q29udGFpbmVyKCk7XHJcbiAgICBjb25zdCBhcHBlbmRMb2NhdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50Um9vdE5vZGUobG9jYXRpb24pO1xyXG5cclxuICAgIGNvbnN0IHBvcnRhbEhvc3QgPSBuZXcgRG9tUG9ydGFsSG9zdChcclxuICAgICAgYXBwZW5kTG9jYXRpb24sXHJcbiAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLFxyXG4gICAgICB0aGlzLmluamVjdG9yXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoY29tcG9uZW50Q2xhc3MpO1xyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHBvcnRhbEhvc3QuYXR0YWNoKHBvcnRhbCk7XHJcbiAgICB0aGlzLnByb2plY3RDb21wb25lbnRCaW5kaW5ncyhjb21wb25lbnRSZWYsIGJpbmRpbmdzKTtcclxuICAgIHJldHVybiBjb21wb25lbnRSZWY7XHJcbiAgfVxyXG59XHJcbiJdfQ==