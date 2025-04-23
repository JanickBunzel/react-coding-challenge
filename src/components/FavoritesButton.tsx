import { Button } from 'antd';
import { useFavorites } from '@/hooks/useFavorites';
import { StarFilled, StarOutlined } from '@ant-design/icons';

type Props = {
    characterId: string;
    isTextType?: boolean;
};

const FavoritesButton = ({ characterId, isTextType }: Props) => {
    const { favorites, toggleFavorite } = useFavorites();

    return (
        <Button
            type={isTextType ? 'text' : 'default'}
            icon={favorites.includes(characterId) ? <StarFilled style={{ color: 'goldenrod' }} /> : <StarOutlined />}
            onClick={() => toggleFavorite(characterId)}
        />
    );
};

export default FavoritesButton;
