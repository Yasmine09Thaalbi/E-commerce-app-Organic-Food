import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
    {
    path: 'edit-profile/:id_seller',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },

  {
    path: 'add-article/:id_seller',
    loadChildren: () => import('./pages/add-article/add-article.module').then( m => m.AddArticlePageModule)
  },
  {
    path: 'add-seller',
    loadChildren: () => import('./pages/add-seller/add-seller.module').then( m => m.AddSellerPageModule)
  },
  {
    path: 'customer-account/:id',
    loadChildren: () => import('./pages/customer-account/customer-account.module').then( m => m.CustomerAccountPageModule)
  },
  {
    path: 'seller-account/:id',
    loadChildren: () => import('./pages/seller-account/seller-account.module').then( m => m.SellerAccountPageModule)
  },
  {
    path: 'description-page',
    loadChildren: () => import('./pages/description-page/description-page.module').then( m => m.DescriptionPagePageModule)
  },
  {
    path: 'cart-page',
    loadChildren: () => import('./pages/cart-page/cart-page.module').then( m => m.CartPagePageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'boss-account/:id',
    loadChildren: () => import('./pages/boss-account/boss-account.module').then( m => m.BossAccountPageModule)
  },
  {
    path: 'edit-article/:id',
    loadChildren: () => import('./pages/edit-article/edit-article.module').then( m => m.EditArticlePageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
