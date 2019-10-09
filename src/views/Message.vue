<template>
    <div class="message">
        <el-form ref="form" :model="formMain" label-width="80px">
            <el-form-item label="邮箱">
                <el-input v-model="formMain.email"></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="formMain.phone"></el-input>
            </el-form-item>
            <el-form-item label="名字">
                <el-input v-model="formMain.name"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="formMain.content" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
    import {Vue,Component} from "vue-property-decorator";
    interface FormContent{
        email:string,
        phone:string,
        name:string,
        content:string
    }
    @Component
    export default class Message extends Vue{
        formMain:FormContent={
            email:'',
            phone:'',
            name:'',
            content:'',
        }
    }
</script>

<style lang="less" scoped>

</style>
