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
		FormInstance,
		FormRules
	} from 'element-plus'
	import axios from '../axios.js'
	const total=ref(0)
	const tableData=ref([])
	var data=reactive({
		pageNum:1,
		pageSize:3
	})
	// 分页标签
	const currentPage = ref(1)
	const pageSize = ref(20)
	const small = ref(false)
	const background = ref(false)
	const disabled = ref(false)
	// 新增弹窗
	const insert = ref(false)
	//新增表单数据
	const formSize = ref('default')
	const ruleForm = reactive({
		faid: '',
		name: '',
		jsid: '',
		jsje: '',
		type: [],
		bili: ''
	})
	//查询所有数据方法
	function selectlist(){
		console.log("1111111111111")
		axios.get("/selectList",{
			params:{
				pageNum:data.pageNum,
				pageSize:data.pageSize
			},
		}).then(function(response){
			console.log(response)
			console.log("12345678")
			tableData.value=response.data.data
			/* console.log(tableData)
			data.tableData=response.data.data
			data.total=response.data.data.total	 */
		}).catch(function(error){
			console.log(error)
		})
	}
	//新增表单数据验证
	const rules = reactive < FormRules > ({
		faid: [
			{ required: true,message: '请输入方案id！',trigger: 'blur'},
			{ min: 0, max: 6,message: '请输入合法的方案id！',trigger: 'blur'},
		],
		name: [
			{ required: true, message: '请输入方案名称！',trigger: 'blur',},
		],
		jsid: [
			{ required: true, message: '请输入社保基数id！',trigger: 'blur',},
		],
		jsje: [
			{ required: true, message: '请输入基数金额！',trigger: 'blur',},
		],
		type: [
			{ type: 'array', required: true, message: '请选择社保名称！', trigger: 'change'}, 
		],
		bili: [
			{ required: true, message: '请选择缴纳比例！', trigger: 'change',},
			],
	})
	//页面加载完毕后调用
	onMounted (()=>{
		selectlist()
	})
</script>

<template>
	<div id="head">
		<span id="title">社保方案</span>
		<input type="text" placeholder="请输入查询条件" id="txt">
		<el-button type="primary" :icon="Search" class="cx">查询</el-button>
		<el-button type="primary" :icon="Plus" @click="insert=true" class="btns">新增</el-button>

		<!-- 信息弹窗 -->
		<el-dialog v-model="insert" title="社保方案">
			<el-form :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" :size="formSize">
				<el-form-item label="社保方案id" prop="faid">
					<el-input v-model="ruleForm.faid" />
				</el-form-item>
				<el-form-item label="方案名称" prop="name">
					<el-input v-model="ruleForm.name" />
				</el-form-item>
				<el-form-item label="社保基数id" prop="jsid">
					<el-input v-model="ruleForm.jsid" />
				</el-form-item>
				<el-form-item label="基数金额" prop="jsje">
					<el-input v-model="ruleForm.jsje" />
				</el-form-item>
				<el-form-item label="社保名称" prop="type">
					<el-checkbox-group v-model="ruleForm.type">
						<el-checkbox label="养老保险" name="type" />
						<el-checkbox label="医疗保险" name="type" />
						<el-checkbox label="失业保险" name="type" />
						<el-checkbox label="工伤保险" name="type" />
						<el-checkbox label="生育保险" name="type" />
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="缴纳比例" prop="bili">
					<el-radio-group v-model="ruleForm.bili">
						<el-radio label="1" />
						<el-radio label="0" />
					</el-radio-group>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="insert = false">提交</el-button>
					<el-button @click="insert = false">取消</el-button>
				</span>
			</template>
		</el-dialog>
		<el-button type="primary" :icon="Edit" class="btns" disabled>编辑</el-button>
		<el-button type="primary" :icon="Delete" class="btns" disabled>删除</el-button>
	</div>
	<!-- 表格 -->
	<el-table
	    :data="tableData"
	>
	    <el-table-column type="selection" width="55" />
	    <el-table-column property="bcbh" label="班次编号" width="160" sortable/>
	    <el-table-column property="bcmc" label="班次名称"  width="160" />
		<el-table-column property="bckssj" label="班次开始时间" show-overflow-tooltip sortable />
		<el-table-column property="bcjssj" label="班次结束时间" show-overflow-tooltip  sortable/>
	  </el-table>
	
	<el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
		:small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
		:total="100" />
</template>

<style scoped>
	#head {
		margin: 10px;
	}

	#title {
		font-weight: bold;
		font-size: 18px;
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
</style>
