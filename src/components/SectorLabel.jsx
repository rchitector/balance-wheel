const SectorLabel = ({centerX, centerY, radius, circleRadius, startAngle, endAngle, value}) => {
    const midAngle = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(midAngle);
    const y = centerY + radius * Math.sin(midAngle);

    // const fontFamily = 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
    // const fontFamily = 'sans-serif';
    // const fontFamily = 'monospace';
    // const fontFamily = 'Arial, Helvetica, sans-serif';
    // const fontSizeRatio = 0.025;
    // const fontSize = circleRadius * 2 * fontSizeRatio;

    return <g pointerEvents="none">
        <text x={x} y={y}
              textAnchor="middle"
              dy="0.35em"
              fill="#000"
              fontSize={14}
        >{value}</text>
        {/*<text x={x} y={y}*/}
        {/*      dy="0.35em"*/}
        {/*      textAnchor="middle"*/}
        {/*      fill="#000"*/}
        {/*      fontSize={14}*/}
        {/*    // fontFamily={fontFamily}*/}
        {/*      fontWeight={600}*/}
        {/*    // fontVariant={'normal'} // normal | bold | bolder | lighter | <number>*/}
        {/*    // fontStyle={'normal'} // normal | italic | oblique*/}
        {/*    // fontStretch={'normal'}*/}
        {/*    // fontSizeAdjust={'normal'}*/}
        {/*>{value}</text>*/}
    </g>
};

export default SectorLabel;