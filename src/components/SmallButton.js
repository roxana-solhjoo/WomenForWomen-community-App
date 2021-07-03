import React from 'react'
import { Block, Text, Button } from 'components'
import { StyleSheet } from 'react-native'
import { sizes, colors } from 'styles/theme'

const SmallButton = props => {
    const {children,bc,textColor} = props
    return (
        <Button activeOpacity={0.3} style={{...styles.btnCon,backgroundColor:bc, borderWidth:!bc?0.4:0}} center middle>
            <Text h3 color={bc? colors.white : colors.black}>{children}</Text>            
        </Button>
    )
}

const styles = StyleSheet.create({
    btnCon:{
        // borderWidth:1,
        width:sizes.getWidth(23),
        height:sizes.getHeight(4.5)
    }
})

export {SmallButton}
