import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  private apiTableData: any;
  private date = new Date();

  constructor(
    private httpClient: HttpClient
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
        console.log(result);
      }
      );
  }


}