<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
const isDisabled =ref(false)
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
//定义数据模型
const registerData = ref({
    username:'',
    employeeId:'',
    password:'',
    rePassword:''
})



//校验密码
const checkRePassword=(rule,value,callback)=>{
    if(value===''){
        callback(new Error('请输入确认密码'))
        isDisabled.value=true
    }else if(value!==registerData.value.password){
        callback(new Error('请确保两次输入的密码一致'));
        isDisabled.value=true
    }else{
        callback()
        isDisabled.value=false
    }
}

//定义表单校验规则
const rules={
    username:[
        {required:true,message:'请输入用户名',trigger:'blur'},
        {min:5,max:16,message:'用户名长度必须为5~16位',trigger:'blur'}
    ],
    password:[
    {required:true,message:'请输入密码',trigger:'blur'},
        {min:5,max:16,message:'密码长度必须为5~16位',trigger:'blur'}
    ],
    rePassword:[
        {validator:checkRePassword,trigger:'blur'}
    ],
    employeeId:[
    {required:true,message:'请绑定员工号',trigger:'blur'},
        {min:5,max:16,message:'员工号为5位数字：例如10010',trigger:'blur'}
    ]
}
import {userRegisterService,userLoginService} from '@/api/user.js'

//调用后台接口完成注册
const register =async()=>{
    console.log(registerData.value.employeeId);
    console.log(registerData.value.username);
    let result=await userRegisterService(registerData.value);
    
    // if(result.code===0){
    //     //成功
    //     alert(result.msg ? result.msg:'注册成功');
    // }else{
    //     //失败
    //     alert('注册失败')
    // }
    // alert(result.message?result.message:'注册成功');
    ElMessage.success('注册成功');
}
//表单数据校验
//登录函数
import { useTokenStore } from '../stores/token';
const tokenStore=useTokenStore();
const router=useRouter()
const login=async()=>{
    let result=await userLoginService(registerData.value);

    // if(result.code===0){
    //     alert(result.msg?result.msg:'登陆成功')
    // }else{
    //     alert('登录失败')
    // }
    // alert(result.message?result.message:'登录成功');
    ElMessage.success(result.message?result.message:'登录成功');
    //把得到的token存储的pinia
    tokenStore.setToken(result.data)
    //跳转到首页 路由完成
    router.push('/')
}

const clearData=()=>{
    registerData.value={
        username:'',
        password:'',
        rePassword:''
    }
}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="employeeId">
                    <el-input :prefix-icon="User" placeholder="请绑定员工号" v-model="registerData.employeeId"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space :disabled="isDisabled"  @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;clearData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true;clearData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>