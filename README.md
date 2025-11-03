# Space Explorer - Platform Adventure Game

A side-scrolling platform adventure game built with p5.js where you control a space explorer with a jetpack, collecting gems, avoiding dangers, and trying to reach the flag pole!

## 🌐 Play Online

**🎮 [Play the game now!](https://among-bros.vercel.app/)**

![Game Screenshot](https://img.shields.io/badge/p5.js-ED225D?style=for-the-badge&logo=p5.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎮 How to Play

1. **[Play online here](https://among-bros.vercel.app/)** or open `index.html` locally
2. Use arrow keys to move and jump
3. Collect gems to increase your score
4. Avoid falling into canyons and dodge falling rockets
5. Collect health kits to gain extra lives
6. Reach the flag pole at the end to win!

## 🕹️ Controls

- **Arrow LEFT** - Move left
- **Arrow RIGHT** - Move right
- **Arrow UP** - Jump (jetpack activated!)
- **SPACE** - Restart game (when game over or level completed)

## ✨ Game Features

### Core Gameplay
- **Side-scrolling platformer** with smooth camera following
- **Lives system** - Start with 3 lives, displayed as hearts
- **Score system** - Collect gems to increase your score (100 points each)
- **Win condition** - Reach the flag pole to complete the level
- **Game over** - Lose all lives and restart

### Game Elements

#### Collectables
- **Gems** 💎 - Red diamond-shaped collectables worth 100 points each
- Various sizes scattered throughout the level

#### Obstacles
- **Canyons** - Deep pits with lava at the bottom - fall in and lose a life!
- **Falling Rockets** 🚀 - Enemy projectiles that rain from the sky - avoid contact!

#### Environment
- Mountains with snow caps
- Trees with detailed foliage
- Animated clouds that loop across the sky
- Rotating starry night background
- Green ground platforms

#### Character
- Space explorer with red suit and jetpack
- Different animations for:
  - Standing
  - Walking left/right
  - Jumping with jetpack flames
  - Falling

## 🎯 Extensions Implemented

### 1. **Sound Effects** 🔊
Complete audio experience with:
- Background music (looping cricket sounds)
- Jump sound effect
- Falling/death sound
- Collectible pickup sound
- Health kit drink sound
- Win music
- Lose music

All sounds are preloaded and volume-optimized for the best gaming experience.

### 2. **Health Kits** ❤️
- Collectible health kits scattered throughout the level
- Gain +1 extra life when collected
- Distinctive white medical kit design with red cross
- Strategic placement for challenging areas

### 3. **Falling Rockets (Enemies)** 🚀
- Enemy projectiles that fall from the sky
- Multiple rockets with varying speeds and sizes
- Contact with rockets results in losing a life
- Rockets reset and continue falling after leaving the screen
- Creates dynamic challenge throughout gameplay

### 4. **Platforms** 📦
- Multiple platform levels for vertical gameplay
- Implemented using factory pattern for efficient object creation
- Collision detection allows character to stand on platforms
- Jump from platform to platform to reach higher areas
- Total of 9 platforms across different levels

### 5. **Victory Sparklers** ✨
- Particle effect system using constructor functions
- Sparklers activate when winning the game
- Colorful particles with randomized properties:
  - Speed
  - Size
  - Lifespan
  - Color variations (orange/red spectrum)
- Particles regenerate continuously for celebration effect

## 📁 Project Structure

```
ITP1-final/
├── index.html              # Main HTML file
├── sketch.js               # Game logic and rendering
├── p5.min.js              # p5.js library
├── p5.sound.min.js        # p5.js sound library
├── assets/                # Game assets folder
│   ├── backgroundMusic.mp3
│   ├── collect.mp3
│   ├── drink.mp3
│   ├── fall.mp3
│   ├── jump.mp3
│   ├── lose.mp3
│   └── win.mp3
├── Commentary.pdf         # Development commentary
└── README.md             # This file
```

## 🛠️ Technical Implementation

### Object-Oriented Design
- **Factory Pattern** for platform creation
- **Constructor Functions** for:
  - `RocketFall` - Enemy rockets with methods for drawing and collision
  - `Sparkler` - Particle effect system for victory celebration
  - `createPlatforms` - Reusable platform objects with collision detection

### Game State Management
- Lives counter system
- Score tracking
- Flag pole state (reached/raised)
- Sound state management (prevent sound overlapping)
- Camera scrolling system

### Arrays and Data Structures
- Mountains array with position and size properties
- Collectables array with found/unfound states
- Health kits array
- Platforms array
- Rockets array
- Stars array (2000 stars!)
- Clouds array with looping behavior

### Animations
- Flag raising animation
- Character jetpack flames (3 states: standing, jumping left, jumping right)
- Rotating star background
- Cloud movement
- Rocket falling
- Win screen text animation
- Particle sparkler effects

## 🎨 Visual Design

- **Color Palette**: 
  - Night sky theme (dark purple/black background)
  - Vibrant red character suit
  - Green platforms and foliage
  - White snow caps on mountains
  - Red lava in canyons

- **Character Design**:
  - Minimalist geometric shapes
  - Rounded corners for friendly appearance
  - Animated jetpack flames
  - Blue visor/eye

## 🎵 Audio Credits

Sound effects sourced from:
- Background music: [Cricket sounds]
- Jump sound: freesound.org
- Fall sound: Mixkit
- Win/Lose sounds: YouTube
- Collect sound: freesound.org/Xiko__
- Drink sound: Pixabay

## 📊 Game Statistics

- **Total Collectables**: 16 gems
- **Max Score**: 1,600 points (100 per gem)
- **Starting Lives**: 3
- **Available Health Kits**: 3 (+1 life each)
- **Max Possible Lives**: 6
- **Number of Canyons**: 5
- **Number of Rockets**: 6
- **Number of Platforms**: 9

## 📝 Development Notes

This game was developed as part of the ITP1 Final Exam Coursework. See `Commentary.pdf` for detailed development commentary and extension explanations.

## 📄 License

This project is created for educational purposes as part of university coursework.

---

**Enjoy your space adventure! 🚀✨**

Made with ❤️ using p5.js