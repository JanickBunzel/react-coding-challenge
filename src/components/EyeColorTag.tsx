import { Tag } from 'antd';

type Props = {
    eyeColor: string;
};

const EyeColorTag = ({ eyeColor }: Props): JSX.Element[] => {
    if (!eyeColor || eyeColor === '') return [<Tag key="none">-</Tag>];

    const colorMap: Record<string, string> = {
        blue: 'blue',
        yellow: 'gold',
        red: 'red',
        brown: 'volcano',
        'blue-gray': 'geekblue',
        black: 'dimgray',
        orange: 'orange',
        hazel: 'lime',
        pink: 'magenta',
        unknown: 'default',
        gold: 'gold',
        green: 'green',
        white: 'default',
        dark: 'darkgray',
    };

    return eyeColor
        .split(',')
        .map((eyeColor) => eyeColor.trim().toLowerCase())
        .map((eyeColor) => (
            <Tag color={colorMap[eyeColor] || 'default'} key={eyeColor}>
                {eyeColor}
            </Tag>
        ));
};

export default EyeColorTag;
