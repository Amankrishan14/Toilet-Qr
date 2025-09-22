-- Supabase Storage Setup for Toilet Feedback System
-- Run this in your Supabase SQL Editor after setting up the main schema

-- Create storage bucket for feedback media
INSERT INTO storage.buckets (id, name, public) VALUES 
('feedback-media', 'feedback-media', true);

-- Create storage policies for feedback media
CREATE POLICY "Allow public uploads to feedback media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'feedback-media');

CREATE POLICY "Allow public access to feedback media" ON storage.objects
  FOR SELECT USING (bucket_id = 'feedback-media');

-- Optional: Create policy for admin deletion (if needed)
CREATE POLICY "Allow admin deletion of feedback media" ON storage.objects
  FOR DELETE USING (bucket_id = 'feedback-media' AND auth.role() = 'service_role');
