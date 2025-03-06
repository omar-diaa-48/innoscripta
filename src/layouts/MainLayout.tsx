import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren { }

const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        children
    )
}

export default MainLayout