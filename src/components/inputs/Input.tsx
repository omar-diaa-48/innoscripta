import clsx from 'clsx';
import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<Props> = (props) => {
    const { className, ...restOfProps } = props;

    return (
        <input
            className={clsx("border p-2 rounded-md", className)}
            {...restOfProps}
        />
    )
}

export default Input