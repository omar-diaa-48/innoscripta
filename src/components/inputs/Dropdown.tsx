import React from 'react'
import { IDropdownOption } from '../../utils/interfaces'

interface Props<T> {
    value: T
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: Array<IDropdownOption<T>>
}

const Dropdown: React.FC<Props<string | number>> = (props) => {
    const { value, onChange, options } = props;

    return (
        <select
            className="border p-2 rounded-md"
            value={value}
            onChange={onChange}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default Dropdown