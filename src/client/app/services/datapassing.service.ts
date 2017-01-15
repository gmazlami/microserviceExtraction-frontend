/**
 * Created by gmazlami on 1/15/17.
 */

import {Injectable} from '@angular/core';
import {Repository} from '../models/repository.model';

@Injectable()
export class DataPassingService {

  repository: Repository;

  decomposition: any;


  constructor() {}

  setRepository(repo: Repository): void {
    this.repository = repo;
  }

  getRepository(): Repository {
    return this.repository;
  }

  setDecomposition(d: any){
    this.decomposition = d;
  }

  getDecomposition(){
    return this.decomposition;
  }



}

