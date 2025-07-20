const conf ={
  appwriteurl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_Collection_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_Database_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_Bucket_ID),

}

export default conf 