import { createContext, useContext, useState } from 'react'

const BudgetsContext = createContext()
export function useBudgets() {
    return useContext(BudgetsContext)
}

const UpdateBudgetContext = createContext()
export function useUpdateBudget() {
    return useContext(UpdateBudgetContext)
}

export const BudgetsProvider = ({ children }) => {
    const initialBudgets = [
        { id: 1, name: 'groceries', amount: 200, max: 300 },
        { id: 2, name: 'Health & Fitness', amount: 20, max: 100 },
        { id: 3, name: 'Gifts', amount: 30, max: 200 },
        { id: 4, name: 'Gas', amount: 130, max: 200 },
        { id: 5, name: 'Entertainment', amount: 78, max: 75 },
    ]
    const [budgets, setBudgets] = useState(initialBudgets)
    const updateBudget = (budget) => {
        console.log('budget!', budget)
    }
    return (
        <BudgetsContext.Provider value={budgets}>
            <UpdateBudgetContext.Provider value={updateBudget}>
                {children}
            </UpdateBudgetContext.Provider>
        </BudgetsContext.Provider>
    )
}
