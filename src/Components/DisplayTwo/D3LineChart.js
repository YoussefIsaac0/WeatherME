import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import useMouseHoverEffect from '../../useMouseHoverEffect';


export default function D3LineChart({ data, index,setActiveSection }) {
  const svgRef = useRef();
  const container1 = useMouseHoverEffect()

  useEffect(() => {
    // dimensions
    const margin = { top: 50, right: 30, bottom:20, left: 60 }; 
    const width = 500;
    const height = 300-margin.top-margin.bottom

    // canvas
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.hour))
      .range([0, width])
      .padding(0.1); 
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.tempC)])
      .nice() // Extend domain to fit the range
      .range([height, 0]);

    // x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .style('color', 'white')
      .call(d3.axisBottom(x));

    // y-axis
    svg.append('g')
      .style('color', 'white')
      .call(d3.axisLeft(y));


    // Y-axis title
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${-margin.left + 20}, ${height / 2}) rotate(-90)`)
      .style('fill', 'white')
      .style('font-size', '12px')
      .text('Temperature (°C)'); 
    // ** Adding Chart Title **
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20) 
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Temperatures during the day in Celsius'); 

    // summary line
    const line = d3.line()
      .x(d => x(d.hour) + x.bandwidth() / 2)
      .y(d => y(d.tempC));

    // Append the path
    const path = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // circles for each data point
    svg.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.hour) + x.bandwidth() / 2)
      .attr('cy', d => y(d.tempC))
      .attr('r', 4)
      .attr('fill', 'steelblue');

    // Tooltip 
    const tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('padding', '0px 5px 0px 5px')
      .style('background', 'steelblue')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', '1')
      .style('color', 'white');

    //tooltip interactivity
    svg.selectAll('.dot')
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`Hour: ${d.hour}<br>Temperature: ${d.tempC}`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mousemove', (event) => {
        tooltip.style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.transition().duration(200).style('opacity', 0);
      });

    // Animation
    const totalLength = path.node().getTotalLength();

    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition() 
      .duration(800) 
      .ease(d3.easeLinear) 
      .attr('stroke-dashoffset', 0); 

    return () => {
      d3.select(svgRef.current).select('g').remove();
      tooltip.remove();  
    };
  }, [data]);

  return (
    <div className="container drag graph"  ref={container1} draggable onDragStart={() => setActiveSection(index)} onDragEnd={() => setActiveSection(null)} >
    <svg className='overlay' style={{margin:'0 auto'}} ref={svgRef}></svg>
    </div>
  );
}
