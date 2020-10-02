import Mock from 'mockjs2'

const myRentalList = {
  data: [
    {
      'id': 1,
      'carModel': 'Toyota Camry',
      'startTime': '2020-10-01 12:00:00',
      'endTime': '2020-10-01 12:00:00'
    },
    {
      'id': 2,
      'carModel': 'BMW 650',
      'startTime': '2020-10-01 12:00:00',
      'endTime': '2020-10-01 12:00:00'
    }
  ]
}

const carinfo = {
  'code': 0,
  'msg': 'success',
  'data': [
    {
      'id': 1,
      'carModel': 'Toyota Camry',
      'carStock': '0',
      'total': '2'
    },
    {
      'id': 2,
      'carModel': 'BMW 650',
      'carStock': '2',
      'total': '2'
    }
  ]
}

const bookParams = {
  data: {
    'userName': 'Zoe',
    'model': 'BMW 650',
    'start_date': '',
    'end_date': ''
  }
}

Mock.mock(/\/api\/v1\/rentals\?userId=1/, 'get', myRentalList)
Mock.mock(/\/api\/v1\/carInfo/, 'get', carinfo)
Mock.mock(/\/api\/v1\/rentals\/book/, 'post', bookParams)
