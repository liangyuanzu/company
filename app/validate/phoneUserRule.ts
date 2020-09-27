export default {
    phone:{
        type:'string',
        trim:true,
        format: /^1[3456789]\d{9}$/,
        message:'手机不符合要求'
    },
    password:{
        type:'string',
        trim:true,
        // 必须是数字字母符号组合
        format:/^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\.#%'\+\*\-:;^_`].*))[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,}$/,
        message:'密码不符合要求'
    },
    captcha: {
        type: 'string',
        trim: true,
        // 必须是数字字母符号组合
        format: /^[A-Za-z0-9]{4}$/,
        message: '验证码不符合要求'
    },
    registerType:{
        type:'enum',
        values: ['normal', 'email', 'phone']
    }
}
