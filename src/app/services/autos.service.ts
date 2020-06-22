import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auto } from "../models/auto";
@Injectable()
export class AutosService {
  url = "https://pavii.ddns.net/api/autos/";


  constructor(private httpClient:HttpClient) { }


  getAutos():Observable<Auto[]>{
    return this.httpClient.get<Auto[]>(this.url);
  }

  
  put(Id: number, obj:Auto) {
    return this.httpClient.put(this.url + Id, obj);
  }
}