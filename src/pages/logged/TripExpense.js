import React, { useState, useEffect } from "react";
import Nav from "./_nav";
import usePlanId from "hooks/usePlanId";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faBed, faTicket, faGasPump, faQuestion, faTrash } from "@fortawesome/free-solid-svg-icons";

import { PlusCircle, Trash } from "react-feather";
import Spinner from "components/Spinner";
import TextInput from "components/Form/TextInput";
import NumInput from "components/Form/NumInput";
import ExpenseCategory from "components/ExpenseCategory";
import useUser from "contexts/user";

import useFirebaseExpense from "hooks/useExpense";

const TripExpense = () => {
  const [ctx] = useUser();
  const planId = usePlanId();
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [error, setError] = useState({});

  const { getExpense, addExpense, deleteExpense, expenses } = useFirebaseExpense();

  useEffect(() => {
    if (expenses.length === 0) {
      setTotal("");
    } else {
      const total = expenses.reduce((acc, curr) => {
        return acc + curr.price;
      }
        , 0);
      setTotal(total);
    }
  }, [expenses]);

  const _onSubmit = async () => {
    try {
      if (title.length === 0) {
        setError({ title: "Todo title is required" });
      } else {
        addExpense(title, price, category, planId);
        setTitle("");
        setPrice(0);
        setCategory(null);
        setError({});
      }
    } catch (e) {
      console.error(e);
      setError({ title: e.message });
    }
  }

  const _onExpenseDelete = async (expense) => {
    deleteExpense(expense, planId);
  }

  useEffect(async () => {
    getExpense(planId);
    setLoading(false)
  }, [planId])

  if (loading) return (
    <Nav className="flex items-center justify-center">
      <Spinner size="lg" />
    </Nav>
  )

  return (
    <Nav>
      <div className="flex flex-col">
        <div>
          {expenses.length === 0 ?
            <div className="flex items-center justify-center mb-3 mt-5 font-semibold" >
              <span className="text-xl text-blue-600">Aucune dépense enregistrée</span>
            </div>
            : <>
              {expenses.map(expense => (
                <div key={expense.uid} className="flex items-center justify-between p-4 bg-gray-100 mb-2 rounded-lg">
                  <div>
                    {expense.category === "hotel" ? <FontAwesomeIcon icon={faBed} /> :
                      expense.category === "ticket" ? <FontAwesomeIcon icon={faTicket} /> :
                        expense.category === "food" ? <FontAwesomeIcon icon={faBurger} /> :
                          expense.category === "fuel" ? <FontAwesomeIcon icon={faGasPump} /> :
                            expense.category === "other" ? <FontAwesomeIcon icon={faQuestion} /> :
                              <></>}
                    <span className="ml-2">{expense.title}</span>
                    <span className="ml-2">({expense.price}€)</span>
                  </div>
                  <div>
                    <Trash size={20} onClick={() => _onExpenseDelete(expense)} color="red" className="cursor-pointer" />
                  </div>
                </div>
              ))}
            </>}
        </div>
        {total ?
          <p className="text-center">
            <span className="font-bold">Total:</span> {total}€
          </p>
          : <></>}
        <div className="mt-4 border-t border-gray-300 pt-2">
          <TextInput value={title}
            onChange={setTitle}
            error={error.title}
            placeholder="Intitulé dépense..."
            onEnterPressed={_onSubmit}
            className="flex-1" />
          <div className="flex" style={{ gap: 5 }}>
            <NumInput value={price}
              onChange={setPrice}
              min={0}
              className="flex-1" />
            <span className="mt-1 text-xl text-blue-600 font-semibold">
              €
            </span>
          </div>
          <div className="flex flex-wrap justify-center mb-2" style={{ gap: 5 }}>
            <ExpenseCategory icon={faBurger} title="food" onClick={() => setCategory("food")}
              active={category === "food"} />
            <ExpenseCategory icon={faBed} title="hotel" onClick={() => setCategory("hotel")}
              active={category === "hotel"} />
            <ExpenseCategory icon={faTicket} title="ticket" onClick={() => setCategory("ticket")}
              active={category === "ticket"} />
            <ExpenseCategory icon={faGasPump} title="fuel" onClick={() => setCategory("fuel")}
              active={category === "fuel"} />
            <ExpenseCategory icon={faQuestion} title="other" onClick={() => setCategory("other")}
              active={category === "other"} />
          </div>
          <span className="cursor-pointer bg-blue-600 h-9 ml-3 px-4 rounded text-white flex items-center justify-center hover:bg-blue-800" onClick={_onSubmit}>
            <PlusCircle className="cursor-pointer" />
          </span>
        </div>
      </div>
    </Nav>
  )
}

export default TripExpense;