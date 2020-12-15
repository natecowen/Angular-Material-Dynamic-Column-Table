import { Component, ViewChild, Input, OnChanges, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';

import { DataTableColumn } from '@data/button-model';

@Component({
  selector: 'custom-data-table',
  templateUrl: 'data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges, OnInit, OnDestroy {
  @Input() columns: DataTableColumn[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() filterEnabled: boolean;
  @Input() metaCount: number;
  @Input() paginatedAPICall: boolean;
  @Input() parentSubject: Subject<any>; // used to confirm deletion of row.
  @Input() parentSubjectSubscription: Subscription; // used to confirm deletion of row.
  @Input() receivedData: any[];
  @Input() tableTitle: string;

  @Output() clickedItem = new EventEmitter();
  @Output() pageEvent = new EventEmitter<PageEvent>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any> = null;
  length: number;
  pageIndex = 0;
  pageSize = 25;
  primary = 'warning';

  ngOnInit() {
    if (this.dataSource != null) {
      this.dataSource.sort = this.sort;
    }

    // subscribe to the parentSubject to listen for events from the parent component
    if (this.parentSubject != null) {
      // if the event.action is confirmed, the user has confirmed deletion of item
      this.parentSubjectSubscription = this.parentSubject.subscribe(event => {
        if (event.action === 'confirmDelete') {
          this.dataSource.data.splice(event.rowToDelete, 1);
          this.dataSource._updateChangeSubscription();
        }

        if (event.action === 'updateRow') {
          console.log(event.updatedData);
          this.dataSource.data.splice(event.rowToUpdate, 1, event.updatedData);
          this.dataSource._updateChangeSubscription();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.parentSubjectSubscription) {
      this.parentSubjectSubscription.unsubscribe();
    }
  }

  ngOnChanges() {
    if (this.columns != null) {
      this.dataSource = new MatTableDataSource(this.receivedData);
      this.displayedColumns = this.columns.map(x => x.columnDef);
      if (this.metaCount) {
        this.length = this.metaCount;
        this.paginator.length = this.metaCount;
      } else {
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.pageSize = this.pageSize;
        this.dataSource.paginator.pageIndex = this.pageIndex;
        this.dataSource.paginator.length = this.receivedData.length;
      }
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // pagination
  updateProductsTable(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1; // API starts 1, Mat-Table starts at 0
    this.pageEvent.emit(event);
  }

  handleClick(column: any, row: any, rowIndex: any): void {
    this.clickedItem.emit({ column, row, rowIndex });
  }

  get calculatedWidth() {
    return `${100 / this.columns.length}%`;
  }
}
