import arc from "../library/arc.js";

const Arc = ({centerX, centerY, maxRadius, minRadius, startAngle, endAngle, fillColor, strokeColor, strokeWidth, onMouseEnter, onMouseLeave, onChangeValue}) => {
    const radius = (maxRadius + minRadius) / 2;
    const midAngle = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(midAngle);
    const y = centerY + radius * Math.sin(midAngle);

    return <g>
        <path
            d={arc({x: centerX, y: centerY, R: maxRadius, r: minRadius, start: startAngle, end: endAngle})}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onChangeValue}
        />
    </g>;
}

export default Arc;