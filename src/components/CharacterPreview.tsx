import { Button, Descriptions, List, Modal } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import Item from 'antd/es/list/Item';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { Character } from '@/models/Character';

type Props = {
    character: Character | null;
    visible: boolean;
    onClose: () => void;
    eyeColorToTag: (eyeColor: string) => JSX.Element;
};

const CharacterPreview = ({
    character,
    visible,
    onClose,
    eyeColorToTag,
}: Props) => {
    if (!character) return null;

    return (
        <Modal
            title={<Title level={4}>{character.name || 'Unknown'}</Title>}
            open={visible}
            onCancel={onClose}
            footer={
                <Button type="primary" onClick={onClose}>
                    Close
                </Button>
            }
        >
            <Descriptions>
                <DescriptionsItem label="Height">
                    {character.height || '-'}
                </DescriptionsItem>
                <DescriptionsItem label="Weight">
                    {character.weight || '-'}
                </DescriptionsItem>
                <DescriptionsItem label="Home Planet">
                    {character.homeworld || '-'}
                </DescriptionsItem>
                <DescriptionsItem label="Species">
                    {character.species || '-'}
                </DescriptionsItem>
                <DescriptionsItem label="Gender">
                    {character.gender || '-'}
                </DescriptionsItem>
                <DescriptionsItem label="Eye Color">
                    {eyeColorToTag(character.eyeColor || '-')}
                </DescriptionsItem>
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
