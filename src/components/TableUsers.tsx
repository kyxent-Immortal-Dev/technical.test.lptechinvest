import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Eye, SortDown, SortUp } from 'react-bootstrap-icons';
import { User } from '../interfaces/UserInterface';

interface TableUsersProps {
  users: User[];
  theme: string;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  onShowDetails: (user: User) => void;
}

export default function TableUsers({ 
  users, 
  theme, 
  sortField, 
  sortDirection, 
  onSort, 
  onShowDetails 
}: TableUsersProps) {

  const sortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <SortUp size={14} /> : <SortDown size={14} />;
  };

  return (
    <div className="table-responsive user-table-container">
      <Table bordered hover responsive className={`user-table ${theme === 'dark' ? 'table-dark' : 'table-light'}`}>
        <thead>
          <tr>
            <th onClick={() => onSort('id')} className="user-th">
              <div className="d-flex justify-content-between align-items-center">
                ID {sortIcon('id')}
              </div>
            </th>
            <th onClick={() => onSort('name')} className="user-th">
              <div className="d-flex justify-content-between align-items-center">
                Name {sortIcon('name')}
              </div>
            </th>
            <th onClick={() => onSort('email')} className="user-th d-none d-md-table-cell">
              <div className="d-flex justify-content-between align-items-center">
                Email {sortIcon('email')}
              </div>
            </th>
            <th onClick={() => onSort('company')} className="user-th d-none d-md-table-cell">
              <div className="d-flex justify-content-between align-items-center">
                Company {sortIcon('company')}
              </div>
            </th>
            <th className="user-th text-center">Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="user-tr">
              <td>{user.id}</td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="user-avatar me-2">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {user.name}
                </div>
              </td>
              <td className="d-none d-md-table-cell">{user.email}</td>
              <td className="d-none d-md-table-cell">{user.company?.name || 'N/A'}</td>
              <td className="text-center">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onShowDetails(user)}
                  className="user-button"
                >
                  <Eye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}