import express from 'express'
import cors from 'cors'

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  { id: 3, name: 'Alice', email: 'alice@example.com' },
  { id: 4, name: 'Bob', email: 'bob@example.com' },
  { id: 5, name: 'Charlie', email: 'charlie@example.com' },
  { id: 6, name: 'David', email: 'david@example.com' },
  { id: 7, name: 'Eve', email: 'eve@example.com' },
  { id: 8, name: 'Frank', email: 'frank@example.com' },
  { id: 9, name: 'Grace', email: 'grace@example.com' },
  { id: 10, name: 'Hank', email: 'hank@example.com' },
  { id: 11, name: 'Ivy', email: 'ivy@example.com' },
  { id: 12, name: 'Jack', email: 'jack@example.com' },
  { id: 13, name: 'Karen', email: 'karen@example.com' },
  { id: 14, name: 'Leo', email: 'leo@example.com' },
  { id: 15, name: 'Mike', email: 'mike@example.com' },
]

// GET /api/users with skip and take support
app.get('/api/users', (req, res) => {
  const skip = parseInt(req.query.skip as string) || 0 // Default to 0 skip
  const take = parseInt(req.query.take as string) || 10 // Default to 10 records

  const totalRecords = users.length
  const paginatedUsers = users.slice(skip, skip + take)

  res.json({
    data: paginatedUsers,
    totalRecords,
    skip,
    take,
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
