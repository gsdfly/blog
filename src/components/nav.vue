<template>
    <div class="nav">
        <el-row :gutter="26">
            <el-col :span="3">
                <img src="./../assets/logo.png" alt="" class="logo">
            </el-col>
            <el-col :span="16">
                <el-menu :router="true"
                         :default-active="activeIndex"
                         active-text-color="#409eff"
                         class="el-menu-demo"
                         mode="horizontal"
                         @select="handleSelect">
                    <el-menuItem :route="l.path"
                                 :index="l.index"
                                 v-for="l in list"
                                 :key="l.index">
                        {{l.name}}
                    </el-menuItem>
                </el-menu>
            </el-col>
            <el-col :span="5">
                <el-button type="primary" @click="loginDialogVisible=true">登录</el-button>
                <el-button type="primary" @click="registerDialogVisible=true">注册</el-button>
            </el-col>
        </el-row>
        <el-dialog
                title="注册用户"
                :visible.sync="registerDialogVisible"
                :close-on-click-modal="false"
                width="30%">
            <el-form ref="form" :model="registerForm" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="registerForm.nickname" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="registerForm.name" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="registerForm.phone" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="registerForm.pwd" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="registerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="registerSubmit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="登录"
                :visible.sync="loginDialogVisible"
                :close-on-click-modal="false"
                width="30%">
            <el-form ref="form" :model="loginForm" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="loginForm.nickname" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="loginForm.pwd" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loginDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="loginSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import instance from './../utils/api'
    @Component
    export default class Nav extends Vue {
        loginDialogVisible=false;
        registerDialogVisible=false;
        registerForm={}
        loginForm={}
        list: Array<object> = [
            {
                index: "1",
                path: "/",
                name: "首页"
            },
            {
                index: "2",
                path: "/articles",
                name: "文章"
            },
            {
                index: "3",
                path: "/archive",
                name: "归档"
            },
            {
                index: "4",
                path: "/project",
                name: "项目"
            },
            {
                index: "5",
                path: "/timeline",
                name: "历程"
            },
            {
                index: "6",
                path: "/message",
                name: "留言"
            },
            {
                index: "7",
                path: "/about",
                name: "关于"
            }
        ];
        @Prop({
            type:String,
            default:'1'
        }) activeIndex!:string;
        handleSelect(){

        }
        registerSubmit(){
            instance.post('/register',this.registerForm).then((res)=>{
                console.log(res);
            })
        }
        loginSubmit(){
            instance.post('/login',this.loginForm).then((res)=>{
                console.log(res);
                if(res.data){
                    localStorage.setItem('token',res.data.token)
                }
            })
        }
    }
</script>

<style lang="less" scoped>
    .logo{
        width: 60px;
    }
</style>
