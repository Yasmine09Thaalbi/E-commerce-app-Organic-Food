import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddArticlePageRoutingModule } from './add-article-routing.module';

import { AddArticlePage } from './add-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddArticlePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddArticlePage]
})
export class AddArticlePageModule {}
