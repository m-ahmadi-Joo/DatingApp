import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ListComponent } from "./list/list.component";
import { MemberListComponent } from "./member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";

export const appRoutes : Routes = [
  // {path : 'home', component : HomeComponent},

  {path : '', component : HomeComponent},
  {
    path:'' ,
    runGuardsAndResolvers : 'always',
    canActivate : [AuthGuard],
    children : [
      {path : 'members', component : MemberListComponent , canActivate : [AuthGuard]},
      {path : 'messages', component : MessagesComponent },
      {path : 'lists', component : ListComponent, canActivate : [AuthGuard]},
    ]
  },
  // {path : 'members', component : MemberListComponent , canActivate : [AuthGuard]},
  // {path : 'messages', component : MessagesComponent },
  // {path : 'lists', component : ListComponent, canActivate : [AuthGuard]},
  // {path : '**', redirectTo : 'home', pathMatch : 'full'},

  {path : '**', redirectTo : '', pathMatch : 'full'},
];
