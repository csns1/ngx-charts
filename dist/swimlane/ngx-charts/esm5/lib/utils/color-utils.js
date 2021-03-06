import * as d3_color from 'd3-color';
/**
 * Converts a hex to RGB
 *
 * @export
 */
export function hexToRgb(value) {
    // deprecated, use d3.color()
    return d3_color.rgb(value);
}
/**
 * Accepts a color (string) and returns a inverted hex color (string)
 * http://stackoverflow.com/questions/9600295/automatically-change-text-color-to-assure-readability
 *
 * @export
 */
export function invertColor(value) {
    var color = d3_color.rgb(value);
    var r = color.r, g = color.g, b = color.b, opacity = color.opacity;
    if (opacity === 0) {
        return color.toString();
    }
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    var depth = yiq >= 128 ? -0.8 : 0.8;
    return shadeRGBColor(color, depth);
}
/**
 * Given a rgb, it will darken/lighten
 * http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @export
 * @param \{ r, g, b }
 */
export function shadeRGBColor(_a, percent) {
    var r = _a.r, g = _a.g, b = _a.b;
    var t = percent < 0 ? 0 : 255;
    var p = percent < 0 ? percent * -1 : percent;
    r = Math.round((t - r) * p) + r;
    g = Math.round((t - g) * p) + g;
    b = Math.round((t - b) * p) + b;
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItdXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9jb2xvci11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVyQzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFFBQVEsQ0FBQyxLQUFhO0lBQ3BDLDZCQUE2QjtJQUM3QixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUFhO0lBQ3ZDLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsSUFBQSxXQUFDLEVBQUUsV0FBQyxFQUFFLFdBQUMsRUFBRSx1QkFBTyxDQUFXO0lBQ25DLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRTtRQUNqQixPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN6QjtJQUNELElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDakQsSUFBTSxLQUFLLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUV0QyxPQUFPLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUMsRUFBVyxFQUFFLE9BQU87UUFBbEIsUUFBQyxFQUFFLFFBQUMsRUFBRSxRQUFDO0lBQ3JDLElBQU0sQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2hDLElBQU0sQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBRS9DLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWhDLE9BQU8sU0FBTyxDQUFDLFVBQUssQ0FBQyxVQUFLLENBQUMsTUFBRyxDQUFDO0FBQ2pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkM19jb2xvciBmcm9tICdkMy1jb2xvcic7XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBoZXggdG8gUkdCXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoZXhUb1JnYih2YWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAvLyBkZXByZWNhdGVkLCB1c2UgZDMuY29sb3IoKVxyXG4gIHJldHVybiBkM19jb2xvci5yZ2IodmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQWNjZXB0cyBhIGNvbG9yIChzdHJpbmcpIGFuZCByZXR1cm5zIGEgaW52ZXJ0ZWQgaGV4IGNvbG9yIChzdHJpbmcpXHJcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvOTYwMDI5NS9hdXRvbWF0aWNhbGx5LWNoYW5nZS10ZXh0LWNvbG9yLXRvLWFzc3VyZS1yZWFkYWJpbGl0eVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJ0Q29sb3IodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgY29sb3IgPSBkM19jb2xvci5yZ2IodmFsdWUpO1xyXG4gIGNvbnN0IHsgciwgZywgYiwgb3BhY2l0eSB9ID0gY29sb3I7XHJcbiAgaWYgKG9wYWNpdHkgPT09IDApIHtcclxuICAgIHJldHVybiBjb2xvci50b1N0cmluZygpO1xyXG4gIH1cclxuICBjb25zdCB5aXEgPSAociAqIDI5OSArIGcgKiA1ODcgKyBiICogMTE0KSAvIDEwMDA7XHJcbiAgY29uc3QgZGVwdGggPSB5aXEgPj0gMTI4ID8gLTAuOCA6IDAuODtcclxuXHJcbiAgcmV0dXJuIHNoYWRlUkdCQ29sb3IoY29sb3IsIGRlcHRoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdpdmVuIGEgcmdiLCBpdCB3aWxsIGRhcmtlbi9saWdodGVuXHJcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTU2MDI0OC9wcm9ncmFtbWF0aWNhbGx5LWxpZ2h0ZW4tb3ItZGFya2VuLWEtaGV4LWNvbG9yLW9yLXJnYi1hbmQtYmxlbmQtY29sb3JzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIFxceyByLCBnLCBiIH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFkZVJHQkNvbG9yKHsgciwgZywgYiB9LCBwZXJjZW50KSB7XHJcbiAgY29uc3QgdCA9IHBlcmNlbnQgPCAwID8gMCA6IDI1NTtcclxuICBjb25zdCBwID0gcGVyY2VudCA8IDAgPyBwZXJjZW50ICogLTEgOiBwZXJjZW50O1xyXG5cclxuICByID0gTWF0aC5yb3VuZCgodCAtIHIpICogcCkgKyByO1xyXG4gIGcgPSBNYXRoLnJvdW5kKCh0IC0gZykgKiBwKSArIGc7XHJcbiAgYiA9IE1hdGgucm91bmQoKHQgLSBiKSAqIHApICsgYjtcclxuXHJcbiAgcmV0dXJuIGByZ2IoJHtyfSwgJHtnfSwgJHtifSlgO1xyXG59XHJcbiJdfQ==