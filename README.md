# Sheetor

A modern React spreadsheet library for Next.js applications.

## Features

- Modern React component-based architecture
- Excel-like functionality
- Formulas support
- Import/export CSV data
- Keyboard navigation
- Copy, cut, and paste operations
- Multiple sheet support
- Custom styling options
- Dark mode support

## Installation

Since this is a local package, you can use it in your project by adding it as a dependency in your package.json.

```json
{
  "dependencies": {
    "@sheetor/spreadsheet": "0.1.0"
  }
}
```

## Usage

### Basic Example

```tsx
"use client";

import { Spreadsheet } from '@sheetor/spreadsheet';

export default function SpreadsheetPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spreadsheet Example</h1>

      <Spreadsheet
        height="600px"
        width="100%"
        onChange={(data) => console.log('Spreadsheet data changed:', data)}
      />
    </div>
  );
}
```

### With Custom Data

```tsx
"use client";

import { useState } from 'react';
import { Spreadsheet, SpreadsheetData } from '@sheetor/spreadsheet';

export default function SpreadsheetPage() {
  const [data, setData] = useState<SpreadsheetData>({
    sheets: {
      Sheet1: {
        rows: {
          0: {
            A: { value: 'Name', style: { fontWeight: 'bold' } },
            B: { value: 'Age', style: { fontWeight: 'bold' } },
            C: { value: 'Email', style: { fontWeight: 'bold' } },
          },
          1: {
            A: { value: 'John Doe', type: 'string' },
            B: { value: 30, type: 'number' },
            C: { value: 'john@example.com', type: 'string' },
          },
          2: {
            A: { value: 'Jane Smith', type: 'string' },
            B: { value: 25, type: 'number' },
            C: { value: 'jane@example.com', type: 'string' },
          },
        },
        columns: {},
        name: 'Sheet1',
      },
    },
    activeSheet: 'Sheet1',
  });

  const handleChange = (newData: SpreadsheetData) => {
    setData(newData);
    // You can save this data to localStorage, your database, etc.
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spreadsheet with Custom Data</h1>

      <Spreadsheet
        data={data}
        onChange={handleChange}
        height="600px"
        width="100%"
      />
    </div>
  );
}
```

### Import and Export Example

The Spreadsheet component provides built-in import/export functionality via the toolbar:

1. **Import**: Click "Import" and select a CSV file to upload
2. **Export**: Click "Export CSV" to download the current spreadsheet as a CSV file

### File Upload Example

```tsx
"use client";

import { useState } from 'react';
import { Spreadsheet, importFile, SpreadsheetData } from '@sheetor/spreadsheet';

export default function SpreadsheetUploadPage() {
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const result = await importFile(file);

    if (result.success) {
      setSpreadsheetData(result.data);
    } else {
      alert(`Error importing file: ${result.error}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload CSV to Spreadsheet</h1>

      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      {spreadsheetData && (
        <Spreadsheet
          data={spreadsheetData}
          onChange={setSpreadsheetData}
        />
      )}
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `SpreadsheetData` | `{ sheets: { Sheet1: { rows: {}, columns: {}, name: 'Sheet1' } }, activeSheet: 'Sheet1' }` | Initial spreadsheet data |
| `onChange` | `(data: SpreadsheetData) => void` | `undefined` | Called when spreadsheet data changes |
| `onCellChange` | `(sheet: string, row: number, col: string, cell: Cell) => void` | `undefined` | Called when a specific cell changes |
| `onSelectionChange` | `(selection: Selection) => void` | `undefined` | Called when the selection changes |
| `readOnly` | `boolean` | `false` | Whether the spreadsheet is read-only |
| `height` | `string \| number` | `'600px'` | Height of the spreadsheet |
| `width` | `string \| number` | `'100%'` | Width of the spreadsheet |
| `showToolbar` | `boolean` | `true` | Whether to show the toolbar |
| `showFormulaBar` | `boolean` | `true` | Whether to show the formula bar |
| `showSheetTabs` | `boolean` | `true` | Whether to show the sheet tabs |
| `darkMode` | `boolean` | `false` | Whether to use dark mode |
| `className` | `string` | `''` | Additional CSS class name |
| `style` | `React.CSSProperties` | `{}` | Additional inline styles |

## Types

The library exports the following TypeScript types:

```tsx
// Cell value can be string, number, boolean, or null
export type CellValue = string | number | boolean | null;

// Cell style properties
export interface CellStyle {
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  fontSize?: number;
  border?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

// Cell data
export interface Cell {
  value: CellValue;
  formula?: string;
  style?: CellStyle;
  type?: 'string' | 'number' | 'boolean' | 'date' | 'currency' | 'percentage';
  format?: string;
}

// Row data as a map of column keys to cells
export type RowData = Record<string, Cell>;

// Sheet data
export interface SheetData {
  rows: Record<number, RowData>; // Map of row indices to row data
  columns: Record<string, { width?: number }>; // Column configurations
  name: string;
  frozen?: {
    rows?: number;
    columns?: number;
  };
}

// Spreadsheet data with multiple sheets
export interface SpreadsheetData {
  sheets: Record<string, SheetData>;
  activeSheet: string;
}

// Selection state
export interface Selection {
  start: { row: number; col: string };
  end: { row: number; col: string };
  activeCell: { row: number; col: string };
}
```

## License

MIT
