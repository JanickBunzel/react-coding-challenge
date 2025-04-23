import { Button, Card, Select, Space } from 'antd';
import { Filters } from '@/models/Filters';
import { useFilterOptions } from '@/hooks/useFilterOptions';

type Props = {
    filters: Filters;
    updateFilter: (field: keyof Filters, values: string[]) => void;
    resetFilters: () => void;
    hasActiveFilters: boolean;
};

const CharacterFilters = ({ filters, updateFilter, resetFilters, hasActiveFilters }: Props) => {
    const { filterValues, loadFilterOptions } = useFilterOptions();

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
        <Card onClick={loadFilterOptions}>
            <Space wrap>
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
        </Card>
    );
};

export default CharacterFilters;
