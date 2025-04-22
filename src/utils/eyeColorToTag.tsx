import Tag from 'antd/es/tag';

export const eyeColorToTag = (eyeColor: string): JSX.Element[] => {
    if (!eyeColor) return [<Tag>-</Tag>];

    const colorMap: Record<string, string> = {
        blue: 'blue',
        brown: 'brown',
        red: 'red',
        yellow: 'gold',
        green: 'green',
        orange: 'orange',
        black: 'black',
    };

    return eyeColor
        .split(',')
        .map((c) => c.trim().toLowerCase())
        .map((c) => (
            <Tag color={colorMap[c] || 'default'} key={c}>
                {c}
            </Tag>
        ));
};
