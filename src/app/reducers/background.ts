import { Action } from "@ngrx/store";
import { CookieService } from 'ngx-cookie-service';

export function BackgroundReducer(state: string = "", action: Action) {
    switch (action.type) {
        case 'background1':
            state = 'linear-gradient(to right, #41295a, #2F0743)';
            break;
        case 'background2':
            state = 'linear-gradient(to right, #4568DC, #B06AB3)';
            break;
        case 'background3':
            state = 'linear-gradient(to right, #CB356B, #BD3F32)';
            break;
        default:
            state = 'linear-gradient(to right, #642B73, #C6426E)';
            break;
    }
    return state;
}