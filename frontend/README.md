🧑‍💻 User Directory Table

A modern React application that displays user data fetched from the Reqres API, featuring search, sorting, filtering, and pagination — all on the client side. 

🚀 Live Demo
Live: https://assignment-seven-psi-54.vercel.app/
(Deployed on Vercel)

✨ Features

Fetches user data from the Reqres API
Search by name or email
Sort by name or email (ascending/descending)
Filter by email domain
Filter by first letter of name
Client-side pagination (6 users per page)
Loading and error states
Responsive design for desktop and mobile

🧱 Folder Structure

frontend/
├─ public/
│ └─ favicon.png
├─ src/
│ ├─ components/
│ │ └─ ui/
│ ├─ hooks/
│ │ ├─ use-mobile.tsx
│ │ └─ use-toast.ts
│ ├─ lib/
│ │ └─ utils.ts
│ ├─ pages/
│ │ ├─ Index.tsx
│ │ └─ NotFound.tsx
│ ├─ App.tsx
│ ├─ main.tsx
│ └─ index.html
└─ package.json

⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/your-username/user-directory.git
cd user-directory

2. Install dependencies
npm install

3. Start the development server
npm start

🧩 Key Components
Component	Description
UserTable	Displays user data with sorting and filtering controls
SearchBar	Filters users by name or email
Pagination	Client-side paging UI
FilterDropdown	Domain / first-letter filters
Loader	Loading spinner while fetching data
