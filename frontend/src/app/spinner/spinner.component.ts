import { Component, Input, OnInit } from '@angular/core';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() showSpinner: boolean = false

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.loading$.subscribe((value: boolean) => { this.showSpinner = value })
  }

}
