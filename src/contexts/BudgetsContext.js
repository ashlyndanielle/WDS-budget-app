import { createContext, useContext, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

import useLocalStorage from '../hooks/useLocalStorage'

const BudgetsContext = createContext()
/*
	creating function makes using context cleaner than the below
	import { BudgetsContext } from './contexts/BudgetsContext'
	import { useContext } from 'react'
	const budgets = useContext(BudgetsContext)
*/
export function useBudgets() {
    return useContext(BudgetsContext)
}

const UpdateBudgetContext = createContext()
export function useUpdateBudget() {
    return useContext(UpdateBudgetContext)
}

const initialBudgets = [
    { id: uuidV4(), name: 'Groceries', max: 300 },
    { id: uuidV4(), name: 'Health & Fitness', max: 100 },
    { id: uuidV4(), name: 'Gifts', max: 200 },
    { id: uuidV4(), name: 'Gas', max: 200 },
    { id: uuidV4(), name: 'Entertainment', max: 75 },
    { id: uuidV4(), name: 'Other', max: 200, inactive: true },
]

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage('budgets', initialBudgets)
    const [expenses, setExpenses] = useLocalStorage('expenses', [])

    function getBudgetExpenses(budgetId) {
        return expenses.filter((expense) => expense.budgetId === budgetId)
    }

    function addExpense({ budgetId, amount, description = '' }) {
        setExpenses((prevExpenses) => {
            return [...prevExpenses, { id: uuidV4(), budgetId, amount, description }]
        })
    }

    function addBudget({ name, max }) {
        if (budgets.find((budget) => budget.name === name)) return
        setBudgets((prevBudgets) => {
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }

    function deleteBudget({ id }) {
        // TODO: deal with uncategorized expenses
        setBudgets((prevBudgets) => {
            return prevBudgets.filter((budget) => budget.id !== id)
        })
    }

    function deleteExpense({ id }) {
        setExpenses((prevExpenses) => {
            return prevExpenses.filter((expense) => expense.id !== id)
        })
    }

    return (
        <BudgetsContext.Provider
            value={{
                budgets,
                expenses,
                getBudgetExpenses,
                addExpense,
                addBudget,
                deleteBudget,
                deleteExpense,
            }}
        >
            {children}
        </BudgetsContext.Provider>
    )
}
