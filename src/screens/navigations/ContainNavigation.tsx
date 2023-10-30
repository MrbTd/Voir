import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import GlobalNavigation from './GlobalNavigation'

const ContainNavigation = () => {
    return (
        <NavigationContainer>
            <GlobalNavigation />
        </NavigationContainer>
    )
}

export default ContainNavigation