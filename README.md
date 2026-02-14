# 💝 Valentine's Day Website

A beautiful, interactive Valentine's Day website built with React, featuring questionnaires, photo galleries, music, and a heartfelt proposal!

## ✨ Features

- **📝 Interactive Questionnaire**: Collect answers to personalized questions
- **🎵 Music & Photos Page**: Display a song with a beautiful photo collage
- **💌 Message Page**: Show a heartfelt Valentine's message
- **💕 Proposal Page**: Fun interactive "Will You Be My Valentine?" with shrinking "No" button
- **🎉 Celebration Page**: Beautiful celebration with confetti and animations
- **📱 Mobile-First Design**: Fully responsive and optimized for all devices
- **✨ Smooth Animations**: Powered by Framer Motion
- **💾 Shared Backend**: Saves responses to Supabase so you can view her answers from any device (see [SUPABASE_SETUP.md](SUPABASE_SETUP.md))

## 🗂️ Project Structure

```
valentine-website/
├── public/                      # Static assets (add your photos here)
├── src/
│   ├── config/
│   │   └── adminConfig.js      # 👈 EDIT THIS: Questions, messages, photos
│   ├── pages/
│   │   ├── QuestionnairePage.jsx
│   │   ├── QuestionnairePage.css
│   │   ├── MusicAndPhotosPage.jsx
│   │   ├── MusicAndPhotosPage.css
│   │   ├── MessagePage.jsx
│   │   ├── MessagePage.css
│   │   ├── ProposalPage.jsx
│   │   ├── ProposalPage.css
│   │   ├── FinalPage.jsx
│   │   └── FinalPage.css
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Customize the content** (IMPORTANT!):
   
   Open `src/config/adminConfig.js` and edit:
   - **Questions**: Change the questionnaire questions
   - **Your Message**: Personalize the Valentine's message
   - **Photos**: Replace placeholder URLs with your actual photo URLs
   - **Music**: Add your song URL (YouTube, Spotify, or local file)

   Example:
   ```javascript
   export const adminQuestions = [
     {
       id: 1,
       question: "Your custom question here?",
       type: "textarea"
     },
     // Add more questions...
   ]

   export const photoGallery = [
     "https://your-photo-hosting.com/photo1.jpg",
     "https://your-photo-hosting.com/photo2.jpg",
     // Add more photos...
   ]
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   
   Navigate to `http://localhost:5173`

## 📸 Adding Your Photos

### Option 1: Use Online Image Hosting
- Upload photos to: Imgur, Google Photos, Cloudinary, or any image hosting service
- Get direct image URLs
- Add them to `photoGallery` array in `adminConfig.js`

### Option 2: Use Local Photos
1. Create a folder: `public/photos/`
2. Add your images there
3. Reference them in config:
   ```javascript
   export const photoGallery = [
     "/photos/photo1.jpg",
     "/photos/photo2.jpg",
   ]
   ```

## 🎵 Adding Music

### Option 1: YouTube/Spotify Embed
Update the `musicConfig` in `adminConfig.js` with your song details

### Option 2: Local Audio File
1. Add your audio file to `public/music/song.mp3`
2. Uncomment and update the audio source in `MusicAndPhotosPage.jsx`:
   ```javascript
   <audio id="background-music" loop autoPlay>
     <source src="/music/song.mp3" type="audio/mpeg" />
   </audio>
   ```

## 🎨 Customization

### Colors
Edit CSS variables in `src/styles/global.css`:
```css
:root {
  --primary-pink: #ff69b4;      /* Main pink color */
  --light-pink: #ffb6d9;         /* Light accents */
  --dark-pink: #ff1493;          /* Dark accents */
  --text-dark: #333333;          /* Text color */
}
```

### Fonts
Fonts are loaded from Google Fonts in `index.html`:
- Pacifico (decorative headings)
- Poppins (body text)

## 📦 Building for Production

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Preview the build:**
   ```bash
   npm run preview
   ```

The production files will be in the `dist/` folder.

## 🌐 Deployment

### Option 1: Netlify (Recommended)
1. Push your code to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Option 2: Vercel
1. Push to GitHub
2. Import project to Vercel
3. Deploy automatically

### Option 3: GitHub Pages
1. Install gh-pages: `npm install gh-pages --save-dev`
2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/valentine-website",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 🔍 Viewing User Answers

To view the answers your valentine provided:

1. Open browser Developer Tools (F12)
2. Go to "Application" or "Storage" tab
3. Find "Local Storage"
4. Look for `userAnswers` key
5. The answers are stored as JSON

Or add this temporary code to view answers:
```javascript
console.log(JSON.parse(localStorage.getItem('userAnswers')))
```

## 💡 Tips

- Test on mobile devices for the best experience
- Use high-quality photos (recommended: 1000x1000px)
- Keep messages heartfelt but not too long
- Test the "No" button functionality - it's the fun part!

## 🐛 Troubleshooting

**Photos not loading:**
- Check image URLs are correct and publicly accessible
- Use direct image links (ending in .jpg, .png, etc.)

**Music not playing:**
- Some browsers block autoplay - user may need to interact first
- Check audio file path is correct
- Ensure file format is supported (MP3 recommended)

**Deployment issues:**
- Ensure `base: './'` in `vite.config.js` for relative paths
- Check all file paths are correct

## 📝 License

This project is free to use for personal purposes. Spread the love! ❤️

## 🎁 Credits

Built with ❤️ using:
- React
- Vite
- Framer Motion
- Pure CSS animations

---

**Happy Valentine's Day! 💕**
