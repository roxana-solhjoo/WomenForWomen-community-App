import React from 'react'
import { Text, Block } from 'components'
import {colors,sizes} from 'styles/theme'
import * as icons from 'assets/icons'
import * as images from 'assets/images'
import {useDispatch,useSelector} from 'react-redux'


const Home = props => {
    const {navigation,route} = props

    return (
       <Block color={colors.background}>
           <Text>Home</Text>
       </Block>
    )
}

export  {Home}
