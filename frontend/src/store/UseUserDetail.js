import { defineStore } from "pinia";

export const useUserDetail = defineStore('userDetail',()=>{
    const user = {
        Customer_Fname: '',
        Customer_Lname: '',
        Customer_isOwner: '',
        Customer_isDelivery: '',
        Customer_Phone: ''
        
    }

    return {user}
})