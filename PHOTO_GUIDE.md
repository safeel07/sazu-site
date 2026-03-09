# 📸 Photo Gallery Guide

## How to Add Your Photos

### Method 1: Using CSS Background Images (Recommended)

This is the easiest method - no need to modify HTML.

1. **Create a photos folder:**
   ```
   birthday-surprise/
   └── frontend/
       ├── photos/
       │   ├── photo1.jpg
       │   ├── photo2.jpg
       │   ├── photo3.jpg
       │   ├── photo4.jpg
       │   ├── photo5.jpg
       │   └── photo6.jpg
       ├── index.html
       ├── style.css
       └── script.js
   ```

2. **Add your photos to the photos folder**

3. **Open `frontend/style.css`** and add these styles at the end of the file (around line 570):

```css
/* Custom photo backgrounds */
.gallery-item:nth-child(1) .photo-placeholder {
    background-image: url('photos/photo1.jpg');
    background-size: cover;
    background-position: center;
    color: transparent; /* Hide placeholder text */
}

.gallery-item:nth-child(2) .photo-placeholder {
    background-image: url('photos/photo2.jpg');
    background-size: cover;
    background-position: center;
    color: transparent;
}

.gallery-item:nth-child(3) .photo-placeholder {
    background-image: url('photos/photo3.jpg');
    background-size: cover;
    background-position: center;
    color: transparent;
}

.gallery-item:nth-child(4) .photo-placeholder {
    background-image: url('photos/photo4.jpg');
    background-size: cover;
    background-position: center;
    color: transparent;
}

.gallery-item:nth-child(5) .photo-placeholder {
    background-image: url('photos/photo5.jpg');
    background-size: cover;
    background-position: center;
    color: transparent;
}

.gallery-item:nth-child(6) .photo-placeholder {
    background-image: url('photos/photo6.jpg');
    background-size: cover;
    background-position: center;
    color: transparent;
}
```

### Method 2: Using HTML img Tags

1. **Place photos in the frontend folder**

2. **Open `frontend/index.html`** and find the gallery section (around line 145)

3. **Replace each photo-placeholder div:**

Before:
```html
<div class="gallery-item">
    <div class="photo-placeholder">
        <p>Add Your<br>Photo Here</p>
        <small>Photo 1</small>
    </div>
    <p class="photo-caption">Our First Date</p>
</div>
```

After:
```html
<div class="gallery-item">
    <img src="photos/photo1.jpg" alt="Our First Date" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px 20px 0 0;">
    <p class="photo-caption">Our First Date</p>
</div>
```

### Photo Guidelines

**Best Practices:**
- **Format:** JPG or PNG
- **Size:** Resize to max 1200px width (faster loading)
- **Aspect Ratio:** 4:3 or 16:9 works best
- **Quality:** Medium to high quality (70-80% compression)

**Recommended Photo Moments:**
1. First date or meeting
2. Wedding day or engagement
3. Vacation together
4. Special celebration
5. Candid happy moment
6. Recent photo together

### Photo Editing Tips

Before adding photos, you might want to:
- Crop to best composition
- Adjust brightness/contrast
- Apply romantic filters (warm tones, soft focus)
- Add subtle borders or effects

**Free Photo Editors:**
- [Canva](https://www.canva.com/) - Online editor
- [Photopea](https://www.photopea.com/) - Free Photoshop alternative
- [GIMP](https://www.gimp.org/) - Desktop app

### Resizing Photos (Recommended)

Large photos slow down the website. Resize them first:

**Online Tools:**
- [TinyPNG](https://tinypng.com/) - Compress images
- [ResizeImage.net](https://resizeimage.net/) - Resize and compress

**Command Line (macOS/Linux):**
```bash
# Install ImageMagick
brew install imagemagick

# Resize all photos in folder
cd frontend/photos
for i in *.jpg; do
    convert "$i" -resize 1200x900 -quality 80 "resized_$i"
done
```

### Adding More Photos

Want to add more than 6 photos?

1. **In HTML** (around line 145), duplicate a gallery-item block:
```html
<div class="gallery-item">
    <div class="photo-placeholder">
        <p>Add Your<br>Photo Here</p>
        <small>Photo 7</small>
    </div>
    <p class="photo-caption">Another Special Moment</p>
</div>
```

2. **In CSS**, add another background style:
```css
.gallery-item:nth-child(7) .photo-placeholder {
    background-image: url('photos/photo7.jpg');
    background-size: cover;
    background-position: center;
    color: transparent;
}
```

### Troubleshooting

**Photos not showing:**
- Check file paths are correct
- Verify file names match exactly (case-sensitive)
- Make sure photos are in the right folder
- Check browser console for errors (F12)

**Photos look stretched:**
- Use `object-fit: cover;` in CSS
- Ensure photos have similar aspect ratios

**Website loads slowly:**
- Compress your photos (use TinyPNG)
- Resize to max 1200px width
- Convert to WebP format for better compression

### Custom Captions

Edit the captions in `frontend/index.html`:
```html
<p class="photo-caption">Your Custom Caption Here</p>
```

Ideas for captions:
- "The day I knew I loved you"
- "Our adventure in [place]"
- "Forever my favorite person"
- "When you made me laugh"
- "This smile is everything"

---

**Pro Tip:** Choose photos that tell your love story chronologically or thematically!
