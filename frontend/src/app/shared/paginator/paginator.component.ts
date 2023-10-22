import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { PagedList } from 'src/app/models/shared/paged-list.model';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
    @Input() pageIndex!: number;
    @Input() pageCount!: number;
    @Output() changePageEvent = new EventEmitter<number>();
    visiblePageCount: number = 3;

    visiblePages(): any[] {
        const start = Math.max(0, this.pageIndex - Math.floor(this.visiblePageCount / 2));
        const end = Math.min(this.pageCount - 1, start + this.visiblePageCount - 1);

        let pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (start > 0) {
            pages = [0, '...', ...pages];
        }

        if (end < this.pageCount - 1) {
            pages = [...pages, '...', this.pageCount - 1];
        }

        return pages;
    }

    moveToPage(page: number) {
        if (page >= 0 && page < this.pageCount) {
            this.changePageEvent.emit(page);
        }
    }
}

