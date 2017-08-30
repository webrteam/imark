下载:
> npm install imark

引入方法:
- 1.模块化: `require('imark');`
- 2.单文件: <script src="node_modules/imark/imark.min.js"></script>

初始化:
```
markInit({
    appId: 'myAppId',
    serverPath: 'http://www.host.com'
});
```

标记页面进入(actionType=enter):
`markPage(pageUrl, pageName);`

标记按钮点击(actionType=picker):
`markPicker(target, pageUrl, pageName);`

标记其它:
```
mark({
    actionType: 'input',
    target: '',
    pageUrl,
    pageName
});
```
