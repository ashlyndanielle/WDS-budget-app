import { useBudgets } from '../contexts/BudgetsContext'
import { Button, Stack } from 'react-bootstrap'
import BudgetCard from './BudgetCard'

export default function Budgets() {
    const budgets = useBudgets()
    return (
        <>
            <Stack direction="horizontal" gap="2" className="mb-4">
                <h1 className="me-auto">Budgets</h1>
                <Button variant="primary">Add Budget</Button>
                <Button variant="outline-primary">Add Expense</Button>
            </Stack>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                    gap: '1rem',
                    alignItems: 'flex-start',
                }}
            >
                {budgets.map((budget, i) => {
                    const { name, amount, max } = budget
                    return <BudgetCard key={i} name={name} amount={amount} max={max} />
                })}
                {/* <BudgetCard name="Groceries" amount={400} max={300} />
                <BudgetCard name="Health & Fitness" amount={20} max={100} />
                <BudgetCard name="Gifts" amount={30} max={200} />
                <BudgetCard name="Gas" amount={130} max={200} />
                <BudgetCard name="Entertainment" amount={30} max={75} inactive={true} /> */}
            </div>
        </>
    )
}
