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

export const Todo: React.FC = () => {
  const [task, setTask] = useState<null | string>(null);
  const [taskItems, setTaskItems] = useState<any>([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  console.log(Array.isArray(taskItems), 'Yooolo');

  // const handleCompleteTask = index => {
  //   let itemCopy = [...taskItems];
  //   itemCopy.splice(index, 1);
  //   setTaskItems(itemCopy);
  // };

  const handleCompleteTask = (idx: number) => {
    setTaskItems(taskItems.filter((_: null, index: number) => index !== idx));
  };

  console.log('render Todo task && taskItems', task, taskItems);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's tasks</Text>

      <View style={styles.tasksWrapper}>
        <View style={styles.items}>
          <ScrollView>
            {taskItems.map((item: string, index: number) => (
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
          value={task!}
          // onChangeText={(text: null | string) => setTask(text)}
          onChangeText={setTask}
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
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 10,
  },
  tasksWrapper: {
    paddingBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    marginHorizontal: 10,
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
    backgroundColor: '#dadada',
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
