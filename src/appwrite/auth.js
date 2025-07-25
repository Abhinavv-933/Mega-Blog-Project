import conf from '../Conf/conf.js';
import { Client, Account, ID} from "appwrite";

export class AuthService{
   client = new Client();
   account;

   constructor(){
      this.client
           .setEndpoint(conf.appwriteurl)
           .setProject(conf.appwriteProjectId); 
      this.account = new Account(this.client);

   }

   async createAccount({ email, password, name }) {
  try {
    // 🔧 Use this.account, not account
    await this.account.create(ID.unique(), email, password, name);
    
    // 🔐 Immediately log in after signup
    return await this.login({ email, password });
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}


async login({ email, password }) {
  try {
    await this.account.createEmailPasswordSession(email, password);
    return await this.getCurrentUser();
  } catch (error) {
    console.log("login error:", error);
    throw error;
  }
}

async getCurrentUser() {
  try {
    return await this.account.get();
  } catch (error) {
    console.log("getCurrentUser error:", error);
    return null;
  }
}


   async logout(){
     try {
         await this.account.deleteSessions();
     }catch (error) {
       console.log("Appwrite service :: logout :: error", error);
       
     }
   }
}

const authService = new AuthService();

export default authService