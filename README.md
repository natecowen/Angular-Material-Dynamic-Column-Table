# Angular Material Dynamic Column Table

This is a reusable component using Angular Material's Mat Table. This allows me to use a lot of tables across different components, while only having to maintain one table component. In order to be able to be used in numerous places it has to be able to set columns and data dynamically. 

*[A simplified example of this running can be seen in StackBlitz here](https://angular-zjjpgq.stackblitz.io)*

## How to use

Copy the shared folder to your Angular applications (src/app/shared). Import the Shared Module into your app.module.ts via `import { SharedModule } from './shared/shared.module';`

In your tsconfig.json file of your application, add line 20 & 23 from the tsconfig.json example in this repo.

### Add the following to your HTML template
```html
   <!-- Table - Data Results from API -->
  <div *ngIf="results">
    <custom-data-table
      [(receivedData)] = "results"
      [(columns)] = "columns"
      [(tableTitle)] = "tableTitle"
      [(metaCount)] = "metaCount"
      (clickedItem) = "handleClick($event)"
      (pageEvent) = "updatePagination($event)"
      [filterEnabled] = "false"
      >
    </custom-data-table>
  </div>
```

### Declare your columns in your your component typescript file

```typescript
  // define custom data table columns
  columns: DataTableColumn[] = [
    { columnDef: 'productName', header: 'Product Name', dataName: row => `${row.name}`, type: 'data' },
    { columnDef: 'productDescription', header: 'Description', dataName: row => `${row.itemDescription}`, type: 'data' }
  ];
```

> Note that the .name, .itemsDescription in the columns above both refer to key value pairs returned from an API response body.

### Declare the following in your component typescript file
```typescript 
metaCount: number;
pageIndex = 1;
pageSize = 25;
results: any;
tableTitle: string;
```

### Add the following table helper functions to your component typescript file and customize to your liking
```typescript
//////////////////////////////////////
// Table Related Functions
/////////////////////////////////////

  // Functions used by data-table component
  updatePagination(event: any): void {
      this.APICall(event.pageIndex + 1, event.pageSize);
    
  }

  handleClick(obj: any): void {
    const { column, row } = obj;
    const { action } = column;
    const guid = column.dataName(row);

    switch (action) {
      case 'add-to-cart':
        this.addToCart(guid);
        break;

      case 'view-item':
        this.viewItem(guid);
        break;

      default:
        console.log('clicked: ' + guid);
        break;
    }
  }

  viewItem(guid: string): void {
    // call an api to get item and either take to a new page, a popup model or something else
  }

  addToCart(guid: string): void {
    // add item to shopping cart via an api, update shopping cart icon to reflect items in cart
  }
}
```

### And finally

Set values for things like tableTile, metaCount (usually count returned from api query), and subscribe to your api call (mapping your data to "this.results" declared above. )


## FAQ

### Columns

The developer needs to define the data table columns. Create an array of anonymous objects. These anonymous objects should contain the columnDef, header, and dataName for that column. The dataName defines which field from a row represents the primary key of that row.

### Buttons

When the developer wishes to put a button in a column, it is defined in the column. Like other typical columns, the columnDef, header, and dataName need to be defined. However, a button should also include a 'type' property and an 'action' property. The 'type' propery should always be 'button'. The 'action' property is optional. Were the developer to include more than one column with a button in it, the 'action' property is there to define what action should be taken when the button is cliked. All buttons in the same datatable share the same click event - the 'action' property routes the button to the corresponding event associated with that column.

When a button in a data table is clicked, it returns the column, row, and rowIndex in an anonymous object to the event handler. The action property is a member of the column object. In this way the event handler can determine with action to take with the event ('View/Edit', 'Delete', etc.). The rowIndex is available if that needs to be passed through, like in the case of deleting a row. The primary key is available through calling column.dataName(row). Since all the information from the column and the row are available, it is possible for the developer to grab data from other fields other than just the primary key.
