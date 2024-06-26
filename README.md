# Todo List Application

This is a Todo List application built with Next.js and Firebase Firestore. It allows users to add, edit, delete, and toggle the completion status of todo items. The application also includes a search feature to filter todos and displays a loading indicator while data is being fetched or updated.

## Features

- Add new todos
- Edit existing todos
- Delete todos
- Mark todos as complete or incomplete
- Search todos
- Display loading indicator during data fetching and updating
- Responsive design

## Technologies Used

- [Next.js](https://nextjs.org/) - A React framework for server-side rendering and static site generation.
- [Firebase Firestore](https://firebase.google.com/docs/firestore) - A flexible, scalable database for mobile, web, and server development.
- [React Hot Toast](https://react-hot-toast.com/) - A React library for displaying toast notifications.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Firebase account and project set up with Firestore enabled.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/todo-list-nextjs-firebase.git
   cd todo-list-nextjs-firebase
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup Firebase**:

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project or use an existing project.
   - Set up Firestore in the Firebase project.
   - Obtain your Firebase configuration details from the project settings.

4. **Create a `.env.local` file in the root directory and add your Firebase configuration**:

   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

Open `http://localhost:3000` with your browser to see the result.

### Project Structure

```plaintext
my-todo-list/
├── app/
│   ├── api/
│   │   ├── todo/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── molecules/
│   │   └── TodoItem.tsx
│   └── organisms/
│       └── TodoList.tsx
├── public/
│   ├── icon/
│   │   ├── DeleteIcon.tsx
│   │   └── EditIcon.tsx
│   └── next-env.d.ts
├── lib/
│   ├── firebaseConfig.ts
│   └── firestore.ts
├── .env.local
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## API Routes

- GET /api/todo: Fetch all todos.
- POST /api/todo: Add a new todo.
- PUT /api/todo/: Update a todo by ID.
- DELETE /api/todo/: Delete a todo by ID.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- Next.js
- Firebase Firestore
- React Hot Toast
- Tailwind CSS
