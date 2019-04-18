import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

import {map} from 'rxjs/operators';
import {Post} from './models/post.model';
// import {catchError} from 'rxjs/operators';
// import {throwError} from 'rxjs';



@Injectable()

export class DataService{
    categories: {catId : string, catName: string}[] = [];
    posts: Post[] = [];


    constructor(private http: HttpClient){}

//getting categories from server
    getCategories(){
        return this.http.get<any>(
            environment.apiUrl + 'categories/read.php'
        ).pipe(
            map((response)=> {
                if(response.data){
                return response.data.map((res)=>{
                return {'catId': res.cat_id,'catName': res.cat_title}
            })} else{
                return [];
            }
        })
        )
    }

//getting posts from server
    getPosts(){
        return this.http.get<any>(
            environment.apiUrl + 'posts/read.php'
        ).pipe(
            map((response)=>{
                if(response.data){
                return response.data.map(
                (res)=>{return {
                    'id': res.id,
                    'postCatId': res.cat_id,
                    'postCatName': res.cat_name,
                    'postImage': res.image,
                    'postAuthor': res.author,
                    'postContent': res.content,
                    'postDate': res.date,
                    'postTags': res.tags,
                    'postStatus': res.status,
                    'postCommentCount': res.comment_count,
                    'postTitle': res.title
                }}
            )}else{
                return [];
            }
        }
            )
        )
    }

//deleting category from server
    deleteCategory(catId: number){
        return this.http.delete(
            environment.apiUrl + `categories/delete_category.php?p_id=`+catId
        )
    }

//adding category to te server
    addCategory(categoryName: string){
        return this.http.post(
            environment.apiUrl + 'categories/create_category.php', categoryName
        )
    }

//updating category to the server
    editCategory(categoryName: string, catId: number){
        return this.http.put(
            environment.apiUrl + 'categories/update_category.php?p_id=' + catId, categoryName
        );

    }

//adding post to the server
    addPost(data, image:File){
        let formData =  new FormData();
        formData.append('image',image,image.name);
        formData.append('content',JSON.stringify(data));
        return this.http.post(
            environment.apiUrl + 'posts/create_post.php', formData
        )
    }

    deletePost(id: number){
        return this.http.delete(
            environment.apiUrl + 'posts/delete_post.php?p_id='+id
        )
    }

    updatePost(id:number, data, image?: File){
        let formData =  new FormData();
        if(image){
        formData.append('image',image,image.name);
        }
        formData.append('content',JSON.stringify(data));
        return this.http.post(
            environment.apiUrl + 'posts/update_post.php?p_id='+ id,formData
        )
    }

    readSinglePost(id: number){
        return this.http.get<{id:number,cat_name:string,cat_id:number,title:string,author:string,date:any,image:string,content:string,tags:string,status:string,comment_count:number}>(
            environment.apiUrl + 'posts/read_single.php?p_id='+id
        ).pipe(map((res)=>{return {'id':res.id,'catName':res.cat_name,'catId':res.cat_id,'title':res.title,'author':res.author,'date':res.date,'image':res.image,'content':res.content,'tags':res.tags,'status':res.status,'commentCount':res.comment_count}}))
    }

    //for users
    getUsers(){
        return this.http.get<any>(
            environment.apiUrl + 'users/read_all_users.php'
        ).pipe(
            map(
                (data)=>{return data.data}
            )
            )
    }

    createUser(data,img: File){
        var content = {'email':data.credentials.email,'password':data.credentials.password,'username':data.userDetails.username,'firstname':data.userDetails.firstname,'lastname':data.userDetails.lastname};
        var formData = new FormData();
        formData.append('image',img);
        formData.append('content',JSON.stringify(content));
        return this.http.post(
            environment.apiUrl + 'users/create_user.php', formData
        )
    }

    deleteUser(id: number){
      return this.http.delete(
        environment.apiUrl + 'users/delete_user.php?p_id=' + id
      )
    }

    updateUserRole(id: number,data: string){
        return this.http.put(
            environment.apiUrl + 'users/update_role_user.php?p_id='+id,JSON.stringify({'role':data})
        )
    }


}
