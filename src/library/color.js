function generateColors(X, alpha = 1, saturation = 50, lightness = 50) {
    const colors = [];
    const baseHue = 0; // Основной оттенок (0-360)

    for (let i = 0; i < X; i++) {
        const hue = (baseHue + (i * (360 / X))) % 360;

        // Преобразование HSL в RGB
        const rgbColor = hslToRgb(hue, saturation, lightness);

        // Добавление альфа-канала
        const rgbaColor = [...rgbColor, alpha];

        // Преобразование RGBA в HEX
        const hexColor = rgbaToHex(rgbaColor);

        colors.push(hexColor);
    }

    return colors;
}

function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbaToHex([r, g, b, a]) {
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
}

export default generateColors;