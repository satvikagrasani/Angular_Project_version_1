import {CanActivate,Route,Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({providedIn:'root'})

export class AuthGuard{
    constructor(private router:Router,private authService:AuthService){}
    
    canActivate():boolean{
        if(this.authService.loggedIn()){
            return true;
        }else{
            return false;
        }
    }
}