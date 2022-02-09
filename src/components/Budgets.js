import { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'

import { useBudgets } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'
import AddBudgetModal from './AddBudgetModal'
import AddExpenseModal from './AddExpenseModal'

export default function Budgets() {
    const { budgets, getBudgetExpenses } = useBudgets()

    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const toggleAddBudgetModal = () => {
        setShowAddBudgetModal(!showAddBudgetModal)
    }

    const [addExpenseBudgetId, setAddExpenseBudgetId] = useState()
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    const toggleAddExpenseModal = (budgetId) => {
        setAddExpenseBudgetId(budgetId)
        setShowAddExpenseModal(!showAddExpenseModal)
    }
    return (
        <>
            <AddBudgetModal show={showAddBudgetModal} handleClose={() => toggleAddBudgetModal()} />
            <AddExpenseModal
                show={showAddExpenseModal}
                handleClose={() => toggleAddExpenseModal()}
                defaultBudgetId={addExpenseBudgetId}
            />
            <Stack direction="horizontal" gap="2" className="mb-4">
                <h1 className="me-auto">Budgets</h1>
                <Button variant="primary" onClick={() => toggleAddBudgetModal()}>
                    Add Budget
                </Button>
                <Button variant="outline-primary" onClick={() => toggleAddExpenseModal()}>
                    Add Expense
                </Button>
            </Stack>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                    gap: '1rem',
                    alignItems: 'flex-start',
                }}
            >
                {budgets.map((budget) => {
                    const { id, name, max, inactive } = budget
                    const amount = getBudgetExpenses(id)?.reduce((total, expense) => {
                        return (total += expense.amount)
                    }, 0)
                    return (
                        <BudgetCard
                            key={id}
                            id={id}
                            name={name}
                            amount={amount}
                            max={max}
                            onAddExpenseClick={toggleAddExpenseModal}
                            inactive={inactive}
                        />
                    )
                })}
            </div>
        </>
    )
}
