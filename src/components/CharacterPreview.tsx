import { Button, Descriptions, List, Modal } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import Item from 'antd/es/list/Item';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { Character } from '@/models/Character';
import { StarFilled, StarOutlined } from '@ant-design/icons';

type Props = {
    character: Character | null;
    visible: boolean;
    onClose: () => void;
    eyeColorToTag: (eyeColor: string) => JSX.Element[];
    favorites: string[];
    toggleFavorite: (id: string) => void;
};

const CharacterPreview = ({
    character,
    visible,
    onClose,
    eyeColorToTag,
    favorites,
    toggleFavorite,
}: Props) => {
    if (!character) return null;

    return (
        <Modal
            title={<Title level={4}>{character.name || '-'}</Title>}
            open={visible}
            onCancel={onClose}
            footer={
                <>
                    <Button
                        icon={
                            favorites.includes(character.id) ? (
                                <StarFilled style={{ color: 'goldenrod' }} />
                            ) : (
                                <StarOutlined />
                            )
                        }
                        onClick={() => toggleFavorite(character.id)}
                    />
                    <Button type="primary" onClick={onClose}>
                        Close
                    </Button>
                </>
            }
        >
            <Descriptions>
                {[
                    {
                        label: 'Height',
                        content: (character.height || '-') + ' cm',
                    },
                    {
                        label: 'Weight',
                        content: (character.weight || '-') + ' kg',
                    },
                    {
                        label: 'Home Planet',
                        content: character.homeworld || '-',
                    },
                    {
                        label: 'Species',
                        content: character.species || '-',
                    },
                    {
                        label: 'Gender',
                        content: character.gender || '-',
                    },
                    {
                        label: 'Eye Color',
                        content: eyeColorToTag(character.eyeColor || '-'),
                    },
                ].map((cd) => (
                    <DescriptionsItem label={cd.label} key={cd.label}>
                        {cd.content}
                    </DescriptionsItem>
                ))}
            </Descriptions>

            <Title level={5}>Appears in movies:</Title>

            {character.films.length > 0 ? (
                <List
                    bordered
                    dataSource={character.films}
                    renderItem={(film) => <Item>{film}</Item>}
                />
            ) : (
                <Text italic>No movies found</Text>
            )}
        </Modal>
    );
};

export default CharacterPreview;
