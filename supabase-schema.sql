-- Create toilets table
CREATE TABLE IF NOT EXISTS toilets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  toilet_id TEXT NOT NULL REFERENCES toilets(id) ON DELETE CASCADE,
  cleanliness_rating INTEGER NOT NULL CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  water_available BOOLEAN NOT NULL,
  soap_available BOOLEAN NOT NULL,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert 50 demo toilets
INSERT INTO toilets (id, name, location) VALUES
('toilet_1', 'Toilet 1', 'Building A - Ground Floor'),
('toilet_2', 'Toilet 2', 'Building A - First Floor'),
('toilet_3', 'Toilet 3', 'Building A - Second Floor'),
('toilet_4', 'Toilet 4', 'Building B - Ground Floor'),
('toilet_5', 'Toilet 5', 'Building B - First Floor'),
('toilet_6', 'Toilet 6', 'Building B - Second Floor'),
('toilet_7', 'Toilet 7', 'Building C - Ground Floor'),
('toilet_8', 'Toilet 8', 'Building C - First Floor'),
('toilet_9', 'Toilet 9', 'Building C - Second Floor'),
('toilet_10', 'Toilet 10', 'Building D - Ground Floor'),
('toilet_11', 'Toilet 11', 'Building D - First Floor'),
('toilet_12', 'Toilet 12', 'Building D - Second Floor'),
('toilet_13', 'Toilet 13', 'Building E - Ground Floor'),
('toilet_14', 'Toilet 14', 'Building E - First Floor'),
('toilet_15', 'Toilet 15', 'Building E - Second Floor'),
('toilet_16', 'Toilet 16', 'Building F - Ground Floor'),
('toilet_17', 'Toilet 17', 'Building F - First Floor'),
('toilet_18', 'Toilet 18', 'Building F - Second Floor'),
('toilet_19', 'Toilet 19', 'Building G - Ground Floor'),
('toilet_20', 'Toilet 20', 'Building G - First Floor'),
('toilet_21', 'Toilet 21', 'Building G - Second Floor'),
('toilet_22', 'Toilet 22', 'Building H - Ground Floor'),
('toilet_23', 'Toilet 23', 'Building H - First Floor'),
('toilet_24', 'Toilet 24', 'Building H - Second Floor'),
('toilet_25', 'Toilet 25', 'Building I - Ground Floor'),
('toilet_26', 'Toilet 26', 'Building I - First Floor'),
('toilet_27', 'Toilet 27', 'Building I - Second Floor'),
('toilet_28', 'Toilet 28', 'Building J - Ground Floor'),
('toilet_29', 'Toilet 29', 'Building J - First Floor'),
('toilet_30', 'Toilet 30', 'Building J - Second Floor'),
('toilet_31', 'Toilet 31', 'Building K - Ground Floor'),
('toilet_32', 'Toilet 32', 'Building K - First Floor'),
('toilet_33', 'Toilet 33', 'Building K - Second Floor'),
('toilet_34', 'Toilet 34', 'Building L - Ground Floor'),
('toilet_35', 'Toilet 35', 'Building L - First Floor'),
('toilet_36', 'Toilet 36', 'Building L - Second Floor'),
('toilet_37', 'Toilet 37', 'Building M - Ground Floor'),
('toilet_38', 'Toilet 38', 'Building M - First Floor'),
('toilet_39', 'Toilet 39', 'Building M - Second Floor'),
('toilet_40', 'Toilet 40', 'Building N - Ground Floor'),
('toilet_41', 'Toilet 41', 'Building N - First Floor'),
('toilet_42', 'Toilet 42', 'Building N - Second Floor'),
('toilet_43', 'Toilet 43', 'Building O - Ground Floor'),
('toilet_44', 'Toilet 44', 'Building O - First Floor'),
('toilet_45', 'Toilet 45', 'Building O - Second Floor'),
('toilet_46', 'Toilet 46', 'Building P - Ground Floor'),
('toilet_47', 'Toilet 47', 'Building P - First Floor'),
('toilet_48', 'Toilet 48', 'Building P - Second Floor'),
('toilet_49', 'Toilet 49', 'Building Q - Ground Floor'),
('toilet_50', 'Toilet 50', 'Building Q - First Floor');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_feedbacks_toilet_id ON feedbacks(toilet_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_created_at ON feedbacks(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE toilets ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access to toilets" ON toilets FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to feedbacks" ON feedbacks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access to feedbacks" ON feedbacks FOR SELECT USING (true);
