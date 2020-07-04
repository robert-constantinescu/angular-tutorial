import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: 'root'}) // used when you inject a service into another service. Here we inject the HttpService
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {

  }


  storeRecipes() {
    const recipes = this.recipeService.getRecipes;
    console.log("Recipes to Save: ");
    console.log(recipes);
    this.httpClient.put(
      'https://angular-first-project-97484.firebaseio.com/recipes.json?',
      recipes)
      .subscribe(
        response => {
          console.log(response);
        });
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>('https://angular-first-project-97484.firebaseio.com/recipes.json',)
      .pipe(
        map(recipes => {
            return recipes.map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            })
          }
        ),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
          }
        )
      );
  }


}
