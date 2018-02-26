import { Bidinfo } from './../model/bidinfo.model';
import { Team } from './../model/team.model';
import { User } from './../model/user.model';
import { BidInfoStatus } from './../bidinfo/bid-info';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class HttpUtilService {

	//public API_URL: string = 'http://10.1.40.145:8585/pofexo/rest/';
	//public API_URL: string = 'https://pojetoluxa.herokuapp.com/';
	//public API_URL: string = 'http://nbbnu006609:9191/';
	//public API_URL: string = 'http://pcbnu006303:9191/';
	public API_URL: string = 'http://pcbnu006303:9191/';
	//public API_URL: string = 'https://pojetoluxa.ddns.net:9191/';
	

	//http://nbbnu006609:9191/player/get/5
	
	url(path: string) {
		return this.API_URL + path;
	}

	headers() {
		let headersParams = { 'Content-Type': 'application/json' };
		let headers = new Headers(headersParams);
		headers.append('Access-Control-Allow-Origin','*');
		headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    	let options = new RequestOptions({ headers: headers });
    	return options;
	}

	extrairDados(response: Response) {
		let data = response.json();
		return data;
	}

	extrairDadosMarket(response: Response){
		let data = response.toString
		return data;
	}

	extractBoolean(response: Response){
		let data = response;
		return data;
	}

	extrairDadosBid(response: Response) {
		let data = response.json();
		return data.bid;
	}

	extrairDadosContent(response: Response) {
		let data = response.json();
		return data.content;
	}
	  
	extrairDadosTeam(response: Response) {
		let data = response.json();		
		return JSON.stringify(data.content);
  	}
	extrairDadosUser(response : Response){
		let user = response.json();	
		if (user && user.keyAuth){
			sessionStorage.setItem('currentUser', JSON.stringify(user));
			sessionStorage.setItem('keyAuth', JSON.stringify(user.keyAuth));	
			
		}
		return user;
	}

	extrairDadosBidInfo(response : Response){
		let bidInfo = response.json();
		let bidstatus = new BidInfoStatus();
		bidstatus = bidInfo;	
		
		if(bidstatus.status === 'MARKET_CLOSE'){
			throw new Error('Mercado Fechado');
		}

		if(bidInfo){
			if (bidInfo == false){
				throw new Error('Seu Lance já foi superado! Tente Novamente!');
			}else{
				return bidInfo || {};
			} 
		}
	}

  	processarErros(erro: any) {
	    return Observable.throw(erro);
	}
}