# 🚀 ReperoPrompt

ReperoPrompt is an open-source tool designed to help users discover, create, and share AI prompts intuitively.
This is my first application built with Next.js, where I learned the fundamentals of NextAuth and how Next.js handles both the front-end and back-end within the same application. I used MongoDB as the database to store users informations and their prompts.

## 🌟 Key Features

✅ Google authentication with NextAuth<br/>
✅ Create, share, and explore AI prompts<br/>
✅ Secure data storage with MongoDB<br/>
✅ Responsive and optimized UI<br/>


## 🛠️ Technologies Used
- **Next.js** – React framework for front-end and back-end
- **NextAuth** – User authentication management
- **MongoDB** – NoSQL database for storing prompts
- **Tailwind CSS** – Modern and clean design

## 📥 Installation Steps

### Clone the repository
```bash
git clone https://github.com/your-username/reperoprompt.git
cd reperoprompt
```
### Install dependencies
```bash
npm install
```
## Set up environment variables in a .env.local file:
```bash
MONGODB_URI=your_mongodb_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=check the nextauth documentation
NEXTAUTH_URL_INTERNAL=check the nextauth documentation
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
### Start the app
```bash
npm run dev
```

