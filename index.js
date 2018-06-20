new Vue({
    el: "#app",
    data: {
        todos:[
            {id:1,content:"在控制要显示的数据的时候，千万不要通过点击按钮来直接控制所有的数据，而是利用计算属性，创造出两个新的数据。一个全部都是完成的，一个全部都是未完成的，然后再创造一个真正要显示的数据",isFinished:false},
            {id:2,content:"这是一个用纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素。",isFinished:true},
            {id:3,content:"这是一个用纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素。",isFinished:true},
            {id:4,content:"这是一个用纯文本的简单卡片.",isFinished:true}
        ],
        showBtns:[
            {id:1,title:'A',type:'all',theme:'success'},
            {id:2,title:'F',type:'finished',theme:'primary'},
            {id:3,title:'U',type:'unfinished',theme:'danger'},
        ],
        activeShowType:'all' //
    },
    methods: {
        checkFinished(id){

        }
    },
    computed: {

    }
})