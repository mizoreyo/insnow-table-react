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
  const [lessonInfo, setLessonInfo] = React.useState({
    isInfoShow: false,
    lessonName: "游戏程序设计",
    lessonTeacherName: "单武扬",
    lessonHour: "32",
    lessonCredit: "3",
    lessonRoom: "6A209",
    lessonRemark: "同学们准备一台配置不太过时的电脑，复习数字图像处理、计算机图形学，预习Csharp将有利于提升学习效果。"
  })

  function closeInfo() {
    setLessonInfo({ ...lessonInfo, isInfoShow: false })
  }
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
      <div className='lesson-info-container' style={lessonInfo.isInfoShow ? {} : { top: '100%' }} onClick={closeInfo}>
        <div className='lesson-info'>
          <div className='lesson-info-close'><i className='iconfont icon-xiajiantou'></i></div>
          <ul className='lesson-info-list' onClick={(event) => { event.stopPropagation() }}>
            <li className='lesson-info-attr'>
              <div className='attr-name'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref='#icon-shuji'></use>
                </svg>
                <span>名称 :</span>
              </div>
              <div className='attr-value'>{lessonInfo.lessonName}</div>
            </li>
            <li className='lesson-info-attr'>
              <div className='attr-name'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref='#icon-kejituandui'></use>
                </svg>
                <span>老师 :</span>
              </div>
              <div className='attr-value'>{lessonInfo.lessonTeacherName}</div>
            </li>
            <li className='lesson-info-attr'>
              <div className='attr-name'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref='#icon-heiban'></use>
                </svg>
                <span>学时 :</span>
              </div>
              <div className='attr-value'>{lessonInfo.lessonHour}</div>
            </li>
            <li className='lesson-info-attr'>
              <div className='attr-name'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref='#icon-yewu-heji_keyanchengguo'></use>
                </svg>
                <span>学分 :</span>
              </div>
              <div className='attr-value'>{lessonInfo.lessonCredit}</div>
            </li>
            <li className='lesson-info-attr'>
              <div className='attr-name'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref='#icon-xuexiao'></use>
                </svg>
                <span>教室 :</span>
              </div>
              <div className='attr-value'>{lessonInfo.lessonRoom}</div>
            </li>
            <li className='lesson-info-attr'>
              <div className='attr-name'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref='#icon-bancheshike'></use>
                </svg>
                <span>时间 :</span>
              </div>
              <div className='attr-value'>{lessonInfo.lessonCredit}</div>
            </li>
            <li className='lesson-info-attr'>
              <div className='attr-name'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref='#icon-youqinglianjie'></use>
                </svg>
                <span>备注 :</span>
              </div>
              <div className='attr-value'>{lessonInfo.lessonRemark}</div>
            </li>
          </ul>
        </div>
      </div>
      <TableHeader lessons={tableData.lessons} pageNum={pageNum} setPageNum={setPageNum} />
      <TableBody tableData={tableData} pageNum={pageNum} setPageNum={setPageNum} setLessonInfo={setLessonInfo} />
    </div>
  )
}
