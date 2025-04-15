# @sheetor/spreadsheet

A React-based spreadsheet component with xlsx import/export support.

## Features

- Import and export Excel files (xlsx, xls, csv)
- Multi-sheet support
- Cell formatting
- Formula support (basic)
- Cell selection and editing
- TypeScript support

## Installation

```bash
npm install @sheetor/spreadsheet
```

## Usage

### Basic Usage

```tsx
import React, { useState } from 'react';
import { Spreadsheet, SpreadsheetData } from '@sheetor/spreadsheet';

function App() {
  const [data, setData] = useState<SpreadsheetData>({
    Sheet1: {
      A1: { value: 'Hello' },
      B1: { value: 'World' },
    },
  });

  return (
    <div>
      <Spreadsheet initialData={data} onDataChange={setData} />
    </div>
  );
}
```

### Import/Export

The component provides built-in UI for importing and exporting Excel files, but you can also programmatically trigger these actions:

```tsx
import { useRef } from 'react';
import { Spreadsheet, useSpreadsheet } from '@sheetor/spreadsheet';

function App() {
  const {
    data,
    importData,
    exportData,
  } = useSpreadsheet();

  // Import an Excel file
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      await importData(file);
    }
  };

  // Export to Excel file
  const handleExport = () => {
    exportData({ fileName: 'my-spreadsheet.xlsx' });
  };

  return (
    <div>
      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
      <button onClick={handleExport}>Export</button>

      <Spreadsheet initialData={data} />
    </div>
  );
}
```

### API Reference

#### `Spreadsheet` Component

| Prop | Type | Description |
|------|------|-------------|
| `initialData` | `SpreadsheetData` | Initial data for the spreadsheet |
| `className` | `string` | CSS class for the container |
| `onDataChange` | `(data: SpreadsheetData) => void` | Called when data changes |

#### `useSpreadsheet` Hook

| Method | Description |
|--------|-------------|
| `data` | The current spreadsheet data |
| `activeSheet` | The currently active sheet name |
| `setActiveSheet` | Function to change the active sheet |
| `getCell` | Get a cell by address or coordinates |
| `setCellValue` | Set a cell value and optional formula |
| `setCellStyle` | Set cell styling options |
| `addSheet` | Add a new sheet |
| `removeSheet` | Remove an existing sheet |
| `renameSheet` | Rename an existing sheet |
| `importData` | Import data from Excel file |
| `exportData` | Export data to Excel file |
| `clearSheet` | Clear the current sheet |
| `clearAll` | Clear all sheets |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build
```

## License

MIT
