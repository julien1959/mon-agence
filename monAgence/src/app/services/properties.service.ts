import {Injectable} from '@angular/core';
import {Property} from '../interfaces/property';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/properties';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  private _refreshUsers$ = new Subject<void>();

  get refreshUsers$(){
    return this._refreshUsers$;
  }

  constructor(
    private http: HttpClient
  ) { }


  getAllProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(baseUrl);
  }

  getById(id: number):Observable<Property>{
    return this.http.get<Property>(`${baseUrl}/${id}`);
  }

  create(property: Property): Observable<Property>{
    return this.http.post<Property>(baseUrl, property);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`);
  }

  update(id: number, property: Property): Observable<Property>{
    return this.http.put<Property>(`${baseUrl}/${id}`, property);
  }
}
