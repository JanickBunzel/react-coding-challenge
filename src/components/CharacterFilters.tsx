import { Button, Card, Select, Space } from 'antd';
import { Filters, getFilterOptions } from '@/hooks/useFilters';
import { Character } from '@/models/Character';

type Props = {
    characters: Character[];
    filters: Filters;
    updateFilter: (field: keyof Filters, values: string[]) => void;
    resetFilters: () => void;
    hasActiveFilters: boolean;
};

const CharacterFilters = ({
    characters,
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
}: Props) => {
    const createSelect = ({
        mode,
        id,
        placeholder,
    }: {
        mode?: 'multiple';
        id: keyof Filters;
        placeholder: string;
    }) => {
        return (
            <Select
                mode={mode ?? undefined}
                allowClear
                style={{ width: 150 }}
                onClear={() => updateFilter(id, [])}
                placeholder={placeholder}
                value={filters[id] as string[]}
                onChange={(selected) => {
                    const values = Array.isArray(selected)
                        ? selected
                        : selected
                          ? [selected]
                          : [];
                    updateFilter(id, values);
                }}
                options={getFilterOptions(characters, id)}
            />
        );
    };

    return (
        <Card>
            <Space wrap>
                {createSelect({
                    id: 'gender',
                    placeholder: 'Gender',
                })}

                {createSelect({
                    mode: 'multiple',
                    id: 'eyeColor',
                    placeholder: 'Eye Color',
                })}

                {createSelect({
                    mode: 'multiple',
                    id: 'species',
                    placeholder: 'Species',
                })}

                {createSelect({
                    id: 'films',
                    placeholder: 'Film',
                })}

                {hasActiveFilters && (
                    <Button onClick={resetFilters}>Clear Filters</Button>
                )}
            </Space>
        </Card>
    );
};

export default CharacterFilters;
