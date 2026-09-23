import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        if (conf.appwriteUrl && conf.appwriteProjectId) {
            this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        }

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Helper to sanitize slug into an Appwrite-compatible document ID (<= 36 chars)
    getSafeDocId(slug) {
        if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
            return ID.unique();
        }
        const cleaned = slug
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9_-]/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 36)
            .replace(/^-+|-+$/g, '');

        return cleaned.length > 0 ? cleaned : ID.unique();
    }

    async createPost({ title, content, slug, featuredImage, status, userId }) {
        try {
            const documentId = this.getSafeDocId(slug);
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    slug: documentId,
                    featuredImage: featuredImage || "",
                    status: status || "active",
                    userId
                }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost error", error);
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getPost error", error);
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Appwrite service :: getPosts error", error);
            return null;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite service :: uploadFile error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        if (!fileId) return true;
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deleteFile error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        if (!fileId || typeof fileId !== 'string') {
            return "";
        }
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.error("Appwrite service :: getFilePreview error", error);
            return "";
        }
    }
}

const service = new Service();
export default service;
