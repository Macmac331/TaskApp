import React from'react';

const Table = ({ columns, data, keyExtractor }) => { 
    return (
            <table className="table-fixed min-w-full h-full bg-white border-2">
                <thead className='sticky top-0 bg-white z-10'>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}className="py-2 px-4 border-b ">
                                {col.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                    <tbody className=''>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={keyExtractor(item)}>
                                {columns.map((col) => (
                                    <td key={col.key} className="py-2 px-4 border-b text-center">
                                        {col.render ? col.render(item) : item[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="py-2 px-4 border-b text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
    );
}

export default Table;
