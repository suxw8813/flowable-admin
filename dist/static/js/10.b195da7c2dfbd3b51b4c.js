webpackJsonp([10],{Budz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-row",[a("el-form",{attrs:{"label-width":"130px",size:"large"}},[e._l(6,function(t){return[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"业务数据"+(2*t-1)}},[a("el-input",{attrs:{placeholder:"请输入内容",width:"100px"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"业务数据"+2*t}},[a("el-input",{attrs:{placeholder:"请输入内容",width:"100px"}})],1)],1)],1)]})],2)],1),e._v(" "),a("el-row",{staticClass:"to-center"},[a("el-button",{attrs:{type:"primary"},on:{click:e.saveData}},[e._v("保存")]),e._v(" "),a("el-popover",{attrs:{placement:"right",width:"200",trigger:"click"}},[a("el-row",[a("el-col",[e._v("\n          选择下一节点执行人\n        ")]),e._v(" "),a("el-col",[a("el-tree",{ref:"tree",attrs:{data:e.data2,"show-checkbox":"","default-expand-all":"","node-key":"id","highlight-current":"",props:e.defaultProps}})],1),e._v(" "),a("el-col",{staticStyle:{"text-align":"center"}},[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.completeTask}},[e._v("确定")])],1)],1),e._v(" "),a("el-button",{attrs:{slot:"reference",type:"primary"},slot:"reference"},[e._v("提交")])],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")({name:"task2",components:{},data:function(){return{taskId:null,orderCode:null,processInstanceId:null,data2:[{id:1,label:"group1",children:[{id:4,label:"group2",children:[{id:9,label:"user2-1"},{id:10,label:"user2-2"}]},{id:11,label:"group5",children:[{id:12,label:"user5-1"},{id:13,label:"user5-2"}]}]},{id:2,label:"group3",children:[{id:5,label:"user3-1"},{id:6,label:"user3-2"}]},{id:3,label:"group4",children:[{id:7,label:"user4-1"},{id:8,label:"user4-2"}]}],defaultProps:{children:"children",label:"label"}}},methods:{completeTask:function(){var e=this,t=e.$refs.tree.getCheckedNodes(),a=t.length;if(0!=a){for(var r="",l=0;l<a;l++)t[l].children&&(r+=t[l].label+",");r=r.substr(0,r.length-1),this.$axios.post(this.$api.flowableapi+"form/form-data",{taskId:e.taskId,properties:[{id:"candidategroup",name:"candidategroup",type:"string",value:r}]},{}).then(function(t){204!=t.status&&e.$message.error(t.statusText),e.$message.success(t.statusText)}).catch(function(t){e.$message.error(t.toString())})}else this.$message.warning("Please choose the user you want to delegate to.")},saveData:function(){this.$message.success("Saved data successfully!")}},created:function(){this.orderCode=this.$route.params.ordercode,this.taskId=this.$route.params.taskid,this.processInstanceId=this.$route.params.processInstanceId}},r,!1,function(e){a("j1Lw")},"data-v-6b330c36",null);t.default=l.exports},j1Lw:function(e,t){}});
//# sourceMappingURL=10.b195da7c2dfbd3b51b4c.js.map