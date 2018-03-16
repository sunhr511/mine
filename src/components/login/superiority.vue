<template>
  <!-- <div style="width:100%;height:100%;border:3px solid red;display:flex;justify-content:center;align-items:flex-end">
    <div style="width:50px;height:50px;border:3px solid green"></div>
  </div> -->
  <div>
      <img style="width:100%;" :src="require('../../assets/superiority/superiorityBannner.png')" >
    <el-row type="flex" justify="center">
      <el-col
       :xs="{span: 24}" :sm="{span: 22}"
       :md="{span: 21}" :lg="{span: 15}"
       style="text-align:center;transition: .6s all;">
        <p style="font-size:36px;margin-top:15px">项目优势</p>
        <br><br>
        <el-row type="flex" justify="space-between" style="flex-wrap:wrap;" >
          <el-col :span="11"
            v-for="(x, index) in imgTitle"
            :key="x"
            :class="(index%2 !==0)?'leftOr':'rightOr'">
            <img :src="imgSrc[index]"  :class="(index%2 !== 0)?'leftOr1':'rightOr1'" 
              style="margin-bottom:25px">
            <p style="font-size:22px;margin-bottom:5px">{{x}}</p>
            <p style="font-size:16px;">{{imgParagraph[index]}}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgTitle: ['免费策略', '高效管理', '专业培训', '一站式服务', '安全保障', '贴心协助'],
      imgParagraph: [
        '优合货运通与商管家网络版免费,为您节约成本,助您做大做强。',
        '打通信息流,货物中转状态实时可见,财务对账结算清晰透明,管理更加高效便捷。',
        '定期组织销售技巧培训和产品培训,重构企业内部流程,连续外部合作伙伴,让物流生意畅通无阻。',
        '解决从开单到签收全流程的运单流转问题,提供信息流、物流、资金流三流合一的一站式解决方案。',
        '采用世界顶尖水平的云存储技术,云安全防护技术,全程为数据加密确保了数据传输安全。',
        '步入移动办公时代,经营情况随时随地掌握,异常情况实时预警,助你管理公司更轻松。'
      ],
      imgSrc: [
        require('../../assets/superiority/免费.png'),
        require('../../assets/superiority/高效管理.png'),
        require('../../assets/superiority/专业培训.png'),
        require('../../assets/superiority/一站式服务.png'),
        require('../../assets/superiority/安全保障.png'),
        require('../../assets/superiority/贴心协助.png')
      ]
    }
  }
}
</script>
<style scoped>
  .leftOr{
    text-align: left
  }
  .rightOr{
    text-align: right
  }
  .leftOr1{
    float:left;
    margin-right: 15px;
    width:21%;
  }
  .rightOr1{
    float:right;
    width:21%;
    margin-left: 15px;
  }
</style>
