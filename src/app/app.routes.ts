import { Routes } from '@angular/router';
import { PhonePage } from '../components/phone-page/phone-page';
import { Home } from '../components/home/home';

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "phone-page",
        component: PhonePage
    }
];
