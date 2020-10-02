<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :showPagination="false"
      >
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import { getMyRentalList } from '@/api/manage'

const columns = [
  {
    title: 'Car Model',
    dataIndex: 'carModel'
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime'
  },
  {
    title: 'End Time',
    dataIndex: 'endTime'
  }
]

export default {
  name: 'CarList',
  components: {
    STable
  },
  data () {
    this.columns = columns
    return {
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        delete parameter.pageNo
        delete parameter.pageSize
        return getMyRentalList(parameter)
          .then(res => {
            return res
          })
      }
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
