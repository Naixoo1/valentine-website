# 📋 Admin Guide - How to Customize Your Valentine's Website

This guide will help you personalize the website for your special someone!

## 🎯 Quick Customization Checklist

- [ ] Edit questions in `adminConfig.js`
- [ ] Add your personal message
- [ ] Upload and link your photos
- [ ] Add your song (optional)
- [ ] Test the website
- [ ] Deploy and share!

---

## 1️⃣ Editing Questions

**File:** `src/config/adminConfig.js`

Find the `adminQuestions` array and modify:

```javascript
export const adminQuestions = [
  {
    id: 1,
    question: "Your first question here?",
    type: "textarea"  // Options: "text", "textarea", "number"
  },
  {
    id: 2,
    question: "Your second question?",
    type: "text"
  },
  // Add more questions...
]
```

### Question Types:
- **"text"**: Single line answer
- **"textarea"**: Multi-line answer (for longer responses)
- **"number"**: Numeric input (e.g., rating 1-10)

### Tips:
- Keep 3-7 questions for best experience
- Mix question types for variety
- Ask meaningful questions that matter to both of you
- Avoid yes/no questions - you want thoughtful answers!

---

## 2️⃣ Personalizing Your Message

**File:** `src/config/adminConfig.js`

Find `adminMessage` and customize:

```javascript
export const adminMessage = {
  title: "A Special Message For You 💕",
  content: `Dear [Her Name],

Your personalized message here...
You can write multiple paragraphs.

Each blank line creates a new paragraph.

With all my heart,
[Your Name] 💖`
}
```

### Tips:
- Be genuine and heartfelt
- Mention specific memories or inside jokes
- Keep it 3-5 paragraphs for readability
- Use line breaks (`\n\n`) between paragraphs
- Don't be afraid to be romantic!

---

## 3️⃣ Adding Your Photos

### Method 1: Using Online Hosting (Recommended)

**Best Free Options:**
1. **Imgur** (imgur.com)
   - Upload image → Right-click → "Copy image address"
   - Use direct link (ends with .jpg, .png)

2. **Google Photos**
   - Upload → Share → Create link → Get shareable link
   - May need to convert to direct image link

3. **Cloudinary** (cloudinary.com)
   - Professional option with free tier
   - Great for image optimization

**Update adminConfig.js:**
```javascript
export const photoGallery = [
  "https://i.imgur.com/yourimage1.jpg",
  "https://i.imgur.com/yourimage2.jpg",
  "https://i.imgur.com/yourimage3.jpg",
  // Add 6-10 photos for best layout
]
```

### Method 2: Using Local Files

1. Create folder: `public/photos/`
2. Add your images (name them: photo1.jpg, photo2.jpg, etc.)
3. Update config:
```javascript
export const photoGallery = [
  "/photos/photo1.jpg",
  "/photos/photo2.jpg",
  "/photos/photo3.jpg",
]
```

### Photo Tips:
- Use 6-10 photos for best visual effect
- Square photos work best (1000x1000px recommended)
- Mix close-ups and full shots
- Choose photos with good memories
- Ensure photos are clear and well-lit

---

## 4️⃣ Adding Music (Optional)

### Option 1: Local Audio File

1. Get your song file (MP3 format recommended)
2. Place in `public/music/song.mp3`
3. Edit `src/pages/MusicAndPhotosPage.jsx`:

Find this section and uncomment:
```javascript
<audio id="background-music" loop autoPlay>
  <source src="/music/song.mp3" type="audio/mpeg" />
</audio>
```

4. Update `musicConfig` in `adminConfig.js`:
```javascript
export const musicConfig = {
  songTitle: "Your Song Title",
  artist: "Artist Name",
  message: "This song reminds me of you... 🎵"
}
```

### Option 2: YouTube Embed

Add the YouTube video ID to config:
```javascript
export const musicConfig = {
  songUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  songTitle: "Song Name",
  artist: "Artist Name",
  message: "Our song 🎵"
}
```

### Music Tips:
- Choose a song meaningful to both of you
- Keep volume moderate (60-70%)
- Test on multiple devices
- Note: Some browsers block autoplay

---

## 5️⃣ Testing Your Website

### Before Sharing:

1. **Test All Pages:**
   - Navigate through each page
   - Fill out the questionnaire
   - Check photos load correctly
   - Verify music plays
   - Test the Yes/No buttons

2. **Mobile Testing:**
   - Open on your phone
   - Check layout and responsiveness
   - Test touch interactions

3. **Check Answers Storage:**
   - Fill out questionnaire
   - Open browser DevTools (F12)
   - Go to Application → Local Storage
   - Verify answers are saved

### Quick Test Checklist:
- [ ] Questions display correctly
- [ ] Can navigate between pages
- [ ] Photos load properly
- [ ] Music plays (if added)
- [ ] Message shows your text
- [ ] Proposal page buttons work
- [ ] Final celebration shows
- [ ] Mobile layout looks good

---

## 6️⃣ Viewing Her Answers

After she completes the questionnaire, you can view her answers:

### Method 1: Browser DevTools
1. Ask her to text you when done
2. Access the website on any browser
3. Press F12 (or Cmd+Option+I on Mac)
4. Go to "Application" or "Storage" tab
5. Find "Local Storage" → your website URL
6. Look for `userAnswers` key
7. Copy the JSON data

### Method 2: Create a View Page (Advanced)
Add a secret admin page to view responses:
- URL: `yourwebsite.com/admin`
- Display stored answers in a nice format

Example code snippet to add to a new page:
```javascript
const answers = JSON.parse(localStorage.getItem('userAnswers'))
console.log(answers)
```

---

## 7️⃣ Deployment Options

### Easiest: Netlify

1. Create account at netlify.com
2. Push code to GitHub
3. "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

**You'll get a URL like:** `your-valentine.netlify.app`

### Custom Domain (Optional):
- Buy domain from Namecheap, Google Domains
- Add custom domain in Netlify settings
- Now it's: `yourlove.com`

---

## 8️⃣ Common Customizations

### Changing Colors

Edit `src/styles/global.css`:
```css
:root {
  --primary-pink: #ff69b4;    /* Main color */
  --light-pink: #ffb6d9;      /* Light accents */
  --dark-pink: #ff1493;       /* Dark accents */
}
```

### Adjusting Animations

In page CSS files, modify animation durations:
```css
animation: floatHeart 10s infinite;
/* Change 10s to 5s for faster, 20s for slower */
```

### Adding More Pages

1. Create new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation button

---

## 🎁 Pro Tips

1. **Timing**: Send link when you're together or can video call
2. **Screenshot**: Take screenshots as backup of her answers
3. **Surprise**: Don't tell her about the proposal question!
4. **Backup**: Save her answers somewhere safe
5. **Updates**: You can update content even after deployment

---

## ⚠️ Important Notes

- **Testing**: Always test before sending!
- **Privacy**: Her answers are stored locally on HER device
- **Browser**: Works best on Chrome, Safari, Firefox
- **Internet**: Requires internet for photos (if hosted online)
- **Mobile**: Optimized for mobile-first experience

---

## 🆘 Troubleshooting

**Photos not showing:**
- Check URLs are direct image links
- Ensure they end in .jpg, .png, .gif
- Test URLs in new browser tab

**Music not playing:**
- Check file path is correct
- Try different browser
- User might need to interact first (browser security)

**Answers not saving:**
- Check browser allows local storage
- Test in incognito/private mode
- Verify localStorage in DevTools

**Website not loading:**
- Clear browser cache
- Check deployment status
- Verify all files are uploaded

---

## 💝 Final Words

This website is your digital love letter. Take your time customizing it to reflect your unique relationship. The effort you put into personalizing every detail will show how much you care.

**Remember:**
- Be genuine in your message
- Choose photos that tell your story
- Test everything before sharing
- Have fun with it!

**Good luck, and Happy Valentine's Day! 💕**

---

Need help? Common questions:
- "How many photos should I add?" → 6-10 is perfect
- "Should I add music?" → Optional, but adds romance!
- "How long should my message be?" → 3-5 paragraphs
- "Can I edit after sharing?" → Yes! Just redeploy

**Now go make some Valentine's Day magic! ✨**
