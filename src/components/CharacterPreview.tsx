import { Button, Descriptions, List, Modal } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import Item from 'antd/es/list/Item';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { eyeColorToTag } from '@/utils/eyeColorToTag';
import { useCharacterFilms } from '@/hooks/useCharacterFilms';
import { Person } from '@/graphql/generated';
import FavoritesButton from './FavoritesButton';

type Props = {
    character: Person | null;
    visible: boolean;
    onClose: () => void;
};

const CharacterPreview = ({ character, visible, onClose }: Props) => {
    const { filmsLoading, films } = useCharacterFilms(character?.id || '');

    if (!character) return null;

    return (
        <Modal
            title={<Title level={4}>{character.name || '-'}</Title>}
            open={visible}
            onCancel={onClose}
            footer={
                <>
                    <FavoritesButton characterId={character.id} />
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
                        content: (character.mass || '-') + ' kg',
                    },
                    {
                        label: 'Home Planet',
                        content: character.homeworld?.name || '-',
                    },
                    {
                        label: 'Species',
                        content: character.species?.name || '-',
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

            {films.length > 0 ? (
                <List bordered dataSource={films} renderItem={(film) => <Item>{film}</Item>} />
            ) : (
                <Text italic>{filmsLoading ? 'Loading...' : 'No movies found'}</Text>
            )}
        </Modal>
    );
};

export default CharacterPreview;
