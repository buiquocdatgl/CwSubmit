import React from 'react';
import Dialog from 'react-native-dialog';

const CheckData = ({ showDialog, handleSubmit, bag, visible }) => {
    return (
        <Dialog.Container visible={visible}>
            <Dialog.Title>Check Data</Dialog.Title>
            <Dialog.Description>
                {bag}
            </Dialog.Description>
            <Dialog.Button label="Back To Edit" onPress={showDialog} />
            <Dialog.Button label="Confirm" onPress={handleSubmit} />
        </Dialog.Container>
    );
}

export default CheckData;