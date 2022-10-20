import React from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { format } from 'date-fns'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from "react-native";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tick: 0, savedTime: []};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      tick: this.state.tick + 1
    });
  }

  saveTime() {
    this.state.savedTime.push({ valid: true, date: new Date()})
  }

  formatLightTime(date) {
    return format(date, 'HH:mm:ss') + "-XXX"
  }

  formatSavedTime(date) {
    return format(date, 'HH:mm:ss-SSS')
  }

  switchSaveTime(index) {
    this.state.savedTime[index].valid = !this.state.savedTime[index].valid
  }

  _renderSavedTimes() {
    let getStyle = (valid) => {
      return valid ? styles.textTimeInProgress : {...styles.textTimeInProgress, textDecorationLine: 'line-through', textDecorationStyle: 'solid'}
    }
    if (this.state.savedTime.length > 0)
    return (
        <ScrollView style={styles.scrollViewSavedTime}>
          <Text style={styles.petitTitre}>Captures</Text>
          {this.state.savedTime.map((element, index) => {
          return (
            <View style={styles.viewSavedTime} key={index}>
              <Text style={getStyle(element.valid)}>{this.formatSavedTime(element.date)}</Text>
              <TouchableOpacity onPress={() => this.switchSaveTime(index)}>
                <Icon color='black' name='switch' type='entypo' size={30}/>
              </TouchableOpacity>
            </View>
          );
        })}
        </ScrollView>)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Icon color="orange" name="stopwatch" type='font-awesome-5' size={50}/>
        <Text style={styles.grosTitre}>Time Capture</Text>
        <Text style={styles.sousTitre}>with miliseconds</Text>
        <View style={styles.viewTimeInProgress}>
          <Icon color="black" name="clock-o" type='font-awesome' size={30} style={{paddingRight:15}}/>
          <Text style={styles.textTimeInProgress}>{this.formatLightTime(new Date())}</Text>
        </View>
        <View >
          <Button  color="orange" style={styles.buttonSave}
            onPress={() => this.saveTime()}
            title={"SAVE"}
          />
        </View>
        { this._renderSavedTimes() }
      </View>

    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 100,
        marginHorizontal: 20
    },
    grosTitre: {
        color:'orange',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    sousTitre: {
      color:'orange',
      fontWeight: 'bold',
      fontSize: 12,
      textAlign: 'center'
  },
    petitTitre: {
        color:'orange',
        fontWeight: 'bold',
        fontSize: 16,
        margin: 20,
        textAlign: 'center'
    },
    viewTimeInProgress: {
        flexDirection: "row",
        marginVertical: 20,
        justifyContent: "space-evenly", 
        alignItems: "center"
    },  
    textTimeInProgress: {
      fontWeight: 'bold',
      fontSize: 20,
      marginRight: 20
    },
    buttonSave: {
        alignSelf: 'stretch'
    },  
    viewSavedTime: {
      flexDirection: "row",
      justifyContent: "center", 
      alignItems: "center"
    },
    scrollViewSavedTime: {
      marginTop: 50,
    }
})

export default Clock;