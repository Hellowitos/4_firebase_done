import React, { useState} from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 40,
    },
});

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data)=>{
            });

        } catch (error){
            setErrorMessage(error.message)
        }
    }

    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Login" />;
    };
    if (isCompleted) {
        return <Text>You are now logged in</Text>;
    }
    return (
        <View>
            <Text style={styles.header}>Login up</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password) }
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

export default LoginForm
