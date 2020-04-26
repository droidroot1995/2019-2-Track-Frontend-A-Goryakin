import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as T from './D3Graph.types'
import styles from '../styles/D3Graph.module.css'

const D3Graph = (props: T.IProps) => {
  const container: React.MutableRefObject<null> = useRef(null)

  const [csvData, setCsvData] = useState({ data: [], filtered: false } as T.IState)

  useEffect(() => {
    if (container.current) {
      let dat: T.csvList = []

      if (csvData.data.length > 0) {
        dat = csvData.data
      }

      if (dat.length === 0 && !csvData.filtered) {
        d3.csv(props.filename)
          .then((data: d3.DSVRowArray<string>) => {
            if (data) {
              const dt = data as object[]

              dt.forEach((d: object) => {
                dat.push(d)
              })
            }
            return dat
          })
          .then((data: T.csvList) => {
            setCsvData({ data: dat, filtered: false } as T.IState)
          })
      }

      if (dat.length !== 0 && !csvData.filtered) {
        dat = dat.filter((elem: T.ICsvObj) => +elem[props.filterField] === props.filterValue) as T.csvList
        setCsvData({ data: dat, filtered: true } as T.IState)
      }

      const svg: d3.Selection<any, unknown, null, undefined> = d3.select(container.current)

      if (csvData.filtered) {
        const y_dat: number[] = []

        dat.forEach((d) => {
          y_dat.push(d['Day-Confirmed'])
        })

        const margin: T.IMargin = {
          left: 80,
          right: 40,
          top: 60,
          bottom: 100,
        }
        const svgWidth: number = props.width
        const svgHeight: number = props.height
        const chartWidth: number = svgWidth - margin.left - margin.right
        const chartHeight: number = svgHeight - margin.top - margin.bottom

        const chart: d3.Selection<SVGGElement, unknown, null, undefined> = svg
          .append('g')
          .classed('chart', true)
          .attr('transform', `translate(${margin.left}, ${margin.top})`)

        const xScale: d3.ScaleBand<string> = d3
          .scaleBand()
          .domain(dat.map((d) => d.Date))
          .rangeRound([0, chartWidth])
          .padding(0.1)

        const yScale: d3.ScaleLinear<number, number> = d3
          .scaleLinear()
          .domain([0, Math.max(...y_dat)])
          .nice()
          .rangeRound([chartHeight, 0])

        chart
          .selectAll(styles.bar)
          .data(dat)
          .enter()
          .append('rect')
          .classed(styles.bar, true)
          .attr('x', (d: T.ICsvObj): number => (xScale(d.Date) as number) + xScale.bandwidth() * 0.1)
          .attr('y', (d: T.ICsvObj): number => yScale(d['Day-Confirmed']))
          .attr('height', (d: T.ICsvObj): number => chartHeight - yScale(d['Day-Confirmed']))
          .attr('width', (d: T.ICsvObj): number => xScale.bandwidth() * 0.8)
          .style('fill', 'steelblue')

        chart
          .selectAll(styles.bar_label)
          .data(dat)
          .enter()
          .append('text')
          .classed(styles.bar_label, true)
          .attr('x', (d) => (xScale(d.Date) as number) + xScale.bandwidth() * 0.5)
          .attr('dx', 0)
          .attr('y', (d) => yScale(d['Day-Confirmed']))
          .attr('dy', -6)
          .text((d) => Math.trunc(d['Day-Confirmed']))

        chart
          .selectAll(`${styles.bar_label}`)
          .enter()
          .selectAll('text')
          .enter()
          .attr('transform', 'rotate(90)')

        const xAxis: d3.Axis<string> = d3.axisBottom(xScale)

        chart
          .append('g')
          .classed('x axis', true)
          .attr('transform', `translate(0, ${chartHeight})`)
          .call(xAxis)
          .selectAll('text')
          .style('text-anchor', 'end')
          .attr('dx', '-.8em')
          .attr('dy', '.15em')
          .attr('transform', 'rotate(-65)')

        const yAxis: d3.Axis<number | { valueOf(): number }> = d3.axisLeft(yScale).ticks(25)

        chart
          .append('g')
          .classed('y axis', true)
          .attr('transform', 'translate(0, 0)')
          .call(yAxis)

        chart
          .select('.x.axis')
          .append('text')
          .classed(styles.axis_text, true)
          .attr('x', chartWidth / 2)
          .attr('y', 80)
          .attr('fill', '#000')
          .text('День')

        chart
          .select('.y.axis')
          .append('text')
          .classed(styles.axis_text, true)
          .attr('x', 0)
          .attr('y', 0)
          .attr('transform', `translate(-50, ${chartHeight / 2}) rotate(-90)`)
          .attr('fill', '#000')
          .text(`Число заболевших COVID-19 в регионе ${dat[0]['Region/City']}`)

        return () => {
          svg.selectAll('*').remove()
        }
      }
    }
  }, [props.filename, props.filterField, props.filterValue, props.width, props.height, container, csvData])

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.d3_graph} width="100%" height="100%" ref={container} />
  )
}

export default D3Graph
