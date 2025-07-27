# Rezumi - AI-Powered Resume Builder

Rezumi is a modern, AI-powered resume builder that helps users create tailored resumes for specific job applications. Built with Next.js 15, TypeScript, and integrated with Google's Gemini AI, it provides intelligent resume customization based on job descriptions.

## 🚀 Features

- **AI-Powered Resume Tailoring**: Uses Google Gemini AI to customize resumes based on job descriptions
- **Modern UI/UX**: Built with Tailwind CSS and Radix UI components
- **Authentication**: Google OAuth integration with NextAuth.js
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **Resume Templates**: Multiple professional resume templates
- **PDF Export**: Generate and download resumes as PDF files
- **Real-time Updates**: Live preview of resume changes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Radix UI
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: Google Gemini 2.0 Flash API
- **PDF Generation**: jsPDF, html2canvas
- **Form Handling**: React Hook Form
- **Package Manager**: pnpm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database
- Google Cloud Platform account (for Gemini API)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rezumi.git
   cd rezumi
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/rezumi_db"
   
   # Authentication (Google OAuth)
   AUTH_SECRET="your-auth-secret-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # AI Integration
   GOOGLE_GEMINI="your-gemini-api-key"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate database migrations
   pnpm db:generate
   
   # Run migrations
   pnpm db:migrate
   
   # Or push schema directly (for development)
   pnpm db:push
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `AUTH_SECRET` | Secret key for authentication | `your-secret-key` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `123456789.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | `your-client-secret` |
| `GOOGLE_GEMINI` | Google Gemini API key | `your-gemini-api-key` |
| `NEXTAUTH_URL` | NextAuth.js URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth.js secret | `your-nextauth-secret` |

### Setting up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### Setting up Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key to your `.env.local` file

## 📁 Project Structure

```
rezumi/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── resume/           # Resume builder pages
│   └── updatedetails/    # User details update pages
├── components/           # Reusable React components
│   ├── ui/              # UI components (buttons, cards, etc.)
│   ├── dashboard/       # Dashboard-specific components
│   └── update-details/  # Form components
├── server/              # Server-side code
│   ├── action/          # Server actions
│   └── db/              # Database configuration
├── drizzle/             # Database migrations and schema
├── lib/                 # Utility functions and configurations
├── types/               # TypeScript type definitions
└── utils/               # Helper functions
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User authentication data
- `userDetails` - User profile information
- `experience` - Work experience entries
- `education` - Educational background
- `skills` - Technical and soft skills
- `projects` - Project portfolio
- `certificates` - Professional certifications
- `achievements` - Accomplishments and awards

## 🚀 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:generate` | Generate database migrations |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:push` | Push schema changes to database |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed
4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

### Code Style Guidelines

- Use functional components (no classes)
- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check your `DATABASE_URL` in `.env.local`
   - Verify database exists and is accessible

2. **Authentication Issues**
   - Verify Google OAuth credentials
   - Check `NEXTAUTH_URL` matches your deployment URL
   - Ensure redirect URIs are correctly configured

3. **AI Integration Not Working**
   - Verify `GOOGLE_GEMINI` API key is valid
   - Check API quota and billing status
   - Ensure the API key has access to Gemini 2.0 Flash

4. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `pnpm install`
   - Check TypeScript errors: `pnpm lint`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations
- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/rezumi/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

Made with ❤️ by the Rezumi team
