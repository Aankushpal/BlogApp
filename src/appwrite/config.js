import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
import authService from './auth.js'

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredimage, status, userID}) {
        try {
            // ✅ Fetch the current user
            const currentUser = await authService.getCurrentUser();
            if (!currentUser || !currentUser.$id) {
                throw new Error("User not logged in!");
            }
    
            const userID = currentUser.$id; // ✅ Get user ID
    
            console.log("User ID:", userID); // Debugging log to check user ID
            console.log("Featured Image ID:", featuredimage); // Debugging log for image
    
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,    
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage, // ✅ Store featured image properly
                    status,
                    userID,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
    

    async updatePost(slug, {title, content, images, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    images,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            const uploadedFile = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
    
            console.log("Uploaded File:", uploadedFile); // ✅ Debugging Log
            return uploadedFile; // ✅ Return full object, not just `fileId`
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }


    getFilePreview(fileId) {
    if (!fileId) {
        console.warn("⚠️ Warning: fileId is missing in getFilePreview.");
        return "/default-placeholder.png";
    }

    const previewUrl = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/preview?project=${conf.appwriteProjectId}`;

    // console.log("🟢 Generated Image URL:", previewUrl);
    return previewUrl;
}





}


const service = new Service()
export default service;
