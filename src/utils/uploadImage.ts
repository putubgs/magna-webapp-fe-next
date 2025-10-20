/**
 * Upload an image file to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The storage bucket name (default: 'Magna Images')
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded image or null if failed
 */
export async function uploadImageToSupabase(
  file: File,
  bucket: string = "Magna Images",
  folder?: string
): Promise<string | null> {
  try {
    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);
    if (folder) {
      formData.append("folder", folder);
    }

    // Call the upload API
    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Error uploading image:", error);
      return null;
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    return null;
  }
}
