import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { child, get, ref } from "@firebase/database";
import { database } from "../firebase";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";

const CashCollectionScreen = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await get(child(ref(database), "payments")).then((snapshot) => {
        // console.log(snapshot);
        let paymentList = [];
        snapshot.forEach((childSnapshot) => {
          // console.log(childSnapshot);
          paymentList.push(childSnapshot);
        });
        setPayments(paymentList);
      });
      setLoading(false);
    })();
  }, []);

  // console.log(payments);

  return (
    <SafeAreaView style={tw`flex p-2`}>
      <ScrollView>
        {!loading &&
          payments &&
          payments.map((payment, index) => (
            <View
              key={index}
              style={tw`flex bg-yellow-400 p-4 m-2 rounded-lg shadow-lg`}
            >
              <Text style={tw`text-white text-lg`}>
                Email: {payment.val().email}
              </Text>
              <Text style={tw`text-white text-lg`}>
                {payment.val().payment}
              </Text>
              <Text style={tw`text-white text-lg`}>
                Amount: {payment.val().amount}
              </Text>
              <Text style={tw`text-white text-lg`}>
                TxnID: {payment.val().txnID}
              </Text>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CashCollectionScreen;
