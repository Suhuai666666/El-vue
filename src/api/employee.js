import request from '@/utils/request.js'
import { useTokenStore } from '../stores/token'

export const getEmployeeByIdService=()=>{
    // console.log(employeeId);
    // console.log("9999999999999");
    return request.get('/employee/findById')
}

export const getSalaryByIdService=()=>{
   return request.get('/salary/findById')
}