import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WellnessCategoryModel } from 'app/models/wellness-room/wellnessCategory.model';
import { LinkFilter } from 'app/models/wellness-room/wellnessFilter';
import { WellnessLinkModel } from 'app/models/wellness-room/wellnessLink.model';
import { ToastService } from 'app/services/toast.service';
import { WellnessLinkService } from 'app/services/wellness-room/wellnessLink.service';
import Swal from 'sweetalert2';
import { WellnessCategoryComponent } from '../wellness-category/wellness-category.component';

@Component({
  selector: 'app-wellness-link',
  templateUrl: './wellness-link.component.html',
  styleUrls: ['./wellness-link.component.css']
})
export class WellnessLinkComponent implements OnInit {

  public links : WellnessLinkModel[] = [];
  public filteredLinks: WellnessLinkModel[] = [];
  public link : WellnessLinkModel;
  public filter: LinkFilter;
  public isLoading: boolean = false;
  public categoryId : number;
  public page: number = 1;
  public previousPage: number;
  public itemsPerPage: number = 10;
  public numPages: number = 1;
  public length: number = 0;

  constructor(private router: Router,
    private wellnessLinkService : WellnessLinkService,
    private toastService: ToastService,
    private route: ActivatedRoute) {
      this.filter = new LinkFilter(1, this.itemsPerPage, this.categoryId);
     }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params.id
    this.getLinks();
  }

  createCategoryLink() {
    this.router.navigate(['wellnessroom/category', this.categoryId ,'link','create']);
  }

  clickEditLink(id: number) {
    this.router.navigate(['wellnessroom/category', this.categoryId ,'link','edit', id]);
  }

  getLinks() {
    this.filter.categoryId = this.categoryId;
    this.wellnessLinkService.getWellnessLinkByFilter(this.filter ).subscribe(respData => {
      this.links = respData.items;
      this.length =respData.counts;
      this.isLoading = false;
    })
  }
  
  initFilter() {
    this.filter.pageNumber = this.page;
    this.filter.take = this.itemsPerPage;
    this.getLinks();
  }
  
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.page = page;
      //   this.filter.pageNumber = page;
      this.initFilter();
    }
  }

  deleteCategory(link: WellnessLinkModel) {
    Swal.fire({
      title: 'Are you sure you want to delete this Link?',
      text: 'You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
          this.wellnessLinkService.deleteLink(link.id).subscribe(respData => {
            Swal.fire(
              'Deleted!',
              'Link has been deleted.',
              'success'
            ).then(res => {
              if (res.value) {
                this.links = this.links.filter(x => x.id !== link.id);
                this.filteredLinks = this.filteredLinks.filter(x => x.id !== link.id);
  
              }
            });
          },
          error => {
            if (error.error) {
              this.toastService.showError(error.error);
              } else {
                this.toastService.showError("Some error occured");
              }
            }
          );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    }
    )
  }
}
