import { useState } from 'react';
import firebase from 'firebase';

const firestore = firebase.firestore();

const useFirebaseTodo = () => {
  const [todos, setTodos] = useState([]);

  const getTodo = async (planId) => {
    try {
      const subscribe = firestore.collection("trips").doc(planId).collection("todos").onSnapshot(s => {
        const todoList = [];
        s.forEach(doc => {
          todoList.push({ uid: doc.id, ...doc.data() });
        });
        setTodos(todoList);
      })
      return subscribe;
    } catch (e) {
      return false
    }
  }

  const addTodo = async (todoTitle, planId) => {
    try {
      await firestore.collection("trips").doc(planId).collection("todos").add({
        title: todoTitle,
        status: "todo",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return true;
    } catch (e) {
      return false
    }
  }

  const updateTodo = async (todo, status, planId) => {
    try {
      await firestore.collection("trips").doc(planId).collection("todos").doc(todo.uid).update({
        status: status,
        updatedAt: new Date()
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  const deleteTodo = async (todo, planId) => {
    try {
      await firestore.collection("trips").doc(planId).collection("todos").doc(todo.uid).delete();
      return true;
    } catch (e) {
      return false;
    }
  }

  return {getTodo, addTodo, updateTodo, deleteTodo, todos};
}

export default useFirebaseTodo;