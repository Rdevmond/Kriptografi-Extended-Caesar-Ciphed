import React from 'react';
import { cn } from '../../utils/cn';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children, className, ...props }) => {
  return (
    <div className="table-container shadow-sm border-slate-200">
      <table className={cn('data-table w-full', className)} {...props}>
        {children}
      </table>
    </div>
  );
};

export const Thead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, ...props }) => (
  <thead className="bg-slate-50 border-b border-slate-200" {...props}>{children}</thead>
);

export const Tbody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, ...props }) => (
  <tbody className="divide-y divide-slate-100 bg-white" {...props}>{children}</tbody>
);

export const Tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ children, className, ...props }) => (
  <tr className={cn('hover:bg-slate-50 transition-colors', className)} {...props}>{children}</tr>
);

export const Th: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => (
  <th className={cn('px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider', className)} {...props}>{children}</th>
);

export const Td: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => (
  <td className={cn('px-4 py-3 text-sm text-slate-700 whitespace-nowrap', className)} {...props}>{children}</td>
);
