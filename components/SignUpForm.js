import React, {useState} from 'react';
import {Button,Text,
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

function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setloading] = useState(false)
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const renderButton = () => {
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={() => handleSubmit()} title="Create user" />;
    };

    const handleSubmit = async() => {
        try {
           setloading(true)
           setErrorMessage(null)
           await firebase.auth().createUserWithEmailAndPassword(email, password);
           setloading(false)
           setCompleted(true)
        } catch (error){
           setErrorMessage(error.message)
           setloading(false)
        }

    }


    if (isCompleted) {
        return <Text>You are now signed up</Text>;
    }
    return (
        <View>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
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

export default SignUpForm
