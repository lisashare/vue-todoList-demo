// 任意的功能：1.找见关键数据 2.将数据与视图建立联系3.操控数据
//在控制要显示的数据的时候，千万不要通过点击按钮来直接控制所有的数据，而是利用计算属性，创造出两个新的数据。一个全部都是完成的，一个全部都是未完成的，然后再创造一个真正要显示的数据
//创建vue实例
new Vue({
    el: "#app", //将实例挂载在#app上
    data: {
        //下面两条数据应该从本地存储里取出使用
        count_id:JSON.parse(localStorage.todos||'[]').length,
        todos:JSON.parse(localStorage.todos||'[]'), //存放所有todos
        controlNav:[ //控制普通模式的操控按钮，控制显示什么类型的todo
            {id:1,title:'A',type:'all',theme:'success'},
            {id:2,title:'F',type:'finished',theme:'primary'},
            {id:3,title:'U',type:'unfinished',theme:'warning'},
        ],
        activeShowType:'all', //用来处理到底要显示什么类型的数据
        isRemoveShow:false,
        preRemoveId:null, //准备要删除的todo的id
        isInpShow:false, //关键数据：控制输入布局的
        newtitle:'', //新增todo的input绑定的数据
        isSelectShow:true, //关键数据：控制按钮切换模式
        selectNavs:[ //选择模式的操控按钮
            {id:1,title:'A',type:'all',theme:'success'},
            {id:2,title:'F',type:'finished',theme:'primary'},
            {id:3,title:'U',type:'unfinished',theme:'warning'},
            {id:4,title:'C',type:'remove',theme:'danger'}
        ],
        controlIndex:1 //关键数据，控制显示什么类型的todo
    },
    methods: {
        //点击删除按钮删除数据的方法
        checkFinished(id,isFinished){
            
            //如果未完成做出弹出框提示
            if(!isFinished){
                this.isRemoveShow = true;
                this.preRemoveId = id;//把准备要删除的id先存一波
                return false;
            }
            this.removeTodo(id);
        },
        removeTodo(id){
            //负责删除某一个todo,接收到要删除的todo的id,当数据改变后，vue重新编译模板重新渲染
            if(this.isRemoveShow){
                this.isRemoveShow = false;
            }
            this.todos = this.todos.filter(todo=>{
                return todo.id !== id ? todo : false;
            })
            //更新本地存储
            localStorage.todos = JSON.stringify(this.todos);
        },
        finishTodo(id){ //完成某个todo
            this.todos.forEach((item=>{
                if(item.id == id){
                    item.isFinished = true
                }
            }))
        },
        add(){  //增加新的todo
            this.todos.push({
                title:this.newtitle,
                isFinished:false,
                id:++this.count_id
            })
            //使新增布局消失
            this.isInpShow = false;
            localStorage.todos = JSON.stringify(this.todos)
        },
        selectAll(){ //全选
            let isAll = this.todos.every((item)=>{
                return item.isSelected
            })
            this.todos.forEach((item)=>{
                return item.isSelected = !isAll
            })
        },
        controlAll(type){
            this.todos.forEach((item)=>{
                if(item.isSelected){
                    item.isFinished = type
                }
            })
            localStorage.todos = JSON.stringify(this.todos)
        },
        removeAll(){ //删除所有
            this.todos=this.todos.filter((item)=>{
                if(!item.isSelected){
                    return item;
                }
            })
            localStorage.todos = JSON.stringify(this.todos)
        },
        selectMethod(id){
            this.controlIndex = id
            //根据点击按钮后传入的id执行不同的动作
            switch(id){
                case 1:this.selectAll();break;
                case 2:this.controlAll(true);break;
                case 3:this.controlAll(false);break;
                case 4:this.removeAll();break;
                default:break;
            }
        }
    },
    watch:{
        isInpShow : function(newval){
            //当新增布局消失的时候，清空
            this.newtitle = ''
        },
        isSelectShow:function(newval){
            if(newval === false){
                //如果模式切换为普通模式的时候
                this.todos.forEach((item)=>{
                    item.isSelected = false
                })
            }
        }
    },
    computed: {
        //全部都是已经完成的
        finishedTodos(){
            //根据现有的全部的todos去生成一个全部都是已经完成的todos新数据
            return this.todos.filter( todo =>{
                return todo.isFinished ? 'todo':false;
            })
        },
        //全部都是未完成的
        unfinishedTodos(){
            //根据所有的todos得到未完成的todos
            return this.todos.filter( todo =>{
                return !todo.isFinished ? 'todo':false;
            })
        },
        showTodos(){
            //真正要显示的数据,根据关键数据返回对应类型
            switch(this.activeShowType){
                case 'all' :return this.todos;
                case 'finished':return this.finishedTodos;
                case 'unfinished':return this.unfinishedTodos;
            }        
        }
    }
})