<template>
    <div id="app">
        <div class="container">
            <h1>{{title}}</h1>
            <div style="margin-bottom: 10px;" id="form" v-if="page=='login-page'">
                <h3>Name (First and Last):</h3>
                <input class="text-input" v-model="user" type="text">
                <h3>Student ID:</h3>
                <input class="text-input" v-model="id" type="text">
                <h3>Grade:</h3>
                <input class="text-input" v-model="grade" type="text">
            </div>
            <div id="logged-in-page" v-if="page=='logged-in-page'">
                <h3 style="margin-bottom: 20px;">You logged in successfully!<br> Please log out when you leave!</h3>
            </div>
            <button @click="userLogin()" v-if="page=='login-page'">Log in</button>
            <button @click="userLogout()" v-if="page=='logged-in-page'">Log out</button>
        </div>
    </div>
</template>

<script>
export default {
    user: 'app',
    data() {
        return {
            user: '',
            id: '',
            grade: '',
            page: 'login-page',
            title: 'Log in',
        }
    },

    created() {
        if (document.cookie == "") return
        var cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
        this.$data.user = cookies['user']
        this.$data.id = cookies['id']
        this.$data.grade = cookies['grade']
    },

    methods: {
        serverLogin(user, id, grade){
            let response
            const reqOpt = {
                method: "POST",
                headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:8080"}
            }
            fetch("http://127.0.0.1:8080/entry/?name=" + user + "&id=" + id + "&grade=" + grade, reqOpt)
                .then(async response => response.json())
                .then(json =>{
                    response = json.data
                })
        
            return(response)
        },

        serverLogout(user, id, grade){
            let response
            const reqOpt = {
                method: "POST",
                headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:8080"}
            }
            fetch("https:///127.0.0.1:8080/exit/?name=" + user + "&id=" + id + "&grade=" + grade, reqOpt)
                .then(async response => response.json())
                .then(json =>{
                    response = json.data
            })
        
            return(response)
        },

        userLogin() {
            this.$data.page = 'logged-in-page'
            this.updateCookies()
            this.$data.title = 'Welcome, ' + this.user + '!';
        },

        userLogout() {
            this.$data.page = 'login-page'
            this.$data.title = "Log in";
            this.updateCookies()
            this.$data.user = ''
            this.$data.id = ''
            this.$data.grade = ''
        },

        updateCookies() {
            document.cookie = 'user=' + this.user + ';Secure;SameSite=Strict;'
            document.cookie = 'id=' + this.id + ';Secure;SameSite=Strict;'
            document.cookie = 'grade=' + this.grade + ';Secure;SameSite=Strict;'
        }
    }
}
</script>

<style>

</style>