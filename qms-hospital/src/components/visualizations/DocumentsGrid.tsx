import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton,
  Tooltip,
  CardActions,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  styled
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PolicyIcon from '@mui/icons-material/Policy';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { Document, DocumentStatus, DocumentType } from '../../models/types';

interface DocumentsGridProps {
  documents: Document[];
  onViewDocument?: (document: Document) => void;
  onEditDocument?: (document: Document) => void;
  onDeleteDocument?: (document: Document) => void;
  onDownloadDocument?: (document: Document) => void;
  onShareDocument?: (document: Document) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatusChip = styled(Chip)<{ status: DocumentStatus }>(({ theme, status }) => {
  const statusColors = {
    draft: theme.palette.info.light,
    review: theme.palette.warning.light,
    approved: theme.palette.success.light,
    published: theme.palette.success.main,
    archived: theme.palette.grey[500],
  };

  return {
    backgroundColor: statusColors[status],
    color: theme.palette.getContrastText(statusColors[status]),
    fontWeight: 500,
    fontSize: '0.75rem',
  };
});

const DocumentIcon: React.FC<{ type: DocumentType }> = ({ type }) => {
  switch (type) {
    case 'policy':
      return <PolicyIcon color="primary" />;
    case 'procedure':
      return <AssignmentIcon color="secondary" />;
    case 'form':
      return <ReceiptIcon color="action" />;
    case 'manual':
      return <MenuBookIcon color="error" />;
    default:
      return <DescriptionIcon color="info" />;
  }
};

const DocumentsGrid: React.FC<DocumentsGridProps> = ({ 
  documents, 
  onViewDocument, 
  onEditDocument, 
  onDeleteDocument, 
  onDownloadDocument,
  onShareDocument
 }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, document: Document) => {
    setAnchorEl(event.currentTarget);
    setSelectedDocument(document);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: 'view' | 'edit' | 'delete' | 'download' | 'share') => {
    if (!selectedDocument) return;

    switch (action) {
      case 'view':
        onViewDocument && onViewDocument(selectedDocument);
        break;
      case 'edit':
        onEditDocument && onEditDocument(selectedDocument);
        break;
      case 'delete':
        onDeleteDocument && onDeleteDocument(selectedDocument);
        break;
      case 'download':
        onDownloadDocument && onDownloadDocument(selectedDocument);
        break;
      case 'share':
        onShareDocument && onShareDocument(selectedDocument);
        break;
    }

    handleMenuClose();
  };

  return (
    <>
      <Grid container spacing={3}>
        {documents.map((document) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={document.id}>
            <StyledCard>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <DocumentIcon type={document.type} />
                  <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 'bold' }} noWrap>
                    {document.title}
                  </Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {document.documentNumber}
                  </Typography>
                  <StatusChip 
                    label={t(`document.status.${document.status}`)} 
                    size="small" 
                    status={document.status} 
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {t('document.version')}: {document.version}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  {t('document.department')}: {document.department}
                </Typography>
                
                <Box mt={2}>
                  {document.tags?.map((tag) => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small" 
                      sx={{ mr: 0.5, mb: 0.5 }} 
                    />
                  ))}
                </Box>
              </CardContent>
              
              <CardActions sx={{ justifyContent: 'space-between', p: 1 }}>
                <Box>
                  <Tooltip title={t('common.view')}>
                    <IconButton size="small" onClick={() => onViewDocument && onViewDocument(document)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('common.download')}>
                    <IconButton size="small" onClick={() => onDownloadDocument && onDownloadDocument(document)}>
                      <GetAppIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <Tooltip title={t('common.more')}>
                  <IconButton size="small" onClick={(e) => handleMenuOpen(e, document)}>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction('view')}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('common.view')} />
        </MenuItem>
        <MenuItem onClick={() => handleAction('download')}>
          <ListItemIcon>
            <GetAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('common.download')} />
        </MenuItem>
        <MenuItem onClick={() => handleAction('share')}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('common.share')} />
        </MenuItem>
        <MenuItem onClick={() => handleAction('edit')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('common.edit')} />
        </MenuItem>
        <MenuItem onClick={() => handleAction('delete')}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('common.delete')} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default DocumentsGrid;