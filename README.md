# 💖 Romantic Birthday Surprise Web Application

A beautiful, interactive web application to surprise your wife on her birthday! Features floating hearts, confetti, countdown timer, photo gallery, love letter with typewriter effect, interactive cake, and much more.

![Birthday Surprise](https://img.shields.io/badge/Made%20With-Love-ff69b4)
![Status](https://img.shields.io/badge/Status-Ready-success)

## ✨ Features

### Frontend Features:
- 🎨 **Beautiful UI**: Romantic pink, red, and white color theme
- 💕 **Floating Hearts**: Animated hearts floating across the screen
- 🎊 **Confetti Animation**: Celebratory confetti effects
- ⏱️ **Countdown Timer**: Real-time countdown to her birthday
- 🎂 **Interactive Cake**: Click to blow out the candles
- 📸 **Photo Gallery**: Display your favorite memories together
- 💌 **Love Letter**: Typewriter animation showing your romantic message
- 🎵 **Background Music**: Toggle romantic music on/off
- 🎁 **Surprise Button**: Hidden message or video reveal
- 💬 **Reply Section**: She can write a reply that saves to database
- 🎉 **Birthday Wishes**: Collection of birthday wishes with database storage
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ❤️ **Love Popup**: Final "I Love You Forever" message

### Backend Features:
- 🚀 **Express.js Server**: RESTful API for data management
- 💾 **MongoDB Database**: Store messages and birthday wishes
- 📝 **CRUD Operations**: Full create, read, update operations
- 🔄 **CORS Enabled**: Frontend-backend communication
- ✅ **Error Handling**: Comprehensive error management

## 📁 Project Structure

```
birthday-surprise/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # All styles and animations
│   └── script.js           # JavaScript functionality
├── backend/
│   ├── server.js           # Express server with API endpoints
│   ├── package.json        # Node.js dependencies
│   └── .env               # Environment variables
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - Local MongoDB - [Download here](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (Cloud) - [Create free account](https://www.mongodb.com/cloud/atlas)

### Installation

#### Step 1: Install Backend Dependencies

```bash
# Navigate to the backend folder
cd backend

# Install all required packages
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Enable cross-origin requests
- `mongodb` - MongoDB driver
- `dotenv` - Environment variable management
- `body-parser` - Parse request bodies
- `nodemon` - Auto-restart server (dev dependency)

#### Step 2: Configure MongoDB

Open `backend/.env` and configure your MongoDB connection:

**Option A: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/birthday_surprise
PORT=5000
```

**Option B: MongoDB Atlas (Cloud)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/birthday_surprise
PORT=5000
```

To get MongoDB Atlas connection string:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string and replace username/password

#### Step 3: Configure the Birthday Date

Open `frontend/script.js` and set your wife's birthday:

```javascript
// Line 14 in script.js
const BIRTHDAY_DATE = '2026-04-15'; // Change to your wife's birthday (YYYY-MM-DD)
```

#### Step 4: Customize the Love Letter

Open `frontend/script.js` and edit the `LOVE_LETTER` constant (starting around line 20):

```javascript
const LOVE_LETTER = `Your personalized love letter here...`;
```

## 🎮 Running the Application

### Start the Backend Server

```bash
# From the backend folder
cd backend

# Start the server
npm start

# OR for development (auto-restart on changes)
npm run dev
```

You should see:
```
🎉 Birthday Surprise Server is running!
🌐 Server URL: http://localhost:5000
✅ Connected to MongoDB
💖 Ready to spread love!
```

### Open the Frontend

Simply open `frontend/index.html` in your web browser:

**Option 1: Double-click the file**
- Navigate to `frontend/index.html`
- Double-click to open in your default browser

**Option 2: Use VS Code Live Server**
- Install "Live Server" extension in VS Code
- Right-click `index.html` → "Open with Live Server"

**Option 3: Use Python HTTP Server**
```bash
# From the frontend folder
cd frontend
python -m http.server 8080
# Then visit: http://localhost:8080
```

## 🎨 Customization Guide

### 1. Add Your Photos

**Method A: Update HTML**

Edit `frontend/index.html` around line 145:

```html
<div class="gallery-item">
    <img src="your-photo.jpg" alt="Description">
    <p class="photo-caption">Our First Date</p>
</div>
```

**Method B: Use CSS Background**

Edit `frontend/style.css` around line 570:

```css
.gallery-item:nth-child(1) .photo-placeholder {
    background-image: url('photos/photo1.jpg');
    background-size: cover;
    background-position: center;
}
```

### 2. Add Background Music

1. Download romantic music (royalty-free):
   - [YouTube Audio Library](https://www.youtube.com/audiolibrary/music)
   - [Free Music Archive](https://freemusicarchive.org/)

2. Save music file as `romantic-music.mp3` in the `frontend` folder

3. The HTML already references it:
```html
<audio id="bgMusic" loop>
    <source src="romantic-music.mp3" type="audio/mpeg">
</audio>
```

### 3. Add a Video Message

Edit the surprise modal in `frontend/index.html` around line 240:

**YouTube Video:**
```html
<div class="video-container">
    <iframe width="100%" height="315" 
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
            frameborder="0" allowfullscreen>
    </iframe>
</div>
```

**Local Video:**
```html
<div class="video-container">
    <video width="100%" controls>
        <source src="your-video.mp4" type="video/mp4">
    </video>
</div>
```

### 4. Change Colors

Edit `frontend/style.css` - modify the CSS variables at the top:

```css
:root {
    --primary-pink: #ff6b9d;      /* Main pink color */
    --primary-red: #ff1744;       /* Accent red color */
    --light-pink: #ffe5f0;        /* Background pink */
    /* Change these to your preferred colors */
}
```

### 5. Customize Messages

All customizable text is in `frontend/script.js`:
- `LOVE_LETTER` - Your love letter text
- Line 100-120 - Countdown messages
- Line 350+ - Demo wishes

## 📡 API Endpoints

### Messages Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages` | Get all messages |
| GET | `/api/messages/:id` | Get specific message |
| POST | `/api/messages` | Create new message |
| POST | `/api/messages/:id/reply` | Add reply to message |

### Wishes Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wishes` | Get all birthday wishes |
| POST | `/api/wishes` | Create new wish |
| DELETE | `/api/wishes/:id` | Delete a wish |

### Example API Calls

**Create a Message:**
```javascript
fetch('http://localhost:5000/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'My Love Letter',
        content: 'You are amazing...',
        author: 'Your Name'
    })
})
```

**Add a Birthday Wish:**
```javascript
fetch('http://localhost:5000/api/wishes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'John',
        wish: 'Happy Birthday!'
    })
})
```

## 🎯 Testing the Application

### Test Checklist:

- [ ] Backend server starts without errors
- [ ] Frontend loads in browser
- [ ] Floating hearts animation works
- [ ] Confetti falls from top
- [ ] Music toggle button works
- [ ] Countdown timer displays correctly
- [ ] Cake candles can be blown out
- [ ] Photo gallery displays
- [ ] Love letter types out automatically
- [ ] Reply can be submitted
- [ ] Birthday wishes can be added
- [ ] Surprise button opens modal
- [ ] "I Love You" popup appears
- [ ] Mobile responsive (test on phone)

## 🐛 Troubleshooting

### Backend Issues

**Problem: "MongoDB connection error"**
```
Solution:
- Check if MongoDB is running (local installation)
- Verify connection string in .env file
- Check network connectivity (MongoDB Atlas)
```

**Problem: "Port 5000 already in use"**
```
Solution:
- Change PORT in .env file to another port (e.g., 5001)
- Update API_URL in frontend/script.js to match new port
```

### Frontend Issues

**Problem: "API calls failing"**
```
Solution:
- Make sure backend server is running
- Check browser console for CORS errors
- Verify API_URL in script.js matches your backend URL
```

**Problem: "Music not playing"**
```
Solution:
- Browser autoplay policies require user interaction
- Click anywhere on the page first, then click play
- Make sure music file exists in frontend folder
```

**Problem: "Photos not showing"**
```
Solution:
- Verify image file paths are correct
- Check image file names and extensions
- Make sure images are in the correct folder
```

## 🌟 Tips for the Big Day

1. **Test everything beforehand** - Run through the entire app
2. **Prepare your photos** - Choose your best memories together
3. **Write your love letter** - Make it personal and heartfelt
4. **Choose romantic music** - Pick her favorite song or meaningful music
5. **Record a video** - A personal video message adds extra emotion
6. **Set up on a tablet or laptop** - Better experience than phone
7. **Be there when she opens it** - Capture her reaction!

## 📱 Deployment (Optional)

To share this online:

### Deploy Backend (Heroku):
```bash
# Install Heroku CLI, then:
heroku create birthday-surprise-api
git push heroku main
```

### Deploy Frontend (Netlify):
1. Drag and drop `frontend` folder to [Netlify](https://www.netlify.com/)
2. Update `API_URL` in script.js to your Heroku backend URL

### Deploy Backend (Railway):
1. Go to [Railway.app](https://railway.app/)
2. Connect your GitHub repo
3. Deploy the backend folder

## 💝 Final Touches

### Before the Surprise:

- [ ] Update birthday date
- [ ] Customize love letter
- [ ] Add your photos
- [ ] Add background music
- [ ] Test all features
- [ ] Optional: Add video message
- [ ] Optional: Pre-add some birthday wishes

### Share with Others:

You can invite friends and family to add birthday wishes:
1. Share the URL
2. They navigate to the "Wishes" section
3. They fill in their name and wish
4. Wishes are saved to the database

## 🔧 Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Fonts:** Google Fonts (Dancing Script, Poppins)
- **Icons:** Emoji

## 📄 License

This project is created with love and is free to use for personal purposes.

## 💌 Credits

Made with ❤️ for the most special person in your life.

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console for error messages
3. Verify all configuration steps were completed
4. Ensure all dependencies are installed

## 🎉 Enjoy!

Your wife is going to love this! Make sure you're there to see her reaction when she first experiences this special birthday surprise.

**Happy Birthday to Your Beautiful Wife! 💖🎂🎊**

---

*Remember: The best gift is showing someone how much you care. This app is just a medium to express your love!*
