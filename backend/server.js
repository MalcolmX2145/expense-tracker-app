import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config(); // To load environment variables from .env file
const app = express();
const prisma = new PrismaClient();

app.use(express.json()); // For parsing JSON requests

// Sample route to fetch transactions
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { user: true },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Sample route to create a transaction
app.post('/transactions', async (req, res) => {
  const { amount, type, description, userId } = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        description,
        userId,
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

app.get('/', (req, res) => {
  res.send("Server is Ready!");
});

app.listen(5000, () => {
  console.log('Server started at http://localhost:5000');
});
