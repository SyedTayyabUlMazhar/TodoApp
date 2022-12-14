import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import styles from './styles';
import { Modal, View, } from 'react-native';

const Loader: React.FC<ActivityIndicatorProps | CustomProps>
    = ({ style, isModalLoader, ...props }) => {
        if (!isModalLoader) {
            return (
                <ActivityIndicator
                    {...props}
                    style={[{ backgroundColor: "transparent" }, style]}
                    animating={true}
                />
            )
        }
        else {
            return (
               <Modal
                transparent={true}
                animationType={'none'}
                visible={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            {...props}
                            animating={true}
                        />
                    </View>
                </View>
            </Modal>
            )
        }
    }

interface CustomProps {
    isModalLoader: Boolean
}

Loader.defaultProps = {
    size: "small",
    isModalLoader: false,
    color: 'White'
}

export default React.memo(Loader);