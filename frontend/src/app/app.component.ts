import {Component} from '@angular/core';
import {ApiService} from "./services/api.service";
import {UtilsService} from "./services/utils.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rv-front';
  content: String | undefined;
  datas: any = "";
  text: any = [];


  constructor(private apiService: ApiService,
              private utils: UtilsService) {

  }


  async getMachineLanguage() {
    await this.apiService.assembleCode(this.content).toPromise().then(res => {
      console.log(res)
      let aux: any = res
      if (aux.error) {
        this.utils.showMessage(aux.message, true);
      } else {
        this.utils.showMessage(aux.message)
        this.datas = aux.data.data;
        this.text = aux.data.text;
      }
    }).catch(err => {
      this.utils.showMessage(err.message, true);
    })
  }
  
}
