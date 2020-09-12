<template>
  <div class="content">
    <div class="item">
      <div class="btn">
        <el-button icon="el-icon-plus" type="primary" @click="AddProduct">添加</el-button>
        <el-button icon="el-icon-search" type="primary">查询</el-button>
        <el-button type="primary">导出</el-button>
      </div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-form-item label="经销商名称">
          <el-input v-model="form.username" clearble></el-input>
        </el-form-item>
        <el-form-item label="经销商编号">
          <el-input v-model="form.username" clearble></el-input>
        </el-form-item>
        <el-form-item label="省份">
          <el-select v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="item">
      <el-table :data="tableData" border>
        <el-table-column align="center" label="经销商编号"></el-table-column>
        <el-table-column align="center" label="经销商名称"></el-table-column>
        <el-table-column align="center" label="级别"></el-table-column>
        <el-table-column align="center" label="所在省份"></el-table-column>
        <el-table-column align="center" label="城市"></el-table-column>
        <el-table-column align="center" label="区域"></el-table-column>
        <el-table-column align="center" label="状态"></el-table-column>
        <el-table-column align="center" label="操作">
          <template>
            <el-button type="text">修改</el-button>
            <el-button type="text">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="dialogtype==1 ? '添加经销商':'编辑经销商'" :visible.sync="dialogVisible" width="740px">
        <el-form
          ref="form"
          inline
          style="width:auto"
          :model="form"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="经销商名称" prop="ModuleName">
            <el-input v-model="form.ModuleName"></el-input>
          </el-form-item>
          <el-form-item label="经销商编号" prop="ModuleId">
            <el-input v-model="form.ModuleId"></el-input>
          </el-form-item>
          <el-form-item label="省份" prop="WebPageUrl">
            <el-select v-model="form.value" placeholder="请选择">
				<el-option
					v-for="item in state"
					:key="item.value"
					:label="item.label"
					:value="item.value"
					></el-option>
			</el-select>
          </el-form-item>
          <el-form-item label="城市" prop="WebPageUrl">
            <el-input v-model="form.WebPageUrl"></el-input>
          </el-form-item>
          <el-form-item label="区域" prop="WebPageUrl">
            <el-input v-model="form.WebPageUrl"></el-input>
          </el-form-item>
          <el-form-item label="负责区域" prop="SeqNo">
            <el-radio v-model="form.SeqNo">仅本省</el-radio>
            <el-radio v-model="form.SeqNo">仅本市</el-radio>
            <el-radio v-model="form.SeqNo">自定义</el-radio>
          </el-form-item>
          <el-form-item label="经销商级别" prop="WebPageUrl">
            <el-select v-model="form.value" placeholder="请选择">
				<el-option
					v-for="item in state"
					:key="item.value"
					:label="item.label"
					:value="item.value"
					></el-option>
			</el-select>
          </el-form-item>
          <el-form-item label="上级经销商" prop="WebPageUrl">
            <el-select v-model="form.value" placeholder="请选择">
				<el-option
					v-for="item in state"
					:key="item.value"
					:label="item.label"
					:value="item.value"
					></el-option>
			</el-select>
          </el-form-item>
          <el-form-item label="经销商类型" prop="WebPageUrl">
            <el-select v-model="form.value" placeholder="请选择">
				<el-option
					v-for="item in state"
					:key="item.value"
					:label="item.label"
					:value="item.value"
					></el-option>
			</el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="WebPageUrl">
			  <el-input v-model="form.value" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="WebPageUrl">
			  <el-input v-model="form.value" placeholder="联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="WebPageUrl">
			  <el-input v-model="form.value" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="WebPageUrl">
			  <el-input v-model="form.value" placeholder="备注"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="WebPageUrl">
			  <el-radio v-model="form.value" :label="1">启用</el-radio>
			  <el-radio v-model="form.value" :label="0">禁用</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="restForm">重 置</el-button>
          <el-button type="primary" @click="SetProduct">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        name: "",
        value: null,
      },
      state: [
        {
          value: 0,
          label: "禁用",
        },
        {
          value: 1,
          label: "启用",
        },
      ],
      tableData: [],
      dialogVisible: false,
      dialogtype: 0,
      dialogPack: false,
    };
  },
  methods: {
    AddProduct() {
      this.dialogVisible = true;
      this.dialogtype = 1;
    },
    restForm() {
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    },
    SetProduct() {
      this.$refs["form"].validate((isValidate) => {
        if (isValidate) {
        } else {
        }
      });
    },
    reback() {
      this.dialogPack = false;
    },
    setPack() {},
  },
};
</script>

<style scoped>
.title {
  text-align: left;
}
.item {
  margin: 10px 0;
  border: 1px solid #e3e3e3;
}
.btn {
  width: 500px;
  margin: 10px 80px;
}
.el-input,
.el-select {
  width: 220px;
}
</style>