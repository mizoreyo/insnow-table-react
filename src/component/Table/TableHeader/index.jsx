import React from 'react'

import './index.css'

export default function TableHeader(props) {

  const { lessons, pageNum, setPageNum } = props

  function handleOnChange(event) {
    setPageNum(event.target.value)
  }

  function next() {
    if (pageNum === lessons.length - 1) { } else {
      setPageNum(pageNum + 1)
    }
  }

  function last() {
    if (pageNum === 0) { } else {
      setPageNum(pageNum - 1)
    }
  }

  return (
    <div className='table-header'>
      <button className='header-button header-back' onClick={last} onMouseUp={event => event.stopPropagation()} onTouchEnd={event=>event.stopPropagation()}>
        <i className='iconfont icon-xiangzuojiantou'></i>
      </button>
      <select className='header-button header-week-select' value={pageNum} onChange={handleOnChange} onMouseUp={event => event.stopPropagation()} onTouchEnd={event => event.stopPropagation()}>
        {
          lessons.map((weekLesson, index) => {
            return <option key={index} value={index}>第 {index + 1} 周</option>
          })
        }
      </select>
      <button className='header-button header-option' onMouseUp={event => event.stopPropagation()} onTouchEnd={event => event.stopPropagation()}>
        <i className='iconfont icon-icon-section-options'></i>
      </button>
      <button className='header-button header-forward' onClick={next} onMouseUp={event => event.stopPropagation()} onTouchEnd={event => event.stopPropagation()}>
        <i className='iconfont icon-xiangyoujiantou'></i>
      </button>
    </div>
  )
}
