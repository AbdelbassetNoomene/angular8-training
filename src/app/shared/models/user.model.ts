export class User {

    public id: number;
    public name: string;
    public lastname: string;
    public active: boolean;
    public image: string;
    public age: number;



    constructor(id:number, name : string, lastname : string, active:boolean){
        this.active = active;
        this.id = id;
        this.lastname = lastname;
        this.name = name;
    }

}