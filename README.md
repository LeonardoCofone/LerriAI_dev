# 🌐 Lonar – Your Intelligent Personal Assistant

You can try Lonar at [https://leonardocofone.github.io/LonarAI/](https://leonardocofone.github.io/LonarAI/)  
Lonar is a **website and PWA** that combines artificial intelligence and productivity tools.  
Its goal is to provide a **complete personal assistant** capable of managing daily tasks, emails, calendars, documents, reminders, and notifications — all in one unified platform.

---

## ✨ Vision

Lonar is designed to be a **smart digital assistant** that:

- Organizes your day and appointments  
- Manages calendars, tasks, documents, and emails  
- Communicates naturally in multiple languages  
- Provides a personalized daily briefing with agenda, news, weather, and tasks  

The focus is on helping users **stay organized, productive, and informed**.

---

## 🧩 Project Structure

LonarAI/
├── backend/                      # Node.js backend + agents and API management
│   ├── server.js                 # Main Node.js server (API + agent orchestration)
│   ├── refreshTokens.js          # Script to regenerate access tokens
│   ├── users.csv                 # Users database + tokens
│   ├── .env                      # Environment variables and credentials
│   ├── package.json              # Backend dependencies
│   ├── ecosystem.config.cjs      # PM2 config to start backend and refreshTokens
│
│   ├── data/                     # Users personal data (JSON)
│   │   └── user@gmail.com.json   # Example user data (tasks, events, settings)
│
│   ├── agents/                   # AI agents that handle actions
│   │   ├── routing-agent.js      # Selects which tool/AI to use
│   │   ├── jarvis-agent.js       # Executes requested actions (main agent)
│   │   └── daily-briefing-agent.js # Generates daily briefing
│
│   ├── tools/                    # Modules to interface with external services
│   │   ├── calendar-tool.js      # Google Calendar API
│   │   ├── tasks-tool.js         # Local task management
│   │   ├── gmail-tool.js         # Gmail API
│   │   ├── documents-tool.js     # Local documents manager
│   │   ├── finance-tool.js       # Finance/projects tracking
│   │   ├── sheets-tool.js        # Google Sheets API
│   │   ├── drive-tool.js         # Google Drive API
│   │   ├── news-tool.js          # News API
│   │   ├── weather-tool.js       # Weather API
│   │   └── index.js              # Exports all tools for easy imports
│
│   ├── prompts/                  # AI prompts
│   │   ├── routing-prompt.js
│   │   ├── jarvis-prompt.js
│   │   └── briefing-prompt.js
│
│   ├── memory/                   # Conversation memory management
│   │   └── conversation-memory.js # Chat memory (e.g., last 4 messages context)
│
│   ├── tts/                      # Text-to-speech / speech-to-text
│   │   └── speech-service.js     # Integrates ElevenLabs + Groq for TTS/STT
│
│   └── utils/                    # General utilities
│       ├── model-selector.js     # Selects the best AI model per task
│       ├── toon-converter.js     # Converts to TOON format
│       ├── userDataService.js    # Loads user data from backend/data
│       └── user-utils.js         # Reads and manages users.csv
│
├── SITO/                         # Frontend / PWA
│   ├── pwa/                      # Main PWA dashboard
│   │   ├── index.html            # Dashboard (chat + calendar + tasks + settings)
│   │   ├── app.js                # Frontend logic (UI, sync, API, agents)
│   │   ├── app.css               # Frontend styles
│   │   ├── manifest.json         # PWA configuration
│   │   ├── sw.js                 # Service Worker (cache, offline support)
│   │   └── icons/                # App icons
│   │       ├── icon-192.png
│   │       └── icon-512.png
│
│   ├── login.html                # Login page
│   ├── existing.html             # Existing users page
│   ├── onboarding.html           # Onboarding
│   ├── onboarding.css            # Onboarding styles
│   ├── onboarding.js             # Onboarding scripts
│   ├── gia_registrato.html       # Already registered users page
│   ├── PrivacyPolicy.html        # Privacy Policy
│   ├── Terms_&_Conditions.html   # Terms of Service
│   ├── auth.js                   # Login/signup logic
│   ├── style.css                 # General public styles
│   ├── script.js                 # Landing/login scripts
│   ├── index.html                # Main landing page
│   └── README.md                 # Complete project documentation


---

## 🧠 Features

### 🗓️ Personal organization
Syncs calendars, tasks, and reminders automatically.  
Commands like: “What’s on my schedule today?” or “Add meeting tomorrow at 3 PM.”

### 💌 Smart email
Manages Gmail inbox, prioritizes emails, drafts, and replies automatically.

### 📄 Documents and files
Access and manage Google Drive files or create new ones (docs, sheets, notes).

### 💬 Natural conversation
Responds in multiple languages (Italian, English, Spanish, French, German, Portuguese, Russian, Japanese, Chinese, Arabic).  
Automatically detects the user’s input language.

### ☀️ Daily briefing
Generates a daily summary with agenda, tasks, weather, and news.

### 💰 Finance & productivity
Tracks projects, completed tasks, and expenses. Generates summary reports.

---

## 🧩 Workflow

1. **Login or register** via Google OAuth  
2. Backend creates a personal file in `data/` with user info  
3. Access the **main PWA dashboard**  
4. Chat with Lonar, check schedule, and receive notifications

---

## 🛠️ Technologies

- **Frontend:** HTML, CSS, JavaScript (PWA)  
- **Backend:** Node.js + Express  
- **Database:** Local JSON files  
- **Authentication:** Google OAuth 2.0  
- **Voice:** ElevenLabs + Groq API (TTS/STT)  
- **AI Models:** LLaMA / GPT / Gemini / Cohere (dynamic selection)  
- **Deployment:** PM2  

---

## 🔒 Security & Privacy

All user data is **stored locally** in `backend/data`.  
Each user has a **separate, encrypted file**.  
No data is shared with third parties.

---

## 👤 Author

**Leonardo Cofone**  
AI developer and student, passionate about building **practical, high-quality AI solutions**.

> “AI, not magic.”  
> — *Leonardo Cofone*