import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit {
  @Input('personalInsurances') personalInsurances: any = [];
  @Input('companyInsurances') companyInsurances: any = [];
  @Input('individualInsurances') individualInsurances: any = [];

  @Output('user') change = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.personalInsurances);
    console.log(this.companyInsurances);
    console.log(this.individualInsurances);
  }

  public onGetPersonalInsurances(code: string) {
    this.change.emit(code);
  }
}
