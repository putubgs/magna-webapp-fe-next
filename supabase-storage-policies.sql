-- Supabase Storage Policies for "Magna Images" bucket
-- Run this in your Supabase SQL Editor

-- Allow authenticated users to upload images (INSERT)
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'Magna Images');

-- Allow public to read/view images (SELECT)
CREATE POLICY "Allow public to read images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'Magna Images');

-- Allow authenticated users to update images (UPDATE)
CREATE POLICY "Allow authenticated users to update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'Magna Images');

-- Allow authenticated users to delete images (DELETE)
CREATE POLICY "Allow authenticated users to delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'Magna Images');

-- If you want to make the bucket public (easier for viewing)
UPDATE storage.buckets
SET public = true
WHERE id = 'Magna Images';

