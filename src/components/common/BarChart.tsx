import React, {useEffect, useRef} from "react";

type BarChartPropsType = {
  leftCount: number,
  rightCount: number,
  width: any,
  height: any
}

const BarChart = (props: BarChartPropsType) => {

  const canvasRef = useRef(null)
  useEffect(() => {

    const widthRate = props.width > 1000 ? 2.2 : 3

    const canvas: any = canvasRef.current
    if (props.rightCount === 0 && props.leftCount === 0) {
      const ctx5 = canvas.getContext('2d')
      const ctx6 = canvas.getContext('2d')
      ctx5.fillStyle = "gray"
      ctx5.fillRect(0, 0, props.width, props.height)
      ctx6.fillStyle = "black"
      ctx6.font="2em sans-serif"
      const width = props.width / widthRate
      ctx6.fillText("投票無し", width, props.height / 1.5)
      return
    }

    const ctx = canvas.getContext('2d')
    const ctx2 = canvas.getContext('2d')
    const ctx3 = canvas.getContext('2d')
    const ctx4 = canvas.getContext('2d')

    const base = props.width / (props.leftCount + props.rightCount)
    ctx.fillStyle = "blue"
    ctx.fillRect(0, 0,  base * props.leftCount, props.height)
    ctx2.fillStyle = "red"
    ctx2.fillRect(base * props.leftCount, 0, base * props.rightCount, props.height)
    ctx3.font = "2em sans-serif"
    ctx3.fillStyle="#ffffff"
    ctx3.fillText(`${props.leftCount}`, base * props.leftCount / widthRate, props.height / 1.5)
    ctx4.font = "2em sans-serif"
    ctx4.fillStyle="#ffffff"
    ctx4.fillText(`${props.rightCount}`, (base * props.leftCount) + (base * props.rightCount / widthRate), props.height / 1.5)
  }, [props.leftCount, props.rightCount, props.width, props.height])

  return (
    <canvas ref={canvasRef} width={props.width} height={props.height} />
  )
}

export default BarChart;
