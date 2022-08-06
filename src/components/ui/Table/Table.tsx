// 👇️ ts-nocheck ignores all ts errors in the file

// @ts-nocheck

// 👇️ ts-ignore ignores any ts errors on the next line

// @ts-ignore
import React, { Fragment } from 'react';
import Link from 'next/link';

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { mydata } from './data';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

type Person = {
  Service: string;
  Item: string;
  'Start Date': string;
  'Est Date of Delivery': string;
  Status: string;
  'Action Required': number;
};

const defaultData: Person[] = mydata;

function App() {
  // const [data, setData] = React.useState(() => [...defaultData])
  const [data, setData] = React.useState(() => [...defaultData]);
  const columnHelper = createColumnHelper<Person>();

  const columns = [
    columnHelper.accessor('Service', {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.Item, {
      id: 'Item',
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Item</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('Start Date', {
      header: () => 'Start Date',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('Est Date of Delivery', {
      header: () => <span>Est. Date of Delivery</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('Status', {
      header: 'Status',
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('Action Required', {
      header: 'Action Required',
      footer: (info) => info.column.id,
    }),
  ];

  return (
    <>
      <Tables
        {...{
          data,
          columns,
        }}
      />
    </>
  );
}

function Tables({
  data,
  columns,
}: {
  data: Person[];
  columns: ColumnDef<Person>[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <div className="relative">
      <div className="max-h-[65vh] 2xl:h-[50vh] bg-white    border rounded-xl shadow-lg pb-10  overflow-scroll lg:overflow-x-auto   lg:overflow-y-scroll">
        <table className="relative lg:w-full lg:table-fixed ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className="text-sm text-left bg-white border-b-2 text-[#304157]  "
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className="sticky top-0 w-20 px-8 py-5 bg-white "
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, idx) => {
              return (
                <Fragment key={idx}>
                  <Link passHref={true} href={`/dashboard/orders/${idx}`}>
                    <tr
                      className="text-sm text-left border-b border-gray-100 cursor-pointer "
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell, idx) => {
                        return (
                          <td
                            className={` ${
                              idx === 0
                                ? 'text-accent-1  font-bold '
                                : idx === 1
                                ? 'text-primary font-bold'
                                : idx === 2
                                ? 'text-secondary'
                                : idx === 4
                                ? 'text-[#185829]   '
                                : '  px-3  text-left  text-opacity-80'
                            } " px-8 py-2   text-left  text-secondary `}
                            key={cell.id}
                          >
                            <div
                              className={`${
                                idx === 4
                                  ? 'bg-[#F1FEF9] border-[#D4F2E6] border rounded-md text-center'
                                  : ''
                              } py-3 `}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </Link>
                </Fragment>
              );
            })}
          </tbody>
        </table>

        <div className="flex rounded-b-xl justify-between p-1.5 py-3 px-5 absolute bottom-0 w-full items-center bg-white border-t">
          <span className="flex items-center gap-1 text-sm text-secondary">
            <div>Showing</div>
            <p>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </p>
            <div>Orders</div>
          </span>

          {/* <h1 className="text-sm">1-10 of 97</h1> */}
          <div className="flex items-center gap-2 ">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <button
              className="p-1.5 border border-gray-400 bg-white rounded-md"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <AiOutlineLeft />
            </button>

            <button
              className="p-2 bg-white border border-[#FFC021] text-[#FFC021] rounded-md"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <AiOutlineRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
