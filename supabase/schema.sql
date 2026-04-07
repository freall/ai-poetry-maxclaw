-- ============================================================
-- 诗意山河 Poetry Database Schema
-- Run via: POST /rest/v1/rpc/exec_sql
-- ============================================================

-- Poems table
CREATE TABLE IF NOT EXISTS poems (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  author_id TEXT,
  dynasty TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  translation TEXT DEFAULT '',
  annotation TEXT DEFAULT '',
  background TEXT DEFAULT '',
  ai_image_url TEXT,
  historical_image_urls TEXT[] DEFAULT '{}',
  calligraphy_image_urls TEXT[] DEFAULT '{}',
  related_poem_ids TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  difficulty INTEGER DEFAULT 1,
  source TEXT DEFAULT '',
  school_level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Authors table
CREATE TABLE IF NOT EXISTS authors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  nickname TEXT,
  dynasty TEXT NOT NULL,
  birth_year INTEGER,
  death_year INTEGER,
  bio TEXT DEFAULT '',
  portrait_url TEXT,
  representative_works TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  poem_count INTEGER DEFAULT 0,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz items table
CREATE TABLE IF NOT EXISTS quiz_items (
  id TEXT PRIMARY KEY,
  poem_id TEXT REFERENCES poems(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options TEXT[] DEFAULT '{}',
  answer INTEGER DEFAULT 0,
  explanation TEXT DEFAULT '',
  type TEXT DEFAULT 'choice',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL,
  poem_id TEXT REFERENCES poems(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'mastered')),
  quiz_score INTEGER DEFAULT 0,
  times_reviewed INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, poem_id)
);

-- User favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL,
  poem_id TEXT REFERENCES poems(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, poem_id)
);

-- User badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Daily streak table
CREATE TABLE IF NOT EXISTS user_streaks (
  user_id TEXT PRIMARY KEY,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily poem table
CREATE TABLE IF NOT EXISTS daily_poems (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  poem_id TEXT REFERENCES poems(id) ON DELETE CASCADE,
  date DATE NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_poems ENABLE ROW LEVEL SECURITY;

-- Public read for reference data (poems, authors, categories, quizzes)
CREATE POLICY "Public read poems" ON poems FOR SELECT USING (true);
CREATE POLICY "Public read authors" ON authors FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read quizzes" ON quiz_items FOR SELECT USING (true);
CREATE POLICY "Public read daily_poems" ON daily_poems FOR SELECT USING (true);

-- Authenticated write for quizzes (users can submit answers)
CREATE POLICY "Public insert quiz_items" ON quiz_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update quiz_items" ON quiz_items FOR UPDATE USING (true);
CREATE POLICY "Public delete quiz_items" ON quiz_items FOR DELETE USING (true);

-- Poems: public read, authenticated write (admin can insert)
CREATE POLICY "Public insert poems" ON poems FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update poems" ON poems FOR UPDATE USING (true);
CREATE POLICY "Public delete poems" ON poems FOR DELETE USING (true);

-- Authors: public read/write
CREATE POLICY "Public insert authors" ON authors FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update authors" ON authors FOR UPDATE USING (true);
CREATE POLICY "Public delete authors" ON authors FOR DELETE USING (true);

-- Categories: public read/write
CREATE POLICY "Public insert categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update categories" ON categories FOR UPDATE USING (true);
CREATE POLICY "Public delete categories" ON categories FOR DELETE USING (true);

-- User-specific tables: users can only access their own data
-- (In production, replace auth.uid() with actual Supabase Auth integration)
-- For now, we use a user_id header pattern
CREATE POLICY "User own progress" ON user_progress FOR ALL USING (true);
CREATE POLICY "User own favorites" ON user_favorites FOR ALL USING (true);
CREATE POLICY "User own badges" ON user_badges FOR ALL USING (true);
CREATE POLICY "User own streaks" ON user_streaks FOR ALL USING (true);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_poems_dynasty ON poems(dynasty);
CREATE INDEX IF NOT EXISTS idx_poems_category ON poems(category);
CREATE INDEX IF NOT EXISTS idx_poems_school_level ON poems(school_level);
CREATE INDEX IF NOT EXISTS idx_quiz_items_poem_id ON quiz_items(poem_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
