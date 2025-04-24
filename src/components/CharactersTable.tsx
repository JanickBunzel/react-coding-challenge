import { useMemo, useState } from 'react';
import { InfoCircleOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Person } from '@/graphql/generated';
import CharacterPreview from '@/components/characterPreview/CharacterPreview';
import FavoritesButton from '@/components/FavoritesButton';
import EyeColorTag from '@/components/EyeColorTag';

type Props = {
    displayedCharacters: Person[];
    loadingInitial: boolean;
};

const CharactersTable = ({ displayedCharacters, loadingInitial }: Props) => {
    const [selectedCharacter, setSelectedCharacter] = useState<Person | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const handleViewCharacterDetails = (character: Person) => {
        setSelectedCharacter(character);
        setShowDetails(true);
    };

    const columns = useMemo<ColumnsType<Person>>(
        () => [
            {
                title: 'Actions',
                key: 'actions',
                width: 120,
                render: (_, character) => (
                    <Space>
                        <FavoritesButton characterId={character.id} isTextType />
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
                dataIndex: 'mass',
                key: 'mass',
                render: (mass) => (mass ? mass + ' kg' : '-'),
            },
            {
                title: 'Home Planet',
                dataIndex: 'homeworld',
                key: 'homeworld',
                render: (homeworld) => homeworld?.name || '-',
            },
            {
                title: 'Species',
                dataIndex: 'species',
                key: 'species',
                render: (species) => species?.name || '-',
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
                render: (eyeColor) => <EyeColorTag eyeColor={eyeColor} />,
            },
        ],
        []
    );

    return (
        <div className="characters-table">
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
        </div>
    );
};

export default CharactersTable;
