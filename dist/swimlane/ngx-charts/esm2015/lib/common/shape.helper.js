/**
 * Generates a rounded rectanglar path
 *
 * @export
 * @param x, y, w, h, r, tl, tr, bl, br
 */
export function roundedRect(x, y, w, h, r, [tl, tr, bl, br]) {
    let retval = '';
    w = Math.floor(w);
    h = Math.floor(h);
    w = w === 0 ? 1 : w;
    h = h === 0 ? 1 : h;
    retval = `M${[x + r, y]}`;
    retval += `h${w - 2 * r}`;
    if (tr) {
        retval += `a${[r, r]} 0 0 1 ${[r, r]}`;
    }
    else {
        retval += `h${r}v${r}`;
    }
    retval += `v${h - 2 * r}`;
    if (br) {
        retval += `a${[r, r]} 0 0 1 ${[-r, r]}`;
    }
    else {
        retval += `v${r}h${-r}`;
    }
    retval += `h${2 * r - w}`;
    if (bl) {
        retval += `a${[r, r]} 0 0 1 ${[-r, -r]}`;
    }
    else {
        retval += `h${-r}v${-r}`;
    }
    retval += `v${2 * r - h}`;
    if (tl) {
        retval += `a${[r, r]} 0 0 1 ${[r, -r]}`;
    }
    else {
        retval += `v${-r}h${r}`;
    }
    retval += `z`;
    return retval;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcGUuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3NoYXBlLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBWTtJQUNwRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFFaEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwQixNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMxQixNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBRTFCLElBQUksRUFBRSxFQUFFO1FBQ04sTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUN4QztTQUFNO1FBQ0wsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ3hCO0lBRUQsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUUxQixJQUFJLEVBQUUsRUFBRTtRQUNOLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUN6QztTQUFNO1FBQ0wsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDekI7SUFFRCxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBRTFCLElBQUksRUFBRSxFQUFFO1FBQ04sTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDMUM7U0FBTTtRQUNMLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDMUI7SUFFRCxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBRTFCLElBQUksRUFBRSxFQUFFO1FBQ04sTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ3pDO1NBQU07UUFDTCxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUN6QjtJQUVELE1BQU0sSUFBSSxHQUFHLENBQUM7SUFFZCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHJvdW5kZWQgcmVjdGFuZ2xhciBwYXRoXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHBhcmFtIHgsIHksIHcsIGgsIHIsIHRsLCB0ciwgYmwsIGJyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcm91bmRlZFJlY3QoeCwgeSwgdywgaCwgciwgW3RsLCB0ciwgYmwsIGJyXTogYm9vbGVhbltdKSB7XHJcbiAgbGV0IHJldHZhbCA9ICcnO1xyXG5cclxuICB3ID0gTWF0aC5mbG9vcih3KTtcclxuICBoID0gTWF0aC5mbG9vcihoKTtcclxuXHJcbiAgdyA9IHcgPT09IDAgPyAxIDogdztcclxuICBoID0gaCA9PT0gMCA/IDEgOiBoO1xyXG5cclxuICByZXR2YWwgPSBgTSR7W3ggKyByLCB5XX1gO1xyXG4gIHJldHZhbCArPSBgaCR7dyAtIDIgKiByfWA7XHJcblxyXG4gIGlmICh0cikge1xyXG4gICAgcmV0dmFsICs9IGBhJHtbciwgcl19IDAgMCAxICR7W3IsIHJdfWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHZhbCArPSBgaCR7cn12JHtyfWA7XHJcbiAgfVxyXG5cclxuICByZXR2YWwgKz0gYHYke2ggLSAyICogcn1gO1xyXG5cclxuICBpZiAoYnIpIHtcclxuICAgIHJldHZhbCArPSBgYSR7W3IsIHJdfSAwIDAgMSAke1stciwgcl19YDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dmFsICs9IGB2JHtyfWgkey1yfWA7XHJcbiAgfVxyXG5cclxuICByZXR2YWwgKz0gYGgkezIgKiByIC0gd31gO1xyXG5cclxuICBpZiAoYmwpIHtcclxuICAgIHJldHZhbCArPSBgYSR7W3IsIHJdfSAwIDAgMSAke1stciwgLXJdfWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHZhbCArPSBgaCR7LXJ9diR7LXJ9YDtcclxuICB9XHJcblxyXG4gIHJldHZhbCArPSBgdiR7MiAqIHIgLSBofWA7XHJcblxyXG4gIGlmICh0bCkge1xyXG4gICAgcmV0dmFsICs9IGBhJHtbciwgcl19IDAgMCAxICR7W3IsIC1yXX1gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR2YWwgKz0gYHYkey1yfWgke3J9YDtcclxuICB9XHJcblxyXG4gIHJldHZhbCArPSBgemA7XHJcblxyXG4gIHJldHVybiByZXR2YWw7XHJcbn1cclxuIl19