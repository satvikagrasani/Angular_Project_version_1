import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class AuthService{
    constructor(){}

    loggedIn(){
        return !!localStorage.getItem('ID');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('ID');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('address');
        localStorage.removeItem('dob');
        localStorage.removeItem('email');
        localStorage.removeItem('contactNo');
    }
}