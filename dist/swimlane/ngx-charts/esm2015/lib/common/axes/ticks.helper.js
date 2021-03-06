export function reduceTicks(ticks, maxTicks) {
    if (ticks.length > maxTicks) {
        const reduced = [];
        const modulus = Math.floor(ticks.length / maxTicks);
        for (let i = 0; i < ticks.length; i++) {
            if (i % modulus === 0) {
                reduced.push(ticks[i]);
            }
        }
        ticks = reduced;
    }
    return ticks;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja3MuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2F4ZXMvdGlja3MuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVE7SUFDekMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsRUFBRTtRQUMzQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxHQUFHLE9BQU8sS0FBSyxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEI7U0FDRjtRQUNELEtBQUssR0FBRyxPQUFPLENBQUM7S0FDakI7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcmVkdWNlVGlja3ModGlja3MsIG1heFRpY2tzKSB7XHJcbiAgaWYgKHRpY2tzLmxlbmd0aCA+IG1heFRpY2tzKSB7XHJcbiAgICBjb25zdCByZWR1Y2VkID0gW107XHJcbiAgICBjb25zdCBtb2R1bHVzID0gTWF0aC5mbG9vcih0aWNrcy5sZW5ndGggLyBtYXhUaWNrcyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpICUgbW9kdWx1cyA9PT0gMCkge1xyXG4gICAgICAgIHJlZHVjZWQucHVzaCh0aWNrc1tpXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRpY2tzID0gcmVkdWNlZDtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aWNrcztcclxufVxyXG4iXX0=