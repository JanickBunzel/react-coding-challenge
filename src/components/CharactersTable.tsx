import { Character } from '@/models/Character';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

type Props = {
    characters: Character[];
    loading: boolean;
};

const CharactersTable = ({ characters, loading }: Props) => {
    const eyeColorToTag = (eyeColor: string) => {
        const colorMap: Record<string, string> = {
            blue: 'blue',
            brown: 'brown',
            red: 'red',
            yellow: 'gold',
            green: 'green',
            orange: 'orange',
            black: 'black',
        };

        const tagColor = colorMap[eyeColor.toLowerCase()] || 'default';
        return <Tag color={tagColor}>{eyeColor}</Tag>;
    };

    const columns: ColumnsType<Character> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name) => name || '-',
        },
        {
            title: 'Height',
            dataIndex: 'height',
            key: 'height',
            render: (height) => height || '-',
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
            render: (weight) => weight || '-',
        },
        {
            title: 'Home Planet',
            dataIndex: 'homeworld',
            key: 'homeworld',
            render: (homeworld) => homeworld || '-',
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
            render: (species) => species || '-',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => gender || '-',
        },
        {
            title: 'Eye Color',
            dataIndex: 'eyeColor',
            key: 'eyeColor',
            render: (eyeColor) => eyeColorToTag(eyeColor) || '-',
        },
    ];

    return (
        <div>
            <h1>Star Wars Characters</h1>
            <Table
                dataSource={characters}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={false}
            />
        </div>
    );
};

export default CharactersTable;
