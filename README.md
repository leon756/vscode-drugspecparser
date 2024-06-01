# DrugSpecParser README

药品规格解析器

## Features
将药品规格字符串的内容分拆为具体字段。目前支持：
- 容量
- 成分含量
- 最小规格

操作步骤如下：
- 1. 在vscode编辑器中，用光标选中待解析的规格文本（每行1条）<br/>
![选中待解析文本](https://mmbiz.qpic.cn/mmbiz_png/6gkT16FK0Lqy6DfsBSumgARibsgldk9wVFfZSF6qRsNUAYcnjsRygclmUfEqYbyZpwqUbnSw91AicYhawjmrKRew/0)
- 2. 按下快捷键 `Ctrl + Shift + P`，搜索命令执行 `Parse Drug Specification`<br/>
![搜索运行命令](https://mmbiz.qpic.cn/mmbiz_png/6gkT16FK0Lqy6DfsBSumgARibsgldk9wV9SJP47aTQtTfib2qXuibjnicpibPFziaYwicRYtuk3W7CTqHl7d8wvguicE4Q/0) 
- 3. 解析完毕，出现弹窗提示<br/>
![完成解析](https://mmbiz.qpic.cn/mmbiz_png/6gkT16FK0Lqy6DfsBSumgARibsgldk9wVGcib7S1R0iaINtBYcFIcjgOFicdIgKFvjnnTF7icBhump8k8Q6O07THplg/0) 
- 4. 可以将结果复制到Excel中，用分列功能（以`|`为分隔符）拆开显示<br/>
![复制到Excel](https://mmbiz.qpic.cn/mmbiz_png/6gkT16FK0Lqy6DfsBSumgARibsgldk9wVbkNicw2dhc9u3Z9M03McMWiadASwghxjVzVeXQpQJjoL0LUZtQslPIDA/0)
![分拆各列](https://mmbiz.qpic.cn/mmbiz_png/6gkT16FK0Lqy6DfsBSumgARibsgldk9wV8YLnvrXz8Keq1RLibkjvm694IceOy1UjwXe31xicVg9ic0ucuT0ia3W4lQ/0)

## Known Issues
格式花样繁多，某些场景不能精确解析全部字段。

## Release Notes


### 1.0.0

Initial release

### 1.0.1

补充插件描述

### 1.0.2

fix: 解析结果统计

---

**Enjoy!**
# vscode-drugspecparser
