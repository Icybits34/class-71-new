import React,{Component} from "react";
import { View,Text,StyleSheet,TouchableOpacity,TextInput,Image,ImageBackground } from "react-native";
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner"

const bgImg=require("../assets/background2.png")
const appIcon=require("../assets/appIcon.png")
const appName=require("../assets/appName.png")

export default class TransactionScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            domState:"normal",
            bookId:"",
            studentId:"",
            hasCameraPermissions: null,
            scanned:false,
            scannedData:""
        }
    }

getCameraPermissions=async domState=>{
    const{status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCameraPermissions:status==="granted",
        domState:domState,
        scanned:false

    })
}

handleBarcodeScanned=async ({type,data})=>{
    this.setState({
        scannedData:data,
        domState:"normal",
        scanned:true,
    })
}

handleTransaction=()=>{
  var{bookId}=this.state
  db.collection("books")
  .doc(bookId)
  .get()
  .then(doc=>{
    console.log(doc.data())
    var book =doc.data()
    if(book.is_book_available){
     this.initiateBookIssue()
    }
    else{
   this.initiateBookReturn()
    }
    })

}


initiateBookIssue=()=>{
  console.log("book issued to the student")
}

initiateBookReturn=()=>{
  console.log("book returned by the student")
}
    render()
    {
        const{domState,hasCameraPermissions,scanned,scannedData}=this.state
        if(domState==="scanner"){
            return(
                <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
                style={StyleSheet.absoluteFillObject}></BarCodeScanner>
            )
        }
        return(
            <View style={styles.container}>
                <ImageBackground source={bgImg}style={styles.bgImg}>

                <View style={styles.upperContainer}>
                    <Image source={appIcon}style={styles.appIcon}/>
                    <Image source={appName}style={styles.appName}/>
                    </View>
                <View style={styles.lowerContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput
                    style={styles.textInput}
                    placeholder={"bookId"}
                    placeholderTextColor={"white"}
                    value={bookId}></TextInput>
                    <TouchableOpacity
                    style={styles.scanButton}
                    onPress={()=>this.getCameraPermissions("bookId")}>
                        <Text style={styles.scanButtonText}>scan</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.textInputContainer}>
                    <TextInput
                    style={styles.textInput}
                    placeholder={"studentId"}
                    placeholderTextColor={"white"}
                    value={studentId}></TextInput>
                    <TouchableOpacity
                    style={styles.scanButton}
                    onPress={()=>this.getCameraPermissions("studentId")}>
                        <Text style={styles.scanButtonText}>scan</Text>
                    </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleTransaction}>
                        <Text style={styles.buttonText}>sumbit</Text>
                    </TouchableOpacity>
            </View>
            </ImageBackground>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
    },
    bgImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    upperContainer: {
      flex: 0.5,
      justifyContent: "center",
      alignItems: "center"
    },
    appIcon: {
      width: 200,
      height: 200,
      resizeMode: "contain",
      marginTop: 80
    },
    appName: {
      width: 80,
      height: 80,
      resizeMode: "contain"
    },
    lowerContainer: {
      flex: 0.5,
      alignItems: "center"
    },
    textinputContainer: {
      borderWidth: 2,
      borderRadius: 10,
      flexDirection: "row",
      backgroundColor: "#9DFD24",
      borderColor: "#FFFFFF"
    },
    textinput: {
      width: "57%",
      height: 50,
      padding: 10,
      borderColor: "#FFFFFF",
      borderRadius: 10,
      borderWidth: 3,
      fontSize: 18,
      backgroundColor: "#5653D4",
      fontFamily: "Rajdhani_600SemiBold",
      color: "#FFFFFF"
    },
    scanbutton: {
      width: 100,
      height: 50,
      backgroundColor: "#9DFD24",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    scanbuttonText: {
      fontSize: 24,
      color: "#0A0101",
      fontFamily: "Rajdhani_600SemiBold"
    }
  });
        
