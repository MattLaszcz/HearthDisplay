import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const Tag = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tag} title='tag'>
            <Text>Tag</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    display: 'flex'
  },
  tag: {
    width: 75,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2196F3',
    color: 'black',
    alignItems: "center",
    justifyContent: 'center'
}
});

export default Tag;