import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import DropDownPicker from "react-native-dropdown-picker";
import { ref, push, set } from "@firebase/database";
import { database } from "../firebase";
import { useNavigation } from "@react-navigation/core";

const PaymentScreen = () => {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [items, setItems] = useState([
    { label: "bKash", value: "bkash" },
    { label: "Nagad", value: "nagad" },
    { label: "Rocket", value: "rocket" },
  ]);
  const [amount, setAmount] = useState();
  const [email, setEmail] = useState();
  const [txnID, setTxnID] = useState();

  const navigation = useNavigation();

  const handleSubmit = () => {
    try {
      const paymentListRef = ref(database, "payments");
      const newPaymentRef = push(paymentListRef);
      set(newPaymentRef, {
        paymentMethod,
        amount,
        email,
        txnID,
      });
      alert("Payment done, Thank you!");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={tw`flex items-center mt-6`}>
        <Text style={tw`text-2xl font-bold text-pink-600`}>Payment</Text>
      </View>
      <View style={tw`p-4`}>
        <View style={tw`mb-4`}>
          <Text>Payment method:</Text>
          <DropDownPicker
            style={tw``}
            open={open}
            value={paymentMethod}
            items={items}
            setOpen={setOpen}
            setValue={setPaymentMethod}
            setItems={setItems}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text>Amount:</Text>
          <TextInput
            onChangeText={(newText) => setAmount(newText)}
            value={amount}
            style={tw`px-4 py-2 border rounded`}
            placeholder="100"
          />
        </View>
        <View style={tw`mb-4`}>
          <Text>Email:</Text>
          <TextInput
            style={tw`px-4 py-2 border rounded`}
            placeholder="mdyamin007@yahoo.com"
            onChangeText={(newText) => setEmail(newText)}
            value={email}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text>Transaction ID:</Text>
          <TextInput
            style={tw`px-4 py-2 border rounded`}
            placeholder="TX2134BCXD"
            onChangeText={(newText) => setTxnID(newText)}
            value={txnID}
          />
        </View>
        <View style={tw`flex justify-center items-center`}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={tw`px-6 py-4 bg-pink-600 rounded-full`}
          >
            <Text style={tw`text-white text-md font-bold`}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}>
          <Image
            source={require("../assets/images/payment_method.png")}
            style={{ height: 60, width: "100%" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
