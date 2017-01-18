import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {RequestOptions, Headers} from '@angular/http';

import {ConfigService} from './config.service';
import {DecompositionDTO} from "../models/decomposition.dto";

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

    getDecomposition(decompositionId: number): Observable<Response>{
      return this.http.get(this.configs.apiUrl + '/microservices/' + decompositionId, this.requestOptions());
    }

    listDecompositions(): Observable<Response> {
      return this.http.get(this.configs.apiUrl + '/microservices', this.requestOptions());
    }

    decompose(id: number, dto: DecompositionDTO): Observable<Response> {
      var uri = this.configs.apiUrl + '/repositories/' + id + '/decomposition';
      return this.http.post(uri, JSON.stringify(dto), this.requestOptions());
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

