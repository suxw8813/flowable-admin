<template>
    <div>
        <el-row>
            <el-form ref="form" :model="form" :inline="true" label-width="80px">
                <el-form-item label="流程实例" prop="key">
                    <el-input v-model="form.key"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="findData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            流程定义：{{result.processDefinitionKey}}，业务主键：{{result.businessKey}}
        </el-row>

        <template>
            <el-tabs v-model="activeName">
                <el-tab-pane label="执行流水" name="first">
                    <el-row>
                        <el-table :data="result.processDetails" border>
                            <el-table-column type="index" label="NO."></el-table-column>
                            <el-table-column prop="startTime" label="开始时间"></el-table-column>
                            <el-table-column prop="endTime" label="结束时间"></el-table-column>
                            <el-table-column prop="activityId" label="环节ID"></el-table-column>
                            <el-table-column prop="activityName" label="环节名称"></el-table-column>
                            <el-table-column label="环节类型">
                                <template slot-scope="scope">
                                    <span v-if='scope.row.activityType === "userTask"'>人工环节</span>
                                    <span v-else-if='scope.row.activityType === "httpServiceTask"'>Http环节</span>
                                    <span v-else-if='scope.row.activityType === "sequenceFlow"'>分支</span>
                                    <span v-else-if='scope.row.activityType === "startEvent"'>开始</span>
                                    <span v-else-if='scope.row.activityType === "exclusiveGateway"'>网关</span>
                                    <span v-else>{{scope.row.activityType}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <span v-if='scope.row.type === "finished"'>已完成</span>
                                    <span v-else>执行中</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="claimTime" label="领取时间">
                                <template slot-scope="scope">
                                    <span v-if='scope.row.activityType === "userTask"'>{{scope.row.claimTime}}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="assignee" label="领取人">
                                <template slot-scope="scope">
                                    <span v-if='scope.row.activityType === "userTask"'>{{scope.row.assignee}}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="requestUrl" label="请求url">
                                <template slot-scope="scope">
                                    <span v-if='scope.row.activityType === "userTask"'>{{scope.row.requestUrl}}</span>
                                    <span v-else-if='scope.row.activityType === "httpServiceTask"'>{{scope.row.requestUrl}}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="requestBody" label="body表达式">
                                <template slot-scope="scope">
                                    <span v-if='scope.row.activityType === "userTask"'>{{scope.row.requestBody}}</span>
                                    <span v-else-if='scope.row.activityType === "httpServiceTask"'>{{scope.row.requestBody}}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="responseValue" label="请求返回值">
                                <template slot-scope="scope">
                                    <span v-if='scope.row.activityType === "userTask"'>{{scope.row.responseValue}}</span>
                                    <span v-else-if='scope.row.activityType === "httpServiceTask"'>{{scope.row.responseValue}}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="error" label="异常信息">
                                <template slot-scope="scope">
                                    <span v-if='scope.row.activityType === "userTask"'>{{scope.row.error}}</span>
                                    <span v-else-if='scope.row.activityType === "httpServiceTask"'>{{scope.row.error}}</span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="变量表" name="second">
                    <el-row>
                        <el-table :data="result.variableInfos" border>
                            <el-table-column type="index" label="NO."></el-table-column>
                            <el-table-column prop="key" label="变量名称"></el-table-column>
                            <el-table-column prop="value" label="变量值">
                                <template slot-scope="scope">
                                    {{scope.row.value}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="流程图" name="third">
					<imgDialog :url="imageSrc"></imgDialog>
                </el-tab-pane>
            </el-tabs>
        </template>

        <startProcess :templateVisible.sync="templateVisible"></startProcess>
    </div>
</template>

<script>
import startProcess from './startProcess'
import imgDialog from '@/views/commons/images/image.vue';

export default {
    name: 'process',
    components: {
        startProcess,
        imgDialog
    },
    data () {
        return {
            activeName: 'first',
            templateVisible: false,
            imgDialogVisible: false,
            processDefinitionId: null,
            processInstanceId: null,
            form: {
                key: "40026961",
                orderCode: null,
                processName: null,
                productName: null,
                finished: false,
                startTimeRange: [],
                endTimeRange: []
            },
            result: {
                processDefinitionKey: "1",
                businessKey: "2",
                variableInfos: [],
                processDetails: [],
            },
            tableData: {
                pageNo: 1,
                pageSize: 10,
                totalCount: 0,
                list: []
            },
        }
    },
    created: function () {
        this.findData()
    },
    computed: {
        start: function () {
            return (this.tableData.pageNo - 1) * this.tableData.pageSize
        },
        imageSrc: function () {
            return this.$api.deploymentApi + 'diagram?processInstanceId=' + this.form.key
        }
    },
    methods: {
        handleSizeChange: function (val) {
            this.tableData.pageSize = val
            this.findData()
        },
        handleCurrentChange: function (val) {
            this.tableData.pageNo = val
            this.findData()
        },
        handlePrevChange: function (val) {
            this.tableData.pageNo = val
        },
        handleNextChange: function (val) {
            this.tableData.pageNo = val
        },
        findData () {
            let _this = this
            this.$axios.get(this.$api.deploymentApi + 'debug?processInstanceId=' + _this.form.key, {
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                _this.result = response.data.data
                _this.tableData.list = response.data.data.list
                _this.tableData.totalCount = response.data.data.total
            }).catch(function (error) {
                _this.$message.error(error.toString())
            })
        },
        getDiagramByInstanceId (processInstanceId) {
            this.processInstanceId = processInstanceId
            this.imgDialogVisible = true
        },
        getDiagramByDefinitionId (processDefinitionId) {
            this.processDefinitionId = processDefinitionId
            this.imgDialogVisible = true
        },
        cancelProcessInstance (processInstanceId) {
            const _this = this
            this.$axios.delete(this.$api.flowableapi + 'runtime/process-instances/' + processInstanceId, {})
                .then(function (response) {
                    if (response.status !== 204) {
                        _this.$message.error(response.statusText)
                    } else {
                        _this.$message.success('deleted')
                        _this.findData()
                    }
                })
                .catch(function (error) {
                    _this.$message.error(error.toString())
                })
        },
        turnToTask (ordercode) {
            this.$router.push(`/home/workbench/task/${ordercode}`)
        }
    }
}
</script>

<style scoped>
    .el-row {
        margin: 20px auto;
    }

    .el-table {
        border-radius: 5px;
        box-shadow: 2px 3px 10px 0px grey;
    }

    .pagination {
        padding: 10px 30% 10px 30%;
    }
</style>
