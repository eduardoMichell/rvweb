import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.apiUrl + "rv";

  constructor(private http: HttpClient) {
  }


  assembleCode(asm: String | undefined): Observable<String> {
    return this.http.post<String>(this.apiUrl + "/assemble", {asm});
  }

  runTheCurrentProgram(asm: String | undefined): Observable<String> {
    return this.http.post<String>(this.apiUrl + "/assemble", {asm});
  }
  runOneStepAtTime(asm: String | undefined): Observable<String> {
    return this.http.post<String>(this.apiUrl + "/assemble", {asm});
  }

  undoTheLastStep(asm: String | undefined): Observable<String> {
    return this.http.post<String>(this.apiUrl + "/assemble", {asm});
  }

  resetMemoryAndRegisters(): Observable<String> {
    
    return this.http.get<String>(this.apiUrl + "/resetMemoryAndRegisters");
  }




}
