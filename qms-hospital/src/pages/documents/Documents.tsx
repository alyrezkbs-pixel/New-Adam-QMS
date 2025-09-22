import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

// Mock document data
interface Document {
  id: string;
  code: string;
  titleAr: string;
  titleEn: string;
  category: string;
  status: 'draft' | 'review' | 'approved' | 'archived';
  ownerId: string;
  ownerName: string;
  version: string;
  updatedAt: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    code: 'DOC-001',
    titleAr: 'سياسة الجودة',
    titleEn: 'Quality Policy',
    category: 'Policy',
    status: 'approved',
    ownerId: '2',
    ownerName: 'Quality Admin',
    version: '1.2',
    updatedAt: '2023-10-15',
  },
  {
    id: '2',
    code: 'DOC-002',
    titleAr: 'إجراءات التشغيل القياسية للطوارئ',
    titleEn: 'Emergency SOP',
    category: 'Procedure',
    status: 'review',
    ownerId: '3',
    ownerName: 'Department Head',
    version: '2.1',
    updatedAt: '2023-11-05',
  },
  {
    id: '3',
    code: 'DOC-003',
    titleAr: 'دليل سلامة المرضى',
    titleEn: 'Patient Safety Manual',
    category: 'Manual',
    status: 'approved',
    ownerId: '2',
    ownerName: 'Quality Admin',
    version: '1.0',
    updatedAt: '2023-09-20',
  },
  {
    id: '4',
    code: 'DOC-004',
    titleAr: 'نموذج تقييم المخاطر',
    titleEn: 'Risk Assessment Form',
    category: 'Form',
    status: 'draft',
    ownerId: '2',
    ownerName: 'Quality Admin',
    version: '0.3',
    updatedAt: '2023-11-12',
  },
  {
    id: '5',
    code: 'DOC-005',
    titleAr: 'خطة التدريب السنوية',
    titleEn: 'Annual Training Plan',
    category: 'Plan',
    status: 'approved',
    ownerId: '2',
    ownerName: 'Quality Admin',
    version: '1.1',
    updatedAt: '2023-10-30',
  },
];

const Documents: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleCategoryFilterChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
    setPage(0);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'review':
        return 'warning';
      case 'draft':
        return 'info';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.titleAr.includes(searchTerm);

    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV file
    alert(t('common.exportStarted'));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('documents.title')}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        {t('documents.description')}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', flex: 1 }}>
          <TextField
            label={t('common.search')}
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="category-filter-label">{t('documents.category')}</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={categoryFilter}
              label={t('documents.category')}
              onChange={handleCategoryFilterChange}
            >
              <MenuItem value="all">{t('common.all')}</MenuItem>
              <MenuItem value="Policy">Policy</MenuItem>
              <MenuItem value="Procedure">Procedure</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
              <MenuItem value="Form">Form</MenuItem>
              <MenuItem value="Plan">Plan</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="status-filter-label">{t('documents.status')}</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              label={t('documents.status')}
              onChange={handleStatusFilterChange}
            >
              <MenuItem value="all">{t('common.all')}</MenuItem>
              <MenuItem value="draft">{t('documents.statusDraft')}</MenuItem>
              <MenuItem value="review">{t('documents.statusReview')}</MenuItem>
              <MenuItem value="approved">{t('documents.statusApproved')}</MenuItem>
              <MenuItem value="archived">{t('documents.statusArchived')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<GetAppIcon />}
            onClick={handleExportCSV}
          >
            {t('common.exportCsv')}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
          >
            {t('documents.addDocument')}
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('documents.code')}</TableCell>
              <TableCell>{t('documents.title')}</TableCell>
              <TableCell>{t('documents.category')}</TableCell>
              <TableCell>{t('documents.status')}</TableCell>
              <TableCell>{t('documents.owner')}</TableCell>
              <TableCell>{t('documents.version')}</TableCell>
              <TableCell>{t('documents.updatedAt')}</TableCell>
              <TableCell align="center">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDocuments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.code}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{doc.titleEn}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {doc.titleAr}
                    </Typography>
                  </TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell>
                    <Chip
                      label={t(`documents.status${doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}`)}
                      size="small"
                      color={getStatusColor(doc.status) as any}
                    />
                  </TableCell>
                  <TableCell>{doc.ownerName}</TableCell>
                  <TableCell>{doc.version}</TableCell>
                  <TableCell>{doc.updatedAt}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" title={t('common.view')}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" title={t('common.edit')}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredDocuments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t('common.rowsPerPage')}
        />
      </TableContainer>
    </Box>
  );
};

export default Documents;