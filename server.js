// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/birthday_surprise';
let db;
let messagesCollection;
let wishesCollection;

// Connect to MongoDB
MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true })
  .then(client => {
    console.log('✅ Connected to MongoDB');
    db = client.db();
    messagesCollection = db.collection('messages');
    wishesCollection = db.collection('wishes');
  })
  .catch(error => {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️  Server will continue running, but database features will not work.');
  });

// ===========================================
// API ROUTES
// ===========================================

// Root endpoint - API health check
app.get('/', (req, res) => {
  res.json({
    message: '💖 Birthday Surprise API is running!',
    status: 'active',
    endpoints: {
      messages: '/api/messages',
      wishes: '/api/wishes'
    }
  });
});

// ===========================================
// MESSAGES ENDPOINTS
// Messages are the love letters/messages you write for your wife
// She can also reply to them
// ===========================================

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    if (!messagesCollection) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const messages = await messagesCollection.find({}).toArray();
    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

// Get a specific message by ID
app.get('/api/messages/:id', async (req, res) => {
  try {
    if (!messagesCollection) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const message = await messagesCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }
    res.json({ success: true, message });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch message' });
  }
});

// Create a new message (your love letter to her)
app.post('/api/messages', async (req, res) => {
  try {
    if (!messagesCollection) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const { title, content, author } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ 
        success: false, 
        error: 'Title and content are required' 
      });
    }

    // Create message object
    const newMessage = {
      title,
      content,
      author: author || 'Your Loving Husband',
      createdAt: new Date(),
      reply: null, // Will store her reply
      repliedAt: null
    };

    // Insert into database
    const result = await messagesCollection.insertOne(newMessage);
    
    res.status(201).json({ 
      success: true, 
      message: 'Message created successfully',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ success: false, error: 'Failed to create message' });
  }
});

// Add a reply to a message (her response to your love letter)
app.post('/api/messages/:id/reply', async (req, res) => {
  try {
    if (!messagesCollection) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const { reply } = req.body;
    
    if (!reply) {
      return res.status(400).json({ 
        success: false, 
        error: 'Reply content is required' 
      });
    }

    // Update the message with the reply
    const result = await messagesCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { 
        $set: { 
          reply: reply,
          repliedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    res.json({ 
      success: true, 
      message: 'Reply added successfully' 
    });
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ success: false, error: 'Failed to add reply' });
  }
});

// ===========================================
// BIRTHDAY WISHES ENDPOINTS
// Store birthday wishes from friends, family, or yourself
// ===========================================

// Get all birthday wishes
app.get('/api/wishes', async (req, res) => {
  try {
    if (!wishesCollection) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const wishes = await wishesCollection.find({}).sort({ createdAt: -1 }).toArray();
    res.json({ success: true, wishes });
  } catch (error) {
    console.error('Error fetching wishes:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch wishes' });
  }
});

// Create a new birthday wish
app.post('/api/wishes', async (req, res) => {
  try {
    if (!wishesCollection) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const { name, wish } = req.body;
    
    // Validate required fields
    if (!name || !wish) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and wish are required' 
      });
    }

    // Create wish object
    const newWish = {
      name,
      wish,
      createdAt: new Date()
    };

    // Insert into database
    const result = await wishesCollection.insertOne(newWish);
    
    res.status(201).json({ 
      success: true, 
      message: 'Wish added successfully',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Error creating wish:', error);
    res.status(500).json({ success: false, error: 'Failed to create wish' });
  }
});

// Delete a wish (optional - in case you want to remove one)
app.delete('/api/wishes/:id', async (req, res) => {
  try {
    if (!wishesCollection) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const result = await wishesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Wish not found' });
    }

    res.json({ 
      success: true, 
      message: 'Wish deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting wish:', error);
    res.status(500).json({ success: false, error: 'Failed to delete wish' });
  }
});

// ===========================================
// ERROR HANDLING
// ===========================================

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    message: 'The requested endpoint does not exist'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: err.message 
  });
});

// ===========================================
// START SERVER
// ===========================================

app.listen(PORT, () => {
  console.log(`\n🎉 Birthday Surprise Server is running!`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`💝 API Endpoints:`);
  console.log(`   - GET    /api/messages`);
  console.log(`   - POST   /api/messages`);
  console.log(`   - POST   /api/messages/:id/reply`);
  console.log(`   - GET    /api/wishes`);
  console.log(`   - POST   /api/wishes`);
  console.log(`\n💖 Ready to spread love!\n`);
});
