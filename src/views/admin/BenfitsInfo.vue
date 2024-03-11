<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { addBenfitsService ,BenfitsListService,DeleteBenfitService} from '@/api/admin.js'
import { ElMessage } from 'element-plus';

const benefitInfo = ref({
    benefitName: '',
    benefitValue: ''
})
const benefitAll = ref([
  {
    "benefitName": '',
    "benefitValue": 0
  },
  {
    "benefitName": '',
    "benefitValue": 0
  }
])

const addBenfits = async () => {
    let result = await addBenfitsService(benefitInfo.value);
    benefitList();
    
}




const benefitList=async()=>{
    let result=await  BenfitsListService();
    benefitAll.value=result.data;
    console.log(result.data);
}
benefitList();

const onSubmit = () => {
    addBenfits();
    ElMessage.success('添加成功');  
    location.reload();
}
const DeleteBenfit=async(data)=>{
 let result =await  DeleteBenfitService(data);
 ElMessage.success('删除成功');
 location.reload();
}
const handleClick = (row) => {
    DeleteBenfit(row.benefitName)
    console.log(row.benefitName);
    benefitList();
}


</script>


<template>
    <el-card class="page-container">
        <el-form :model="form" label-width="auto" style="max-width: 200px">
            <el-form-item label="福利名称">
                <el-input v-model="benefitInfo.benefitName" />
            </el-form-item>
            <el-form-item label="福利金额">
                <el-input v-model="benefitInfo.benefitValue" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card class="page-container">
        <el-table :data="benefitAll" style="width: 100%" >
            <el-table-column prop="benefitName" label="福利名称" width="400" />
            <el-table-column prop="benefitValue" label="福利金额" width="400" />

            <el-table-column fixed="right" label="操作" width="120">
                <template #default="{ row }">
                    <el-button link type="primary" size="small" @click="handleClick(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>