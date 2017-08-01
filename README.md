下载:
npm install action-analyze

引入方法:
1.模块化: require('action-analyze');
2.单文件: <script src="node_modules/action-analyze/analyze.js"></script>

初始化:
markInit({
    appId: 'myAppId',
    serverPath: 'http://www.host.com'
});

标记页面进入(actionType=enter):
markPage(pageUrl, pageName);

标记按钮点击(actionType=picker):
markPicker(target, pageUrl, pageName);

标记其它:
mark({
    actionType: 'input',
    target: '',
    pageUrl,
    pageName
});

