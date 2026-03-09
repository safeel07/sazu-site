// Sample data to populate the database for testing
// You can use this to test the API endpoints

// =============================================
// HOW TO USE THIS FILE
// =============================================
// Copy and paste these fetch commands into your browser console
// Or use a tool like Postman to send these requests
// Make sure the backend server is running on http://localhost:5000

// =============================================
// SAMPLE MESSAGES (Love Letters)
// =============================================

// Message 1
fetch('http://localhost:5000/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'To My Beautiful Wife',
        content: 'Every day with you is a blessing. You make my life complete and I am so grateful for every moment we share together. Happy Birthday, my love!',
        author: 'Your Loving Husband'
    })
}).then(r => r.json()).then(data => console.log('Message 1 created:', data));

// Message 2
fetch('http://localhost:5000/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'My Forever Love',
        content: 'You are the reason I smile every day. Your love has transformed my life in the most beautiful ways. Thank you for being you.',
        author: 'Your Husband'
    })
}).then(r => r.json()).then(data => console.log('Message 2 created:', data));

// =============================================
// SAMPLE BIRTHDAY WISHES
// =============================================

// Wish 1
fetch('http://localhost:5000/api/wishes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'Your Loving Husband',
        wish: 'Happy Birthday to the most amazing woman in the world! You make every day brighter and more beautiful. I love you more than words can say! 💖'
    })
}).then(r => r.json()).then(data => console.log('Wish 1 created:', data));

// Wish 2
fetch('http://localhost:5000/api/wishes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'Best Friend Sarah',
        wish: 'Wishing you the happiest of birthdays! You deserve all the love and joy in the world! 🎉'
    })
}).then(r => r.json()).then(data => console.log('Wish 2 created:', data));

// Wish 3
fetch('http://localhost:5000/api/wishes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'Mom',
        wish: 'Happy Birthday to my wonderful daughter-in-law! May your day be filled with love, laughter, and happiness!'
    })
}).then(r => r.json()).then(data => console.log('Wish 3 created:', data));

// Wish 4
fetch('http://localhost:5000/api/wishes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'Brother John',
        wish: 'Happy Birthday sis! Hope your day is as amazing as you are! 🎂'
    })
}).then(r => r.json()).then(data => console.log('Wish 4 created:', data));

// =============================================
// TEST - GET ALL MESSAGES
// =============================================

fetch('http://localhost:5000/api/messages')
    .then(r => r.json())
    .then(data => console.log('All messages:', data));

// =============================================
// TEST - GET ALL WISHES
// =============================================

fetch('http://localhost:5000/api/wishes')
    .then(r => r.json())
    .then(data => console.log('All wishes:', data));

// =============================================
// SAMPLE REPLY TO MESSAGE
// =============================================
// NOTE: You need to get the actual message ID first
// Replace 'MESSAGE_ID_HERE' with the actual ID from the database

/*
fetch('http://localhost:5000/api/messages/MESSAGE_ID_HERE/reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        reply: 'Thank you so much for this beautiful message! You are the best husband ever. I love you! ❤️'
    })
}).then(r => r.json()).then(data => console.log('Reply added:', data));
*/

// =============================================
// ALTERNATIVELY: Use CURL commands
// =============================================

/*
# Create a message
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "title": "To My Beautiful Wife",
    "content": "You are amazing!",
    "author": "Your Husband"
  }'

# Create a wish
curl -X POST http://localhost:5000/api/wishes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "wish": "Happy Birthday!"
  }'

# Get all messages
curl http://localhost:5000/api/messages

# Get all wishes
curl http://localhost:5000/api/wishes
*/
