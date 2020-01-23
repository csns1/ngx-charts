import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnChanges, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { escapeLabel } from '../common/label.helper';
import { decimalChecker, count } from '../common/count/count.helper';
var CardComponent = /** @class */ (function () {
    function CardComponent(element, cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.animations = true;
        this.select = new EventEmitter();
        this.value = '';
        this.textFontSize = 12;
        this.textTransform = '';
        this.initialized = false;
        this.bandHeight = 10;
        this.textPadding = [10, 20, 5, 20];
        this.labelFontSize = 15;
        this.element = element.nativeElement;
    }
    CardComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardComponent.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CardComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            var hasValue = _this.data && typeof _this.data.value !== 'undefined';
            var valueFormatting = _this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var labelFormatting = _this.labelFormatting || (function (card) { return escapeLabel(trimLabel(card.label, 55)); });
            _this.transform = "translate(" + _this.x + " , " + _this.y + ")";
            _this.textWidth = Math.max(0, _this.width) - _this.textPadding[1] - _this.textPadding[3];
            _this.cardWidth = Math.max(0, _this.width);
            _this.cardHeight = Math.max(0, _this.height);
            _this.label = _this.label ? _this.label : _this.data.name;
            var cardData = {
                label: _this.label,
                data: _this.data,
                value: _this.data.value
            };
            _this.formattedLabel = labelFormatting(cardData);
            _this.transformBand = "translate(0 , " + (_this.cardHeight - _this.bandHeight) + ")";
            var value = hasValue ? valueFormatting(cardData) : '';
            _this.value = _this.paddedValue(value);
            _this.setPadding();
            _this.bandPath = roundedRect(0, 0, _this.cardWidth, _this.bandHeight, 3, [false, false, true, true]);
            setTimeout(function () {
                _this.scaleText();
                _this.value = value;
                if (hasValue && !_this.initialized) {
                    setTimeout(function () { return _this.startCount(); }, 20);
                }
            }, 8);
        });
    };
    CardComponent.prototype.paddedValue = function (value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    };
    CardComponent.prototype.startCount = function () {
        var _this = this;
        if (!this.initialized && this.animations) {
            cancelAnimationFrame(this.animationReq);
            var val_1 = this.data.value;
            var decs = decimalChecker(val_1);
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var callback = function (_a) {
                var value = _a.value, finished = _a.finished;
                _this.zone.run(function () {
                    value = finished ? val_1 : value;
                    _this.value = valueFormatting_1({ label: _this.label, data: _this.data, value: value });
                    if (!finished) {
                        _this.value = _this.paddedValue(_this.value);
                    }
                    _this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val_1, decs, 1, callback);
            this.initialized = true;
        }
    };
    CardComponent.prototype.scaleText = function () {
        var _this = this;
        this.zone.run(function () {
            var _a = _this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width === 0 || height === 0) {
                return;
            }
            var textPadding = (_this.textPadding[1] = _this.textPadding[3] = _this.cardWidth / 8);
            var availableWidth = _this.cardWidth - 2 * textPadding;
            var availableHeight = _this.cardHeight / 3;
            var resizeScale = Math.min(availableWidth / width, availableHeight / height);
            _this.textFontSize = Math.floor(_this.textFontSize * resizeScale);
            _this.labelFontSize = Math.min(_this.textFontSize, 15);
            _this.setPadding();
            _this.cd.markForCheck();
        });
    };
    CardComponent.prototype.setPadding = function () {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        var padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    };
    CardComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    CardComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], CardComponent.prototype, "color", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "bandColor", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "textColor", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "x", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "y", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "width", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "height", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "label", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "medianSize", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], CardComponent.prototype, "select", void 0);
    __decorate([
        ViewChild('textEl', { static: false })
    ], CardComponent.prototype, "textEl", void 0);
    CardComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-card]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\" (click)=\"onClick()\">\n      <svg:rect class=\"card\" [style.fill]=\"color\" [attr.width]=\"cardWidth\" [attr.height]=\"cardHeight\" rx=\"3\" ry=\"3\" />\n      <svg:path\n        *ngIf=\"bandColor && bandColor !== color\"\n        class=\"card-band\"\n        [attr.fill]=\"bandColor\"\n        [attr.transform]=\"transformBand\"\n        stroke=\"none\"\n        [attr.d]=\"bandPath\"\n      />\n      <title>{{ label }}</title>\n      <svg:foreignObject\n        class=\"trimmed-label\"\n        x=\"5\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"cardHeight - textPadding[2]\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"labelFontSize + textPadding[2]\"\n        alignment-baseline=\"hanging\"\n      >\n        <xhtml:p\n          [style.color]=\"textColor\"\n          [style.fontSize.px]=\"labelFontSize\"\n          [style.lineHeight.px]=\"labelFontSize\"\n          [innerHTML]=\"formattedLabel\"\n        >\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text\n        #textEl\n        class=\"value-text\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0]\"\n        [style.fill]=\"textColor\"\n        text-anchor=\"start\"\n        alignment-baseline=\"hanging\"\n        [style.font-size.pt]=\"textFontSize\"\n      >\n        {{ value }}\n      </svg:text>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], CardComponent);
    return CardComponent;
}());
export { CardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9udW1iZXItY2FyZC9jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsYUFBYSxFQUNiLFNBQVMsRUFDVCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFpRHJFO0lBdUNFLHVCQUFZLE9BQW1CLEVBQVUsRUFBcUIsRUFBVSxJQUFZO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQXpCM0UsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUt0QyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBTW5CLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRzdCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsZ0JBQVcsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBS2pCLElBQUksQ0FBQyxPQUFP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Q0Y7UUFBUixLQUFLLEVBQUU7NENBQUc7SUFDRjtRQUFSLEtBQUssRUFBRTtnREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFO2lEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7Z0RBQU87SUFDTjtRQUFSLEtBQUssRUFBRTsrQ0FBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO3FEQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTswREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7MERBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO3FEQUE0QjtJQUUxQjtRQUFULE1BQU0sRUFBRTtpREFBNkI7SUFFRTtRQUF2QyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO2lEQUFvQjtJQWxCaEQsYUFBYTtRQS9DekIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixRQUFRLEVBQUUsdTRDQTBDVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxhQUFhLENBd0p6QjtJQUFELG9CQUFDO0NBQUEsQUF4SkQsSUF3SkM7U0F4SlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgTmdab25lLFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi9jb21tb24vdHJpbS1sYWJlbC5oZWxwZXInO1xyXG5pbXBvcnQgeyByb3VuZGVkUmVjdCB9IGZyb20gJy4uL2NvbW1vbi9zaGFwZS5oZWxwZXInO1xyXG5pbXBvcnQgeyBlc2NhcGVMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xyXG5pbXBvcnQgeyBkZWNpbWFsQ2hlY2tlciwgY291bnQgfSBmcm9tICcuLi9jb21tb24vY291bnQvY291bnQuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWNhcmRdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cImNlbGxcIiAoY2xpY2spPVwib25DbGljaygpXCI+XHJcbiAgICAgIDxzdmc6cmVjdCBjbGFzcz1cImNhcmRcIiBbc3R5bGUuZmlsbF09XCJjb2xvclwiIFthdHRyLndpZHRoXT1cImNhcmRXaWR0aFwiIFthdHRyLmhlaWdodF09XCJjYXJkSGVpZ2h0XCIgcng9XCIzXCIgcnk9XCIzXCIgLz5cclxuICAgICAgPHN2ZzpwYXRoXHJcbiAgICAgICAgKm5nSWY9XCJiYW5kQ29sb3IgJiYgYmFuZENvbG9yICE9PSBjb2xvclwiXHJcbiAgICAgICAgY2xhc3M9XCJjYXJkLWJhbmRcIlxyXG4gICAgICAgIFthdHRyLmZpbGxdPVwiYmFuZENvbG9yXCJcclxuICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtQmFuZFwiXHJcbiAgICAgICAgc3Ryb2tlPVwibm9uZVwiXHJcbiAgICAgICAgW2F0dHIuZF09XCJiYW5kUGF0aFwiXHJcbiAgICAgIC8+XHJcbiAgICAgIDx0aXRsZT57eyBsYWJlbCB9fTwvdGl0bGU+XHJcbiAgICAgIDxzdmc6Zm9yZWlnbk9iamVjdFxyXG4gICAgICAgIGNsYXNzPVwidHJpbW1lZC1sYWJlbFwiXHJcbiAgICAgICAgeD1cIjVcIlxyXG4gICAgICAgIFthdHRyLnhdPVwidGV4dFBhZGRpbmdbM11cIlxyXG4gICAgICAgIFthdHRyLnldPVwiY2FyZEhlaWdodCAtIHRleHRQYWRkaW5nWzJdXCJcclxuICAgICAgICBbYXR0ci53aWR0aF09XCJ0ZXh0V2lkdGhcIlxyXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJsYWJlbEZvbnRTaXplICsgdGV4dFBhZGRpbmdbMl1cIlxyXG4gICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImhhbmdpbmdcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPHhodG1sOnBcclxuICAgICAgICAgIFtzdHlsZS5jb2xvcl09XCJ0ZXh0Q29sb3JcIlxyXG4gICAgICAgICAgW3N0eWxlLmZvbnRTaXplLnB4XT1cImxhYmVsRm9udFNpemVcIlxyXG4gICAgICAgICAgW3N0eWxlLmxpbmVIZWlnaHQucHhdPVwibGFiZWxGb250U2l6ZVwiXHJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cImZvcm1hdHRlZExhYmVsXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgPC94aHRtbDpwPlxyXG4gICAgICA8L3N2Zzpmb3JlaWduT2JqZWN0PlxyXG4gICAgICA8c3ZnOnRleHRcclxuICAgICAgICAjdGV4dEVsXHJcbiAgICAgICAgY2xhc3M9XCJ2YWx1ZS10ZXh0XCJcclxuICAgICAgICBbYXR0ci54XT1cInRleHRQYWRkaW5nWzNdXCJcclxuICAgICAgICBbYXR0ci55XT1cInRleHRQYWRkaW5nWzBdXCJcclxuICAgICAgICBbc3R5bGUuZmlsbF09XCJ0ZXh0Q29sb3JcIlxyXG4gICAgICAgIHRleHQtYW5jaG9yPVwic3RhcnRcIlxyXG4gICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImhhbmdpbmdcIlxyXG4gICAgICAgIFtzdHlsZS5mb250LXNpemUucHRdPVwidGV4dEZvbnRTaXplXCJcclxuICAgICAgPlxyXG4gICAgICAgIHt7IHZhbHVlIH19XHJcbiAgICAgIDwvc3ZnOnRleHQ+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgY29sb3I7XHJcbiAgQElucHV0KCkgYmFuZENvbG9yO1xyXG4gIEBJbnB1dCgpIHRleHRDb2xvcjtcclxuXHJcbiAgQElucHV0KCkgeDtcclxuICBASW5wdXQoKSB5O1xyXG4gIEBJbnB1dCgpIHdpZHRoO1xyXG4gIEBJbnB1dCgpIGhlaWdodDtcclxuICBASW5wdXQoKSBsYWJlbDtcclxuICBASW5wdXQoKSBkYXRhO1xyXG4gIEBJbnB1dCgpIG1lZGlhblNpemU6IG51bWJlcjtcclxuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZCgndGV4dEVsJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRleHRFbDogRWxlbWVudFJlZjtcclxuXHJcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgdmFsdWU6IHN0cmluZyA9ICcnO1xyXG4gIHRyYW5zZm9ybTogc3RyaW5nO1xyXG4gIGZvcm1hdHRlZExhYmVsOiBzdHJpbmc7XHJcbiAgY2FyZFdpZHRoOiBudW1iZXI7XHJcbiAgY2FyZEhlaWdodDogbnVtYmVyO1xyXG4gIHRleHRXaWR0aDogbnVtYmVyO1xyXG4gIHRleHRGb250U2l6ZTogbnVtYmVyID0gMTI7XHJcbiAgdGV4dFRyYW5zZm9ybTogc3RyaW5nID0gJyc7XHJcbiAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhbmltYXRpb25SZXE6IGFueTtcclxuXHJcbiAgYmFuZEhlaWdodDogbnVtYmVyID0gMTA7XHJcbiAgdHJhbnNmb3JtQmFuZDogc3RyaW5nO1xyXG4gIHRleHRQYWRkaW5nID0gWzEwLCAyMCwgNSwgMjBdO1xyXG4gIGxhYmVsRm9udFNpemUgPSAxNTtcclxuXHJcbiAgYmFuZFBhdGg6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgem9uZTogTmdab25lKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvblJlcSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgY29uc3QgaGFzVmFsdWUgPSB0aGlzLmRhdGEgJiYgdHlwZW9mIHRoaXMuZGF0YS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9IHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8IChjYXJkID0+IGNhcmQudmFsdWUudG9Mb2NhbGVTdHJpbmcoKSk7XHJcbiAgICAgIGNvbnN0IGxhYmVsRm9ybWF0dGluZyA9IHRoaXMubGFiZWxGb3JtYXR0aW5nIHx8IChjYXJkID0+IGVzY2FwZUxhYmVsKHRyaW1MYWJlbChjYXJkLmxhYmVsLCA1NSkpKTtcclxuXHJcbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMueH0gLCAke3RoaXMueX0pYDtcclxuXHJcbiAgICAgIHRoaXMudGV4dFdpZHRoID0gTWF0aC5tYXgoMCwgdGhpcy53aWR0aCkgLSB0aGlzLnRleHRQYWRkaW5nWzFdIC0gdGhpcy50ZXh0UGFkZGluZ1szXTtcclxuICAgICAgdGhpcy5jYXJkV2lkdGggPSBNYXRoLm1heCgwLCB0aGlzLndpZHRoKTtcclxuICAgICAgdGhpcy5jYXJkSGVpZ2h0ID0gTWF0aC5tYXgoMCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWwgPyB0aGlzLmxhYmVsIDogdGhpcy5kYXRhLm5hbWU7XHJcblxyXG4gICAgICBjb25zdCBjYXJkRGF0YSA9IHtcclxuICAgICAgICBsYWJlbDogdGhpcy5sYWJlbCxcclxuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgICAgdmFsdWU6IHRoaXMuZGF0YS52YWx1ZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5mb3JtYXR0ZWRMYWJlbCA9IGxhYmVsRm9ybWF0dGluZyhjYXJkRGF0YSk7XHJcbiAgICAgIHRoaXMudHJhbnNmb3JtQmFuZCA9IGB0cmFuc2xhdGUoMCAsICR7dGhpcy5jYXJkSGVpZ2h0IC0gdGhpcy5iYW5kSGVpZ2h0fSlgO1xyXG5cclxuICAgICAgY29uc3QgdmFsdWUgPSBoYXNWYWx1ZSA/IHZhbHVlRm9ybWF0dGluZyhjYXJkRGF0YSkgOiAnJztcclxuXHJcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnBhZGRlZFZhbHVlKHZhbHVlKTtcclxuICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XHJcblxyXG4gICAgICB0aGlzLmJhbmRQYXRoID0gcm91bmRlZFJlY3QoMCwgMCwgdGhpcy5jYXJkV2lkdGgsIHRoaXMuYmFuZEhlaWdodCwgMywgW2ZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZV0pO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zY2FsZVRleHQoKTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKGhhc1ZhbHVlICYmICF0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc3RhcnRDb3VudCgpLCAyMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCA4KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcGFkZGVkVmFsdWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMubWVkaWFuU2l6ZSAmJiB0aGlzLm1lZGlhblNpemUgPiB2YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgdmFsdWUgKz0gJ1xcdTIwMDcnLnJlcGVhdCh0aGlzLm1lZGlhblNpemUgLSB2YWx1ZS5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc3RhcnRDb3VudCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCAmJiB0aGlzLmFuaW1hdGlvbnMpIHtcclxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXEpO1xyXG5cclxuICAgICAgY29uc3QgdmFsID0gdGhpcy5kYXRhLnZhbHVlO1xyXG4gICAgICBjb25zdCBkZWNzID0gZGVjaW1hbENoZWNrZXIodmFsKTtcclxuICAgICAgY29uc3QgdmFsdWVGb3JtYXR0aW5nID0gdGhpcy52YWx1ZUZvcm1hdHRpbmcgfHwgKGNhcmQgPT4gY2FyZC52YWx1ZS50b0xvY2FsZVN0cmluZygpKTtcclxuXHJcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gKHsgdmFsdWUsIGZpbmlzaGVkIH0pID0+IHtcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHZhbHVlID0gZmluaXNoZWQgPyB2YWwgOiB2YWx1ZTtcclxuICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZUZvcm1hdHRpbmcoeyBsYWJlbDogdGhpcy5sYWJlbCwgZGF0YTogdGhpcy5kYXRhLCB2YWx1ZSB9KTtcclxuICAgICAgICAgIGlmICghZmluaXNoZWQpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFkZGVkVmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5hbmltYXRpb25SZXEgPSBjb3VudCgwLCB2YWwsIGRlY3MsIDEsIGNhbGxiYWNrKTtcclxuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzY2FsZVRleHQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnRleHRFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBpZiAod2lkdGggPT09IDAgfHwgaGVpZ2h0ID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB0ZXh0UGFkZGluZyA9ICh0aGlzLnRleHRQYWRkaW5nWzFdID0gdGhpcy50ZXh0UGFkZGluZ1szXSA9IHRoaXMuY2FyZFdpZHRoIC8gOCk7XHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZVdpZHRoID0gdGhpcy5jYXJkV2lkdGggLSAyICogdGV4dFBhZGRpbmc7XHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZUhlaWdodCA9IHRoaXMuY2FyZEhlaWdodCAvIDM7XHJcblxyXG4gICAgICBjb25zdCByZXNpemVTY2FsZSA9IE1hdGgubWluKGF2YWlsYWJsZVdpZHRoIC8gd2lkdGgsIGF2YWlsYWJsZUhlaWdodCAvIGhlaWdodCk7XHJcbiAgICAgIHRoaXMudGV4dEZvbnRTaXplID0gTWF0aC5mbG9vcih0aGlzLnRleHRGb250U2l6ZSAqIHJlc2l6ZVNjYWxlKTtcclxuICAgICAgdGhpcy5sYWJlbEZvbnRTaXplID0gTWF0aC5taW4odGhpcy50ZXh0Rm9udFNpemUsIDE1KTtcclxuXHJcbiAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xyXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQYWRkaW5nKCkge1xyXG4gICAgdGhpcy50ZXh0UGFkZGluZ1sxXSA9IHRoaXMudGV4dFBhZGRpbmdbM10gPSB0aGlzLmNhcmRXaWR0aCAvIDg7XHJcbiAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5jYXJkSGVpZ2h0IC8gMjtcclxuICAgIHRoaXMudGV4dFBhZGRpbmdbMF0gPSBwYWRkaW5nIC0gdGhpcy50ZXh0Rm9udFNpemUgLSB0aGlzLmxhYmVsRm9udFNpemUgLyAyO1xyXG4gICAgdGhpcy50ZXh0UGFkZGluZ1syXSA9IHBhZGRpbmcgLSB0aGlzLmxhYmVsRm9udFNpemU7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=