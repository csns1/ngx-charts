export function calculateViewDimensions(_a) {
    var width = _a.width, height = _a.height, margins = _a.margins, _b = _a.showXAxis, showXAxis = _b === void 0 ? false : _b, _c = _a.showYAxis, showYAxis = _c === void 0 ? false : _c, _d = _a.xAxisHeight, xAxisHeight = _d === void 0 ? 0 : _d, _e = _a.yAxisWidth, yAxisWidth = _e === void 0 ? 0 : _e, _f = _a.showXLabel, showXLabel = _f === void 0 ? false : _f, _g = _a.showYLabel, showYLabel = _g === void 0 ? false : _g, _h = _a.showLegend, showLegend = _h === void 0 ? false : _h, _j = _a.legendType, legendType = _j === void 0 ? 'ordinal' : _j, _k = _a.legendPosition, legendPosition = _k === void 0 ? 'right' : _k, _l = _a.columns, columns = _l === void 0 ? 12 : _l;
    var xOffset = margins[3];
    var chartWidth = width;
    var chartHeight = height - margins[0] - margins[2];
    if (showLegend && legendPosition === 'right') {
        if (legendType === 'ordinal') {
            columns -= 2;
        }
        else {
            columns -= 1;
        }
    }
    chartWidth = (chartWidth * columns) / 12;
    chartWidth = chartWidth - margins[1] - margins[3];
    if (showXAxis) {
        chartHeight -= 5;
        chartHeight -= xAxisHeight;
        if (showXLabel) {
            // text height + spacing between axis label and tick labels
            var offset = 25 + 5;
            chartHeight -= offset;
        }
    }
    if (showYAxis) {
        chartWidth -= 5;
        chartWidth -= yAxisWidth;
        xOffset += yAxisWidth;
        xOffset += 10;
        if (showYLabel) {
            // text height + spacing between axis label and tick labels
            var offset = 25 + 5;
            chartWidth -= offset;
            xOffset += offset;
        }
    }
    chartWidth = Math.max(0, chartWidth);
    chartHeight = Math.max(0, chartHeight);
    return {
        width: Math.floor(chartWidth),
        height: Math.floor(chartHeight),
        xOffset: Math.floor(xOffset)
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaW1lbnNpb25zLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxFQWN2QztRQWJDLGdCQUFLLEVBQ0wsa0JBQU0sRUFDTixvQkFBTyxFQUNQLGlCQUFpQixFQUFqQixzQ0FBaUIsRUFDakIsaUJBQWlCLEVBQWpCLHNDQUFpQixFQUNqQixtQkFBZSxFQUFmLG9DQUFlLEVBQ2Ysa0JBQWMsRUFBZCxtQ0FBYyxFQUNkLGtCQUFrQixFQUFsQix1Q0FBa0IsRUFDbEIsa0JBQWtCLEVBQWxCLHVDQUFrQixFQUNsQixrQkFBa0IsRUFBbEIsdUNBQWtCLEVBQ2xCLGtCQUFzQixFQUF0QiwyQ0FBc0IsRUFDdEIsc0JBQXdCLEVBQXhCLDZDQUF3QixFQUN4QixlQUFZLEVBQVosaUNBQVk7SUFFWixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLElBQUksV0FBVyxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5ELElBQUksVUFBVSxJQUFJLGNBQWMsS0FBSyxPQUFPLEVBQUU7UUFDNUMsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLENBQUM7U0FDZDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsQ0FBQztTQUNkO0tBQ0Y7SUFFRCxVQUFVLEdBQUcsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRXpDLFVBQVUsR0FBRyxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRCxJQUFJLFNBQVMsRUFBRTtRQUNiLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFDakIsV0FBVyxJQUFJLFdBQVcsQ0FBQztRQUUzQixJQUFJLFVBQVUsRUFBRTtZQUNkLDJEQUEyRDtZQUMzRCxJQUFNLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLFdBQVcsSUFBSSxNQUFNLENBQUM7U0FDdkI7S0FDRjtJQUVELElBQUksU0FBUyxFQUFFO1FBQ2IsVUFBVSxJQUFJLENBQUMsQ0FBQztRQUNoQixVQUFVLElBQUksVUFBVSxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxVQUFVLENBQUM7UUFDdEIsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUVkLElBQUksVUFBVSxFQUFFO1lBQ2QsMkRBQTJEO1lBQzNELElBQU0sTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdEIsVUFBVSxJQUFJLE1BQU0sQ0FBQztZQUNyQixPQUFPLElBQUksTUFBTSxDQUFDO1NBQ25CO0tBQ0Y7SUFFRCxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXZDLE9BQU87UUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztLQUM3QixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgVmlld0RpbWVuc2lvbnMge1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgeE9mZnNldDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xyXG4gIHdpZHRoLFxyXG4gIGhlaWdodCxcclxuICBtYXJnaW5zLFxyXG4gIHNob3dYQXhpcyA9IGZhbHNlLFxyXG4gIHNob3dZQXhpcyA9IGZhbHNlLFxyXG4gIHhBeGlzSGVpZ2h0ID0gMCxcclxuICB5QXhpc1dpZHRoID0gMCxcclxuICBzaG93WExhYmVsID0gZmFsc2UsXHJcbiAgc2hvd1lMYWJlbCA9IGZhbHNlLFxyXG4gIHNob3dMZWdlbmQgPSBmYWxzZSxcclxuICBsZWdlbmRUeXBlID0gJ29yZGluYWwnLFxyXG4gIGxlZ2VuZFBvc2l0aW9uID0gJ3JpZ2h0JyxcclxuICBjb2x1bW5zID0gMTJcclxufSk6IFZpZXdEaW1lbnNpb25zIHtcclxuICBsZXQgeE9mZnNldCA9IG1hcmdpbnNbM107XHJcbiAgbGV0IGNoYXJ0V2lkdGggPSB3aWR0aDtcclxuICBsZXQgY2hhcnRIZWlnaHQgPSBoZWlnaHQgLSBtYXJnaW5zWzBdIC0gbWFyZ2luc1syXTtcclxuXHJcbiAgaWYgKHNob3dMZWdlbmQgJiYgbGVnZW5kUG9zaXRpb24gPT09ICdyaWdodCcpIHtcclxuICAgIGlmIChsZWdlbmRUeXBlID09PSAnb3JkaW5hbCcpIHtcclxuICAgICAgY29sdW1ucyAtPSAyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29sdW1ucyAtPSAxO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhcnRXaWR0aCA9IChjaGFydFdpZHRoICogY29sdW1ucykgLyAxMjtcclxuXHJcbiAgY2hhcnRXaWR0aCA9IGNoYXJ0V2lkdGggLSBtYXJnaW5zWzFdIC0gbWFyZ2luc1szXTtcclxuXHJcbiAgaWYgKHNob3dYQXhpcykge1xyXG4gICAgY2hhcnRIZWlnaHQgLT0gNTtcclxuICAgIGNoYXJ0SGVpZ2h0IC09IHhBeGlzSGVpZ2h0O1xyXG5cclxuICAgIGlmIChzaG93WExhYmVsKSB7XHJcbiAgICAgIC8vIHRleHQgaGVpZ2h0ICsgc3BhY2luZyBiZXR3ZWVuIGF4aXMgbGFiZWwgYW5kIHRpY2sgbGFiZWxzXHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IDI1ICsgNTtcclxuICAgICAgY2hhcnRIZWlnaHQgLT0gb2Zmc2V0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKHNob3dZQXhpcykge1xyXG4gICAgY2hhcnRXaWR0aCAtPSA1O1xyXG4gICAgY2hhcnRXaWR0aCAtPSB5QXhpc1dpZHRoO1xyXG4gICAgeE9mZnNldCArPSB5QXhpc1dpZHRoO1xyXG4gICAgeE9mZnNldCArPSAxMDtcclxuXHJcbiAgICBpZiAoc2hvd1lMYWJlbCkge1xyXG4gICAgICAvLyB0ZXh0IGhlaWdodCArIHNwYWNpbmcgYmV0d2VlbiBheGlzIGxhYmVsIGFuZCB0aWNrIGxhYmVsc1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSAyNSArIDU7XHJcbiAgICAgIGNoYXJ0V2lkdGggLT0gb2Zmc2V0O1xyXG4gICAgICB4T2Zmc2V0ICs9IG9mZnNldDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYXJ0V2lkdGggPSBNYXRoLm1heCgwLCBjaGFydFdpZHRoKTtcclxuICBjaGFydEhlaWdodCA9IE1hdGgubWF4KDAsIGNoYXJ0SGVpZ2h0KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHdpZHRoOiBNYXRoLmZsb29yKGNoYXJ0V2lkdGgpLFxyXG4gICAgaGVpZ2h0OiBNYXRoLmZsb29yKGNoYXJ0SGVpZ2h0KSxcclxuICAgIHhPZmZzZXQ6IE1hdGguZmxvb3IoeE9mZnNldClcclxuICB9O1xyXG59XHJcbiJdfQ==