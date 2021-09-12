import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPoint } from './data_point';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  constructor(private http: HttpClient) { }

  getGymVisitors(start: number, end: number): Observable<DataPoint[]> {
    return this.http.get<DataPoint[]>("https://fkyqu62i91.execute-api.us-east-2.amazonaws.com/Prod/gym-visitors",
      { params: { start: start, end: end } })
  }

}
