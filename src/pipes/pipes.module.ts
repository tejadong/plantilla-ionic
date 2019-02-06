import { NgModule } from '@angular/core';
import {EjemploPipe} from "./ejemplo-pipe/ejemplo-pipe";

@NgModule({
	declarations: [
    EjemploPipe],
	imports: [],
	exports: [
    EjemploPipe]
})
export class PipesModule {}
