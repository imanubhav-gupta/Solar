import { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { Search, Edit, Filter } from 'lucide-react';

const mockTickets = [
  { id: 'TKT-1001', department: 'Sales', customer: 'Acme Corp', status: 'Open', date: '2024-03-24' },
  { id: 'TKT-1002', department: 'Service', customer: 'TechFlow Inc', status: 'In Repair', date: '2024-03-23' },
  { id: 'TKT-1003', department: 'Service', customer: 'SunRise Ltd', status: 'Closed', date: '2024-03-20' },
  { id: 'TKT-1004', department: 'Sales', customer: 'Global Energy', status: 'Pending Approval', date: '2024-03-24' },
  { id: 'TKT-1005', department: 'Service', customer: 'Urban Solar', status: 'Open', date: '2024-03-25' },
];

export default function MasterTicketManagement() {
  const [data, setData] = useState(mockTickets);
  const [globalFilter, setGlobalFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const columns = [
    { header: 'Ticket ID', accessorKey: 'id' },
    { header: 'Department', accessorKey: 'department' },
    { header: 'Customer', accessorKey: 'customer' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Date', accessorKey: 'date' },
    { 
      header: 'Actions', 
      id: 'actions',
      cell: () => (
        <button onClick={() => alert('Editing ticket details...')} className="text-brand-600 hover:text-brand-800 flex items-center text-sm font-medium transition-colors">
          <Edit className="w-4 h-4 mr-1" /> Edit Any
        </button>
      )
    }
  ];

  const filteredData = data.filter(row => {
    if (deptFilter !== 'All' && row.department !== deptFilter) return false;
    return true;
  });

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="animate-fade-in p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Master Ticket Management</h2>
          <p className="text-slate-500 mt-1">View and override tickets across all departments.</p>
        </div>
        
        <div className="flex space-x-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search tickets..." 
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <select 
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="pl-9 pr-8 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500 appearance-none bg-white font-medium text-sm text-slate-700"
            >
              <option value="All">All Depts</option>
              <option value="Sales">Sales</option>
              <option value="Service">Service</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-slate-50 border-b border-slate-200">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4 text-sm text-slate-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {table.getRowModel().rows.length === 0 && (
          <div className="p-8 text-center text-slate-500">No tickets found matching your criteria.</div>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-slate-500">
          Showing {table.getRowModel().rows.length} rows
        </span>
        <div className="space-x-2">
          <button 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 border rounded-lg text-sm font-medium disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 border rounded-lg text-sm font-medium disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
