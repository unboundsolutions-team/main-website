-- Public bucket for blog cover images and inline editor uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read
CREATE POLICY "Public read blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Admin write
CREATE POLICY "Admins upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));