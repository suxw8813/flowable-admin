<template>
    <div>
        <el-row>
            <el-form ref="form" :model="form" :inline="true" label-width="80px">
                <el-form-item label="KEY" prop="key">
                    <el-input v-model="form.key"></el-input>
                </el-form-item>
                <el-form-item label="租户" prop="tenantId">
                    <el-input v-model="form.tenantId"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="findData">查询</el-button>
                    <el-button @click="$refs['form'].resetFields();">重置</el-button>
                </el-form-item>
                <el-form-item labelPosition="right">
                    <el-button type="primary" @click="templateVisible=true">启动流程</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-table :data="tableData.list" border>
                <el-table-column type="index" label="NO."></el-table-column>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="key" label="KEY"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <template v-if="form.finished">
                    <el-table-column prop="endTime" label="结束时间"></el-table-column>
                </template>
                <el-table-column prop="version" label="版本" width="50px"></el-table-column>
                <el-table-column prop="tenantId" label="租户" width="100px"></el-table-column>
                <el-table-column prop="suspensionState" label="流程状态" width="80px"></el-table-column>
                <el-table-column prop="deployTime" label="部署时间" width="170px"></el-table-column>

                <el-table-column fixed="right" label="操作" width="80px">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="getDiagramByDefinitionId(scope.row.processDefinitionId)">任务列表</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    @prev-click="handlePrevChange"
                    @next-click="handleNextChange"
                    :current-page="tableData.pageNo"
                    :page-size="tableData.pageSize"
                    :page-sizes="[10, 20, 30, 50]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.totalCount">
                </el-pagination>
            </div>
        </el-row>
        <startProcess :templateVisible.sync="templateVisible"></startProcess>
        <imgDialog :imgDialogVisible.sync="imgDialogVisible" :processDefinitionId="processDefinitionId"
                   :processInstanceId="processInstanceId"></imgDialog>
    </div>
</template>

<script>
import startProcess from './startProcess'
import imgDialog from '@/views/commons/images/imgDialog'

export default {
    name: 'process',
    components: {
        startProcess,
        imgDialog
    },
    data () {
        return {
            templateVisible: false,
            imgDialogVisible: false,
            processDefinitionId: null,
            processInstanceId: null,
            form: {
                orderCode: null,
                processName: null,
                productName: null,
                finished: false,
                startTimeRange: [],
                endTimeRange: []
            },
            tableData: {
                pageNo: 1,
                pageSize: 10,
                totalCount: 0,
                list: []
            },
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近三个月',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        picker.$emit('pick', [start, end])
                    }
                }]
            }
        }
    },
    created: function () {
        this.findData()
    },
    computed: {
        start: function () {
            return (this.tableData.pageNo - 1) * this.tableData.pageSize
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
            this.$axios.get(this.$api.deploymentApi + 'repository/deployments', {
                headers: {'Content-Type': 'application/json'},
                params: {
                    start: _this.start,
                    pageSize: _this.tableData.pageSize
                }
            }).then(response => {
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
