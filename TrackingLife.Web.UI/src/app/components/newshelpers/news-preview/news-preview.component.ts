import { Component, OnInit, Input } from '@angular/core';
import { NewsModel } from 'app/models/news/news.model';

@Component({
  selector: 'app-news-preview',
  templateUrl: './news-preview.component.html',
  styleUrls: ['./news-preview.component.css']
})
export class NewsPreviewComponent implements OnInit {
  @Input() news: NewsModel;

  constructor() { }

  ngOnInit() {
  }

}
