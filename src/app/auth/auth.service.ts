import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()

export class AuthService{
    constructor(private http: HttpClient){}

    getUser(userData){
        return this.http.post(
            environment.apiUrl + 'users/read_user.php', userData
        );
    }
}
