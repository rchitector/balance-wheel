import Arc from "./Arc.jsx";
import {useState} from "react";
import SectorValue from "./SectorValue.jsx";
import SectorLabel from "./SectorLabel.jsx";

const CircularSector = ({readonly, centerX, centerY, valueColor, margin, radius, innerRadius, levelsCount, startAngle, endAngle, value, color, hoveredColor, onChangeValue, label}) => {
    const valueIndex = value - 1;
    const strokeWidth = 1;
    const arcThickness = (radius - innerRadius) / levelsCount;
    const [hoverIndex, setHoverIndex] = useState(-1);
    const fillDefaultColor = '#ffffff';
    const strokeDefaultColor = '#e7e7e7';

    return <g>
        {Array(levelsCount).fill().map((item, index) => index).reverse().map(index => {
            let fillColor = fillDefaultColor;
            let strokeColor = strokeDefaultColor;

            if (index <= valueIndex) {
                fillColor = color;
                if (hoverIndex >= 0 && hoverIndex <= valueIndex && index <= hoverIndex) {
                    fillColor = hoveredColor;
                }
            } else {
                if (hoverIndex >= 0 && hoverIndex > valueIndex && index <= hoverIndex) {
                    fillColor = hoveredColor;
                }
            }

            const innerArcRadius = (index * arcThickness) + innerRadius;
            const outerArcRadius = innerArcRadius + arcThickness;

            return <g key={`arc_${index}`}>
                <Arc
                    centerX={centerX}
                    centerY={centerY}
                    maxRadius={outerArcRadius}
                    minRadius={innerArcRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fillColor={fillColor}
                    strokeWidth={strokeWidth}
                    strokeColor={strokeColor}
                    onMouseEnter={()=>{
                        if (!readonly) {
                            setHoverIndex(index)
                        }
                    }}
                    onMouseLeave={()=>{
                        if (!readonly) {
                            setHoverIndex(-1)
                        }
                    }}
                    onChangeValue={()=>{
                        if (!readonly) {
                            onChangeValue(index+1)
                        }
                    }}
                />
                {index === valueIndex && <SectorValue
                    centerX={centerX}
                    centerY={centerY}
                    valueColor={valueColor}
                    radius={outerArcRadius}
                    circleRadius={(arcThickness * levelsCount + arcThickness)}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    value={value}
                    color={color}
                />}
                {index === hoverIndex && <SectorValue
                    centerX={centerX}
                    centerY={centerY}
                    valueColor={valueColor}
                    radius={outerArcRadius}
                    circleRadius={(arcThickness * levelsCount + arcThickness)}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    value={hoverIndex+1}
                    color={color}
                />}
            </g>
        })}
        <SectorLabel
            centerX={centerX}
            centerY={centerY}
            radius={radius + margin}
            startAngle={startAngle}
            endAngle={endAngle}
            circleRadius={(arcThickness * levelsCount + arcThickness)}
            value={label}
        />
    </g>;
};

export default CircularSector;