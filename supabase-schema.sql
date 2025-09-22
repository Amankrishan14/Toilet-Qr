-- Toilet Feedback System Database Schema - Production Ready
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create toilets table
CREATE TABLE IF NOT EXISTS toilets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  building TEXT,
  floor TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedbacks table with enhanced fields
CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  toilet_id TEXT NOT NULL REFERENCES toilets(id) ON DELETE CASCADE,
  cleanliness_rating INTEGER NOT NULL CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  water_available BOOLEAN NOT NULL DEFAULT false,
  soap_available BOOLEAN NOT NULL DEFAULT false,
  comments TEXT,
  name TEXT,
  mobile TEXT,
  extra_feedback TEXT,
  photos JSONB DEFAULT '[]'::jsonb,
  videos JSONB DEFAULT '[]'::jsonb,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback analytics view
CREATE OR REPLACE VIEW feedback_analytics AS
SELECT 
  t.id as toilet_id,
  t.name as toilet_name,
  t.location,
  t.building,
  t.floor,
  COUNT(f.id) as total_feedbacks,
  AVG(f.cleanliness_rating) as avg_cleanliness_rating,
  COUNT(CASE WHEN f.water_available = false THEN 1 END) as no_water_count,
  COUNT(CASE WHEN f.soap_available = false THEN 1 END) as no_soap_count,
  COUNT(CASE WHEN f.cleanliness_rating <= 2 THEN 1 END) as low_rating_count,
  MAX(f.created_at) as last_feedback_at
FROM toilets t
LEFT JOIN feedbacks f ON t.id = f.toilet_id
WHERE t.is_active = true
GROUP BY t.id, t.name, t.location, t.building, t.floor;

-- Insert sample toilets with enhanced data
INSERT INTO toilets (id, name, location, building, floor) VALUES
('toilet_1', 'Toilet 1', 'Building A - Ground Floor', 'Building A', 'Ground Floor'),
('toilet_2', 'Toilet 2', 'Building A - First Floor', 'Building A', 'First Floor'),
('toilet_3', 'Toilet 3', 'Building A - Second Floor', 'Building A', 'Second Floor'),
('toilet_4', 'Toilet 4', 'Building B - Ground Floor', 'Building B', 'Ground Floor'),
('toilet_5', 'Toilet 5', 'Building B - First Floor', 'Building B', 'First Floor'),
('toilet_6', 'Toilet 6', 'Building B - Second Floor', 'Building B', 'Second Floor'),
('toilet_7', 'Toilet 7', 'Building C - Ground Floor', 'Building C', 'Ground Floor'),
('toilet_8', 'Toilet 8', 'Building C - First Floor', 'Building C', 'First Floor'),
('toilet_9', 'Toilet 9', 'Building C - Second Floor', 'Building C', 'Second Floor'),
('toilet_10', 'Toilet 10', 'Building D - Ground Floor', 'Building D', 'Ground Floor'),
('toilet_11', 'Toilet 11', 'Building D - First Floor', 'Building D', 'First Floor'),
('toilet_12', 'Toilet 12', 'Building D - Second Floor', 'Building D', 'Second Floor'),
('toilet_13', 'Toilet 13', 'Building E - Ground Floor', 'Building E', 'Ground Floor'),
('toilet_14', 'Toilet 14', 'Building E - First Floor', 'Building E', 'First Floor'),
('toilet_15', 'Toilet 15', 'Building E - Second Floor', 'Building E', 'Second Floor'),
('toilet_16', 'Toilet 16', 'Building F - Ground Floor', 'Building F', 'Ground Floor'),
('toilet_17', 'Toilet 17', 'Building F - First Floor', 'Building F', 'First Floor'),
('toilet_18', 'Toilet 18', 'Building F - Second Floor', 'Building F', 'Second Floor'),
('toilet_19', 'Toilet 19', 'Building G - Ground Floor', 'Building G', 'Ground Floor'),
('toilet_20', 'Toilet 20', 'Building G - First Floor', 'Building G', 'First Floor'),
('toilet_21', 'Toilet 21', 'Building G - Second Floor', 'Building G', 'Second Floor'),
('toilet_22', 'Toilet 22', 'Building H - Ground Floor', 'Building H', 'Ground Floor'),
('toilet_23', 'Toilet 23', 'Building H - First Floor', 'Building H', 'First Floor'),
('toilet_24', 'Toilet 24', 'Building H - Second Floor', 'Building H', 'Second Floor'),
('toilet_25', 'Toilet 25', 'Building I - Ground Floor', 'Building I', 'Ground Floor'),
('toilet_26', 'Toilet 26', 'Building I - First Floor', 'Building I', 'First Floor'),
('toilet_27', 'Toilet 27', 'Building I - Second Floor', 'Building I', 'Second Floor'),
('toilet_28', 'Toilet 28', 'Building J - Ground Floor', 'Building J', 'Ground Floor'),
('toilet_29', 'Toilet 29', 'Building J - First Floor', 'Building J', 'First Floor'),
('toilet_30', 'Toilet 30', 'Building J - Second Floor', 'Building J', 'Second Floor'),
('toilet_31', 'Toilet 31', 'Building K - Ground Floor', 'Building K', 'Ground Floor'),
('toilet_32', 'Toilet 32', 'Building K - First Floor', 'Building K', 'First Floor'),
('toilet_33', 'Toilet 33', 'Building K - Second Floor', 'Building K', 'Second Floor'),
('toilet_34', 'Toilet 34', 'Building L - Ground Floor', 'Building L', 'Ground Floor'),
('toilet_35', 'Toilet 35', 'Building L - First Floor', 'Building L', 'First Floor'),
('toilet_36', 'Toilet 36', 'Building L - Second Floor', 'Building L', 'Second Floor'),
('toilet_37', 'Toilet 37', 'Building M - Ground Floor', 'Building M', 'Ground Floor'),
('toilet_38', 'Toilet 38', 'Building M - First Floor', 'Building M', 'First Floor'),
('toilet_39', 'Toilet 39', 'Building M - Second Floor', 'Building M', 'Second Floor'),
('toilet_40', 'Toilet 40', 'Building N - Ground Floor', 'Building N', 'Ground Floor'),
('toilet_41', 'Toilet 41', 'Building N - First Floor', 'Building N', 'First Floor'),
('toilet_42', 'Toilet 42', 'Building N - Second Floor', 'Building N', 'Second Floor'),
('toilet_43', 'Toilet 43', 'Building O - Ground Floor', 'Building O', 'Ground Floor'),
('toilet_44', 'Toilet 44', 'Building O - First Floor', 'Building O', 'First Floor'),
('toilet_45', 'Toilet 45', 'Building O - Second Floor', 'Building O', 'Second Floor'),
('toilet_46', 'Toilet 46', 'Building P - Ground Floor', 'Building P', 'Ground Floor'),
('toilet_47', 'Toilet 47', 'Building P - First Floor', 'Building P', 'First Floor'),
('toilet_48', 'Toilet 48', 'Building P - Second Floor', 'Building P', 'Second Floor'),
('toilet_49', 'Toilet 49', 'Building Q - Ground Floor', 'Building Q', 'Ground Floor'),
('toilet_50', 'Toilet 50', 'Building Q - First Floor', 'Building Q', 'First Floor');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_feedbacks_toilet_id ON feedbacks(toilet_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_created_at ON feedbacks(created_at);
CREATE INDEX IF NOT EXISTS idx_feedbacks_cleanliness_rating ON feedbacks(cleanliness_rating);
CREATE INDEX IF NOT EXISTS idx_feedbacks_water_available ON feedbacks(water_available);
CREATE INDEX IF NOT EXISTS idx_feedbacks_soap_available ON feedbacks(soap_available);
CREATE INDEX IF NOT EXISTS idx_toilets_building ON toilets(building);
CREATE INDEX IF NOT EXISTS idx_toilets_floor ON toilets(floor);
CREATE INDEX IF NOT EXISTS idx_toilets_is_active ON toilets(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE toilets ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for toilets table
CREATE POLICY "Allow public read access to toilets" ON toilets
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow admin full access to toilets" ON toilets
  FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for feedbacks table
CREATE POLICY "Allow public insert to feedbacks" ON feedbacks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin read access to feedbacks" ON feedbacks
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Allow admin full access to feedbacks" ON feedbacks
  FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for admin_users table
CREATE POLICY "Allow admin read access to admin_users" ON admin_users
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Allow admin full access to admin_users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_toilets_updated_at BEFORE UPDATE ON toilets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert a default admin user (you should change this)
INSERT INTO admin_users (email, name, role) VALUES
('admin@fascino.com', 'Fascino Admin', 'super_admin')
ON CONFLICT (email) DO NOTHING;