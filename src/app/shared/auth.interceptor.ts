
import { HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const params: HttpParams = new HttpParams();
        params.set('auth', this.authService.getToken());
        const copyReq = req.clone({ params: params });
        return next.handle(copyReq);
    }
}

