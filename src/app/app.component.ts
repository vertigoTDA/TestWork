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
  private aListRegistryStatus: boolean = false;
  private publicOffersStatus: boolean = false;
  private date = new Date();

  constructor(
    private httpClient: HttpClient,
    private getApiDataService: GetApiDataService
  ) { }

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
      }
    );
  }

  aListRegistryCheck() {
    if (this.apiTableData.aListRegistry[0].nID === 36 &&
      this.apiTableData.aListRegistry[0].sID_Registry === "PublicOffering" &&
      this.apiTableData.aListRegistry[0].sName === "Публічні пропозиції") {
      this.aListRegistryStatus = true;
    } else {
      this.aListRegistryStatus = false;
    }
  }

  triggerPublicOffers() {
    if (!this.publicOffersData) {
      this.getApiData();
    }
    setTimeout(() => {
      this.publicOffersStatus = !this.publicOffersStatus;
    }, 2000);
  }

  getApiData() {
    this.getApiDataService.getData().subscribe((data: any) => {
      this.publicOffersData = data;
    });
  }

}
