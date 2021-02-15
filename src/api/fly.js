/**
 * @Description: fly请求插件 [交互比axios人性化很多]
 * @author BloodCat(JousenZhou)
 * @date 2020/11/30
 */
import Fly_ from 'flyio/dist/npm/fly';
// import { Message, Loading } from 'element-ui';
import { ElMessage as Message, ElLoading as Loading } from 'element-plus';
let request = new Fly_();
import localstorage from '@/until/localstorage';
// eslint-disable-next-line no-unused-vars
const { main, cloud, report } = window['config'] || {};
// eslint-disable-next-line no-unused-vars
const dev = process.env.NODE_ENV === 'development';
const requestBaseUrl = (() => {
    // 连接本地服务器
    // let main_ = 'http://192.168.8.215:8010';
    // let report_ = 'http://192.168.8.215:7000';

    // 伊芙丽【需要挂载vpn】
    let main_ = 'http://10.8.250.100:1980/escm-app';
    // 报表地址=
    let report_ = 'http://10.8.250.100:1380';
    // 云厂地址
    let cloud_ = 'http://10.8.250.100:1980';

    // 伊芙丽【代理】
    // let main_ = 'http://120.79.130.207:1980/escm-app';
    // // 报表地址=
    // let report_ = 'http://120.79.130.207:1380';
    // 云厂地址
    // let cloud_ = 'http://120.79.130.207:1980';
    return {
        main: dev ? main_ : main,
        cloud: dev ? cloud_ : cloud,
        report: dev ? report_ : report
    };
})();
let timer, loadingInstance;
request['config'] = {
    baseURL: requestBaseUrl.main,
    timeout: 1000 * 60
};
// 请求处理
request['interceptors'].request.use((request) => {
    // 请求头补齐参数
    (request.url.indexOf('http') === -1 ? ['Authorization', 'unitId', 'bossUnitId'] : ['Authorization']).forEach((em) => {
        request.headers[em] = localstorage.get(em);
    });
    request.body = Object.assign(request.body || {}, {
        unitId: localstorage.get('unitId'),
        bossUnitId: localstorage.get('bossUnitId'),
        userId: localstorage.get('userId')
    });
    clearTimeout(timer);
    if (!request.cancelLoading) {
        timer = setTimeout(() => {
            // eslint-disable-next-line no-unused-vars
            loadingInstance = Loading.service({
                background: 'rgba(0,0,0,0.1)'
            });
        }, 100);
    }
    return request;
});
// 响应处理
request['interceptors'].response.use(
    (response) => {
        const result = JSON.parse(response.data);
        if (result.code && ![10200, 10201, 10202, 0].includes(result.code)) {
            // 打印目前先不报错
            if (response.request.url.indexOf('new-mf-fac/v1/api/stimulsoft/print/scheme-list') === -1) {
                console.error(result['errorStack']);
                Message({
                    message: `${result.msg}`,
                    type: 'error',
                    duration: 3000,
                    customClass: 'global-Message'
                });
            }
        }
        clearTimeout(timer);
        if (loadingInstance) loadingInstance.close();
        return result;
    },
    (error) => {
        // 导出处理
        if (error['request']['headers']['exportBlob']) {
            // eslint-disable-next-line no-inner-declarations
            function downloadBinaryCsv(data, fileName) {
                const url = window.URL.createObjectURL(data);
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            downloadBinaryCsv(error['engine']['response'], error['request']['headers']['exportName']);
        } else {
            Message.error('服务器异常或网络异常,请联系管理员或查看网络是否正常');
        }
        clearTimeout(timer);
        if (loadingInstance) loadingInstance.close();
        return error;
    }
);
// 下载
request.download = function(url, needRequestPrefix = true) {
    const elink = document.createElement('a');
    elink.style.display = 'none';
    elink.target = '_blank';
    elink.setAttribute('download', '');
    elink.href = `${needRequestPrefix ? requestBaseUrl.main : ''}${url}`;
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
};
export default request;
export { requestBaseUrl };
