export class Cloudinary {
  constructor() {}
  static cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  static uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  static async uploadImage(file: File): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;

    const formData = new FormData();

    formData.append('file', file);

    if (!this.uploadPreset) {
      throw new Error('Cloudinary upload preset is not defined');
    }
    formData.append('upload_preset', this.uploadPreset);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;
  }

  static async uploadImages(files: File[]): Promise<string[]> {
    console.log('files:', files);
    const promises = files.map((file) => this.uploadImage(file));
    return Promise.all(promises);
  }
}
