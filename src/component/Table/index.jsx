import React from 'react'
import axios from 'axios'

import TableHeader from './TableHeader'
import TableBody from './TableBody'

import './index.css'

export default function Table() {

  const [tableData, setTableData] = React.useState({
    startTime: '2001/08/24',
    courses: [],
    lessons: []
  })
  const [pageNum, setPageNum] = React.useState(0)
  // 请求课表数据
  React.useEffect(() => {
    axios.get('./test.json')
      .then((response) => {
        setTableData(response.data)
        const todayDate = new Date()
        const startDate = new Date(response.data.startTime)
        const whatWeek = Math.floor((todayDate - startDate) / 604800000)
        setPageNum(whatWeek)
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])

  return (
    <div className='table'>
      <TableHeader lessons={tableData.lessons} pageNum={pageNum} setPageNum={setPageNum} />
      <TableBody tableData={tableData} pageNum={pageNum} setPageNum={setPageNum} />
    </div>
  )
}
