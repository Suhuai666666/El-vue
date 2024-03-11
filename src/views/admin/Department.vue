<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import {getDepartmentsService,deleteDepartmentService,addDepartmentService,updateDepartmentService} from '@/api/admin.js'
import { ElMessage } from 'element-plus';

const departmentInfo = ref({
    departmentName: '',
    jobTitleName: '',
    jobTitleSalary: 1000
})
const departmentAll = ref([
  {
    'departmentName': '研发部',
    'jobTitleName': '后端',
    'jobTitleSalary': 2000
  },
  {
    'departmentName': '研发部',
    'jobTitleName': '前端',
    'jobTitleSalary': 1500
  }
])

const getDepartments=async()=>{
    let result=await getDepartmentsService();
    departmentAll.value=result.data;
}
getDepartments();

const deleteDepartment=async(row)=>{
    let result=await deleteDepartmentService(row.departmentName,row.jobTitleName)
    console.log(row.departmentName,row.jobTitleName);
    ElMessage.success('已删除');  
    location.reload();
}

const addDepartment=async()=>{
    let result=await addDepartmentService(departmentInfo.value);
}

const onSubmit = () => {
    addDepartment();
    ElMessage.success('添加成功');  
    location.reload();
}
//控制添加分类弹窗
const dialogVisible = ref(false)
//定义变量 控制弹窗标题的展示
const title=ref('')
const showEdit=(row)=>{
    dialogVisible.value=true;
    title.value='编辑部门';
    const department=departmentInfo.value
    departmentInfo.value.departmentName=row.departmentName;
    departmentInfo.value.jobTitleName=row.jobTitleName;
    departmentInfo.value.jobTitleSalary=row.jobTitleSalary;
}

const updateDepartment=async()=>{
  let result=await updateDepartmentService(departmentInfo.value);
  console.log(departmentInfo.value);
  ElMessage.success('修改成功');  
  location.reload();
//   location.reload();
}


</script>


<template>
    <el-card class="page-container">
        <el-form :model="form" label-width="auto" style="max-width: 200px">
            <el-form-item label="部门名称">
                <el-input v-model="departmentInfo.departmentName" />
            </el-form-item>
            <el-form-item label="岗位名称">
                <el-input v-model="departmentInfo.jobTitleName" />
            </el-form-item>
            <el-form-item label="岗位工资">
                <el-input v-model="departmentInfo.jobTitleSalary" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">创建</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card class="page-container">
        <el-table :data="departmentAll" style="width: 100%" >
            <el-table-column prop="departmentName" label="部门名称"  />
            <el-table-column prop="jobTitleName" label="岗位名称"  />
            <el-table-column prop="jobTitleSalary" label="岗位工资"  />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="{ row }">
                    <el-button link type="primary" size="small" @click="deleteDepartment(row)">删除</el-button>
        
                    <el-button link type="primary" size="small" @click="showEdit(row)">编辑</el-button>
                </template>
            </el-table-column>

            
        </el-table>
    </el-card>


     <!-- 添加弹窗 -->
     <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="departmentInfo"  label-width="100px" style="padding-right: 30px">
                <el-form-item label="部门名称" prop="departmentName">
                    <el-input v-model="departmentInfo.departmentName" minlength="1" maxlength="10" disabled></el-input>
                </el-form-item>
                <el-form-item label="岗位名称" prop="jobTitleName">
                    <el-input v-model="departmentInfo.jobTitleName" minlength="1" maxlength="15" disabled></el-input>
                </el-form-item>
                <el-form-item label="岗位工资" prop="jobTitleSalary">
                    <el-input v-model="departmentInfo.jobTitleSalary" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="updateDepartment() ;dialogVisible = false;"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>
</template>