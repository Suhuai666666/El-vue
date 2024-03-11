<script setup>
import { ref } from 'vue'
import { updateUserPasswordService } from '@/api/user.js'
//用户名  输入旧密码  输入新密码  确认新密码
const userInfo = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
})
//校验密码
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入确认密码'))
    } else if (value !== userInfo.value.new_pwd) {
        callback(new Error('请确保两次输入的密码一致'));

    } else {
        callback()
    }
}

//定义表单校验规则
const rules = {
    old_pwd: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
        { min: 5, max: 16, message: '密码长度必须为5~16位', trigger: 'blur' }
    ],
    new_pwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 5, max: 16, message: '密码长度必须为5~16位', trigger: 'blur' }
    ],
    re_pwd: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const router =useRouter();
const updateUserPassword = () => {
    let result = updateUserPasswordService(userInfo.value);
    ElMessage.success(result.message ? result.message : '修改成功');
    router.push('/login')
    ElMessage({
        type: 'success',
        message: '请重新登录',
    })

}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>修改密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item prop="old_pwd" label="旧密码:">
                        <el-input :prefix-icon="Lock" type="password" placeholder="请输入旧密码"
                            v-model="userInfo.old_pwd"></el-input>
                    </el-form-item>
                    <el-form-item prop="newPassword" label="新密码:">
                        <el-input :prefix-icon="Lock" type="password" placeholder="请输入新密码"
                            v-model="userInfo.new_pwd"></el-input>
                    </el-form-item>
                    <el-form-item prop="reNewPassword" label="确认密码:">
                        <el-input :prefix-icon="Lock" type="password" placeholder="请输入确认密码"
                            v-model="userInfo.re_pwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUserPassword">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>