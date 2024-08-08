const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/p5-rewards', {
}).then(() => {
  console.log("Connected to database");
}).catch(err => {
  console.error("Database connection error:", err);
});

const UserSchema = new mongoose.Schema({
  name: String,
  p5_balance: { type: Number, default: 100 },
  rewards_balance: { type: Number, default: 0 }
});

const RewardHistorySchema = new mongoose.Schema({
  datetime: { type: Date, default: Date.now },
  points: Number,
  given_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  given_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', UserSchema);
const RewardHistory = mongoose.model('RewardHistory', RewardHistorySchema);

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  try {
    const user = new User({ name });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'User not found' });
  }
});

app.put('/users/:id', async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.post('/p5-transactions', async (req, res) => {
  const { fromUserId, toUserId, points } = req.body;
  try {
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (fromUser.p5_balance < points) {
      return res.status(400).json({ error: 'Insufficient P5 balance' });
    }

    fromUser.p5_balance -= points;
    toUser.p5_balance += points;

    await fromUser.save();
    await toUser.save();

    const transaction = new RewardHistory({
      points,
      given_by: fromUserId,
      given_to: toUserId
    });

    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

app.delete('/p5-transactions/:id', async (req, res) => {
  try {
    const transaction = await RewardHistory.findById(req.params.id).populate('given_by').populate('given_to');

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    const fromUser = await User.findById(transaction.given_by._id);
    const toUser = await User.findById(transaction.given_to._id);

    if (!fromUser || !toUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    fromUser.p5_balance += transaction.points;
    toUser.p5_balance -= transaction.points;

    await fromUser.save();
    await toUser.save();

    await RewardHistory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

app.get('/users/:id/rewards', async (req, res) => {
  try {
    const rewards = await RewardHistory.find({ given_to: req.params.id })
    .populate('given_to', 'name')
    .populate('given_by', 'name');
    const formattedRewards = rewards.map(reward => ({
      _id: reward._id,
      datetime: reward.datetime,
      points: reward.points,
      given_by: reward.given_by.name,
      given_to: reward.given_to.name,


    }));
    res.json(formattedRewards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
});

app.get('/users/:id/p5', async (req, res) => {
    try {
      const rewards = await RewardHistory.find({ given_by: req.params.id })
      .populate('given_to', 'name')
      .populate('given_by', 'name');
      const formattedRewards = rewards.map(reward => ({
        _id: reward._id,
        datetime: reward.datetime,
        points: reward.points,
        given_by: reward.given_by.name,
        given_to: reward.given_to.name,
  
  
      }));
      res.json(formattedRewards);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch rewards' });
    }
  });

app.post('/users/:id/rewards', async (req, res) => {
  const { recipientId, points } = req.body;
  try {
    const user = await User.findById(req.params.id);
    const recipient = await User.findById(recipientId);

    if (!user || !recipient) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.p5_balance < points || points > 100) {
      return res.status(400).json({ error: 'Invalid points' });
    }

    user.p5_balance -= points;
    recipient.rewards_balance += points;

    await user.save();
    await recipient.save();

    const reward = new RewardHistory({
      points,
      given_by: req.params.id,
      given_to: recipientId
    });

    await reward.save();
    res.json(reward);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create reward' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
