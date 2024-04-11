import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
import { environment } from 'src/environments/environment';

@NgModule({
    providers: [
        ApiServiceProxies.InspectionsServiceProxy,
        ApiServiceProxies.InspectionTypesServiceProxy,
        ApiServiceProxies.StatusServiceProxy,
        ApiServiceProxies.WeatherForecastServiceProxy,
        { provide: ApiServiceProxies.API_BASE_URL, useValue: environment.API_BASE_URL }
    ]
})
export class ServiceProxyModule {}