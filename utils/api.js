// 服务器图片资源
var imgApiRoot = 'https://www.qichengtiyu.com';

// var imgApiRoot = 'http://192.168.1.100:8080';

// 服务器后台数据
// var dataApiRoot = 'http://localhost:8080'

module.exports = {
    imgUrlRoot: imgApiRoot + '/img', //图片资源统一url路径
    AuthLoginByWeixin: imgApiRoot + '/login',   //登陆
    courseListUrl: imgApiRoot + '/course_list',
    courseDetail: imgApiRoot +'/course_detail',
    OrderPrepay: imgApiRoot + 'order/prepay', // 订单的预支付会话
    courseAbsent: imgApiRoot + "/course_absent", //课程请假
    courseAbsentSubmit: imgApiRoot + "/course_absent_submit",
    courseCheckInSubmit: imgApiRoot + "/course_checkin_submit", //立即请假
    queryUserInfo: imgApiRoot + "/queryUserInfo",
    modifyPhoneNo: imgApiRoot + "/modifyPhoneNo",
    queryCheckedCourse: imgApiRoot + "/queryCheckedCourse",
    commentsSubmit: imgApiRoot + "/commentsSubmit", //进行评价和反馈
    initNews: imgApiRoot + "/initNews", //进行评价和反馈
    initContacts: imgApiRoot + "/initContacts", //进行评价和反馈
    queryMyCourse: imgApiRoot + "/queryMyCourse", //查询我的课程
    modifyGender: imgApiRoot + "/modifyGender"   // 修改性别
};