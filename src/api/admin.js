//导入request.ja
import request from '@/utils/request.js'

//添加福利
export const addBenfitsService=(Data)=>{
  return request.post('/benefits/add',Data)
}

//福利列表
export const BenfitsListService=()=>{
    return request.get('/benefits/list')
}

//删除福利
export const DeleteBenfitService = (Data) => {
  console.log(Data);
  request.post('/benefits/delete', Data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

//获取所有人工资详细
export const getAllSalaryService=()=>{
  return request.get('/salary/getAll')
}


//重新计算工资
export const countService=()=>{
  request.post('/salary/count')
}

//工资总额
export const sumService=()=>{
 return request.get('/salary/sum')
}

//获取部门 岗位列表
export const getDepartmentsService=()=>{
 return request.get('/departments/all')
}

//删除部门 岗位
export const deleteDepartmentService = (departmentName, jobTitleName) => {
  return request.delete('/departments/delete', {
    data: {
      departmentName: departmentName,
      jobTitleName: jobTitleName
    }
  });
}

//添加部门岗位
export const addDepartmentService=(Data)=>{
  request.post('/departments/add',Data)
}

//编辑部门 岗位
export const updateDepartmentService=(Data)=>{
  request.put('/departments/update',Data)
}

//根据部门名称获取岗位
export const getJobNameByDepartmentService=(Data)=>{
  console.log(Data);
 return request.post('/departments/findByDepartmentName',{
  data: {
    departmentName: Data.departmentName,
    jobTitleName: '测试'
  }
});

}



//获取全部员工信息
export const getAllEmployeeService=()=>{
 return request.get('/employee/findAll')
}

//添加员工
export const addEmployeeService = (data) => {
  return request({
    method: 'post',
    url: '/employee/addEmployee',
    data: {
      employeeName: data.employeeName,
      gender: data.gender,
      department: data.department,
      post: data.post,
      salaryLeve: data.salaryLeve,
      workYear: data.workYear,
      salaryAmount: data.salaryAmount
    }
  });
}


//删除员工
export const deleteEmployeeService=(employeeName)=>{
  return request.delete('/employee/delete', {
    data: {
      employeeName: employeeName
    }
  });
}

//编辑员工信息
export const updateEmployeeService=(data)=>{
  request.put('/employee/update',data)
}

export const sumEmployee=()=>{
  return request.get('/employee/sum')
}