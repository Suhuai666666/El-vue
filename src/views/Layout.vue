<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { userInfoService } from '../api/user';
import useUserInfoStore from '@/stores/userinfo.js'
const userInfoStore=useUserInfoStore();
//调用函数 获取用户详细信息
const getUserInfo=async()=>{
    //调用接口
  let result=  await userInfoService();
  //数据存到pinia
  userInfoStore.setInfo(result.data);
}
getUserInfo();
import { useRouter } from 'vue-router';
import { ElMessageBox ,ElMessage} from 'element-plus';
import { useTokenStore } from '../stores/token';
const tokenStore=useTokenStore();
const router =useRouter();
//条目被点击后
const handlecommand= (command)=>{
    //判断指令
    if(command==='logout'){
        ElMessageBox.confirm(
        '你确认要退出登录吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async() => {
            //退出登录
            //清空pinia存储的token
            // tokenStore.removeToken();
            // userInfoStore.removeToken();
            //跳转到登录页面
           router.push('/login')
            ElMessage({             
                type: 'success',
                message: '退出成功',
            })

             tokenStore.removeToken();
            userInfoStore.removeInfo();
        
        })
        .catch(() => {
            //用户点击了取消
            // if(userInfoStore!=null){
            ElMessage({
                type: 'info',
                message: '取消退出',
            })
        
        })

    }else{
        //路由
        router.push('/user/'+command)   }
}
</script>

<template>
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"
                router>
                <el-menu-item index="/admin/department"  v-show="userInfoStore.info.role=='admin'">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>部门管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/benfits"  v-show="userInfoStore.info.role=='admin'">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>福利管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/employee"  v-show="userInfoStore.info.role=='admin'">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>员工管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/salary"  v-show="userInfoStore.info.role=='admin'">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>工资管理</span>
                </el-menu-item>
                <el-sub-menu >
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>账号资料</span>
                    </el-menu-item>
                    <el-menu-item index="/employee/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>员工资料</span>
                    </el-menu-item>
                    <el-menu-item index="/employee/salary">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>工资明细</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <div>欢迎使用员工工资管理系统</div>
                <el-dropdown placement="bottom-end" @command="handlecommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.userPic?userInfoStore.info.userPic:avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中间区域 -->
            <el-main>
                <!-- <div style="width: 1290px; height: 570px;border: 1px solid red;">
                    内容展示区
                </div> -->
                <router-view></router-view>
            </el-main>
            <!-- 底部区域 -->
            <el-footer>421123011115 刘骥宇 21软工三班</el-footer>
        </el-container>
    </el-container>
</template>




<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>