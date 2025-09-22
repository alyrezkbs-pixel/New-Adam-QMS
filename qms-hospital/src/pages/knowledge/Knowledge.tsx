import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DocumentsGrid from '../../components/visualizations/DocumentsGrid';
import { mockDocuments } from '../../models/mockData';
import { Document, DocumentType } from '../../models/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`document-tabpanel-${index}`}
      aria-labelledby={`document-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `document-tab-${index}`,
    'aria-controls': `document-tabpanel-${index}`,
  };
}

const Knowledge: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [documentType, setDocumentType] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDocumentTypeChange = (event: SelectChangeEvent) => {
    setDocumentType(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    // In a real application, you might navigate to a document viewer page
    console.log('View document:', document);
  };

  const filteredDocuments = useMemo(() => {
    return mockDocuments.filter(doc => {
      // Filter by document type
      if (documentType !== 'all' && doc.type !== documentType) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          doc.title.toLowerCase().includes(query) ||
          doc.documentNumber.toLowerCase().includes(query) ||
          doc.department.toLowerCase().includes(query) ||
          doc.tags?.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  }, [documentType, searchQuery]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('knowledge.title')}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        {t('knowledge.description')}
      </Typography>

      <Paper sx={{ width: '100%', mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', px: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="Document tabs"
            sx={{ flexGrow: 1 }}
          >
            <Tab label={t('knowledge.allDocuments')} {...a11yProps(0)} />
            <Tab label={t('knowledge.policies')} {...a11yProps(1)} />
            <Tab label={t('knowledge.procedures')} {...a11yProps(2)} />
            <Tab label={t('knowledge.forms')} {...a11yProps(3)} />
          </Tabs>
          <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
            <InputLabel id="document-type-select-label">{t('document.type')}</InputLabel>
            <Select
              labelId="document-type-select-label"
              id="document-type-select"
              value={documentType}
              label={t('document.type')}
              onChange={handleDocumentTypeChange}
            >
              <MenuItem value="all">{t('common.all')}</MenuItem>
              <MenuItem value="policy">{t('document.type.policy')}</MenuItem>
              <MenuItem value="procedure">{t('document.type.procedure')}</MenuItem>
              <MenuItem value="form">{t('document.type.form')}</MenuItem>
              <MenuItem value="manual">{t('document.type.manual')}</MenuItem>
              <MenuItem value="guideline">{t('document.type.guideline')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder={t('knowledge.searchPlaceholder')}
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TabPanel value={tabValue} index={0}>
          <DocumentsGrid 
            documents={filteredDocuments} 
            onViewDocument={handleViewDocument}
            onDownloadDocument={(doc) => console.log('Download document:', doc)}
            onEditDocument={(doc) => console.log('Edit document:', doc)}
            onDeleteDocument={(doc) => console.log('Delete document:', doc)}
            onShareDocument={(doc) => console.log('Share document:', doc)}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <DocumentsGrid 
            documents={filteredDocuments.filter(doc => doc.type === 'policy')} 
            onViewDocument={handleViewDocument}
            onDownloadDocument={(doc) => console.log('Download document:', doc)}
            onEditDocument={(doc) => console.log('Edit document:', doc)}
            onDeleteDocument={(doc) => console.log('Delete document:', doc)}
            onShareDocument={(doc) => console.log('Share document:', doc)}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <DocumentsGrid 
            documents={filteredDocuments.filter(doc => doc.type === 'procedure')} 
            onViewDocument={handleViewDocument}
            onDownloadDocument={(doc) => console.log('Download document:', doc)}
            onEditDocument={(doc) => console.log('Edit document:', doc)}
            onDeleteDocument={(doc) => console.log('Delete document:', doc)}
            onShareDocument={(doc) => console.log('Share document:', doc)}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <DocumentsGrid 
            documents={filteredDocuments.filter(doc => doc.type === 'form')} 
            onViewDocument={handleViewDocument}
            onDownloadDocument={(doc) => console.log('Download document:', doc)}
            onEditDocument={(doc) => console.log('Edit document:', doc)}
            onDeleteDocument={(doc) => console.log('Delete document:', doc)}
            onShareDocument={(doc) => console.log('Share document:', doc)}
          />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Knowledge;