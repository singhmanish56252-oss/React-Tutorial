import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        if (conf.appwriteUrl && conf.appwriteProjectId) {
            this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        }
        this.account = new Account(this.client);
    }

    async createAccount(emailOrData, password, name) {
        try {
            let emailVal = emailOrData;
            let passVal = password;
            let nameVal = name;

            if (typeof emailOrData === 'object' && emailOrData !== null) {
                emailVal = emailOrData.email;
                passVal = emailOrData.password;
                nameVal = emailOrData.name;
            }

            const userAccount = await this.account.create(ID.unique(), emailVal, passVal, nameVal);
            if (userAccount) {
                return await this.login(emailVal, passVal);
            }
            return userAccount;
        } catch (error) {
            console.error("Appwrite service :: createAccount error", error);
            throw error;
        }
    }

    async login(emailOrData, password) {
        try {
            let emailVal = emailOrData;
            let passVal = password;

            if (typeof emailOrData === 'object' && emailOrData !== null) {
                emailVal = emailOrData.email;
                passVal = emailOrData.password;
            }

            return await this.account.createEmailPasswordSession(emailVal, passVal);
        } catch (error) {
            console.error("Appwrite service :: login error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // Error 401: Unauthorized (no session) is normal when not logged in
            if (error?.code !== 401) {
                console.log("Appwrite service :: getCurrentUser", error?.message || error);
            }
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession("current");
        } catch (error) {
            console.error("Appwrite service :: logout error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
