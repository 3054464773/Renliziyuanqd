<script lang="ts" setup>
    import {
        Search,
        Plus,
        Edit,
        Delete
    } from '@element-plus/icons-vue'
    import {
        reactive,
        ref, inject, onBeforeMount
    } from 'vue'

    import type {
        FormRules
    } from '@element-plus'

    import axios from '../axios.js'

    import {ElMessage} from 'element-plus'

    //局部刷新
    const refresh = inject('reload')

    const total = ref(0)
    const tableData = ref([])
    var data = reactive({
        pageNum: 1,//当前显示页码
        pageSize: 5,//每一页显示的条数
        total: 0,//总条数
        pages: 0,
        sbmc: '',//社保名称
        qbsj: [],
        sbvo: {
            qbsj: [],
            sbmc: ''
        },
        xgform: {
            sbjslistss:[] //指定编号绑定的社保基数编号
        }, //修改表单
        jsjh: [],//社保基数
        fab: {},//方案表
        check: [], //社保基数多选框的值
        sbjslist:[], //社保基数集合
      sbjslists:[], //所有社保基数信息


    })
    // 新增弹窗
    const insert = ref(false)
    //社保详情界面弹窗
    const table = ref(false)
    const gridData = ref([])
    //社保基数级联菜单
    const options = ref([])
    //新增表单数据
    const formSize = ref('default')
    const props = {multiple: true}
    const ruleForm = reactive({
        name: ''
    })
    //新增表单数据验证
    const rules = reactive<FormRules>({
        name: [
            {required: true, message: '请输入方案名称！', trigger: 'blur'},
        ]
    })
    //修改弹窗
    const update = ref(false)

    //获取表格的指定行
    function dj(row) {
        table.value = true;
        console.log(row)
        selectsbfa(row.sbbh)
    }

    //Message消息提示
    //1、新增成功
    const xz = () => {
        ElMessage({
            showClose: true,
            message: '新增成功！',
            type: 'success'
        })
    }
    //2、修改成功
    const xg = () => {
        ElMessage({
            showClose: true,
            message: '修改成功！',
            type: 'success'
        })
    }
    //3、删除成功
    const sc = () => {
        ElMessage({
            showClose: true,
            message: '删除成功！',
            type: 'success'
        })
    }
    //4、已取消
    const qx = () => {
        ElMessage({
            showClose: true,
            message: '已取消！',
        })
    }
    //5、社保状态
    const sbzt = () => {
        ElMessage({
            showClose: true,
            message: '社保状态修改成功！',
            type: 'success'
        })
    }

    //查询所有数据方法(班次表)
    function selectlist() {
        console.log("1111111111111")
        axios.get("/selectList", {
            params: {
                pageNum: data.pageNum,
                pageSize: data.pageSize
            },
        }).then(function (response) {
            console.log(response)
            console.log("12345678")
            tableData.value = response.data.data
            /* console.log(tableData)
            data.tableData=response.data.data
            data.total=response.data.data.total	 */
        }).catch(function (error) {
            console.log(error)
        })
    }

    //查询所有社保方案
    onBeforeMount(() => {
        axios.get("/cxsbfa", {
            params: {
                pageNum: data.pageNum,
                pageSize: data.pageSize
            }
        }).then(function (response) {
            tableData.value = response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    })

    //分页
    function page() {
        axios.get("/cxsbfa", {
            params: {pageNum: data.pageNum, pageSize: data.pageSize}
        }).then(function (response) {
            tableData.value = response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    }


    //查询所有社保方案(具体)
    function selectsbfa(sbbh) {
        // console.log(sbbh)
        axios.get("/selectsbfa?sbbh=" + sbbh).then(function (response) {
            // console.log(response)
            var sj=[];
            gridData.value = response.data.data
            for (var i = 0; i < response.data.data.length; i++) {
                sj.push(response.data.data[i].sbjsbh)
            }
            data.xgform.sbjslistss=sj;
            data.xgform = {sbbh: response.data.data[0].sbbh, sbmc: response.data.data[0].sbmc,sbjslistss: sj}/*,check:response.data.data*/
             console.log(data.xgform)

            /*
            for (var i = 0; i < response.data.data.length; i++) {
                data.jsjh.push({sbjsbh: response.data.data[i].sbjsbh, sbname: response.data.data[i].sbname})
            }
            console.log(data.jsjh)*/

            /*data.check = response.data.data*/
        }).catch(function (error) {
            console.log(error)
        })
    }

    //模糊查询社保方案
    function cxfabbyidorname() {
        axios.get("/cxfabidorname", {
            params: {
                sbmc: data.sbmc
            }
        }).then(function (response) {
            console.log(response)
            tableData.value = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }

    //查询社保基数信息
    function selectsbjsxx() {
        axios.get("/selectsbjsxx").then(function (response) {
            var sj = [];
            var sj2 = [];
            for (var i = 0; i < response.data.data.length; i++) {
                sj.push({value: response.data.data[i].sbjsbh, label: response.data.data[i].sbname})
                sj2.push({sbjsbh: response.data.data[i].sbjsbh, sbname: response.data.data[i].sbname})
            }
            options.value = sj;
            data.sbjslists=sj2;
           /* data.sbjslist=sj*/
        }).catch(function (error) {
            console.log(error)
        })
    }

    function getCheckedNodes(leafOnly) {
        data.sbvo.qbsj = []
        for (var i = 0; i < leafOnly.length; i++) {
            data.sbvo.qbsj.push(leafOnly[i] + '')
        }
    }

    //新增社保方案
    function insertsbfa() {
        data.sbvo.sbmc = ruleForm.name
        axios.post("/insertsbfa", data.sbvo).then(function (response) {
            console.log(response)
            name:ruleForm.name
            options:options.value
            xz()
            refresh()//新增完成刷新界面
        }).catch(function (error) {
            console.log(error)
        })
        insert.value = false
    }

    //删除社保方案
    function deletesbfa(sbbh) {
        console.log(sbbh)
        if (confirm("确认删除吗？")) {
            axios.get("/deletesbfa", {
                params: {
                    sbbh: sbbh
                }
            }).then(function (response) {
                if (response.data.code != 200) {
                    console.log("删除失败！" + response.data.message)
                    return
                }
                sc()
                refresh()//删除完成刷新界面
            }).catch(function (error) {
                console.log(error)
            })
        } else {
            console.log("已取消！")
            qx()
        }
    }

    //修改社保方案
    function xgsbfa() {
        console.log(data.xgform.sbjslistss)
        axios.put("/xgsbfa", data.xgform).then(function (response) {
            console.log(response)
            xg()
            refresh()
        }).catch(function (error) {
            console.log(error)
        })
    }

    //社保状态改变
    function change(val, sbbh) {
        if (confirm("确定要修改状态吗？")) {
            data.fab = {
                sbbh: sbbh,
                sbzt: val
            }
            axios.put("/xgzt", data.fab).then(function (response) {
                sbzt()
                refresh()
            }).catch(function (error) {
                console.log(error)
            })
        } else {
            console.log("已取消！")
            qx()
            refresh()
        }
    }
</script>

<template>
    <div id="head">
        <span id="title">社保方案</span>
        <input type="text" placeholder="请输入方案名称" v-model="data.sbmc" id="txt">
        <el-button type="primary" :icon="Search" class="cx" @click="cxfabbyidorname">查询</el-button>
        <el-button type="primary" :icon="Plus" @click="selectsbjsxx(),insert= true;" class="btns">新增</el-button>

        <!-- 新增信息弹窗 -->
        <el-dialog v-model="insert" title="新增社保方案">
            <el-form :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" :size="formSize">
                <el-form-item label="方案名称" prop="name">
                    <el-input v-model="ruleForm.name"/>
                </el-form-item>
                <!--级联菜单-->
                <div class="example-block">
                    <span class="example-demonstration">社保基数</span>
                    <el-cascader
                            @change="getCheckedNodes"
                            placeholder="请选择社保基数"
                            :options="options"
                            :props="props"
                            clearable
                    />
                </div>
            </el-form>
            <template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="insertsbfa">提交</el-button>
					<el-button @click="insert = false">取消</el-button>
				</span>
            </template>
        </el-dialog>
        <!--修改信息弹窗-->
        <el-dialog v-model="update" title="修改社保方案" width="50%" center>
            <el-form label-width="120px" :model="data.xgform">
                <el-form-item label="社保方案编号">
                    <el-input v-model="data.xgform.sbbh" disabled/>
                </el-form-item>
                <el-form-item label="社保名称">
                    <el-input v-model="data.xgform.sbmc"/>
                </el-form-item>
               <!-- <el-form-item label="社保基数">
                    <el-checkbox-group v-model="data.check" v-for="item in data.check">
                        <el-checkbox :value="item.sbjsbh" :label="item.sbname"/>
                    </el-checkbox-group>
                </el-form-item>-->
                <el-form-item label="社保基数">
                    <el-checkbox-group  v-model="data.xgform.sbjslistss">
                        <el-checkbox v-for="item in data.sbjslists" :value="item.sbjsbh" :label="item.sbjsbh" >
                            {{item.sbname}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="xgsbfa(data.xgform)">修改</el-button>
					<el-button @click="update=false">取消</el-button>
				</span>
            </template>
        </el-dialog>
    </div>
    <!-- 表格 -->
    <el-table
            :data="tableData"
            @row-dblclick="dj"
    >
        <el-table-column property="sbbh" label="社保方案id" sortable/>
        <el-table-column property="sbmc" label="方案名称"/>
        <el-table-column label="社保状态">
            <template #default="scope" v-solt="scope">
                <el-switch
                        v-model="scope.row.sbzt"
                        @change="change(scope.row.sbzt,scope.row.sbbh)"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="启用"
                        inactive-text="禁用"
                        :active-value="1"
                        :inactive-value="0"/>

            </template>
        </el-table-column>
        <el-table-column align="center">
            <template #default="scope">
                <el-button size="default" type="primary" :icon="Edit" @click="update= true,selectsbjsxx(),selectsbfa(scope.row.sbbh)">编辑</el-button>
                <el-button size="default" type="danger" :icon="Delete" @click="deletesbfa(scope.row.sbbh)"
                           :disabled="scope.row.sbzt==1?true:false">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--社保方案详情弹窗-->
    <el-drawer
            v-model="table"
            title="社保方案详情"
            direction="ttb"
            size="60%"
    >
        <el-table :data="gridData">
            <!--<el-table-column property="sbbh" label="社保方案id"/>
            <el-table-column property="sbmc" label="方案名称"/>-->
            <el-table-column property="sbjsbh" label="社保基数id"/>
            <el-table-column property="sbname" label="社保名称"/>
            <el-table-column property="sbjsje" label="基数金额"/>
            <el-table-column property="sbjnbl" label="缴纳比例"/>
        </el-table>
    </el-drawer>
    <!-- 分页-->
    <div class="page">
        <el-pagination background layout="prev, pager, next"
                       v-model:current-page="this.data.pageNum"
                       v-model:page-size="this.data.pageSize"
                       :total="data.total"
                       @current-change="page"/>
    </div>
</template>

<style scoped>
    #head {
        margin: 10px;
    }

    #title {
        font-weight: bold;
        font-size: 18px;
        margin-left: -180px;
    }

    #txt {
        width: 200px;
        height: 20px;
        margin: 0px 0px 0px 50%;
    }

    .cx {
        width: 66px;
        height: 25px;
        margin: 0px 10px 0px 0px;
    }

    .btns {
        width: 66px;
        height: 25px;
        margin: 0px 10px 0px 10px;
    }

    .example-block {
        margin: 0px 10px 0px -55px;
    }

    .example-demonstration {
        margin: 1em;
    }
</style>
