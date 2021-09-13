import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPoint } from './data_point';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }

  getGymVisitors(start: number, end: number): Observable<DataPoint[]> {
    this.spinnerService.show()
    // TODO replace hardcoded URL
    return this.http.get<DataPoint[]>("https://7hnrd4i8ij.execute-api.us-east-2.amazonaws.com/Prod/gym-visitors",
      { params: { start: start, end: end } })
  }

}
