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
        <span slot="action" slot-scope="text, record">
          <template>
            <a v-if="record.carStock > 0" @click="handleBook(record)">Book</a>
            <a v-if="record.carStock <= 0" disabled>Book</a>
          </template>
        </span>
      </s-table>

      <a-modal
        title="Choose a booking period"
        :width="640"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form :form="form">
          <a-form-item
            label="Start and end date"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 15}, sm: {span: 15} }"
          >
            <a-range-picker
              name="bookTime"
              :showTime="true"
              style="width: 100%"
              v-decorator="[
                'bookTime',
                {rules: [{ required: true, message: 'Please select the start and end dates' }]}
              ]"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getCarList, postBookCar } from '@/api/manage'

const columns = [
  {
    title: 'Car Model',
    dataIndex: 'carModel'
  },
  {
    title: 'In stock',
    dataIndex: 'carStock'
  },
  {
    title: 'option',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
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
      // create model
      visible: false,
      row: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        delete parameter.pageNo
        delete parameter.pageSize
        return getCarList(parameter).then((res) => {
          return res
        })
      },
      form: this.$form.createForm(this)
    }
  },
  created () {},
  computed: {},
  methods: {
    handleBook (row) {
      this.visible = true
      this.row = row
    },
    handleOk () {
      const form = this.form
      form.validateFields((errors, values) => {
        if (!errors) {
          const data = Object.assign({},
            {
              id: this.row.id,
              userId: 1, // demo 写死 userId 为 1
              startTime: moment(values.bookTime[0]).format('YYYY-MM-DD HH:mm:ss'),
              endTime: moment(values.bookTime[0]).format('YYYY-MM-DD HH:mm:ss')
            }
          )
          postBookCar(data).then((res) => {
            console.log(res)
            this.visible = false
            this.$router.push({ name: 'DashboardMyRental' }, () => {
              this.$notification.success({
                message: 'Success',
                description: `Car rental success!`
              })
            })
          })
        } else {
          console.log('errors', errors)
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.form
      form.resetFields() // 清理表单数据（可不做）
    }
  }
}
</script>
