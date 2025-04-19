import { useCallback, useMemo, useState } from 'react';
import {
    InfoCircleOutlined,
    StarFilled,
    StarOutlined,
} from '@ant-design/icons';
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Character } from '@/models/Character';
import CharacterPreview from '@/components/CharacterPreview';

type Props = {
    characters: Character[];
    filteredCharacters: Character[];
    loadingInitial: boolean;
    loadingNext: boolean;
    hasNextPage: boolean;
    loadMore?: () => void;
    favorites: string[];
    toggleFavorite: (id: string) => void;
    showOnlyFavorites?: boolean;
};

const CharactersTable = ({
    characters,
    filteredCharacters,
    loadingInitial,
    loadingNext,
    hasNextPage,
    loadMore,
    favorites = [],
    toggleFavorite,
    showOnlyFavorites = false,
}: Props) => {
    const [selectedCharacter, setSelectedCharacter] =
        useState<Character | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const handleViewCharacterDetails = (character: Character) => {
        setSelectedCharacter(character);
        setShowDetails(true);
    };

    const eyeColorToTag = useCallback((eyeColor: string): JSX.Element => {
        if (!eyeColor) return <Tag>-</Tag>;

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
    }, []);

    const displayedCharacters = useMemo(() => {
        return showOnlyFavorites
            ? filteredCharacters.filter((c) => favorites.includes(c.id))
            : filteredCharacters;
    }, [showOnlyFavorites, filteredCharacters, favorites]);

    const columns = useMemo<ColumnsType<Character>>(
        () => [
            {
                title: 'Actions',
                key: 'actions',
                width: 120,
                render: (_, character) => (
                    <Space>
                        <Button
                            type="text"
                            icon={
                                favorites.includes(character.id) ? (
                                    <StarFilled
                                        style={{ color: 'goldenrod' }}
                                    />
                                ) : (
                                    <StarOutlined />
                                )
                            }
                            onClick={() => toggleFavorite(character.id)}
                        />
                        <Button
                            type="text"
                            icon={<InfoCircleOutlined />}
                            onClick={() =>
                                handleViewCharacterDetails(character)
                            }
                        />
                    </Space>
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
                render: (height) => (height ? height + ' cm' : '-'),
            },
            {
                title: 'Weight',
                dataIndex: 'weight',
                key: 'weight',
                render: (weight) => (weight ? weight + ' kg' : '-'),
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
                render: (eyeColor) => eyeColorToTag(eyeColor),
            },
        ],
        [favorites]
    );

    return (
        <>
            <Table
                dataSource={displayedCharacters}
                columns={columns}
                rowKey="id"
                loading={loadingInitial}
                pagination={false}
            />

            <Tooltip title={!hasNextPage ? 'All Characters loaded' : ''}>
                <Button
                    type="primary"
                    onClick={loadMore}
                    loading={loadingNext}
                    disabled={loadingNext || !hasNextPage}
                >
                    Load More
                </Button>
            </Tooltip>

            <span>
                Showing {displayedCharacters.length}
                {displayedCharacters.length < characters.length
                    ? ` out of ${characters.length} `
                    : ' '}
                Characters
            </span>

            <CharacterPreview
                character={selectedCharacter}
                visible={showDetails}
                onClose={() => setShowDetails(false)}
                eyeColorToTag={eyeColorToTag}
            />
        </>
    );
};

export default CharactersTable;
