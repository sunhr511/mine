<template>
<div>
    <el-form :model="model"  ref="model" :rules="rules"
            label-position="right" :label-width="width">

        <el-row type="flex" justify="space-between">

              <el-col v-for="(item, index) in data" :key="index" :span="6">
                <el-form-item :label="item.label" :prop="item.props">
                  <el-date-picker
                    :autofocus="index == 0"
                  style="max-width:150px"
                    type="daterange"
                    v-if="item.date"
                    v-model="model[item.props]"
                    :placeholder="item.placeholder">
                  </el-date-picker>
                  <el-input
                  style="max-width:150px"
                    v-if="item.input"
                    :autofocus="index == 0"
                    v-model="model[item.props]"
                    :placeholder="item.placeholder"
                    ></el-input>
                  <el-select 
                  style="max-width:150px"
                    filterable
                    autofocus="autofocus"
                    clearable
                    v-if="item.select" v-model="model[item.props]"
                    @change="liandong(model[item.props])"
                    :placeholder="item.placeholder"  >
                    <el-option
                      v-for="(con, index) in item.content"
                      :key="con.label"
                      :label="con.label"
                      :value="con.value">
                        <span style="float: left" v-if="!item.guest">{{ con.label }}</span>
                        <span style="float: left" v-if="item.guest">{{ con.value }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.guest">{{ con.la }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
                 <!--select 中 以value 为主  -->

          </el-col>
<el-col :span="7" v-if="buttonGroup[0].tf|buttonGroup[1].tf|buttonGroup[2].tf">
    <el-form-item label-width="20px" style="text-align:right">
        <span class="chaBtn">
            <el-button @click="here" size="large" v-if="buttonGroup[0].tf" :loading = "buttonGroup[0].loading" :disabled="dis">{{buttonGroup[0].name}}</el-button>
        </span>&nbsp;&nbsp;
        <el-button type="warning" @click="i" v-if="buttonGroup[1].tf" size="large">{{buttonGroup[1].name}}</el-button>
        <el-button  @click="go" size="large" v-if="buttonGroup[2].tf">{{buttonGroup[2].name}}</el-button>
    </el-form-item>
</el-col>
        </el-row>
      </el-form>
</div>
</template>

<script>
export default {
  props: {
    model: Object,
    data: Array,
    rules: Object,
    buttonGroup: Array,
    width: String,
    dis: Boolean
  },
  methods: {
    here () {
      this.$emit('here', this.model)
    },
    i () {
      this.$emit('i', this.model)
    },
    go () {
      this.$emit('go', this.model)
    },
    liandong (that) {
      this.$emit('liandong', that)
    }
  }
}
</script>
<style scoped>
.chaBtn .el-button{
  color:white;
  background: #8c96d9
}
</style>
