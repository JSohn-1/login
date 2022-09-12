<template>
  <div id="app">
    <div class="container">
        <h1>{{title}} Page</h1>
        <div id="form" v-if="state=='view-idle'">
            <h3>Full user:</h3>
            <input class="input" v-model="user" type="text">
            <h3>Student ID:</h3>
            <input class="input" v-model="id" type="text">
            <h3>Grade:</h3>
            <input class="input" v-model="grade" type="text">
        </div>
        <div id="login-success-page" v-if="state=='login-success'">
            <h2>Success!</h2>
            <h3>You logged in successfully!<br> Press the logout botton below when you are ready to leave.</h3>
        </div>
        <button class="button-submit" @click="updateCookies(state), formToggle('login-success')">{{title}}</button>
    </div>
  </div>
</template>

<script>
export default {
    user: 'app',
    data () {
        return {
            user: '',
            id: '',
            grade: '',
            state: 'view-idle',
            title: 'Login'
        }
    },

    created() {
        if (document.cookie == "") return
        var cookies = document.cookie
                .split(';')
                .map(cookie => cookie.split('='))
                .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value)}), {});
        for (const key of Object.keys(cookies)) {
            if (key == 'user'){
                this.$data.user = cookies[key]
            }
            else if (key == 'id'){
                this.$data.id = cookies[key]
            }
            else if (key == 'grade'){
                this.$data.grade = cookies[key]
            }
        }
    },

    methods: {
        /*
        login(user, id, grade){
            let response
            const reqOpt = {
                method: "POST",
                headers: {"Access-Control-Allow-Origin": "https://login.jsohn.net"}
            }
            fetch("https://login.jsohn.net/entry/?name=" + user + "&id=" + id + "&grade=" + grade, reqOpt)
                .then(async response => response.json())
                .then(json =>{
                    response = json.data
            })
        
            return(response)
        },

        logout(user, id, grade){
            let response
            const reqOpt = {
                method: "POST",
                headers: {"Access-Control-Allow-Origin": "https://login.jsohn.net"}
            }
            fetch("https://login.jsohn.net/exit/?name=" + user + "&id=" + id + "&grade=" + grade, reqOpt)
                .then(async response => response.json())
                .then(json =>{
                    response = json.data
            })
        
            return(response)
        },
        */

        /* State meaning:
        view-idle = nothing is happening, default page (currently just the login view)
        login-success = login is completed, showing success popup/page/whatever
        logout-success = logout is completed, showing success popup/page/whatever
        */
        formToggle(state){
            this.$data.state = state
            if (state == 'login-success')
                {}
            else if (state == 'logout') 
                {this.$data.title = 'Logout'}
            else 
                {this.$data.state = 'error'}
        },

        updateCookies(){
            if (this.$data.state != 'login-idle') return
            document.cookie = 'user='+this.user+';Secure;SameSite=Strict;'
            document.cookie = 'id='+this.id+';Secure;SameSite=Strict;'
            document.cookie = 'grade='+this.grade+';Secure;SameSite=Strict;'
        }
    }
}
</script>

<style>

</style>
