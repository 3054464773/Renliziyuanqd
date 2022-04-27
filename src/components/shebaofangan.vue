<script lang="ts" setup>
	import {
		Search,
		Plus,
		Edit,
		Delete
	} from '@element-plus/icons-vue'
	import {
		reactive,
		ref
	} from 'vue'
	import type {
		FormInstance,
		FormRules
	} from 'element-plus'
	import type { ElTable } from 'element-plus'
	//表格
	interface User {
	  date: string
	  name: string
	  address: string
	}
	const multipleTableRef = ref<InstanceType<typeof ElTable>>()
	const multipleSelection = ref<User[]>([])
	const tableData: User[] = [
	  {
	    date: '2016-05-03',
	    name: 'Tom',
	    address: 'No. 189, Grove St, Los Angeles',
	  },
	  {
	    date: '2016-05-02',
	    name: 'Tom',
	    address: 'No. 189, Grove St, Los Angeles',
	  },
	  {
	    date: '2016-05-04',
	    name: 'Tom',
	    address: 'No. 189, Grove St, Los Angeles',
	  },
	  {
	    date: '2016-05-01',
	    name: 'Tom',
	    address: 'No. 189, Grove St, Los Angeles',
	  },
	  {
	    date: '2016-05-08',
	    name: 'Tom',
	    address: 'No. 189, Grove St, Los Angeles',
	  },
	  {
	    date: '2016-05-06',
	    name: 'Tom',
	    address: 'No. 189, Grove St, Los Angeles',
	  },
	  {
	    date: '2016-05-07',
	    name: 'Tom',
	    address: 'No. 189, Grove St, Los Angeles',
	  },
	]
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
	//新增表单数据验证
	const rules = reactive < FormRules > ({
		name: [{
				required: true,
				message: 'Please input Activity name',
				trigger: 'blur'
			},
			{
				min: 3,
				max: 5,
				message: 'Length should be 3 to 5',
				trigger: 'blur'
			},
		],
		region: [{
			required: true,
			message: 'Please select Activity zone',
			trigger: 'change',
		}, ],
		type: [{
			type: 'array',
			required: true,
			message: 'Please select at least one activity type',
			trigger: 'change',
		}, ],
		resource: [{
			required: true,
			message: 'Please select activity resource',
			trigger: 'change',
		}, ],
	})
	/* //表格数据
	const tableData = [{
			date: '2016-05-03',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-02',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-04',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-01',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-01',
			name: 'jack',
			address: 'No. 189, lisa gj, Los knkbb',
		},
		{
			date: '2016-05-10',
			name: 'jack',
			address: 'No. 189, lisa gj, Los knkbb',
		},

	] */
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
	    ref="multipleTableRef"
	    :data="tableData"
	    style="width: 100%"
	  >
	    <el-table-column type="selection" width="55" />
	    <el-table-column label="Date" width="120">
	      <template #default="scope">{{ scope.row.date }}</template>
	    </el-table-column>
	    <el-table-column property="name" label="Name" width="120" />
	    <el-table-column property="address" label="Address" show-overflow-tooltip />
	  </el-table>
	
	<!-- <el-table :data="tableData" border style="width: 100%">
		<el-table-column prop="date" label="Date" width="180" sortable />
		<el-table-column prop="name" label="Name" width="180" />
		<el-table-column prop="address" label="Address" />
	</el-table> -->
	<!-- <el-pagination background :page-size="10" layout="prev, pager, next" :total="100"/> -->
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
