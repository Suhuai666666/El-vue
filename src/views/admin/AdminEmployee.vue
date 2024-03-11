<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import {getJobNameByDepartmentService,getDepartmentsService, getAllEmployeeService, addEmployeeService, deleteEmployeeService, updateEmployeeService } from '@/api/admin.js'
import { ElMessage } from 'element-plus';



//控制添加分类弹窗
const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
//定义变量 控制弹窗标题的展示
const title = ref('')
const employeeInfo2 = ref([{
    'employeeId': 1,
    'employeeName': '小张',
    'gender': '女',
    'department': 'UI',
    'post': '设计',
    'salaryLevel': 5,
    'workYear': 2,
    'salaryAmount': 666
}])
const showEdit = (row) => {
    dialogVisible.value = true;
    title.value = '编辑员工';

    // 取出数组中的第一个对象
    const employee = employeeInfo2.value[0];

    // 更新对象的属性
    employee.employeeId = row.employeeId;
    employee.employeeName = row.employeeName;
    employee.gender = row.gender;
    employee.department = row.department;
    employee.post = row.post;
    employee.salaryLevel = row.salaryLevel;
    employee.workYear = row.workYear;
    employee.salaryAmount = row.salaryAmount;
}

//员工模型
const employeeAll = ref([{
    'employeeId': 1,
    'employeeName': '小张',
    'gender': '女',
    'department': 'UI',
    'post': '设计',
    'salaryLevel': 5,
    'workYear': 2,
    'salaryAmount': 666
}, {
    'employeeId': 1,
    'employeeName': '小张',
    'gender': '女',
    'department': 'UI',
    'post': '设计',
    'salaryLevel': 5,
    'workYear': 2,
    'salaryAmount': 666
}])

const employeeInfo1 = ref([{
    'employeeId': 1,
    'employeeName': '小张',
    'gender': '女',
    'department': 'UI',
    'post': '设计',
    'salaryLevel': 5,
    'workYear': 0,
    'salaryAmount': 0
}])




const onSubmit = () => {
    //打开添加员工表单
    dialogVisible2.value = true;


}
const getAllEmployee = async () => {
    let result = await getAllEmployeeService();
    employeeAll.value = result.data;
}
getAllEmployee();

const addEmployee = async () => {
    let result = await addEmployeeService(employeeInfo1.value);
    // console.log(employeeInfo1.value);
    ElMessage.success('添加成功');
    location.reload();
}

const deleteEmployee = async (row) => {
    let result = await deleteEmployeeService(row.employeeName);
    ElMessage.success('删除成功');
    location.reload();
}

const updateEmployee = async (row) => {
    let result = await updateEmployeeService(employeeInfo2.value[0]);
    ElMessage.success('修改成功');
    location.reload();
}

const value = ref('')

const options = [
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
  {
    value: '其他',
    label: '其他',
  },
]

const options2 = ref([
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
  {
    value: '其他',
    label: '其他',
  },
])

const options3 = ref([
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
  {
    value: '其他',
    label: '其他',
  },
])

const options4 = ref([
{
    value: '0',
    label: '0',
  },
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
  {
    value: '6',
    label: '6',
  },
  {
    value: '7',
    label: '7',
  },
  {
    value: '8',
    label: '8',
  },
  {
    value: '9',
    label: '9',
  },
  {
    value: '10',
    label: '10',
  },
])

// const getJoB=async(departmentName)=>{
//   let result = await getJobNameByDepartmentService(departmentName);
//   return result.data;
// }
const getDepartments = async () => {
  try {
    let result = await getDepartmentsService();
    // 使用 Set 来存储唯一的部门名称
    const uniqueDepartments = [...new Set(result.data.map(item => item.departmentName))];
    // 将部门名称转换为下拉菜单的选项格式
    options2.value = uniqueDepartments.map(department => ({ value: department, label: department }));
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
  try {
    let result2 = await getDepartmentsService();
    // let result2 =getJoB(item.departmentName);
    // console.log(employeeInfo1.value);
    // let result2=await getJobNameByDepartmentService(employeeInfo1.value);


    // Transform the result.data to match the structure of options2
    options3.value = result2.data.map(item => ({
      value: item.jobTitleName,
      label: item.jobTitleName,
    }));
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
};


// 在组件挂载后调用 getDepartments
getDepartments();

</script>

<template>
    <el-card class="page-container">
        <h3>员工列表</h3>
    </el-card>

    <el-card class="page-container">
        <el-button type="primary" @click="onSubmit();getDepartments()">添加员工</el-button>
        <el-table :data="employeeAll" style="width: 100%">
            <el-table-column prop="employeeId" label="员工ID" />
            <el-table-column prop="employeeName" label="员工姓名" />
            <el-table-column prop="gender" label="性别" />
            <el-table-column prop="department" label="部门" />
            <el-table-column prop="post" label="职位" />
            <el-table-column prop="salaryLevel" label="工资等级" />
            <el-table-column prop="workYear" label="工龄" />
            <el-table-column prop="salaryAmount" label="工资总额" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="{ row }">
                    <el-button link type="primary" size="small" @click="deleteEmployee(row)">删除</el-button>
                    <el-button link type="primary" size="small" @click="showEdit(row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>


    </el-card>


    <!-- 添加员工弹窗-->
    <el-dialog v-model="dialogVisible2" :title="title" width="30%">
        <el-form :model="employeeInfo1" label-width="100px" style="padding-right: 30px">
            <el-form-item label="员工姓名" prop="employeeName">
                <el-input v-model="employeeInfo1.employeeName" minlength="1" maxlength="15"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
            <el-select v-model="employeeInfo1.gender" placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
           </el-form-item>

           <el-form-item label="部门" prop="department">
            <el-select v-model="employeeInfo1.department" placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
           </el-form-item>
            <el-form-item label="职位" prop="post" >
            <el-select v-model="employeeInfo1.post" placeholder="Select" size="large" style="width: 240px" >
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
           </el-form-item>
            <!-- <el-form-item label="工资等级" prop="salaryLevel">
                <el-input v-model="employeeInfo1.salaryLevel" minlength="1" maxlength="15"></el-input>
            </el-form-item>
            <el-form-item label="工龄" prop="workYear">
                <el-input v-model="employeeInfo1.workYear" minlength="1" maxlength="15"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="工资总额" prop="salaryAmount">
                <el-input v-model="employeeInfo1.salaryAmount" minlength="1" maxlength="15"></el-input>
            </el-form-item> -->
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取消</el-button>
                <el-button type="primary" @click="addEmployee(); dialogVisible2 = false;"> 确认 </el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 编辑员工弹窗-->
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
        <el-form :model="employeeInfo2" label-width="100px" style="padding-right: 30px">
            <el-form-item label="员工ID" prop="employeeId" >
                <el-input v-model="employeeInfo2[0].employeeId" minlength="1" maxlength="15" disabled></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" prop="employeeName">
                <el-input v-model="employeeInfo2[0].employeeName" minlength="1" maxlength="15"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
            <el-select v-model="employeeInfo2[0].gender" placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
           </el-form-item>
           <el-form-item label="部门" prop="department">
            <el-select v-model="employeeInfo2[0].department" placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
           </el-form-item>
            <el-form-item label="职位" prop="post">
            <el-select v-model="employeeInfo2[0].post" placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
           </el-form-item>

    
            <el-form-item label="工资等级" prop="post">
            <el-select v-model="employeeInfo2[0].salaryLevel" placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
           </el-form-item>

           <el-form-item label="工龄" prop="post">
            <el-select v-model="employeeInfo2[0].workYear" placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
           </el-form-item>
 
            <!-- <el-form-item label="工资等级" prop="salaryLevel">
                <el-input v-model="employeeInfo2[0].salaryLevel" minlength="1" maxlength="15"></el-input>
            </el-form-item>
            <el-form-item label="工龄" prop="workYear">
                <el-input v-model="employeeInfo2[0].workYear" minlength="1" maxlength="15"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="工资总额" prop="salaryAmount">
                <el-input v-model="employeeInfo2[0].salaryAmount" minlength="1" maxlength="15"></el-input>
            </el-form-item> -->
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateEmployee(row); dialogVisible = false;"> 确认 </el-button>
            </span>
        </template>
    </el-dialog>
</template>