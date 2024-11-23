//tam thoi call api phia client, nhung se bi lo trong inspect/network => not secured
const uploadToCloudinary = async (file: File) => {

    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
    const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || ''
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', upload_preset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            return data.secure_url
        } else {
            console.error('Upload failed');
            return
        }
    } catch (error) {
        console.error('Error during upload:', error);
        return
    }
}

export default uploadToCloudinary