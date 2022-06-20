import { useState } from 'react';
import firebase from 'firebase';

const firestore = firebase.firestore();

const useFirebaseExpense = () => {
  const [expenses, setExpenses] = useState([]);

  const getExpense = async (planId) => {
    try {
      const subscribe = firestore.collection("trips").doc(planId).collection("expenses").onSnapshot(s => {
        const expenseList = [];
        s.forEach(doc => {
          expenseList.push({ uid: doc.id, ...doc.data() });
        });
        setExpenses(expenseList);
      })
      return subscribe;
    } catch (e) {
      return false
    }
  }

  const addExpense = async (title, price, category, planId) => {
    try {
      await firestore.collection("trips").doc(planId).collection("expenses").add({
        title,
        price,
        category,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return true;
    } catch (e) {
      return false
    }
  }

  const deleteExpense = async (expense, planId) => {
    try {
      await firestore.collection("trips").doc(planId).collection("expenses").doc(expense.uid).delete();
      return true;
    } catch (e) {
      return false;
    }
  }

  return {getExpense, addExpense, deleteExpense, expenses};
}

export default useFirebaseExpense;