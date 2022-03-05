import React from 'react'

import './index.css'

export default function TableHeader(props) {

  const { lessons, page, setPage } = props

  function handleOnChange(event) {
    setPage({
      pageNum: event.target.value,
      shouldSlide: true
    })
  }

  function next() {
    if (page.pageNum === lessons.length - 1) { } else {
      setPage({
        pageNum: page.pageNum + 1,
        shouldSlide: true
      })
    }
  }

  function last() {
    if (page.pageNum === 0) { } else {
      setPage({
        pageNum: page.pageNum - 1,
        shouldSlide: true
      })
    }
  }

  return (
    <div className='table-header'>
      <button className='header-button header-back' onClick={last} onMouseUp={event => event.stopPropagation()} onTouchEnd={event => event.stopPropagation()}>
        <i className='iconfont icon-xiangzuojiantou'></i>
      </button>
      <select className='header-button header-week-select' value={page.pageNum} onChange={handleOnChange} onMouseUp={event => event.stopPropagation()} onTouchEnd={event => event.stopPropagation()}>
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
