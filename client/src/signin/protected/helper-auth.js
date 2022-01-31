class helperAuth {
    constructor() {
        this.helper_authenticated = false;
    }

    login(cb){
        this.helper_authenticated =true;
        cb();
    }

    logout(cb){
        this.helper_authenticated =false;
        cb();
    }

    isHelper(){
        return this.helper_authenticated;
    }
}

export default new helperAuth(); 