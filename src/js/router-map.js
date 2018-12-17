var routes = [
    {
        path: "",
        component:{template:''}
    },
    {
        path: "/",
        component:{template:''}
    },
    {
        path: "/home",
        component:{template:''}
    },
    {
        path: "/header",
        component:{template:''}
    },
    {
        path: "/body",
        component: {template:''},
        redirect : "/body/body1",
        /*children: [
            {
                path: "/body/body1",
                component: {template:''}
            },
            {
                path: "/body/body2",
                component: {template:''}
            },
        ]*/
    },
    {
        path: "/body/body1",
        component: {template:''}
    },
    {
        path: "/body/body2",
        component: {template:''}
    },
];

var router1 = new VueRouter({
    //routes:routes   // （缩写）相当于 routes: routes
});

var routersMap = {
    '':'../modules/header/header.vue',
    '/':'../modules/header/header.vue',
    '/home':'../modules/header/header.vue',
    '/header':'../modules/header/header.vue',
    '/body':'../modules/body/body.vue',
    '/body/body1':'../modules/body/body1/body1.vue',
    '/body/body2':'../modules/body/body1/body2.vue',
    // '/body/body2':'../modules/body/body1/body2.vue',
    '/footer':'../modules/footer/footer.vue'
   /* '/project' : 'modules/project/nav.vue',
    '/project/task' : 'modules/project/task/task.vue',
    '/project/taskcreate' : 'modules/project/task/createtask.vue',
    '/project/taskdetail' : 'modules/project/task/taskdetail.vue',
    '/project/edittask' : 'modules/project/task/edittask.vue',
    '/project/effort' : 'modules/project/effort/taskeffort.vue',
    '/project/team' : 'modules/project/team/team.vue',
    '/project/team/tManage' : 'modules/project/team/tManage.vue',
    '/project/empty' : 'modules/project/empty/empty.vue',
    '/project/createProject' : 'modules/project/createProject/createProject.vue',
    '/project/projectDetail' : 'modules/project/createProject/projectDetail.vue',*/
};

function RouteParam(path, component, children){
    this.path = path;
    this.component = component;
    this.children = children;
}
/*注册模版为空的路由*/
function initRoute(data){
   /* for (var path in routersMap) {
     var _temp = httpVueLoader(routersMap[path]);
     router.addRoutes([{path: path, component: {template:''}}]);
    }*/
   if(data && data.length > 0){
        data.forEach(function(val){
            var path = val.path;
            var component = val.component;
            var _temp = httpVueLoader(routersMap[val.path]);
            var array = new Array();
            var param = new RouteParam(path, {template:''}, (val.children) ? val.children:[]);
            if(val.redirect){
                param.redirect = val.redirect;
            }
            array.push(param);
            router1.addRoutes(array);
        })
    }
}

initRoute(routes);

/*路由跳转时 才加载模版*/
router1.beforeEach(function(to, from, next){
    //如果路由中不存在所要加载的组件
    if(to.matched.length <1){
        next('/');
    }else{
        (to.matched).forEach(function(val){
        	 if(!val.components.default.template
                 || val.components.default.template.length < 1){
                 var _temp = httpVueLoader(routersMap[val.path]);
                 val.components.default = _temp;
             }
        });
        next();
    }
});