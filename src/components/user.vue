<script setup>
	//组合式api
	import {
		Delete,
		Edit,
		Search,
		Share,
		Upload
	} from '@element-plus/icons-vue'
	import {
		
		ElNotification
	} from 'element-plus'
	import {
		ElLoading
	} from 'element-plus'
	import {
		ref,
		computed,
		reactive,
		getCurrentInstance,
		watch,
		onBeforeMount,
		inject
	} from 'vue'
	import axios from 'axios'
	import {
		useRoute,
		onBeforeRouteUpdate
	} from 'vue-router'
	const dialogTableVisible = ref(false)
	const dialogFormVisible = ref(false)
	const dialogFormVisible2 = ref(false)
	const formLabelWidth = '140px'
	const fullscreenLoading = ref(false)
	//新增数组
	const insers=reactive({
			ybh:'',
			bcbh:'2',
			rzbh:'32',
			zwbh:'32',
			sbbh:'2',
			ygzt:'',
			yzh:'',
			ymm:''
		})
	var data = reactive({
		users: [],//存入查询后端响应过来的数据
		total: 0,//总页数
		pageNum: 1,//当前显示页码
		pageSize: 9,//每一页显示的条数
		cx:{} //根据id传后端查询返回的值
})	
	
 function a(ybh){
 	 console.log("用户id"+ybh)
 	axios.get("http://localhost:8080/xm/findcxid/"+ybh)
 			//.then相当于ajax中的success:function成功回调函数
 				.then(function(response){
 					console.log(response)
 					//获取后端传入的数据
 					console.log(response.data.data)
 					data.cx=response.data.data//简单来说就是把修改后的数据重新赋值给data.cx对象
 					
 				})
 		}
		//根据id查询
		function b(ybh){
			 console.log("用户id2222222222"+ybh)
			axios.get("http://localhost:8080/xm/user/"+ybh)
					//.then相当于ajax中的success:function成功回调函数
						.then(function(response){
							//获取后端传入的数据						
							data.users=response.data.data//简单来说就是把修改后的数据重新赋值给data.users对象
						})
				}
		function delUser(ybh){
			console.log(ybh)
			axios.post("http://localhost:8080/xm/delete/"+ybh).then(function(response){
			}).catch(function(error){
				alert("删除失败")
				return
			})
		}
  //生命周期
	onBeforeMount(() => {
		axios.get("http://localhost:8080/xm/findusers", {
			params: {
				pageNum: data.pageNum,
				pageSize: data.pageSize
			}
		}).then(function(response) {
			console.log(response.data.data)
			data.users = response.data.data.list
			data.total = response.data.data.total
			console.log(data.users)
		}).catch(function(error) {
			console.log(error)
		})
	})
	//修改方法
function xiugai(ybh){
	axios.put("http://localhost:8080/xm/user",data.cx).then(function(response){
		if(response.data.code!=200){
			alert('修改失败'+response.data.code)
			return
		}
		
	}).catch(function(error){
		
		return
	})
	}
	//新增方法
	function xinzeng(){
		axios.post("http://localhost:8080/xm/adddept",insers).then(function(response){
			
			insers.ybh=response.data.users.ybh
			insers.bcbh=response.data.users.bcbh
			insers.rzbh=response.data.users.rzbh
			insers.zwbh=response.data.users.zwbh
			insers.sbbh=response.data.users.sbbh
			insers.ygzt=response.data.users.ygzt
			insers.yzh=response.data.users.yzh
			insers.ymm=response.data.users.ymm
		
		}).catch(function(error) {
			console.log(Error)
		})
	}
	//分页
	function page() {
		axios.get("http://localhost:8080/xm/findusers", {
			params: {
				pageNum: data.pageNum,
				pageSize: data.pageSize
			}
		}).then(function(response) {
			data.total = response.data.data.total
			data.users = response.data.data.list
			console.log(data.users)
		}).catch(function(error) {
			console.log(error)
		})
	}

	
	

	const openFullScreen1 = () => {
		const loading = ElLoading.service({
			lock: true,
			text: '刷新中',
			background: 'rgba(0, 0, 0, 0.7)',
		})
		setTimeout(() => {
			loading.close()
		}, 2000)
	}
	const form = reactive({

		delivery: false


	})
	const open = () => {
	  ElNotification({
	  	title: '修改',
	  	message: '修改成功',
	  	type: 'success',
	  })
	}
	const open1 = () => {
		ElNotification({
			title: '删除',
			message: '删除成功',
			type: 'success',
		})
	}
	const open2 = () => {
		ElNotification({
			title: '新增',
			message: '新增成功',
			type: 'success',
		})
	}
	const reload = inject('reload')
	
</script>

<template >

	<div>

		
		<el-button type="primary" @click="openFullScreen1" style="position: relative;right: -810px;">刷新</el-button>
		<el-button @click="dialogFormVisible2=true" style="position: relative;right: -810px;">新增</el-button>
		
			<el-button style="position: relative;right: -145px;" @click="b(data.users.ybh)" >查询</el-button>
		  <el-input v-model="data.users.ybh"   placeholder="请输入员工编号" clearable style="width: 200px;position: relative;right: 125px;" />
	 
		
<!-- 员工展示 -->
		<el-table v-bind:data="data.users" style="width: 100%" height="400">
			<el-table-column prop="ybh"   label="员工编号" />
			<el-table-column prop="bcbh" label="班次表编号" />
			<el-table-column prop="rzbh" label="人才子表编号" />
			<el-table-column prop="zwbh" label="职位表编号" />
			<el-table-column prop="sbbh" label="社保方案编号" />
			<el-table-column prop="ygzt" label="员工状态" />
			<el-table-column prop="yzh" label="账号" />
			<el-table-column prop="ymm" label="密码" />
			<el-table-column  label="操作" >
				<template #default=scope v-slot="scope">
				<!-- 删除 -->
					<el-button type="primary" :icon="Delete" plain @click="delUser(scope.row.ybh),open1();reload()" />
					<el-button size="20px" @click="a(scope.row.ybh),dialogFormVisible=true">编辑</el-button>
				</template>
				
			</el-table-column>
		
		</el-table>
 <!--分页 -->
		<el-pagination style="position: relative;right: -660px;" v-model:currentPage="this.data.pageNum"
			v-model:page-size="this.data.pageSize" layout="prev,pager,next" :total="this.data.total"
			@current-change="page" prev-text="上一页" next-text="下一页" />
	</div>

<!-- 弹出的修改页面 -->
	 <el-dialog v-model="dialogFormVisible" title="修改员工信息">
		<el-form v-bind:model="data.cx">
			<el-form-item label="员工编号" :label-width="formLabelWidth">
				<el-input v-model="data.cx.ybh"/>
			</el-form-item>
			<el-form-item label="班次表编号" :label-width="formLabelWidth">
				<el-input v-model="data.cx.bcbh" disabled/>
			</el-form-item>
			<el-form-item label="人才子表编号" :label-width="formLabelWidth">
				<el-input v-model="data.cx.rzbh" disabled/>
			</el-form-item>
			<el-form-item label="职位表编号" :label-width="formLabelWidth">
				<el-input v-model="data.cx.zwbh" disabled/>
			</el-form-item>
			<el-form-item label="社保方案编号" :label-width="formLabelWidth">
				<el-input v-model="data.cx.sbbh" disabled/>
			</el-form-item>
			<el-form-item label="员工状态" :label-width="formLabelWidth">
				<el-input v-model="data.cx.ygzt"/>
			</el-form-item>
			<el-form-item label="账号" :label-width="formLabelWidth">
				<el-input v-model="data.cx.yzh"/>
			</el-form-item>
			<el-form-item label="密码" :label-width="formLabelWidth" >
				<el-input v-model="data.cx.ymm" show-password/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">关闭</el-button>
				<el-button type="primary" @click="dialogFormVisible = false,xiugai(data.cx),open(),reload()">确定</el-button>
			</span>

		</template>
		
	</el-dialog> 
<!-- 弹出新增弹窗 -->
<el-dialog v-model="dialogFormVisible2" title="新增员工信息" :modal="insers">
		<el-form>
			<el-form-item label="员工编号" :label-width="formLabelWidth">
				<el-input v-model="insers.ybh"/>
			</el-form-item>
			
			<el-form-item label="员工状态" :label-width="formLabelWidth">
				<el-input v-model="insers.ygzt"/>
			</el-form-item>
			<el-form-item label="账号" :label-width="formLabelWidth">
				<el-input  v-model="insers.yzh"/>
			</el-form-item>
			<el-form-item label="密码" :label-width="formLabelWidth">
				 <el-input v-model="insers.ymm" show-password  maxlength="10"/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">关闭</el-button>
				<el-button type="primary" @click="dialogFormVisible2 = false,xinzeng(),open2();reload()">确定</el-button>
			</span>

		</template>
		
	</el-dialog> 
</template>

<script type="text/javascript"> 


</script>

<style>

</style>
