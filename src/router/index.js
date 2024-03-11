import { createRouter, createWebHistory } from 'vue-router'

//导入组件
import LoginVue from '@/views/Login.vue';
import LayoutVue from '@/views/Layout.vue';

import UserInfoVue from '@/views/user/UserInfo.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'
import EmployeeInfoVue from '../views/employee/EmployeeInfo.vue';
import AdminBenfitsVue from '../views/admin/BenfitsInfo.vue';
import AdminSalaryVue from '../views/admin/AdminSalary.vue';
import EmployeeSalaryVue from '../views/employee/EmployeeSalaryInfo.vue';
import DepartmentVue from '@/views/admin/Department.vue';
import AdminEmployeeVue from '@/views/admin/AdminEmployee.vue'
//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/',
        component: LayoutVue,
        redirect: '/user/info',
        children: [
            { path: '/user/info', component: UserInfoVue },
            { path: '/employee/salary', component: EmployeeSalaryVue },
            { path: '/employee/info', component: EmployeeInfoVue },
            { path: '/admin/benfits', component: AdminBenfitsVue },
            { path: '/admin/department', component: DepartmentVue },
            { path: '/admin/salary', component: AdminSalaryVue },
            { path: '/admin/employee', component: AdminEmployeeVue },
            { path: '/user/resetPassword', component: UserResetPasswordVue },




        ]

    },
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router