// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import { Component, Directive } from '@angular/core';
import { DataTableComponent } from './data-table.component';

import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '@shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DataTableComponent', () => {
  let fixture: ComponentFixture<DataTableComponent>;
  let component;

  /*   Unit tests should use mock data -- check
Unit test should verify buttons have proper index or row id's (this is required to update/delete rows)
Unit test should verify the parentSubjectSubscription confirmDelete action removes the proper data
Unit test should verify the parentSubjectSubscription updateRow action the proper row */

  const init = () => {
    TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [BrowserAnimationsModule, MaterialModule],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.debugElement.componentInstance;
  };

  it('should create a component', () => {
    init();
    component.columns = [];
    component.receivedData = [];
    component.dataSource = [];
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('when no data is received', () => {
    beforeEach(() => {
      init();
      component.columns = [];
      component.receivedData = [];
      component.dataSource = [];
      component.ngOnChanges();
      fixture.detectChanges();
    });

    it('should display no columns', () => {
      let el = fixture.debugElement.queryAll(By.css('th'));
      expect(el.length).toEqual(0);
    });

    it('should display a single row', () => {
      //let el = fixture.debugElement.queryAll(By.css('tr'));
      let el = fixture.debugElement.nativeElement.querySelectorAll('tr');
      //console.log(el);
      expect(el.length).toEqual(1);
    });

    it('should display No Results message', () => {
      let el: HTMLElement = fixture.debugElement.query(By.css('#noResults')).nativeElement;
      expect(el.innerText).toEqual('No Results to Display');
    });
  });

  describe('when data is received', () => {
    beforeEach(() => {
      init();
      component.columns = [
        { columnDef: 'productName', header: 'Product Name', dataName: row => `${row.name}`, type: 'data' },
        {
          columnDef: 'productDescription',
          header: 'Description',
          dataName: row => `${row.itemDescription}`,
          type: 'data'
        },
        {
          columnDef: 'addToCartBtn',
          header: 'Add To Cart',
          dataName: row => `${row.guid}`,
          type: 'button',
          action: 'add-to-cart'
        },
        {
          columnDef: 'detailBtn',
          header: 'View/Edit',
          dataName: row => `${row.guid}`,
          type: 'button',
          action: 'view-item'
        },
        {
          columnDef: 'deleteBtn',
          header: 'Delete',
          dataName: row => `${row.guid}`,
          type: 'button',
          action: 'delete-item'
        }
      ];

      component.receivedData = [
        {
          guid: '1fee947c-bc38-4d23-9a5f-b6c34827e676',
          isactive: true,
          name: 'T7PLUS OVERLAY 2',
          price: 3,
          itemNumber: 'T7PLUS OVERLAY',
          itemDescription: '0105751 - P/N 700304-004 T7Plus 35key Overlay rest/retail',
          itemShortName: 'Miscellaneous  ',
          sellingUnitOfMeasure: 'EACH     ',
          productTypeGUID: '86A72EEB-F7CA-45F8-AB45-9C365851D8EC',
          itemTrackingOption: 1,
          itemCodeGUID: 'OVY',
          modelID: '   ',
          legacyItemGUID: null,
          salesCategoryGUID: '2E27D0E-0D76-43EF-A9C1-85571F8BD751',
          itemClassID: 'SUP        ',
          totalPlateLines: 0,
          totalPlateChars: 0,
          isEliteKit: false,
          isLeaseAllowed: false,
          isplate: false,
          isRentalAllowed: false,
          isRentalFee: false,
          isReprogrammingAvailable: false,
          isSwapAllowed: false,
          isTrainingAvailable: false,
          isTaxable: false,
          isdownloadable: false,
          isinjectable: false,
          iswireless: false,
          corporateCustomerDetails: [
            {
              guid: '14F7CA22-F43C-4363-9F59-4B895EA38319',
              name: 'North American Bancard                                           ',
              price: 3,
              priceoverride: true,
              software: null,
              locationcode: 'MAIN',
              injectionkeys: null,
              processors: null
            },
            {
              guid: 'FBA01F52-B43A-5AC2-978E-5EA1D6CEB3D8',
              name: 'ZZZ TEST ACCOUNT                                                 ',
              price: 3,
              priceoverride: true,
              software: null,
              locationcode: 'MAIN',
              injectionkeys: null,
              processors: null
            },
            {
              guid: '227028D6-3813-5ECA-A4C5-DCFCF130FE1B',
              name: 'Clearent                                                         ',
              price: 3,
              priceoverride: true,
              software: null,
              locationcode: 'MAIN',
              injectionkeys: null,
              processors: null
            },
            {
              guid: '711D35F4-1525-4468-BBAE-B6B3B3EAE278',
              name: 'Pivotal Payments Inc.-NY1190',
              price: 3,
              priceoverride: true,
              software: null,
              locationcode: 'MAIN',
              injectionkeys: null,
              processors: null
            }
          ],
          defaultSoftware: null,
          locationSlots: null,
          accessories: null,
          qtyOnHand: 3773,
          swapProductGuid: '00000000-0000-0000-0000-000000000000'
        },
        {
          guid: '1fee947c-bc38-4d23-9a5f-b6c34827e677',
          isactive: true,
          name: 'T7PLUS OVERLAY 3',
          price: 3,
          itemNumber: 'T7PLUS OVERLAY',
          itemDescription: '0105751 - P/N 700304-004 T7Plus 35key Overlay rest/retail',
          itemShortName: 'Miscellaneous  ',
          sellingUnitOfMeasure: 'EACH     ',
          productTypeGUID: '86A72EEB-F7CA-45F8-AB45-9C365851D8EC',
          itemTrackingOption: 1,
          itemCodeGUID: 'OVY',
          modelID: '   ',
          legacyItemGUID: null,
          salesCategoryGUID: '2E27D0E-0D76-43EF-A9C1-85571F8BD751',
          itemClassID: 'SUP        ',
          totalPlateLines: 0,
          totalPlateChars: 0,
          isEliteKit: false,
          isLeaseAllowed: false,
          isplate: false,
          isRentalAllowed: false,
          isRentalFee: false,
          isReprogrammingAvailable: false,
          isSwapAllowed: false,
          isTrainingAvailable: false,
          isTaxable: false,
          isdownloadable: false,
          isinjectable: false,
          iswireless: false,
          corporateCustomerDetails: [
            {
              guid: '14F7CA22-F43C-4363-9F59-4B895EA38319',
              name: 'North American Bancard                                           ',
              price: 3,
              priceoverride: true,
              software: null,
              locationcode: 'MAIN',
              injectionkeys: null,
              processors: null
            },
            {
              guid: 'FBA01F52-B43A-5AC2-978E-5EA1D6CEB3D8',
              name: 'ZZZ TEST ACCOUNT                                                 ',
              price: 3,
              priceoverride: true,
              software: null,
              locationcode: 'MAIN',
              injectionkeys: null,
              processors: null
            },
            {
              guid: '227028D6-3813-5ECA-A4C5-DCFCF130FE1B',
              name: 'Clearent                                                         ',
              price: 3,
              priceoverride: true,
              software: null,
              locationcode: 'MAIN',
              injectionkeys: null,
              processors: null
            },
            {
              guid: '711D35F4-1525-4468-BBAE-B6B3B3EAE278',
              name: 'Pivotal Payments Inc.-NY1190',
              price: 3,
              priceoverride: true,
              software: null,
              locationcode: 'MAIN',
              injectionkeys: null,
              processors: null
            }
          ],
          defaultSoftware: null,
          locationSlots: null,
          accessories: null,
          qtyOnHand: 3773,
          swapProductGuid: '00000000-0000-0000-0000-000000000000'
        }
      ];
      component.parentSubject = new Subject();
      component.metaCount = 1;
      component.ngOnChanges();
      fixture.detectChanges();
    });

    it('should display 5 columns', () => {
      // expect(fixture.debugElement.queryAll(By.css('th')).length).toEqual(5);
      let el = fixture.debugElement.nativeElement.querySelectorAll('th');
      //console.log(el);
      expect(el.length).toEqual(5);
    });

    it('should display a mat-table', () => {
      //expect(fixture.debugElement.queryAll(By.css('mat-table')).length).toEqual(1);
      let el = fixture.debugElement.nativeElement.querySelectorAll('table.mat-table');
      //console.log(el);
      expect(el.length).toEqual(1);
    });

    it('should have a column name of Product Name in the first column', () => {
      // let el = fixture.debugElement.queryAll(By.css('th'));
      let el = fixture.debugElement.nativeElement.querySelectorAll('tr.mat-header-row');
      // console.log(el);

      expect(el[0].children[0].innerText).toEqual('Product Name');
    });

    it('should label column names correctly', () => {
      component.columns.forEach((column, index) => {
        //let el: HTMLElement = fixture.debugElement.queryAll(By.css('th'))[index].nativeElement;
        let el = fixture.debugElement.nativeElement.querySelectorAll('th');
        //console.log(el[index]);
        expect(el[index].innerHTML).toContain(column.header);
      });
    });

    it('should load an Add To Cart button', () => {
      //let button: HTMLButtonElement = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
      let button = fixture.debugElement.nativeElement.querySelectorAll('button');
      //console.log(button);
      expect(button[0].children[0].innerHTML).toContain('Add To Cart');
    });

    it('should load a view/edit button', () => {
      //let button: HTMLButtonElement = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
      let button = fixture.debugElement.nativeElement.querySelectorAll('button');
      expect(button[1].children[0].innerHTML).toContain('View/Edit');
    });

    it('should load a delete button', () => {
      //let button: HTMLButtonElement = fixture.debugElement.queryAll(By.css('button'))[2].nativeElement;
      let button = fixture.debugElement.nativeElement.querySelectorAll('button');
      expect(button[2].children[0].innerHTML).toContain('Delete');
    });

    it('should fetch the correct column, row, and rowIndex when delete button is clicked', () => {
      let button = fixture.debugElement.nativeElement.querySelectorAll('button')[2];

      // let button: HTMLButtonElement = fixture.debugElement.queryAll(By.css('button'))[2].nativeElement;
      spyOn(component, 'handleClick').and.callThrough();
      button.click();
      expect(component.handleClick).toHaveBeenCalledWith(component.columns[4], component.dataSource.data[0], 0);
    });

    it('should remove the correct data when confirmDelete is called', () => {
      const rowIndex = 0;
      const rowToBeDeleted = component.dataSource.data[rowIndex];
      component.parentSubject.next({ action: 'confirmDelete', rowToDelete: rowIndex });
      component.ngOnChanges();
      fixture.detectChanges();
      expect(component.dataSource.data[rowIndex]).not.toEqual(rowToBeDeleted);
    });

    it('should update the correct data when updateRow is called', () => {
      const rowIndex = 1;
      const name = { name: 'New Product Name' };
      const updatedData = { ...component.receivedData[0], ...name };
      component.parentSubject.next({ action: 'updateRow', rowToUpdate: rowIndex, updatedData });
      component.ngOnInit();
      component.ngOnChanges();
      fixture.detectChanges();
      const newName = component.dataSource.data[rowIndex].name;
      expect(newName).toEqual(name.name);
    });
  });
});
