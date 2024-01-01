import CircularSector from "./CircularSector.jsx";

const Wheel = ({
    size = 400,
    labels = [],
    colors = [],
    hoveredColors = [],
    values = [],
    padding = 0,
    margin = 0,
    levelsCount = 10,
    onChangeValues,
    valueColor,
    readonly,
}) => {

    const svgSize = size + padding + margin;
    const centerX = svgSize / 2;
    const centerY = svgSize / 2;
    const maxRadius = (size - padding - margin) / 2;
    const arcAngle = 360 / labels.length;
    const centerRadius = maxRadius / 10;

    return (
        <svg width={svgSize} height={svgSize}>
            {labels.map((label, index)=>{
                if (!values.length || !colors.length) {
                    return null;
                }
                return <CircularSector
                    key={`sector_${index}`}
                    valueColor={valueColor}
                    label={label}
                    readonly={readonly}
                    margin={margin}
                    centerX={centerX}
                    centerY={centerY}
                    radius={maxRadius}
                    innerRadius={maxRadius / 10}
                    levelsCount={levelsCount}
                    startAngle={index * arcAngle}
                    endAngle={index * arcAngle + arcAngle}
                    value={values[index]}
                    columnIndex={index}
                    color={colors[index]}
                    hoveredColor={hoveredColors[index]}
                    onChangeValue={(newSectorValue)=>{
                        const newValues = [...values];
                        newValues[index] = newSectorValue;
                        onChangeValues(newValues);
                    }}
                    centerRadius={centerRadius}
                />
            })}
        </svg>
    );
};

export default Wheel;