import {Modal, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from 'styles/theme';
import {Text, Block} from 'components';
import Button from './Button';

const CustomModal = props => {
  const {children, isVisible, animation, closeModal} = props;

  return (
    <Modal
      onRequestClose={closeModal}
      style={styles.modalDesign}
      visible={isVisible}
      transparent={true}
      animationType={animation || "fade"}
      >
      <Block center middle 
      // style={{backgroundColor:'red'}}
      >
        {children}
      </Block>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalDesign: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {CustomModal};
