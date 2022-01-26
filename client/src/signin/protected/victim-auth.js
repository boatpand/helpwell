class victimAuth {
    constructor() {
        this.victim_authenticated = false;
    }

    login(cb){
        this.victim_authenticated =true;
        cb();
    }

    logout(cb){
        this.victim_authenticated =false;
        cb();
    }

    isVictim(){
        return this.victim_authenticated;
    }
}

export default new victimAuth();