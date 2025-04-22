import { useMemo, useState } from 'react';
import { InfoCircleOutlined, ManOutlined, StarFilled, StarOutlined, WomanOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Character } from '@/models/Character';
import CharacterPreview from '@/components/CharacterPreview';
import { useFavorites } from '@/hooks/useFavorites';
import { eyeColorToTag } from '@/utils/eyeColorToTag';

type Props = {
    displayedCharacters: Character[];
    loadingInitial: boolean;
};

const CharactersTable = ({ displayedCharacters, loadingInitial }: Props) => {
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const { favorites, toggleFavorite } = useFavorites();

    const handleViewCharacterDetails = (character: Character) => {
        setSelectedCharacter(character);
        setShowDetails(true);
    };

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
                                    <StarFilled style={{ color: 'goldenrod' }} />
                                ) : (
                                    <StarOutlined />
                                )
                            }
                            onClick={() => toggleFavorite(character.id)}
                        />
                        <Button
                            type="text"
                            icon={<InfoCircleOutlined />}
                            onClick={() => handleViewCharacterDetails(character)}
                        />
                    </Space>
                ),
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (name) => <strong>{name || '-'}</strong>,
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
                render: (gender) => {
                    switch (gender) {
                        case 'male':
                            return <ManOutlined style={{ color: 'darkblue' }} />;
                        case 'female':
                            return <WomanOutlined style={{ color: 'orchid' }} />;
                        default:
                            return gender ? gender : '-';
                    }
                },
            },
            {
                title: 'Eye Color',
                dataIndex: 'eyeColor',
                key: 'eyeColor',
                render: (eyeColor) => eyeColorToTag(eyeColor),
            },
        ],
        [favorites, toggleFavorite]
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

            <CharacterPreview
                character={selectedCharacter}
                visible={showDetails}
                onClose={() => setShowDetails(false)}
            />
        </>
    );
};

export default CharactersTable;
