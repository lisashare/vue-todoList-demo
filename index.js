new Vue({
    el: "#app",
    data: {
        todos:[
            {id:1,content:"在控制要显示的数据的时候，千万不要通过点击按钮来直接控制所有的数据，而是利用计算属性，创造出两个新的数据。一个全部都是完成的，一个全部都是未完成的，然后再创造一个真正要显示的数据",isFinished:false},
            {id:2,content:"这是一个用纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素。",isFinished:true},
            {id:3,content:"这是一个用纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素。",isFinished:true},
            {id:4,content:"这是一个用纯文本的简单卡片.",isFinished:true}
        ],
        showBtns:[ //控制显示类型的按钮
            {id:1,title:'A',type:'all',theme:'success'},
            {id:2,title:'F',type:'finished',theme:'primary'},
            {id:3,title:'U',type:'unfinished',theme:'danger'},
        ],
        activeShowType:'all', //用来处理到底要显示什么类型的数据
        isRemoveShow:false,
        preRemoveId:null, //准备要删除的todo的id
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
        	//根据现有的全部的todos去生成一个全部都是未完成的todos新数据
            return this.todos.filter( todo =>{
                return !todo.isFinished ? 'todo':false;
            })
        },
        showTodos(){
            //真正要显示的数据
            switch(this.activeShowType){
                case 'all' :return this.todos;
                case 'finished':return this.finishedTodos;
                case 'unfinished':return this.unfinishedTodos;
            }        
        }
    }
})