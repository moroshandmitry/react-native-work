import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from 'react-native';

import {Task} from './Task';

export const Todo = () => {
  const [task, setTask] = useState(null);
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  // const handleCompleteTask = index => {
  //   let itemCopy = [...taskItems];
  //   itemCopy.splice(index, 1);
  //   setTaskItems(itemCopy);
  // };

  const handleCompleteTask = idx => {
    setTaskItems(taskItems.filter((_, index) => index !== idx));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          <ScrollView>
            {taskItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCompleteTask(index)}>
                <Task text={`${item}`} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={text => setTask(text)}
        />

        <TouchableOpacity
          onPress={handleAddTask}
          disabled={task === null || undefined}>
          <View
            style={
              task === null || undefined
                ? styles.addWrapperDisabled
                : styles.addWrapper
            }>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  items: {
    marginTop: 20,
    height: 260,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 220,
    fontSize: 18,
    backgroundColor: '#fff',
    borderColor: '#C0C0C0',
    borderWidth: 2,
    borderRadius: 20,
    fontWeight: '700',
  },
  addWrapper: {
    width: 60,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 2,
  },
  addWrapperDisabled: {
    width: 60,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 2,
  },
  addText: {
    fontSize: 25,
    color: '#C0C0C0',
  },
});
