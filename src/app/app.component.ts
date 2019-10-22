import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetApiDataService } from './get-api-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private apiTableData: any;
  private publicOffersData: any = null;
  private aListRegistryStatus: boolean = false;       //for  aListRegistryCheck() method
  private publicOffersStatus: boolean = false;
  private date = new Date();

  constructor(
    private httpClient: HttpClient,
    private getApiDataService: GetApiDataService
  ) {

  }

  ngOnInit() {
    this.getDataFromServer();
  }

  getDataFromServer() {
    const tableApiUrl = 'https://smida-dev.test.idoc.com.ua/api/registry/okpoCard';
    this.httpClient.get(
      tableApiUrl,
      {
        params: { code: '01130549' }
      }
    ).subscribe(
      (result) => {
        this.apiTableData = result;
        this.aListRegistryCheck();
        console.log('get data from server method : ' + result);
      }
    );
  }

  aListRegistryCheck() {
    if (this.apiTableData.aListRegistry[0].nID === 36 &&
      this.apiTableData.aListRegistry[0].sID_Registry ==="PublicOffering" &&
      this.apiTableData.aListRegistry[0].sName === "Публічні пропозиції")
      {
        this.aListRegistryStatus = true;
      } else {
        this.aListRegistryStatus = false;
      }
  }

  triggerPublicOffers() {
    this.publicOffersStatus = !this.publicOffersStatus;
    if (!this.publicOffersData){
      this.getApiData();
      console.log('data from trigger' + this.publicOffersData);
    }
  }

  getApiData(){
    this.getApiDataService.getData().subscribe((data)=> {
      this.publicOffersData = data;
      console.log('get api from service : ' + data);
    })
  }

  check(){
    console.log(this.publicOffersData[0]);
  }
}