class adminAuth {
    constructor() {
        this.admin_authenticated = false;
    }

    login(cb){
        this.admin_authenticated =true;
        cb();
    }

    logout(cb){
        this.admin_authenticated =false;
        cb();
    }

    isAdmin(){
        return this.admin_authenticated;
    }
}

export default new adminAuth();