<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import {getDepartmentsService, getAllEmployeeService, addEmployeeService, deleteEmployeeService, updateEmployeeService } from '@/api/admin.js'
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

const getDepartments = async () => {
  try {
    let result = await getDepartmentsService();

    // Transform the result.data to match the structure of options2
    options2.value = result.data.map(item => ({
      value: item.departmentName,
      label: item.departmentName,
    }));
  } catch (error) {
    console.error('Error fetching departments:', error);
  }

  try {
    let result2 = await getDepartmentsService();

    // Transform the result.data to match the structure of options2
    options3.value = result2.data.map(item => ({
      value: item.jobTitleName,
      label: item.jobTitleName,
    }));
  } catch (error) {
    console.error('Error fetching departments:', error);
  }


}
getDepartments();

</script>

<template>
    <el-card class="page-container">
        <h3>员工列表</h3>
    </el-card>
    <el-card class="page-container">
        <el-table :data="employeeAll" style="width: 100%">
            <el-table-column prop="employeeId" label="员工ID" />
            <el-table-column prop="employeeName" label="员工姓名" />
            <el-table-column prop="gender" label="性别" />
            <el-table-column prop="department" label="部门" />
            <el-table-column prop="post" label="职位" />
            <el-table-column prop="salaryLevel" label="工资等级" />
            <el-table-column prop="workYear" label="工龄" />
            <el-table-column prop="salaryAmount" label="工资总额" />
        </el-table>
    </el-card>
</template>