import { Component, OnInit } from '@angular/core';
import { DataPoint } from '../data_point';
import { WebserviceService } from '../webservice.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public graph = this.generateGraph([], []);

  constructor(private webService: WebserviceService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  generateGraph(x: Date[], y: number[]) {
    return {
      data: [
        { x: x, y: y, type: 'scatter', mode: 'lines+points', marker: { color: 'red' }}
      ],
      layout: { autosize: true, title: 'Gym visitors in the last 24 hours' }
    }
  }

  fetchData() {
    this.webService.getGymVisitors(Math.floor(Date.now() / 1000 - 86400), Math.floor(Date.now() / 1000))
      .subscribe((points: DataPoint[]) => {
        let x = points.map((point: DataPoint) => new Date(point.timestamp))
        let y = points.map((point: DataPoint) => point.value)
        this.graph = this.generateGraph(x, y)
      })
  }
}
