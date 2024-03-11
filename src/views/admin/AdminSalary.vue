<script setup>
import { getAllSalaryService, countService } from '@/api/admin'
import { ref } from 'vue';
import { addBenfitsService, BenfitsListService, DeleteBenfitService,sumService,sumEmployee } from '@/api/admin.js'
import { ElMessage } from 'element-plus';

const sumSalry =ref([
    {
        data:''
    }
])

const sumEmployeeNum =ref([
    {
        data:''
    }
])

const getEmployeeNumber =async()=>{
    sumEmployeeNum.value=await sumEmployee();
}
getEmployeeNumber();
const getSumSalary=async()=>{
    sumSalry.value=await sumService();
}
getSumSalary();
const tableData = ref([
    {
        'employeeName': '李华',
        'baseSalary': 3000,
        'jobTitleSalary': 100,
        'salaryLevelSalary': 200,
        'experienceSalary': 300,
        'benefitsSalary': 400,
        'netSalary': 4000
    }
])

const getAllSalary = async () => {
    let result = await getAllSalaryService();
    console.log(result.data);
    tableData.value = result.data
}
getAllSalary();

const handleClick = () => {
    countService();
    ElMessage.success('工资已更新');
    location.reload();

}

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>工资明细</span>
            </div>
            <br/>

            <el-row>
                <el-col :span="6">
                    <el-statistic title="员工总数" :value="sumEmployeeNum.data" />
                </el-col>

                <el-col :span="6">
                    <el-statistic title="工资总额" :value=sumSalry.data />
                </el-col>
            
            </el-row>
          <el-button type="success" @click="handleClick()">计算当月工资</el-button>
            <br/>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="employeeName" label="员工姓名" />
                <el-table-column prop="baseSalary" label="基础工资" />
                <el-table-column prop="jobTitleSalary" label="岗位工资" />
                <el-table-column prop="salaryLevelSalary" label="工资等级工资" />
                <el-table-column prop="experienceSalary" label="工龄工资" />
                <el-table-column prop="benefitsSalary" label="福利" />
                <el-table-column prop="netSalary" label="工资总额" />
            </el-table>

        </template>


    </el-card>
</template>