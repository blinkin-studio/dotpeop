# Dotpeop - Factory Registration MVP

A minimal MVP web application built with Next.js, Supabase, and Tailwind CSS for registering and listing factories.

## Features

- **Home Page (`/`)**: Simple navigation to register or view factories.
- **Register Factory (`/register-factory`)**: A form to register a new factory with `company_name` and `country`.
- **Factory List (`/factories`)**: A list of all registered factories, fetched from Supabase.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Prerequisites

- Node.js (v18 or newer recommended)
- A Supabase account (free tier is sufficient)

## Supabase Setup Instructions

1. **Create a Project**:
   - Go to [Supabase](https://supabase.com/) and sign in.
   - Click "New Project", select your organization, and fill in the project details.
   - Wait for the database to be provisioned.

2. **Create the Database Table**:
   - In your Supabase dashboard, go to the **SQL Editor** (the `</>` icon on the left sidebar).
   - Click "New Query" and paste the following SQL code:

   ```sql
   -- Create the factories table
   CREATE TABLE factories (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     company_name TEXT NOT NULL,
     country TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
   );

   -- Enable Row Level Security (RLS)
   ALTER TABLE factories ENABLE ROW LEVEL SECURITY;

   -- Create a policy that allows anyone to read from the table
   CREATE POLICY "Allow public read access" ON factories
     FOR SELECT USING (true);

   -- Create a policy that allows anyone to insert into the table
   CREATE POLICY "Allow public insert access" ON factories
     FOR INSERT WITH CHECK (true);
   ```
   - Click **Run** to execute the query and create the table.

3. **Get Your API Keys**:
   - Go to **Project Settings** (the gear icon) > **API**.
   - Copy the **Project URL**.
   - Copy the **anon** `public` key.

## Local Development Setup

1. **Clone or Download the Code**:
   - Ensure you have the project files locally.

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Rename the `.env.local.example` file to `.env.local`:
     ```bash
     cp .env.local.example .env.local
     ```
   - Open `.env.local` and paste your Supabase URL and anon key:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
dotpeop/
├── app/
│   ├── globals.css           # Global Tailwind CSS styles
│   ├── layout.tsx            # Root layout with minimal styling
│   ├── page.tsx              # Home page
│   ├── factories/
│   │   └── page.tsx          # Factory list page (Server Component)
│   └── register-factory/
│       └── page.tsx          # Factory registration form (Client Component)
├── lib/
│   └── supabase.ts           # Supabase client initialization
├── .env.local.example        # Example environment variables file
├── package.json              # Project dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.ts            # Next.js configuration
```
