const SectorValue = ({centerX, centerY, valueColor, radius, circleRadius, startAngle, endAngle, value, color}) => {
    const fillDefaultColor = '#ffffff';
    const fontSizeRatio = 0.025;
    const circleSizeRatio = 0.02;
    const strokeSizeRation = 0.0015;
    const fontSize = circleRadius * 2 * fontSizeRatio;
    const circleSize = circleRadius * 2 * circleSizeRatio;
    const strokeWidth = circleRadius * 2 * strokeSizeRation;
    const midAngle = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(midAngle);
    const y = centerY + radius * Math.sin(midAngle);
    return <g pointerEvents="none">
        <circle cx={x} cy={y} r={circleSize} fill={color} stroke={fillDefaultColor} strokeWidth={strokeWidth}/>
        <text x={x} y={y} textAnchor="middle" dy="0.35em" fill={valueColor} fontSize={fontSize} fontWeight={600}>{value}</text>
    </g>
};

export default SectorValue;