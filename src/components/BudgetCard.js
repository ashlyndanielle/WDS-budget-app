import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
import { currencyFormatter } from '../utils'
import { useUpdateBudget } from '../contexts/BudgetsContext'

export default function BudgetCard({ name, amount, max, inactive }) {
    let cardClasses = amount > max ? 'bg-danger bg-opacity-10 ' : ''
    // if (inactive) cardClasses += 'bg-light'
    const updateBudget = useUpdateBudget()
    return (
        <Card className={cardClasses}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}{' '}
                        <span className="text-muted fs-6 ms-1">
                            / {currencyFormatter.format(max)}
                        </span>
                    </div>
                </Card.Title>
                <ProgressBar
                    className="rounded-pill"
                    variant={getProgressBarVariant(amount, max)}
                    max={max}
                    now={amount}
                />
                <Stack direction="horizontal" gap="2" className="mt-4 justify-content-end">
                    <Button onClick={() => updateBudget(name)} variant="outline-primary">
                        Add Expense
                    </Button>
                    <Button variant="outline-secondary">View Expenses</Button>
                </Stack>
            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.5) return 'success'
    if (ratio < 0.75) return 'warning'
    return 'danger'
}
