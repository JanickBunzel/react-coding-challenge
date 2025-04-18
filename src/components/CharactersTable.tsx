import { Character } from '@/models/Character';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

type Props = {
    characters: Character[];
    loading: boolean;
    favorites: string[];
    toggleFavorite: (id: string) => void;
    showOnlyFavorites?: boolean;
};

const CharactersTable = ({
    characters,
    loading,
    favorites,
    toggleFavorite,
    showOnlyFavorites = false,
}: Props) => {
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

    const displayedCharacters = showOnlyFavorites
        ? characters.filter((c) => favorites.includes(c.id))
        : characters;

    const columns: ColumnsType<Character> = [
        {
            title: 'Favorite',
            key: 'favorite',
            width: 70,
            render: (_, character) => (
                <Button
                    type="text"
                    icon={
                        favorites.includes(character.id) ? (
                            <StarFilled style={{ color: 'goldenrod' }} />
                        ) : (
                            <StarOutlined />
                        )
                    }
                    onClick={() => toggleFavorite(character.id)}
                />
            ),
        },
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
        <Table
            dataSource={displayedCharacters}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={false}
        />
    );
};

export default CharactersTable;
