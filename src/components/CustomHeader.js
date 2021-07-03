import React from 'react'
import { Block, Text } from 'components'
import { StyleSheet } from 'react-native'
import { sizes, colors } from 'styles/theme'

const CustomHeader = props => {
    const {navigation, routes, children} = props
    return (
        <Block flex={false} middle center style={styles.mainCon}>
            <Text>{children}</Text>
        </Block>
    )
}

const styles = StyleSheet.create({
    mainCon:{
        // borderBottomWidth:1,
        backgroundColor:'#FFFFFF',
        height:sizes.getHeight(10)
    }
})

export {CustomHeader}
