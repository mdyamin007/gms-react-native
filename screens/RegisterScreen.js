import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { auth, database } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { set, ref, push } from "firebase/database";
import { useNavigation } from "@react-navigation/core";
import DropDownPicker from "react-native-dropdown-picker";
import tw from "twrnc";
import * as Location from "expo-location";

const LoginScreen = () => {
  const [items, setItems] = useState([
    { label: "User", value: "user" },
    { label: "Collector", value: "collector" },
  ]);
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Dashboard");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        // console.log(user);
        set(ref(database, "users/" + user.uid), {
          location,
          email,
          fullName,
          userType,
        });
        if (userType === "user") {
          userListRef = ref(database, "houseOwners");
          newUserRef = push(userListRef);
          set(newUserRef, {
            uid: user.uid,
            location,
            fullName,
            email,
          });
        } else {
          collectorListRef = ref(database, "collectors");
          newCollectorRef = push(collectorListRef);
          set(newCollectorRef, {
            uid: user.uid,
            location,
            location,
            fullName,
          });
        }
      })
      .catch((error) => alert(error.message));
  };

  let address = "Waiting..";

  if (errorMsg) {
    address = errorMsg;
  } else if (location) {
    address = JSON.stringify(location);
  }

  return (
    <View style={styles.container} behavior="padding">
      {/* <Image style={styles.logo} source={require("../assets/logo.png")} /> */}
      <Text style={styles.heading}>Register</Text>
      <View style={styles.inputContainer}>
        <View style={tw`mb-4`}>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            placeholder="Address"
            style={styles.input}
            value={address}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <Text>User Type:</Text>
        <DropDownPicker
          style={tw``}
          open={open}
          value={userType}
          items={items}
          setOpen={setOpen}
          setValue={setUserType}
          setItems={setItems}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.button]}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 50,
  },
  logo: {
    height: 50,
    width: 50,
    marginVertical: 20,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#dc2626",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
