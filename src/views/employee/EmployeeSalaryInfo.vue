<!-- <script setup>
import { ref } from 'vue';
import { getSalaryByIdService } from '@/api/employee'

const salaryInfo = ref([
  {
    'employeeId': 10001,
    'employeeName': '黎明',
    'baseSalary': 3000,
    'jobTitleSalary': 100,
    'salaryLevelSalary': 200,
    'experienceSalary': 300,
    'benefitsSalary': 400,
    'netSalary': 4000  }]);

    const getSalaryById = async () => {
    let result = await getSalaryByIdService();
    const data = result.data; // 获取服务端返回的数据
    console.log(data.value);
    salaryInfo.value.employeeId = data.employeeId;
    salaryInfo.value.employeeName = data.employeeName;
    salaryInfo.value.baseSalary = data.baseSalary;
    salaryInfo.value.jobTitleSalary = data.jobTitleSalary;
    salaryInfo.value.salaryLevelSalary = data.salaryLevelSalary;
    salaryInfo.value.experienceSalary = data.experienceSalary;
    salaryInfo.value.benefitsSalary = data.benefitsSalary;
    salaryInfo.value.netSalary = data.netSalary;
    console.log(salaryInfo.value);
};

getSalaryById();

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>工资明细</span>
      </div>
      <el-table :data="salaryInfo" style="width: 100%">
        <el-table-column prop="employeeName" label="姓名" />
        <el-table-column prop="baseSalary" label="基础工资" />
        <el-table-column prop="jobTitleSalary" label="岗位工资" />
        <el-table-column prop="salaryLevelSalary" label="工资等级工资" />
        <el-table-column prop="experienceSalary" label="工龄工资" />
        <el-table-column prop="benefitsSalary" label="福利" />
        <el-table-column prop="netSalary" label="工资总额" />
      </el-table>
    </template>

  </el-card>
</template> -->
<script setup>
import {getAllSalaryService,countService} from '@/api/admin'
import { ref } from 'vue';
import { addBenfitsService ,BenfitsListService,DeleteBenfitService} from '@/api/admin.js'
import { ElMessage } from 'element-plus';
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

const getAllSalary=async()=>{
    let result=await getAllSalaryService();
    console.log(result.data);
    tableData.value=result.data
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
        <!-- <el-button type="success"  @click="handleClick()" >计算当月工资</el-button> -->

    </el-card>
</template>