import React from 'react'
import { nanoid } from 'nanoid'

import './index.css'

export default function TableBody(props) {

  // props
  const { tableData, pageNum, setPageNum, setLessonInfo } = props
  const { lessons, courses } = tableData
  console.log(tableData)

  // DOM ref
  const tableBodyListRef = React.useRef()

  // data ref
  const indragRef = React.useRef()
  const lastXRef = React.useRef()
  const weekNumRef = React.useRef()
  const pageNumRef = React.useRef()

  React.useEffect(() => {
    document.onmousemove = handleMouseMove
    document.onmouseup = handleMouseUp
    document.ontouchmove = handleTouchMove
    document.ontouchend = handleMouseUp
  }, [])

  React.useEffect(() => {
    setWeekNum(lessons.length)
  }, [lessons])

  React.useEffect(() => {
    const tblWidth = tableBodyListRef.current.clientWidth
    tableBodyListRef.current.style.left = -(pageNum) * tblWidth + 'px'
    pageNumRef.current = pageNum
  }, [pageNum])

  function isLesson(shortName) {
    if (shortName === '无课') {
      return false
    }
    let result = false
    courses.map((course) => {
      if (course.courseShortName === shortName)
        result = true
    })
    return result
  }

  function showLessonInfo(lessonShortName, lessonRoom, lessonTime) {
    return () => {
      let lessonInfo = {}
      courses.map((course) => {
        if (course.courseShortName === lessonShortName) {
          lessonInfo.lessonName = course.courseName
          lessonInfo.lessonTeacherName = course.courseTeacherName
          lessonInfo.lessonHour = course.courseHour
          lessonInfo.lessonCredit = course.courseCredit
          lessonInfo.lessonRemark = course.courseRemark
          console.log(1);
        }
      })
      lessonInfo.lessonRoom = lessonRoom
      lessonInfo.lessonTime = lessonTime
      lessonInfo.isInfoShow = true
      setLessonInfo(lessonInfo)
    }
  }

  function setIndrag(indrag) {
    indragRef.current = indrag
  }
  function getIndrag() {
    return indragRef.current
  }
  function setLastX(lastX) {
    lastXRef.current = lastX
  }
  function getLastX() {
    return lastXRef.current
  }
  function setWeekNum(weekNum) {
    weekNumRef.current = weekNum
  }
  function getWeekNum() {
    return weekNumRef.current
  }

  // 在鼠标按下时记录坐标
  function handleMouseDown(event) {
    setIndrag(true)
    const lastX = event.clientX
    setLastX(lastX)
    tableBodyListRef.current.style.transition = 'none'
  }

  // 鼠标移动时回调
  function handleMouseMove(event) {
    if (getIndrag()) {
      const currentX = event.clientX
      // 鼠标距离上一个位置的距离
      const deltaX = currentX - getLastX()
      setLastX(currentX)
      let offsetLeft = tableBodyListRef.current.offsetLeft
      offsetLeft += deltaX
      const tblWidth = tableBodyListRef.current.clientWidth
      if (offsetLeft >= 0.2 * tblWidth || offsetLeft <= -(getWeekNum() - 0.8) * tblWidth) { } else {
        tableBodyListRef.current.style.left = offsetLeft + 'px'
      }
    }
  }

  function handleMouseUp() {
    setIndrag(false)
    const offsetLeft = tableBodyListRef.current.offsetLeft
    const tblWidth = tableBodyListRef.current.clientWidth
    let stayPageNum = -(offsetLeft / tblWidth).toFixed(0)
    tableBodyListRef.current.style.transition = '0.5s'
    if (pageNumRef.current == stayPageNum) {
      tableBodyListRef.current.style.left = -(stayPageNum) * tblWidth + 'px'
    } else {
      setPageNum(stayPageNum)
    }
  }

  function handleTouchStart(event) {
    setIndrag(true)
    const lastX = event.changedTouches[0].clientX
    setLastX(lastX)
    tableBodyListRef.current.style.transition = 'none'
  }

  function handleTouchMove(event) {
    if (getIndrag()) {
      const currentX = event.changedTouches[0].clientX
      // 鼠标距离上一个位置的距离
      const deltaX = currentX - getLastX()
      setLastX(currentX)
      let offsetLeft = tableBodyListRef.current.offsetLeft
      offsetLeft += deltaX
      const tblWidth = tableBodyListRef.current.clientWidth
      if (offsetLeft >= 0.2 * tblWidth || offsetLeft <= -(getWeekNum() - 0.8) * tblWidth) { } else {
        tableBodyListRef.current.style.left = offsetLeft + 'px'
      }
    }
  }

  return (
    <div className='table-body-list-container'>
      <ul className='table-body-list' onTouchStart={handleTouchStart} onMouseDown={handleMouseDown} ref={tableBodyListRef}>
        {
          lessons.map((weekLesson) => {
            return (
              <li className='table-body-container' key={nanoid()}>
                <div className='table-body'>
                  <ul className='table-body-header'>
                    <li className='table-day'>
                      <div className='table-day-date'>{new Date(weekLesson[0].date).getDate() === 1 ? new Date(weekLesson[0].date).getMonth() + 1 + '月' : new Date(weekLesson[0].date).getDate()}</div>
                      <div className='table-day-weekday'>星期一</div>
                    </li>
                    <li className='table-day'>
                      <div className='table-day-date'>{new Date(weekLesson[1].date).getDate() === 1 ? new Date(weekLesson[1].date).getMonth() + 1 + '月' : new Date(weekLesson[1].date).getDate()}</div>
                      <div className='table-day-weekday'>星期二</div>
                    </li>
                    <li className='table-day'>
                      <div className='table-day-date'>{new Date(weekLesson[2].date).getDate() === 1 ? new Date(weekLesson[2].date).getMonth() + 1 + '月' : new Date(weekLesson[2].date).getDate()}</div>
                      <div className='table-day-weekday'>星期三</div>
                    </li>
                    <li className='table-day'>
                      <div className='table-day-date'>{new Date(weekLesson[3].date).getDate() === 1 ? new Date(weekLesson[3].date).getMonth() + 1 + '月' : new Date(weekLesson[3].date).getDate()}</div>
                      <div className='table-day-weekday'>星期四</div>
                    </li>
                    <li className='table-day'>
                      <div className='table-day-date'>{new Date(weekLesson[4].date).getDate() === 1 ? new Date(weekLesson[4].date).getMonth() + 1 + '月' : new Date(weekLesson[4].date).getDate()}</div>
                      <div className='table-day-weekday'>星期五</div>
                    </li>
                    <li className='table-day'>
                      <div className='table-day-date'>{new Date(weekLesson[5].date).getDate() === 1 ? new Date(weekLesson[5].date).getMonth() + 1 + '月' : new Date(weekLesson[5].date).getDate()}</div>
                      <div className='table-day-weekday'>星期六</div>
                    </li>
                    <li className='table-day'>
                      <div className='table-day-date'>{new Date(weekLesson[6].date).getDate() === 1 ? new Date(weekLesson[6].date).getMonth() + 1 + '月' : new Date(weekLesson[6].date).getDate()}</div>
                      <div className='table-day-weekday'>星期日</div>
                    </li>
                  </ul>
                  <div className='lesson-table'>
                    <ul className='lesson-morning lesson-container'>
                      {
                        weekLesson.map((dayLesson) => {
                          return dayLesson.morningLessons.map((lesson) => {
                            return (
                              <li onClick={showLessonInfo(lesson.lessonShortName, lesson.lessonRoom, lesson.lessonTime)} key={nanoid()} className={`lesson ${isLesson(lesson.lessonShortName) ? '' : 'lesson-none'} day-lesson-${lesson.lessonLastNum}`}>
                                <span>@{lesson.lessonRoom}</span><br /><span>{lesson.lessonName}</span>
                              </li>
                            )
                          })
                        })
                      }
                    </ul>
                    <ul className='lesson-afternoon lesson-container'>
                      {
                        weekLesson.map((dayLesson) => {
                          return dayLesson.noonLessons.map((lesson) => {
                            return (
                              <li onClick={showLessonInfo(lesson.lessonShortName, lesson.lessonRoom, lesson.lessonTime)} key={nanoid()} className={`lesson ${isLesson(lesson.lessonShortName) ? '' : 'lesson-none'} day-lesson-${lesson.lessonLastNum}`}>
                                <span>@{lesson.lessonRoom}</span><br /><span>{lesson.lessonName}</span>
                              </li>
                            )
                          })
                        })
                      }
                    </ul>
                    <ul className='lesson-night lesson-container'>
                      {
                        weekLesson.map((dayLesson) => {
                          return dayLesson.nightLessons.map((lesson) => {
                            return (
                              <li onClick={showLessonInfo(lesson.lessonShortName, lesson.lessonRoom, lesson.lessonTime)} key={nanoid()} className={`lesson ${isLesson(lesson.lessonShortName) ? '' : 'lesson-none'} night-lesson-${lesson.lessonLastNum}`}>
                                <span>@{lesson.lessonRoom}</span><br /><span>{lesson.lessonName}</span>
                              </li>
                            )
                          })
                        })
                      }
                    </ul>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
