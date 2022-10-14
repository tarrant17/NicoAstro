import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date(), savedTime: []};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  GetDate(){
     const d = new Date();
      return d.toLocaleTimeString() + `.${d.getMilliseconds()}`;
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.grosTitre}>Cock</Text>
        <Text style={styles.timeInProgress}>{this.GetDate()}</Text>
        <Button style={styles.buttonSave} color="pink"
          onPress={() => this.setState({ savedTime: [...this.state.savedTime,this.GetDate()] })}
          title={"Set"}
        />
        <Text style={styles.petitTitre}>Saved Time </Text>
        {this.state.savedTime.map((element, index) => {
        return (
          <View style={styles.time} key={index}>
            <Text>{element}</Text>
          </View>
        );
      })}
      </View>

    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 50
    },
    grosTitre: {
        color:'pink',
        fontWeight: 'bold',
        fontSize: 60,
        textAlign: 'center'
    },
    petitTitre: {
        color:'pink',
        fontWeight: 'bold',
        fontSize: 16,
        margin: 20,
        textAlign: 'center'
    },
    timeInProgress: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 20,
        width: '100%',
        textAlign: 'center'
    },  
    buttonSave: {
        width: '10%'
    },  
    time: {
        alignItems: 'center'
    }
})

export default Clock;