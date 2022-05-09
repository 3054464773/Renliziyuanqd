<script lang="ts" setup>
    import {
        Search,
        Plus,
        Edit,
        Delete
    } from '@element-plus/icons-vue'
    import {
        reactive,
        ref,
        onMounted
    } from 'vue'

    import type {
        FormRules
    } from 'element-plus'

    import axios from '../axios.js'

    const total = ref(0)
    const tableData = ref([])
    var data = reactive({
        pageNum: 1,//当前显示页码
        pageSize: 3,//每一页显示的条数
        sbmc: '',//社保名称
    })
    // 分页标签
    const currentPage = ref(1)
    const pageSize = ref(20)
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)
    // 新增弹窗
    const insert = ref(false)
    //社保详情界面弹窗
    const table = ref(false)
    const gridData = ref([])
    //社保基数级联菜单
    const options=ref([])
    //新增表单数据
    const formSize = ref('default')
    const props = {multiple: true}
    const ruleForm = reactive({
        faid: '',
        name: '',
    })
    //新增表单数据验证
    const rules = reactive<FormRules>({
        faid: [
            {required: true, message: '请输入方案id！', trigger: 'blur'},
            {min: 0, max: 6, message: '请输入合法的方案id！', trigger: 'blur'},
        ],
        name: [
            {required: true, message: '请输入方案名称！', trigger: 'blur'},
        ]
    })

    //获取表格的指定行
    function dj(row) {
        table.value = true;
        console.log(row)
        selectsbfa(row.sbbh)
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
    function cxsbfa() {
        axios.get("/cxsbfa", {
            params: {
                pageNum: data.pageNum,
                pageSize: data.pageSize
            },
        }).then(function (response) {
            console.log(response)
            tableData.value = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }

    //查询所有社保方案(具体)
    function selectsbfa(sbbh) {
        axios.get("/selectsbfa", {
            params: {
                sbbh: sbbh
            }
        }).then(function (response) {
            console.log(response)
            gridData.value = response.data.data
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
            var sj=[];
            for(var i=0;i<response.data.data.length;i++){
                console.log(response.data.data[i].sbjsbh)
                sj.push({value:response.data.data[i].sbjsbh,label:response.data.data[i].sbname})
            }
           options.value=sj;
        }).catch(function (error) {
            console.log(error)
        })
        insert.value = true;
    }

    //删除社保方案
    function deletesbfa(sbbh){
        console.log(sbbh)
        if(confirm("确认删除吗？")){
            axios.delete("/deletesbfa", {
                params: {
                    sbbh: sbbh
                }
            }).then(function (response) {
                if(response.data.code!=200){
                    console.log("删除失败！"+response.data.message)
                    return
                }
                location.reload()
            }).catch(function (error) {
                console.log(error)
            })
        }else{
            console.log("已取消！")
        }
    }
    //页面加载完毕后调用
    onMounted(() => {
        //selectlist()
        cxsbfa()
    })

</script>

<template>
    <div id="head">
        <span id="title">社保方案</span>
        <input type="text" placeholder="请输入方案名称" v-model="data.sbmc" id="txt">
        <el-button type="primary" :icon="Search" class="cx" @click="cxfabbyidorname">查询</el-button>
        <el-button type="primary" :icon="Plus"  @click="selectsbjsxx" class="btns">新增</el-button>

        <!-- 新增信息弹窗 -->
        <el-dialog v-model="insert" title="社保方案">
            <el-form :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" :size="formSize">
                <el-form-item label="社保方案id" prop="faid">
                    <el-input v-model="ruleForm.faid"/>
                </el-form-item>
                <el-form-item label="方案名称" prop="name">
                    <el-input v-model="ruleForm.name"/>
                </el-form-item>
                <!--级联菜单-->
                <div class="example-block">
                    <span class="example-demonstration">社保基数</span>
                    <el-cascader
                            :options="options"
                            :props="props"
                            collapse-tags
                            collapse-tags-tooltip
                            clearable
                    />
                </div>
            </el-form>
            <template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="insert = false">提交</el-button>
					<el-button @click="insert = false">取消</el-button>
				</span>
            </template>
        </el-dialog>
    </div>
    <!-- 表格 -->
    <el-table
            :data="tableData"
            @row-dblclick="dj"
    >
        <el-table-column property="sbbh" label="社保方案id"/>
        <el-table-column property="sbmc" label="方案名称"/>
        <el-table-column align="center">
            <template #default="scope">
                <el-button size="default" type="primary" :icon="Edit">编辑</el-button>
                <el-button size="default" type="danger" :icon="Delete" @click="deletesbfa(scope.row.sbbh)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--社保方案详情弹窗-->
    <el-drawer
            v-model="table"
            title="社保方案详情"
            direction="ttb"
            size="80%"
    >
        <el-table :data="gridData">
            <el-table-column property="sbbh" label="社保方案id"/>
            <el-table-column property="sbmc" label="方案名称"/>
            <el-table-column property="sbjsbh" label="社保基数id"/>
            <el-table-column property="sbname" label="社保名称"/>
            <el-table-column property="sbjsje" label="基数金额"/>
            <el-table-column property="sbjnbl" label="缴纳比例"/>
        </el-table>
    </el-drawer>
    <!--分页标签-->
    <!--<el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
                   :small="small" :disabled="disabled" :background="background"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="100"/>-->
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
