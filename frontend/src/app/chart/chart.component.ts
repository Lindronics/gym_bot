import { Component, OnInit } from '@angular/core';
import { DataPoint } from '../data_point';
import { WebserviceService } from '../webservice.service';
import { TimeFrame } from '../timeframe';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public graph = this.generateGraph([], []);
  public timeFrameOptions = [
    { name: "Last 24 hours", "fn": TimeFrame.dayBefore },
    { name: "Last 7 days", "fn": TimeFrame.weekBefore }
  ]
  public now = Date.now

  constructor(private webService: WebserviceService) { }

  ngOnInit(): void {
    this.fetchData(TimeFrame.dayBefore(Date.now()));
  }

  generateGraph(x: Date[], y: number[]) {
    return {
      data: [
        { x: x, y: y, type: 'scatter', mode: 'lines+points', marker: { color: 'red' } }
      ],
      layout: { autosize: true, title: 'Gym visitors in the last 24 hours' }
    }
  }

  fetchData(timeFrame: TimeFrame) {
    this.webService.getGymVisitors(timeFrame.start, timeFrame.end)
      .subscribe((points: DataPoint[]) => {
        let x = points.map((point: DataPoint) => new Date(point.timestamp))
        let y = points.map((point: DataPoint) => point.value)
        this.graph = this.generateGraph(x, y)
      })
  }
}
