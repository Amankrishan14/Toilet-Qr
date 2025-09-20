# 🚽 Toilet Feedback System

A modern web application that allows users to provide feedback on toilet facilities by scanning QR codes. Built with Next.js, Supabase, and TailwindCSS.

## Features

- **QR Code Integration**: Each toilet has a unique QR code that links to its feedback form
- **Comprehensive Feedback Form**: Rate cleanliness (1-5), water availability, soap availability, and add comments
- **Real-time Data Storage**: All feedback is stored in Supabase database
- **Admin Dashboard**: View and filter all feedback submissions
- **Responsive Design**: Works on desktop and mobile devices
- **50 Demo Toilets**: Pre-configured with sample data

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **QR Code Generation**: qrcode library
- **Deployment**: Vercel-ready

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd toilet-feedback-app
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Set up Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL to create tables and insert demo data

### 4. Generate QR Codes

```bash
npm run generate-qr
```

This will create QR code images in `public/qr-codes/` directory.

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
toilet-feedback-app/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin dashboard
│   │   ├── toilet/[id]/     # Dynamic toilet feedback pages
│   │   ├── qr-codes/        # QR codes overview page
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   └── FeedbackForm.tsx # Main feedback form component
│   └── lib/
│       └── supabase.ts      # Supabase client configuration
├── scripts/
│   └── generate-qr-codes.js # QR code generation script
├── public/
│   └── qr-codes/            # Generated QR code images
└── supabase-schema.sql      # Database schema
```

## Database Schema

### Toilets Table
- `id` (TEXT): Unique toilet identifier (toilet_1, toilet_2, etc.)
- `name` (TEXT): Display name for the toilet
- `location` (TEXT): Physical location description
- `created_at` (TIMESTAMP): Creation timestamp

### Feedbacks Table
- `id` (UUID): Unique feedback identifier
- `toilet_id` (TEXT): References toilets.id
- `cleanliness_rating` (INTEGER): Rating from 1-5
- `water_available` (BOOLEAN): Water availability status
- `soap_available` (BOOLEAN): Soap availability status
- `comments` (TEXT): Optional user comments
- `created_at` (TIMESTAMP): Submission timestamp

## Usage

### For Users
1. Find a QR code posted near a toilet
2. Scan the QR code with your phone camera
3. Fill out the feedback form
4. Submit your feedback

### For Administrators
1. Visit `/admin` to access the dashboard
2. View all feedback submissions in a table
3. Filter by rating, water/soap availability
4. Search by toilet ID or comments
5. Monitor feedback statistics

## API Endpoints

- `GET /` - Home page
- `GET /admin` - Admin dashboard
- `GET /qr-codes` - QR codes overview
- `GET /toilet/[id]` - Individual toilet feedback form
- `POST /api/feedback` - Submit feedback (handled by Supabase)

## Customization

### Adding More Toilets
1. Add new toilet entries to the `toilets` table in Supabase
2. Run `npm run generate-qr` to generate new QR codes
3. The system will automatically handle new toilets

### Modifying Feedback Form
Edit `src/components/FeedbackForm.tsx` to add new fields or change the form layout.

### Styling
The app uses TailwindCSS. Modify classes in components to change the appearance.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Troubleshooting

### QR Codes Not Generating
- Ensure you have write permissions to the `public/qr-codes` directory
- Check that the `qrcode` package is installed

### Database Connection Issues
- Verify your Supabase URL and anon key are correct
- Check that the database schema has been applied
- Ensure RLS policies are properly configured

### Form Submission Errors
- Check browser console for error messages
- Verify Supabase RLS policies allow public access
- Ensure the feedbacks table exists with correct schema

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own needs!

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.