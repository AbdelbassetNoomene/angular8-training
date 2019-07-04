export class UserInfo {

    public id: number;
    public firstname: string;
    public lastname: string;
    public phone: string;
    public image: string;
    public email: string;
    public roles: string[];

    constructor(id:number, firstname : string, lastname : string, phone:string, image : string, email : string){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.image = image;
        this.email = email;
    }

}