<template>
  <div id="d3_chart" />
</template>

<script>
import * as d3 from 'd3'
import * as API from '@/API.js'
export default {
  name: 'MemoryLineGraph',

  data () {
    return {
      exit: false,
      selector: '#d3_chart',
      dataSource: [],
      data: [],
      svg: null,
      mainGroup: null,
      scaleX: null,

      options: {
        width: 640,
        height: 480,
        margins: {
          top: 20,
          right: 40,
          bottom: 20,
          left: 40
        },
        MAX_LENGTH: 100,
        duration: 500,
        color: d3.schemeCategory10
      },

      webspaceState: {
        usage: {
          cpu: null,
          disks: {
            root: null
          },
          memory: null,
          processes: null
        }
      }
    }
  },

  mounted () {
    this.fetchWebspacesState()
    this.init()
    if (this.userStatus()) {
      window.setInterval(() => {
        this.fetchWebspacesState()
        this.updateData(this.bytesToMB(this.webspaceState.usage.memory))
      }, 500)
    } else {
      window.clearInterval()
    }
  },

  methods: {
    async fetchWebspacesState () {
      this.userStatus()
      try {
        this.webspaceState = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/state', 'GET')
      } catch (err) {
        if (this.exit()) {
          alert('Unable to find webspace state data: ' + err.message)
        }
      }
      return this.webspaceState
    },

    async userStatus () {
      this.exit = await API.isUserLoggedIn()
      return this.exit
    },

    bytesToMB (bytes) {
      const decimalPlaces = 2
      const unitSizes = 1024
      return (bytes / Math.pow(unitSizes, 2)).toFixed(decimalPlaces)
    },

    init () {
      var el = d3.select(this.selector)
      if (el.empty()) {
        console.warn('init(): Element for "' + this.selector + '" selector not found')
        return
      }
      console.log('d3 version: ', d3.version + 'curData: ' + this.dataSource)
      this.seedData()
    },

    draw () {
      var self = this
      // Based on https://bl.ocks.org/mbostock/3884955
      self.data = ['memory'].map(function (c) {
        return {
          label: c,
          values: self.dataSource.map(function (d) {
            return {
              time: +d.time,
              value: d[c]
            }
          })
        }
      })
      // console.log(this.options.duration)
      var transition = d3.transition().duration(this.options.duration).ease(d3.easeLinear)
      var xScale = d3.scaleTime().rangeRound([0, this.options.width - this.options.margins.left - this.options.margins.right])
      var yScale = d3.scaleLinear().rangeRound([this.options.height - this.options.margins.top - this.options.margins.bottom, 0])
      var zScale = d3.scaleOrdinal(this.options.color)

      var xMin = d3.min(self.data, function (c) { return d3.min(c.values, function (d) { return d.time }) })
      var xMax = new Date(new Date(d3.max(self.data, function (c) {
        return d3.max(c.values, function (d) { return d.time })
      })).getTime() - 2 * this.options.duration)

      xScale.domain([xMin, xMax])
      yScale.domain([
        d3.min(self.data, function (c) { return d3.min(c.values, function (d) { return d.value }) }),
        d3.max(self.data, function (c) { return d3.max(c.values, function (d) { return d.value }) })
      ])
      zScale.domain(self.data.map(function (c) { return c.label }))

      var line = d3.line()
        .curve(d3.curveBasis)
        .x(function (d) { return xScale(d.time) })
        .y(function (d) { return yScale(d.value) })

      var svg = d3.select(this.selector).selectAll('svg').data([self.data])
      var gEnter = svg.enter().append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('width', this.options.width)
        .attr('height', this.options.height)
        .append('g')
        .attr('transform', 'translate(' + this.options.margins.left + ',' + this.options.margins.top + ')')
      gEnter.append('g').attr('class', 'axis x')
      gEnter.append('g').attr('class', 'axis y')

      gEnter.append('defs').append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', this.options.width - this.options.margins.left - this.options.margins.right)
        .attr('height', this.options.height - this.options.margins.top - this.options.margins.bottom)

      gEnter.append('g')
        .attr('class', 'lines')
        .attr('clip-path', 'url(#clip)')
        .selectAll('.data')
        .data(this.data)
        .enter()
        .append('path')
        .attr('class', 'data')

      var legendEnter = gEnter.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(' + (this.options.width - this.options.margins.right - this.options.margins.left - 120) + ',25)')
      legendEnter.append('rect')
        .attr('width', 50)
        .attr('height', 75)
        .attr('fill', '#ffffff')
        .attr('fill-opacity', 0.7)
      legendEnter.selectAll('text')
        .data(this.data)
        .enter()
        .append('text')
        .attr('y', function (d, i) { return (i * 20) + 25 })
        .attr('x', 5)
        .attr('fill', function (d) { return zScale(d.label) })

      var g = svg.select('g')

      g.select('g.axis.x')
        .attr('transform', 'translate(0,' + (this.options.height - this.options.margins.bottom - this.options.margins.top) + ')')
        .transition(transition)
        .call(d3.axisBottom(xScale).ticks(5))

      g.select('g.axis.y')
        .transition(transition)
        .attr('class', 'axis y')
        .call(d3.axisLeft(yScale))

      g.select('defs clipPath rect')
        .transition(transition)
        .attr('width', this.options.width - this.options.margins.left - this.options.margins.right)
        .attr('height', this.options.height - this.options.margins.top - this.options.margins.bottom)

      g.selectAll('g path.data')
        .data(self.data)
        .style('stroke', function (d) { return zScale(d.label) })
        .style('stroke-width', 1)
        .style('fill', 'none')
        .transition()
        .duration(this.options.duration)
        .ease(d3.easeLinear)
        .on('start', tick)

      g.selectAll('g .legend text')
        .data(self.data)
        .text(function (d) {
          return d.label + ': ' + d.values[d.values.length - 1].value + 'MB'
        })

      // For transitions https://bl.ocks.org/mbostock/1642874
      function tick () {
      // Redraw the line.
        // console.log(this)
        d3.select(this)
          .attr('d', function (d) { return line(d.values) })
          .attr('transform', null)

        // Slide it to the left. 500 is the duration set above
        var xMinLess = new Date(new Date(xMin).getTime() - self.options.duration)
        d3.active(this)
          .attr('transform', 'translate(' + xScale(xMinLess) + ',0)')
          .transition()
      }
    },

    clearChart () {
      var el = d3.select(this.selector)
      if (el.empty()) {
        console.warn('clearChart(): Element for "' + this.selector + '" selector not found')
        return
      }
      // clear element
      el.html('')
    },
    // MAXLENG = 100, duration = 500
    seedData () {
      var now = new Date()
      for (var i = 0; i < this.options.MAX_LENGTH; ++i) {
        this.dataSource.push({
          time: new Date(now.getTime() - ((100 - i) * 500)),
          memory: 0
        })
      }
    },

    updateData (memory) {
      var now = new Date()
      var lineData = {
        time: now,
        memory: memory
      }
      this.dataSource.push(lineData)
      if (this.dataSource.length > 30) {
        this.dataSource.shift()
      }
      this.draw()
    }
  }
}
</script>

<style>

</style>
