<template>
  <div class="content">
    <div class="item">
      <div class="btn">
        <el-button icon="el-icon-plus" type="primary" @click="AddProduct">添加</el-button>
        <el-button icon="el-icon-search" type="primary">查询</el-button>
        <el-button type="primary">导出</el-button>
      </div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-form-item label="包装层级">
          <el-select v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in options"
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
        <el-table-column align="center" label="包装层级"></el-table-column>
        <el-table-column align="center" label="比例表达式"></el-table-column>
        <el-table-column align="center" label="操作">
          <template>
            <el-button type="text">修改</el-button>
            <el-button type="text">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加包装比例" :visible.sync="dialogPack" width="360px">
        <el-form ref="form" style="width:auto" :model="form" label-width="100px">
          <el-form-item label="包装层级">
            <el-input v-model="form.ModuleId"></el-input>
          </el-form-item>
          <el-form-item label="三级包装数量">
            <el-input v-model="form.ModuleId"></el-input>
          </el-form-item>
          <el-form-item label="二级包装数量">
            <el-input v-model="form.ModuleId"></el-input>
          </el-form-item>
          <el-form-item label="一级包装数量">
            <el-input v-model="form.ModuleId"></el-input>
          </el-form-item>
          <el-form-item label="比例表单式">
            <el-input v-model="form.ModuleId"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="reback">返 回</el-button>
          <el-button type="primary" @click="SetPack">提 交</el-button>
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
		ModuleId: null
	  },
	  options: [],
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
      dialogtype: 0,
      dialogPack: false,
    };
  },
  methods: {
    AddProduct() {
      this.dialogPack = true;
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
    SetPack() {},
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