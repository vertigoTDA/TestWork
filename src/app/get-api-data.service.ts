import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetApiDataService {

  private apiPublicOffers: any = null;

  constructor(
    private httpClient: HttpClient
  ) { }

  getData(){
    return this.httpClient.get(`https://smida-dev.test.idoc.com.ua/api/registry/getTranslatedModels?sOKPO=01130549`);
  }

}
