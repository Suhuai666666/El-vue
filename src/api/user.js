//导入request.ja
import request from '@/utils/request.js'

//提供调用注册接口的函数
export const userRegisterService=(registerData)=>{
    console.log('wwwww');
    console.log(registerData.Data);
    //借助UrlSearchParams完成传递
    const params =new URLSearchParams()
    for(let key in registerData){
        params.append(key,registerData[key]);
    }
   return request.post('/user/register',params);


}

//提供调用登录接口的函数
export const userLoginService=(loginData)=>{
    const params=new URLSearchParams()
    for(let key in loginData){
        params.append(key,loginData[key])
    }
   return request.post('/user/login',params)
}

//获取用户详细信息
export const userInfoService=()=>{
    return request.get('/user/userInfo')
}

//更新用户信息
export const updateUserInfoService=(Data)=>{
   return request.put('/user/update',Data);
}


export const updateUserPasswordService=(Data)=>{
   return request.patch('/user/updatePwd',Data)
}

