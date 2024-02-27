import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  url = localStorage.getItem('API_URL');

  public translations?: any;

  constructor(
    private http: HttpClient
  ) { }

  public addToSchedule(scheduleId): any {
    const json = `{
      "schedule_id": "` + scheduleId + `"
    }`;
    return this.http.post(this.url + '/congress/assistance', json,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }

  public deleteFromSchedule(scheduleId): any {
    return this.http.delete(this.url + '/congress/assistance?schedule_id=' + scheduleId,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }

  public deleteSchedule(scheduleId: any): any {
    return this.http.delete(this.url + '/congress/schedule/' + scheduleId,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise()
      .then((result) => result);
  }
}
