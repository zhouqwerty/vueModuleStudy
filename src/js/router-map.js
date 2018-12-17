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
    /*{
        path: "/project",
        component: {template:''},
        redirect : "/project/task",
        children: [
            {
                path: "/project/task",
                component: {template:''}
            },
            {
			    path: "/project/taskcreate",
			    component: {template:''}
			},
            {
                path: '/project/taskdetail',
                component: {template:''}
            },
            {
                path: '/project/edittask',
                component: {template:''}
            },
            {
                path: '/project/effort',
                component: {template:''}
            },
            {
                path: "/project/team",
                component: {template:''}
            }, {
                path: "/project/team/tManage",
                component: {template:''}
            },
            {
                path: "/project/mod",
                component: {template:''}
            },
            {
                path: "/project/empty",
                component: {template:''}
            },
            {
                path: "/project/projectDetail",
                component: {template:''}
            },
            {
                path: "/project/createProject",
                component: {template:''}
            }
        ]
    },*/
];

var router1 = new VueRouter({
    //routes:routes   // （缩写）相当于 routes: routes
});

var routersMap = {
    '':'../modules/header/header.vue',
    '/':'../modules/header/header.vue',
    '/home':'../modules/header/header.vue',
    '/header':'../modules/header/header.vue'
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