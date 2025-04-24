import { Button, Checkbox, Select, Space } from 'antd';
import { Filters } from '@/models/Filters';
import { useFavorites } from '@/hooks/useFavorites';
import { useFilterOptions } from './useFilterOptions';

type Props = {
    filters: Filters;
    updateFilter: (field: keyof Filters, values: string[]) => void;
    resetFilters: () => void;
    hasActiveFilters: boolean;
};

const CharacterFilters = ({ filters, updateFilter, resetFilters, hasActiveFilters }: Props) => {
    const { filterValues, loadFilterOptions } = useFilterOptions();

    const { showOnlyFavorites, setShowOnlyFavorites } = useFavorites();

    const createSelect = ({
        mode,
        filter,
        placeholder,
    }: {
        mode?: 'multiple';
        filter: keyof Filters;
        placeholder: string;
    }) => {
        return (
            <Select
                mode={mode ?? undefined}
                allowClear
                style={{ width: 150 }}
                onClear={() => updateFilter(filter, [])}
                placeholder={placeholder}
                value={filters[filter] as string[]}
                onChange={(selected) => {
                    const values = Array.isArray(selected) ? selected : selected ? [selected] : [];
                    updateFilter(filter, values);
                }}
                options={filterValues[filter]}
            />
        );
    };

    return (
        <Space wrap onClick={loadFilterOptions} className="characters-filters">
            <Checkbox checked={showOnlyFavorites} onChange={(e) => setShowOnlyFavorites(e.target.checked)}>
                Only favorites
            </Checkbox>

            {createSelect({
                filter: 'gender',
                placeholder: 'Gender',
            })}

            {createSelect({
                mode: 'multiple',
                filter: 'eyeColor',
                placeholder: 'Eye Color',
            })}

            {createSelect({
                mode: 'multiple',
                filter: 'species',
                placeholder: 'Species',
            })}

            {createSelect({
                filter: 'films',
                placeholder: 'Film',
            })}

            {hasActiveFilters && <Button onClick={resetFilters}>Clear Filters</Button>}
        </Space>
    );
};

export default CharacterFilters;
