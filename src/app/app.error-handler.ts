import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class AplicationErrorHandler extends ErrorHandler {

    constructor(private ns: NotificationService, private injector: Injector) {
        super()
    }

    handleError (errorResonse: HttpErrorResponse | any) {
        if(errorResonse instanceof HttpErrorResponse) {
            const message = errorResonse.error.message
            switch(errorResonse.status) {
                case 401:
                    this.injector.get(LoginService).handleLogin()
                    break;
                case 403:
                    this.ns.notify(message || 'Não autorizado')
                    break;
                case 404:
                    this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes.')
                    break;
            }
        }
        super.handleError(errorResonse)
    }
}