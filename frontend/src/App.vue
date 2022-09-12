<template>
  <div id="app">
    <div class="container">
        <h1>Login Page</h1>
        <h3>Full user:</h3>
        <input class="input" v-model="user" type="text">
        <h3>Student ID:</h3>
        <input class="input" v-model="id" type="text">
        <h3>Grade:</h3>
        <input class="input" v-model="grade" type="text">
        <br>
        <button class="button-submit" @click="updateCookies()">Login</button>
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
            grade: ''
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
        updateCookies(){
            document.cookie = 'user='+this.user+';Secure;SameSite=Strict;'
            document.cookie = 'id='+this.id+';Secure;SameSite=Strict;'
            document.cookie = 'grade='+this.grade+';Secure;SameSite=Strict;'
        }
    }
}
</script>

<style>

</style>
