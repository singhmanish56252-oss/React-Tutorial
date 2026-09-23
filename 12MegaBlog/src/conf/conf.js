const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL || ''),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || ''),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || ''),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID || ''),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || ''),
    tinymceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY || ''),
};

// Helpful developer warning if any Appwrite configuration is missing
if (import.meta.env.DEV) {
    const requiredKeys = [
        'appwriteUrl',
        'appwriteProjectId',
        'appwriteDatabaseId',
        'appwriteCollectionId',
        'appwriteBucketId',
    ];
    const missing = requiredKeys.filter((key) => !conf[key]);
    if (missing.length > 0) {
        console.warn(
            `[MegaBlog] Missing configuration for: ${missing.join(', ')}. Please verify your root .env file.`
        );
    }
}

export default conf;