import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { HomeComponent } from "./home/home.component";
import { TodayAppointementsComponent } from "./today-appointements/today-appointements.component";
import { NewAppointmentComponent } from "./new-appointements/new-appointements.component";
import { AllAppointementsComponent } from "./all-appointements/all-appointements.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
	{ path: "", redirectTo: "/home", pathMatch: "full" },
	{ path: "home", component: HomeComponent },
	{ path: "signup", component: SignupComponent },
	{ path: "signin", component: SigninComponent },
	{ path: "aboutus", component: AboutusComponent },
	{ path: "today_appointments", component: TodayAppointementsComponent },
	{ path: "new_appointments", component: NewAppointmentComponent },
	{ path: "all_appointments", component: AllAppointementsComponent },
	{ path: "profile", component: ProfileComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
