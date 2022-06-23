<script lang="ts" setup>
    import {
        Search,
        Plus,
        Edit,
        Delete
    } from '@element-plus/icons-vue'
    import axios from '../axios.js'
    import {reactive, ref, onBeforeMount} from 'vue'
    import type {
        FormRules
    } from '@element-plus'
    import {ElMessage} from 'element-plus'

    var data = reactive({
        pageNum: 1,//当前显示页码
        pageSize: 5,//每一页显示的条数
        total: 0,//总条数
        pages: 0,
        sbname: '', //查询文本框的值
        xgform: {}, //修改表单
        jscount:0,
    })
    //社保基数数据
    const jishuData = ref([])
    // 新增弹窗
    const insert = ref(false)
    const update = ref(false)
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
    //5、社保基数已被绑定
    const sbybd = () => {
        ElMessage({
            showClose: true,
            message: '此项社保基数已被绑定，不可删除！',
            type:'warning'
        })
    }

    //新增表单
    const formSize = ref('default')
    const ruleForm = reactive({
        sbname: '',
        sbjsje: '',
        sbjnbl: ''
    })
    //新增表单数据验证
    const rules = reactive<FormRules>({
        sbname: [
            {required: true, message: '请输入社保名称!', trigger: 'blur'},
        ],
        sbjsje: [
            {required: true, message: '请输入基数金额!', trigger: 'blur'},
        ],
        sbjnbl: [
            {required: true, message: '请输入缴纳比例!', trigger: 'blur'},
        ],
    })
    //查询社保基数信息
    onBeforeMount(() => {
        axios.get("/cxsbjs", {
            params: {
                pageNum: data.pageNum,
                pageSize: data.pageSize
            }
        }).then(function (response) {
            jishuData.value = response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    })


    function sbjsshuaxin() {
        axios.get("/cxsbjs", {
            params: {
                pageNum: data.pageNum,
                pageSize: data.pageSize
            }
        }).then(function (response) {
            jishuData.value = response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })

    //分页
    function page() {
        axios.get("/cxsbjs", {
            params: {pageNum: data.pageNum, pageSize: data.pageSize}
        }).then(function (response) {
            jishuData.value = response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    }

    //根据id查询基数
    function findbyjsid(sbjsbh) {
        axios.get("/findbyjsid", {
            params: {
                sbjsbh: sbjsbh
            }
        }).then(function (response) {
            console.log(response)
            data.xgform = response.data.data //简单来说就是把要修改的数据重新赋值给data.xgform对象
        }).catch(function (error) {
            console.log(error)
        })
    }

    //模糊查询社保基数信息
    function mohucxjsxx() {
        axios.get("/cxjsbyname", {
            params: {
                sbname: data.sbname
            }
        }).then(function (response) {
            jishuData.value = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }

    //新增社保基数信息
    function xzjsxx(ruleForm) {
        axios.post("/insertjsxx", ruleForm).then(function (response) {
            xz()
            sbjsshuaxin()
        }).catch(function (error) {
            console.log(error)
        })
        insert.value = false
    }

    //修改社保基数信息
    function xgjsxx(xgform) {
        axios.put("/updatejsxx",xgform).then(function (response) {
            console.log(response)
            xg()
            sbjsshuaxin()
        }).catch(function (error) {
            console.log(error)
        })
        update.value=false
    }

    //删除社保基数信息
    function scjsxx(sbjsbh) {
        console.log(sbjsbh)
        if (confirm("确认删除吗？")) {
            axios.delete("/deletejsxx", {
                params: {
                    sbjsbh: sbjsbh
                }
            }).then(function (response) {
                if(response.data.code!=200){
                    console.log("删除失败！"+response.data.message)
                    return
                }
                sc()
                sbjsshuaxin()
            }).catch(function (error) {
                console.log(error)
            })
        } else {
            console.log("已取消！")
            qx()
        }
    }

    //判断社保基数被绑定的条数
    function pdsbjsCount(sbjsbh) {
        axios.get("/pdsbjsCount",{
            params:{
                sbjsbh:sbjsbh
            }
        }).then(function (response) {
            console.log("基数id："+sbjsbh)
            data.jscount=response.data.data
            if(data.jscount==0){
                if(confirm("确认删除吗？")){
                    axios.delete("/deletejsxx", {
                        params: {
                            sbjsbh: sbjsbh
                        }
                    }).then(function (response) {
                        sc()
                        sbjsshuaxin()
                    }).catch(function (error) {
                        console.log(error)
                    })
                }else{
                    console.log("已取消！")
                    qx()
                }
            }else{
                sbybd()
            }
        }).catch(function (error) {
            console.log(error)
        })
    }
</script>

<template>
    <div id="head">
        <input type="text" placeholder="请输入社保基数名称" v-model="data.sbname" id="txt">
        <el-button type="primary" :icon="Search" class="cx" @click="mohucxjsxx">查询</el-button>
        <el-button type="primary" :icon="Plus" class="btns" @click="insert=true">新增</el-button>
    </div>
    <!--表格-->
    <el-table
            :data="jishuData"
            height="400px"
    >
        <el-table-column property="sbjsbh" label="社保基数编号" sortable/>
        <el-table-column property="sbname" label="社保名称"/>
        <el-table-column property="sbjsje" label="基数金额"/>
        <el-table-column property="sbjnbl" label="缴纳比例"/>
        <el-table-column>
            <template #default="scope">
                <el-button size="default" type="primary" :icon="Edit" @click="update=true,findbyjsid(scope.row.sbjsbh)">
                    编辑
                </el-button>
                <el-button size="default" type="danger" :icon="Delete" @click="pdsbjsCount(scope.row.sbjsbh)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 新增信息弹窗 -->
    <el-dialog v-model="insert" title="新增社保基数" width="50%" center>
        <el-form
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                :size="formSize"
        >
            <el-form-item label="社保名称" prop="sbname">
                <el-input v-model="ruleForm.sbname" class="wbk"/>
            </el-form-item>
            <el-form-item label="基数金额" prop="sbjsje">
                <el-input v-model="ruleForm.sbjsje" class="wbk"/>
            </el-form-item>
            <el-form-item label="缴纳比例" prop="sbjnbl">
                <el-input v-model="ruleForm.sbjnbl" class="wbk"/>
            </el-form-item>
        </el-form>

        <template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="xzjsxx(ruleForm)">新增</el-button>
					<el-button @click="insert = false">取消</el-button>
				</span>
        </template>
    </el-dialog>
    <!-- 修改信息弹窗 -->
    <el-dialog v-model="update" title="修改社保基数" width="50%" center>
        <el-form
                label-width="120px"
        >
            <el-form-item label="社保基数编号">
                <el-input v-model="data.xgform.sbjsbh" class="wbk" disabled/>
            </el-form-item>
            <el-form-item label="社保名称">
                <el-input v-model="data.xgform.sbname" class="wbk"/>
            </el-form-item>
            <el-form-item label="基数金额">
                <el-input v-model="data.xgform.sbjsje" class="wbk"/>
            </el-form-item>
            <el-form-item label="缴纳比例">
                <el-input v-model="data.xgform.sbjnbl" class="wbk"/>
            </el-form-item>
        </el-form>

        <template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="xgjsxx(data.xgform)">修改</el-button>
					<el-button @click="update = false">取消</el-button>
				</span>
        </template>
    </el-dialog>
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
        margin: 15px;
    }

    #txt {
        width: 200px;
        height: 20px;
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

    .wbk{
        width: 520px;
    }
</style>