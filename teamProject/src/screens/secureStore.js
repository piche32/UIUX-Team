import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {Text, Button} from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

export default function SecureStoreScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [count, setCount] = useState(0);
    const addCount = () => {
        setCount(count+1);
        SecureStore.setItemAsync("count", String(count));
    };

    const read = async () => {
        try{
            const credentials = await SecureStore.getItemAsync('myPassword');
            console.log('value of credentials : ', credentials);

            if(credentials){
                const myJson = JSON.parse(credentials);
                setEmail(myJson.email);
                setPassword(myJson.password);
            }
        }
        catch(e) {
            console.log(e);
        }
    };

    const remember = async () => {
        const credentials = {email, password};
        try{
            await SecureStore.setItemAsync(
                'myPassword',
                JSON.stringify(credentials)
            );
            setEmail("");
            setPassword("");
        } catch(e) {
            console.log(e);
        }
    };

    const clear = async () => {
        try {
            await SecureStore.deleteItemAsync('myPassword');
            setEmail("");
            setPassword("");
        } catch(e) {
            console.log(e);
        }
    };

    return(
        <View style = {{justifyContent: 'center'}}>
            <TextInput value = {email}
            onChangeText={email=>setEmail(email)}
            placeholder="email"
            style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10,}}/>
            <TextInput value = {password}
            onChangeText={password=>setPassword(password)}
            placeholder="password"
            style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10, marginVertical: 10,}}/>
            
            <Button onPress= {remember}>remember</Button>
            <Button onPress= {read}>read</Button>
            <Button onPress= {clear}>clear</Button>
    <Text>Value: {count}</Text>
        </View>
    );
}