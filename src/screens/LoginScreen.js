import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1059078689222-d7kdogq6ss0lhd0eujbpcm9iq105evoj.apps.googleusercontent.com'  ,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data.idToken;
  
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
  
      console.log('User Info:', userInfo.user.email, 'Google Sign In ID Token:', idToken);
      console.log('Firebase Sign-In Success');
  
      // App.js handles redirection after auth, so no need for manual navigation
      // But if you still want to force it:
      navigation.replace('MainApp');
      
    } catch (error) {
      console.error('Sign In Error:', error.message || error);
      if (error.code) {
        console.error('Error Code: ', error.code);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/leaves.jpg')} style={styles.leavesicon} />
        <Text style={styles.hellotext}>Hello user! Welcome to TwinProduct</Text>
      </View>
      <Text style={styles.please}>Please Login to the app</Text>
      <View style={styles.innercontainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          disabled={!email || !password}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity onPress={signIn} style={styles.btn}>
          <Text style={styles.signtext}>Sign In with Google</Text>
          <Image source={require('../assets/googleiocn.jpeg')} style={styles.ImageIconStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%'
    // justifyContent:'center',
  },
  innercontainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingVertical: '10%',
    marginTop: '40%',
    borderRadius:5,
    elevation:5
    
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //  justifyContent:'space-between'

  },
  signtext: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginHorizontal: 10

  },
  ImageIconStyle: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 14
  },
  leavesicon: {
    resizeMode: "contain",
    height: 30,
    width: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
    // paddingHorizontal:'5%',
    marginTop: '5%'
  },
  hellotext: {
    fontSize: 14,
    color: 'gray',
    marginLeft: '5%'
  },
  please: {
    fontSize: 14,
    color: 'green',
    marginTop: '5%'

  },
  button: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: '3%'
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',

  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontWeight: '500',
    color: '#555',
  },
});

export default LoginScreen;
