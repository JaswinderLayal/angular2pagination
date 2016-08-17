/**
 * Created by Jaswinder on 8/9/2016.
 */
import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {MainComponent} from "./app/main.component.ts";
import {PostListComponent} from "./app/components/postlist.component";
bootstrap(PostListComponent,[HTTP_PROVIDERS]);