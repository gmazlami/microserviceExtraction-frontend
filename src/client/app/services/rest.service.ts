import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {RequestOptions, Headers} from '@angular/http';

import {ConfigService} from './config.service';

@Injectable()
export class RestService {

    constructor(protected http: Http,
                protected configs: ConfigService) {
    }

    getRepository(id: Number): Observable<Response> {
      return this.http.get(this.configs.apiUrl + '/repositories/' + id, this.requestOptions());
    }

    cloneRepository(uri: string): Observable<Response> {
        let repoObject = {uri: uri};
        return this.http.post(this.configs.apiUrl + '/repositories', JSON.stringify(repoObject),this.requestOptions());
    }

    listRepositories(): Observable<Response> {
        return this.http.get(this.configs.apiUrl + '/repositories', this.requestOptions());
    }

    requestOptions():RequestOptions {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return new RequestOptions({
            headers: headers,
        });
    }


}

// query(search: string): Observable<any[]> {
//     return this.http.get(this.configs.apiUrl + '/' + this.pluralizedResourceName(), this.request.getOptions(null, search))
//         .map(res => <this[]> res.json())
//         .catch(err => this.handleError(err));
// }
//
// get(id: number | string, search: string): Observable<any> {
//     return this.http.get(this.configs.apiUrl + '/' + this.pluralizedResourceName() + '/' + id, this.request.getOptions(null, search))
//         .map(res => <this> res.json())
//         .catch(err => this.handleError(err));
// }
