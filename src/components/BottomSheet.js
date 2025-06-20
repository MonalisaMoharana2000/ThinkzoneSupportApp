import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';

const BottomSheet = forwardRef(({children, modalHeight}, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsVisible(true),
    close: () => setIsVisible(false),
  }));

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}>
      <Pressable style={styles.backdrop} onPress={() => setIsVisible(false)}>
        <TouchableWithoutFeedback>
          <View style={[styles.modalContainer, {height: modalHeight}]}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    elevation: 5,
  },
});

export default BottomSheet;
