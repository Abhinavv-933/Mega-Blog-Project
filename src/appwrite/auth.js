import conf from '../Conf'
import { Client, Account } from "appwrite";
// this code snippet can be used in any project where we have to make it with appwrite

export class AuthService{
   client = new Client();
   account;

   constructor(){
      this.client
           .setEndpoint(conf.appwriteurl)
           .setProject(conf.appwriteProjectId);
      this.account = new Account(this.client);

   }

   async createAccount({email,password, name}){
    try {
       const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                    // call another method
                    return this.login({email, password}); 
            }
            else{
              return userAccount;
            }

    } catch (error) {
      throw error;
    }
   }

   async login({email, password}){
      try {
         await this.account.createEmailPasswordSession(email, password);
      } catch (error) {
        
      }
   }

   async getCurrentUser(){
      try {
          await this.account.get();
      } catch (error) {
         console.log("Appwrite service :: getCurrentUser :: error", error);   
      }
      return null;
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