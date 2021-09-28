import React, { Component } from 'react';
import { Button, View, Text ,Modal,TouchableOpacity,Alert,StyleSheet,ScrollView,TextInput, KeyboardAvoidingView} from 'react-native';
import db from '../config'
import firebase  from 'firebase';
import  MyHeader from '../components/MyHeader';
import { Icon } from 'react-native-elements';
export default class DonateScreen extends Component {
    constructor(){
        super()
        this.state={
            petAge:'',
            petBreed:'',
            donateID:'',
            userID:firebase.auth().currentUser.email

        }
    }

    createUniqueID(){
        return Math.random().toString(36).substring(7)
        
    }

    addDonation=(petAge,petBreed)=>{
        var userID=this.state.userID
        var randomDonateID=this.createUniqueID()
        db.collection('Donations').add({
            userID:userID,
            petAge:petAge,
            petBreed:petBreed,
            donateID:randomDonateID
        })
        return alert('Made Dination Successfully')


    }
    render(){
        return(
           <View style={{flex:1}}>
               <MyHeader title='Donate Pets' />
               <TouchableOpacity style={styles.logoutButton}
                onPress={()=>{
                    this.props.navigation.navigate('LoginScreen')
                    firebase.auth().signOut()
                }}
               >
                   <Icon name='logout' type='antdesign'/>
                       
               </TouchableOpacity>
               <TextInput
               style={styles.fontTextInput}
               placeholder={'PetAge'}
               value={this.state.petAge}
               onChangeText={(text)=>{
                     this.setState({
                         petAge:text
                     })
               }}
               />

                <TextInput
               style={styles.fontTextInput}
               placeholder={'PetBreed'}
               value={this.state.petBreed}
               onChangeText={(text)=>{
                     this.setState({
                         petBreed:text
                     })
               }}
               />

               <TouchableOpacity style={styles.button}
               onPress={()=>{
                   this.addDonation(this.state.petAge,this.state.petBreed)
               }}
               >
                   <Text>
                       Donate
                   </Text>
               </TouchableOpacity>

           </View>
        )
    }
}
const styles=StyleSheet.create({
title:{
    textAlign:'center',
    justifyContent:'center',
    fontSize:40,
    fontWeight:'bold',
    color:'black',
    marginTop:25
},
fontTextInput:{
    width:'75%',
    height:35,
    alignSelf:'center',
    borderRadius:10,
    marginTop:10,
    padding:10,
    borderWidth:1
  },
  button:{
      width:'75%',
      height:50,
      borderRadius:10,
      backgroundColor:'yellow',
      alignSelf:'center',
      justifyContent:'center',
      marginTop:20
  },
  logoutButton:{
      height:30,
      justifyContent:'center',
      marginLeft:290,
      marginTop:-35
  }


})

