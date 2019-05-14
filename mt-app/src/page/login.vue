<template>

     <div class="page-login">
         <div class="login-header">
             <router-link class="logo" :to="{name: 'index'}"></router-link>
         </div>
         <div class="login-panel">
             <div class="banner">
                 <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480" height="370" alt="美团网">
             </div>
             <div class="form">
                 <h4 v-if="error" class="tips">{{error}}</h4>
                 <p>
                    <span>账号登录</span>
                 </p>
                 <el-input :class="{error: error && !userName}" v-model="userName" prefix-icon="profile" placeholder=" 手机号/用户名/邮箱"></el-input>
                 <el-input :class="{error: error && !password}" v-model="password" type="password" prefix-icon="password"  placeholder=" 密码"></el-input>
                 <div class="foot">
                    <a href="#">忘记密码?</a>
                </div>
                <el-button type="primary" class="btn-login" @click="submit">登录</el-button>
                <p class="reg">
                    <span>还没有账号？</span>
                    <span>
                        <router-link :to="{name: 'register'}">免费注册</router-link>
                    </span>
                </p>
             </div>
         </div>
         <footer>
            <ul>
                <li v-for="(item, index) in footer_aList" :key="index">
                    <a href="#">{{item}}</a>
                </li>
            </ul>
            <p>©2019 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号</p>
         </footer>
     </div>

</template>

<script>
import api from '@/api/index.js'
export default {
    data () {
        return {
            userName: '',
            password: '',
            error: '',
            footer_aList: [
                '关于美团',
                '加入我们',
                '商家入驻',
                '帮助中心',
                '美团手机版'
            ]
        }
    },
    methods: {
        submit () {
            if(!this.userName){
                this.error = "请输入账号"
                return false;
            }else if(!this.password){
                this.error = "请输入密码"
                return false;
            }
            api.getLogin({userName: this.userName, password: this.password}).then(res => {
                if(res.data.status=="success"){
                    this.$router.push({name: 'index'});
                    this.$store.commit('setUserName', this.userName);
                }else{
                    this.error = res.data.msg;
                }
            })
        }
    }
}
</script>

<style lang="scss">
    @import "@/assets/css/login/index.scss"
</style>