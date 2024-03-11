<script setup>
import { ref } from 'vue'
import {getEmployeeByIdService} from '@/api/employee.js'
import {userInfoService,updateUserInfoService} from '@/api/user.js'
import { ElMessage } from 'element-plus';
//用户模型
const userInfo = ref({
    id: 0,
    username: 'zhangsan',
    employeeId: 1,
    role : 'user'
})

//员工模型
const employeeInfo = ref({
    employeeId: 1,
    employeeName: '小张',
    gender:'女',
    department:'UI',
    post:'设计',
    salaryLevel: 5,
    workYear: 2,
    salaryAmount: 666
})

const rules = {
    nickname: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '昵称必须是2-10位的非空字符串',
            trigger: 'blur'
        }
    ],
    email: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
}


//调用函数 获取用户详细信息
const getUserInfo=async()=>{
    //调用接口
  let result=  await userInfoService();
  userInfo.value=result.data;
//   let id=result.data.employeeId;
  let result2 =await getEmployeeByIdService();
  employeeInfo.value=result2.data
}
getUserInfo();

// const getEmployeeById=async()=>{
//     let employeeId=userInfo.employeeId;
//     let result =await getEmployeeByIdService(employeeId);
//     employeeInfo.value=result.data
// }
// getEmployeeById();

const updateUserInfo=async()=>{
   let result= updateUserInfoService(userInfo.value);
   ElMessage.success(result.message?result.message:'修改成功');
    getUserInfo();
}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>账号资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="登录名称">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="员工号" prop="employeeId" >
                        <el-input v-model="userInfo.employeeId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="权限" prop="role">
                        <el-input v-model="userInfo.role" disabled></el-input>
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
                    </el-form-item> -->
                </el-form>
            </el-col>
        </el-row>
    </el-card>
    
</template>