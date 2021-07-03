import React from 'react'
import { Text, Block } from 'components'
import { colors } from 'styles/theme'

const CustomAlert = ({text,textColor}) => {
    return (
       <Block center>
            <Text h4 color={textColor || colors.primary} >
            {text}
        </Text>
       </Block>
    )
}

export {CustomAlert}