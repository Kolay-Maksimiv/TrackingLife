import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from 'app/services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from 'app/services/toast.service';
import { NewsModel } from 'app/models/news/news.model';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  news: NewsModel;

  constructor(
    public newsService: NewsService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
    this.news = new NewsModel();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        this.getNews(id);
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getNews(id: any){
    this.newsService.getNewsById(id).subscribe(
      respData => {
        this.news = new NewsModel(respData);
      },
      error => {
        if (error.error) {
          this.toastService.showError(error.error);
          } else {
            this.toastService.showError("Some error occured");
          }
        this.router.navigate(['/not-found']);
      }
    );
  };

}
