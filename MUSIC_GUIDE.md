# 🎵 Adding Background Music

## How to Add Romantic Background Music

### Option 1: Download Free Romantic Music

Visit these sites for royalty-free romantic music:

1. **YouTube Audio Library**
   - Visit: https://www.youtube.com/audiolibrary/music
   - Filter by: Mood → "Romantic" or "Happy"
   - Download your favorite track

2. **Free Music Archive**
   - Visit: https://freemusicarchive.org/
   - Search for: "romantic piano" or "love song instrumental"

3. **Pixabay Music**
   - Visit: https://pixabay.com/music/
   - Search for: "romantic", "love", "wedding"

4. **Bensound**
   - Visit: https://www.bensound.com/
   - Recommended tracks: "Love", "Sweet", "Romantic"

### Option 2: Use Your Own Song

If you have a special song that's meaningful to both of you:

1. Find an instrumental version or the original
2. Convert to MP3 format if needed
3. Make sure the file size is reasonable (< 5MB recommended)

### Installation Steps

1. Download your chosen music file
2. Rename it to `romantic-music.mp3`
3. Place it in the `frontend` folder:
   ```
   birthday-surprise/
   └── frontend/
       ├── index.html
       ├── style.css
       ├── script.js
       └── romantic-music.mp3  ← Place here
   ```

### Testing

1. Open the application
2. Click anywhere on the page (browsers require user interaction for audio)
3. Click the "🎵 Play Music" button in the top-right corner
4. Music should start playing

### Troubleshooting

**Music doesn't play:**
- Check browser console for errors
- Verify file name is exactly `romantic-music.mp3`
- Try clicking on the page first (browsers block autoplay)
- Check file format (must be MP3)

**Music is too loud/quiet:**
Edit `frontend/script.js` and add this line after line 53:
```javascript
bgMusic.volume = 0.5;  // Range: 0.0 to 1.0 (50% volume)
```

### Recommended Romantic Songs (Instrumental)

- "River Flows in You" - Yiruma
- "A Thousand Years" - Piano Version
- "Canon in D" - Pachelbel
- "Clair de Lune" - Debussy
- "Kiss the Rain" - Yiruma
- "All of Me" - Piano Version

### Using Streaming Services

If you prefer using Spotify or YouTube:

1. Open `frontend/index.html`
2. Replace the audio section (around line 265) with:

**Spotify:**
```html
<iframe style="display:none" id="bgMusic" src="https://open.spotify.com/embed/track/YOUR_TRACK_ID" 
        width="0" height="0" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
```

**YouTube (hidden):**
```html
<iframe style="display:none" id="bgMusic" width="0" height="0" 
        src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&loop=1" 
        frameborder="0" allow="autoplay; encrypted-media"></iframe>
```

---

**Note:** Always respect copyright laws. Use royalty-free music or music you have the rights to use.
