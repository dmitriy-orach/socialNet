import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private urlData = 'https://raw.githubusercontent.com/aZolo77/citiesBase/master/cities.json';

  constructor(private http: HttpClient) {}

  public getData(): Observable<City[]> | any {
    return this.http.get(this.urlData);
  }
}
