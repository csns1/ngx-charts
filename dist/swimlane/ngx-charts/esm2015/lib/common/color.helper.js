import { range } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal, scaleQuantile } from 'd3-scale';
import { colorSets } from '../utils/color-sets';
export class ColorHelper {
    constructor(scheme, type, domain, customColors) {
        if (typeof scheme === 'string') {
            scheme = colorSets.find(cs => {
                return cs.name === scheme;
            });
        }
        this.colorDomain = scheme.domain;
        this.scaleType = type;
        this.domain = domain;
        this.customColors = customColors;
        this.scale = this.generateColorScheme(scheme, type, this.domain);
    }
    generateColorScheme(scheme, type, domain) {
        if (typeof scheme === 'string') {
            scheme = colorSets.find(cs => {
                return cs.name === scheme;
            });
        }
        let colorScale;
        if (type === 'quantile') {
            colorScale = scaleQuantile()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'ordinal') {
            colorScale = scaleOrdinal()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'linear') {
            // linear schemes must have at least 2 colors
            const colorDomain = [...scheme.domain];
            if (colorDomain.length === 1) {
                colorDomain.push(colorDomain[0]);
                this.colorDomain = colorDomain;
            }
            const points = range(0, 1, 1.0 / colorDomain.length);
            colorScale = scaleLinear()
                .domain(points)
                .range(colorDomain);
        }
        return colorScale;
    }
    getColor(value) {
        if (value === undefined || value === null) {
            throw new Error('Value can not be null');
        }
        if (this.scaleType === 'linear') {
            const valueScale = scaleLinear()
                .domain(this.domain)
                .range([0, 1]);
            return this.scale(valueScale(value));
        }
        else {
            if (typeof this.customColors === 'function') {
                return this.customColors(value);
            }
            const formattedValue = value.toString();
            let found; // todo type customColors
            if (this.customColors && this.customColors.length > 0) {
                found = this.customColors.find(mapping => {
                    return mapping.name.toLowerCase() === formattedValue.toLowerCase();
                });
            }
            if (found) {
                return found.value;
            }
            else {
                return this.scale(value);
            }
        }
    }
    getLinearGradientStops(value, start) {
        if (start === undefined) {
            start = this.domain[0];
        }
        const valueScale = scaleLinear()
            .domain(this.domain)
            .range([0, 1]);
        const colorValueScale = scaleBand()
            .domain(this.colorDomain)
            .range([0, 1]);
        const endColor = this.getColor(value);
        // generate the stops
        const startVal = valueScale(start);
        const startColor = this.getColor(start);
        const endVal = valueScale(value);
        let i = 1;
        let currentVal = startVal;
        const stops = [];
        stops.push({
            color: startColor,
            offset: startVal,
            originalOffset: startVal,
            opacity: 1
        });
        while (currentVal < endVal && i < this.colorDomain.length) {
            const color = this.colorDomain[i];
            const offset = colorValueScale(color);
            if (offset <= startVal) {
                i++;
                continue;
            }
            if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
                break;
            }
            stops.push({
                color,
                offset,
                opacity: 1
            });
            currentVal = offset;
            i++;
        }
        if (stops[stops.length - 1].offset < 100) {
            stops.push({
                color: endColor,
                offset: endVal,
                opacity: 1
            });
        }
        if (endVal === startVal) {
            stops[0].offset = 0;
            stops[1].offset = 100;
        }
        else {
            // normalize the offsets into percentages
            if (stops[stops.length - 1].offset !== 100) {
                for (const s of stops) {
                    s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
                }
            }
        }
        return stops;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NvbG9yLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWhELE1BQU0sT0FBTyxXQUFXO0lBT3RCLFlBQVksTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBYTtRQUM3QyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5QixNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBRWpDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU07UUFDdEMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFD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QztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmFuZ2UgfSBmcm9tICdkMy1hcnJheSc7XHJcbmltcG9ydCB7IHNjYWxlQmFuZCwgc2NhbGVMaW5lYXIsIHNjYWxlT3JkaW5hbCwgc2NhbGVRdWFudGlsZSB9IGZyb20gJ2QzLXNjYWxlJztcclxuXHJcbmltcG9ydCB7IGNvbG9yU2V0cyB9IGZyb20gJy4uL3V0aWxzL2NvbG9yLXNldHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbG9ySGVscGVyIHtcclxuICBzY2FsZTogYW55O1xyXG4gIHNjYWxlVHlwZTogYW55O1xyXG4gIGNvbG9yRG9tYWluOiBhbnlbXTtcclxuICBkb21haW46IGFueTtcclxuICBjdXN0b21Db2xvcnM6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3Ioc2NoZW1lLCB0eXBlLCBkb21haW4sIGN1c3RvbUNvbG9ycz8pIHtcclxuICAgIGlmICh0eXBlb2Ygc2NoZW1lID09PSAnc3RyaW5nJykge1xyXG4gICAgICBzY2hlbWUgPSBjb2xvclNldHMuZmluZChjcyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNzLm5hbWUgPT09IHNjaGVtZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbG9yRG9tYWluID0gc2NoZW1lLmRvbWFpbjtcclxuICAgIHRoaXMuc2NhbGVUeXBlID0gdHlwZTtcclxuICAgIHRoaXMuZG9tYWluID0gZG9tYWluO1xyXG4gICAgdGhpcy5jdXN0b21Db2xvcnMgPSBjdXN0b21Db2xvcnM7XHJcblxyXG4gICAgdGhpcy5zY2FsZSA9IHRoaXMuZ2VuZXJhdGVDb2xvclNjaGVtZShzY2hlbWUsIHR5cGUsIHRoaXMuZG9tYWluKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlQ29sb3JTY2hlbWUoc2NoZW1lLCB0eXBlLCBkb21haW4pIHtcclxuICAgIGlmICh0eXBlb2Ygc2NoZW1lID09PSAnc3RyaW5nJykge1xyXG4gICAgICBzY2hlbWUgPSBjb2xvclNldHMuZmluZChjcyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNzLm5hbWUgPT09IHNjaGVtZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsZXQgY29sb3JTY2FsZTtcclxuICAgIGlmICh0eXBlID09PSAncXVhbnRpbGUnKSB7XHJcbiAgICAgIGNvbG9yU2NhbGUgPSBzY2FsZVF1YW50aWxlKClcclxuICAgICAgICAucmFuZ2Uoc2NoZW1lLmRvbWFpbilcclxuICAgICAgICAuZG9tYWluKGRvbWFpbik7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICBjb2xvclNjYWxlID0gc2NhbGVPcmRpbmFsKClcclxuICAgICAgICAucmFuZ2Uoc2NoZW1lLmRvbWFpbilcclxuICAgICAgICAuZG9tYWluKGRvbWFpbik7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIC8vIGxpbmVhciBzY2hlbWVzIG11c3QgaGF2ZSBhdCBsZWFzdCAyIGNvbG9yc1xyXG4gICAgICBjb25zdCBjb2xvckRvbWFpbiA9IFsuLi5zY2hlbWUuZG9tYWluXTtcclxuICAgICAgaWYgKGNvbG9yRG9tYWluLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGNvbG9yRG9tYWluLnB1c2goY29sb3JEb21haW5bMF0pO1xyXG4gICAgICAgIHRoaXMuY29sb3JEb21haW4gPSBjb2xvckRvbWFpbjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcG9pbnRzID0gcmFuZ2UoMCwgMSwgMS4wIC8gY29sb3JEb21haW4ubGVuZ3RoKTtcclxuICAgICAgY29sb3JTY2FsZSA9IHNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKHBvaW50cylcclxuICAgICAgICAucmFuZ2UoY29sb3JEb21haW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb2xvclNjYWxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sb3IodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgY2FuIG5vdCBiZSBudWxsJyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlU2NhbGUgPSBzY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLmRvbWFpbih0aGlzLmRvbWFpbilcclxuICAgICAgICAucmFuZ2UoWzAsIDFdKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnNjYWxlKHZhbHVlU2NhbGUodmFsdWUpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXN0b21Db2xvcnMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXN0b21Db2xvcnModmFsdWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgIGxldCBmb3VuZDogYW55OyAvLyB0b2RvIHR5cGUgY3VzdG9tQ29sb3JzXHJcbiAgICAgIGlmICh0aGlzLmN1c3RvbUNvbG9ycyAmJiB0aGlzLmN1c3RvbUNvbG9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZm91bmQgPSB0aGlzLmN1c3RvbUNvbG9ycy5maW5kKG1hcHBpbmcgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG1hcHBpbmcubmFtZS50b0xvd2VyQ2FzZSgpID09PSBmb3JtYXR0ZWRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZm91bmQpIHtcclxuICAgICAgICByZXR1cm4gZm91bmQudmFsdWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRMaW5lYXJHcmFkaWVudFN0b3BzKHZhbHVlLCBzdGFydCkge1xyXG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3RhcnQgPSB0aGlzLmRvbWFpblswXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWx1ZVNjYWxlID0gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAuZG9tYWluKHRoaXMuZG9tYWluKVxyXG4gICAgICAucmFuZ2UoWzAsIDFdKTtcclxuXHJcbiAgICBjb25zdCBjb2xvclZhbHVlU2NhbGUgPSBzY2FsZUJhbmQoKVxyXG4gICAgICAuZG9tYWluKHRoaXMuY29sb3JEb21haW4pXHJcbiAgICAgIC5yYW5nZShbMCwgMV0pO1xyXG5cclxuICAgIGNvbnN0IGVuZENvbG9yID0gdGhpcy5nZXRDb2xvcih2YWx1ZSk7XHJcblxyXG4gICAgLy8gZ2VuZXJhdGUgdGhlIHN0b3BzXHJcbiAgICBjb25zdCBzdGFydFZhbCA9IHZhbHVlU2NhbGUoc3RhcnQpO1xyXG4gICAgY29uc3Qgc3RhcnRDb2xvciA9IHRoaXMuZ2V0Q29sb3Ioc3RhcnQpO1xyXG5cclxuICAgIGNvbnN0IGVuZFZhbCA9IHZhbHVlU2NhbGUodmFsdWUpO1xyXG4gICAgbGV0IGkgPSAxO1xyXG4gICAgbGV0IGN1cnJlbnRWYWwgPSBzdGFydFZhbDtcclxuICAgIGNvbnN0IHN0b3BzID0gW107XHJcblxyXG4gICAgc3RvcHMucHVzaCh7XHJcbiAgICAgIGNvbG9yOiBzdGFydENvbG9yLFxyXG4gICAgICBvZmZzZXQ6IHN0YXJ0VmFsLFxyXG4gICAgICBvcmlnaW5hbE9mZnNldDogc3RhcnRWYWwsXHJcbiAgICAgIG9wYWNpdHk6IDFcclxuICAgIH0pO1xyXG5cclxuICAgIHdoaWxlIChjdXJyZW50VmFsIDwgZW5kVmFsICYmIGkgPCB0aGlzLmNvbG9yRG9tYWluLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3JEb21haW5baV07XHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IGNvbG9yVmFsdWVTY2FsZShjb2xvcik7XHJcbiAgICAgIGlmIChvZmZzZXQgPD0gc3RhcnRWYWwpIHtcclxuICAgICAgICBpKys7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvZmZzZXQudG9GaXhlZCg0KSA+PSAoZW5kVmFsIC0gY29sb3JWYWx1ZVNjYWxlLmJhbmR3aWR0aCgpKS50b0ZpeGVkKDQpKSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0b3BzLnB1c2goe1xyXG4gICAgICAgIGNvbG9yLFxyXG4gICAgICAgIG9mZnNldCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pO1xyXG4gICAgICBjdXJyZW50VmFsID0gb2Zmc2V0O1xyXG4gICAgICBpKys7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0b3BzW3N0b3BzLmxlbmd0aCAtIDFdLm9mZnNldCA8IDEwMCkge1xyXG4gICAgICBzdG9wcy5wdXNoKHtcclxuICAgICAgICBjb2xvcjogZW5kQ29sb3IsXHJcbiAgICAgICAgb2Zmc2V0OiBlbmRWYWwsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW5kVmFsID09PSBzdGFydFZhbCkge1xyXG4gICAgICBzdG9wc1swXS5vZmZzZXQgPSAwO1xyXG4gICAgICBzdG9wc1sxXS5vZmZzZXQgPSAxMDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBub3JtYWxpemUgdGhlIG9mZnNldHMgaW50byBwZXJjZW50YWdlc1xyXG4gICAgICBpZiAoc3RvcHNbc3RvcHMubGVuZ3RoIC0gMV0ub2Zmc2V0ICE9PSAxMDApIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygc3RvcHMpIHtcclxuICAgICAgICAgIHMub2Zmc2V0ID0gKChzLm9mZnNldCAtIHN0YXJ0VmFsKSAvIChlbmRWYWwgLSBzdGFydFZhbCkpICogMTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdG9wcztcclxuICB9XHJcbn1cclxuIl19