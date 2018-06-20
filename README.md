# TodoList

> 手机样式引用sui mobile

## 头部-标题栏

使用sui快速布局

## 内容区-卡片

1. todo的列表内容，外侧包裹一个content类名，不然会挤到上部;
2. 查找按钮类名添加，样式button button-success button-fill

### list

1.寻找关键数据  

> 这里我们使用了对象的格式，需要有key，
> 点击V按钮是否显示：有没有完成和这条todo有关系，所以定义在对象里面

2.将关键数据与视图建立联系

> 添加:class类，控制样式 (:class与后面的class不冲突) 这里写的是对象的格式

3.通过控制数据来控制视图效果

> 通过点击改变isFinished的布尔值

### 注意

每一块区域都写好注释，start end
el根实例 不允许挂载在body上