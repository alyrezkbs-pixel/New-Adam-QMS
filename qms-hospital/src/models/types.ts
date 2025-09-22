// Common types used across the application

// User related types
export type UserRole = 'ceo' | 'qualityAdmin' | 'hod' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

// Document related types
export type DocumentStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived';
export type DocumentType = 'policy' | 'procedure' | 'form' | 'record' | 'manual' | 'guideline';

export interface Document {
  id: string;
  title: string;
  documentNumber: string;
  version: string;
  status: DocumentStatus;
  type: DocumentType;
  department: string;
  owner: string;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
  approvedBy?: string;
  approvedAt?: Date;
  publishedAt?: Date;
  expiryDate?: Date;
  tags?: string[];
  fileUrl?: string;
}

// KPI related types
export type KPIFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type KPIStatus = 'onTrack' | 'atRisk' | 'offTrack' | 'notStarted' | 'completed';

export interface KPI {
  id: string;
  name: string;
  description?: string;
  owner: string;
  department: string;
  target: number;
  actual: number;
  unit: string;
  frequency: KPIFrequency;
  status: KPIStatus;
  trend: 'up' | 'down' | 'stable';
  startDate: Date;
  endDate?: Date;
  history?: { date: Date; value: number }[];
}

// Risk related types
export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';
export type RiskLikelihood = 'rare' | 'unlikely' | 'possible' | 'likely' | 'almostCertain';
export type RiskStatus = 'identified' | 'assessed' | 'mitigated' | 'monitored' | 'closed';

export interface Risk {
  id: string;
  title: string;
  description: string;
  department: string;
  owner: string;
  severity: RiskSeverity;
  likelihood: RiskLikelihood;
  impact: number; // 1-5
  riskScore: number; // calculated: likelihood * impact
  status: RiskStatus;
  identifiedAt: Date;
  updatedAt?: Date;
  mitigationPlan?: string;
  mitigationStatus?: 'notStarted' | 'inProgress' | 'completed';
  reviewDate?: Date;
}

// Audit & Compliance related types
export type ComplianceStatus = 'compliant' | 'partiallyCompliant' | 'nonCompliant' | 'notApplicable';
export type AuditType = 'internal' | 'external' | 'regulatory' | 'certification';

export interface Audit {
  id: string;
  title: string;
  type: AuditType;
  standard?: string;
  department: string;
  auditor: string;
  startDate: Date;
  endDate?: Date;
  status: 'planned' | 'inProgress' | 'completed' | 'cancelled';
  findings?: AuditFinding[];
  score?: number; // 0-100
  report?: string;
}

export interface AuditFinding {
  id: string;
  auditId: string;
  description: string;
  type: 'nonConformity' | 'observation' | 'opportunity';
  severity: 'minor' | 'major' | 'critical';
  status: 'open' | 'inProgress' | 'closed';
  responsiblePerson?: string;
  dueDate?: Date;
  closedDate?: Date;
  evidence?: string;
}

// Training related types
export type TrainingStatus = 'scheduled' | 'inProgress' | 'completed' | 'cancelled';

export interface Training {
  id: string;
  title: string;
  description?: string;
  trainer: string;
  department: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  status: TrainingStatus;
  capacity?: number;
  attendees?: TrainingAttendee[];
  materials?: string[];
  evaluationScore?: number; // 0-5
}

export interface TrainingAttendee {
  userId: string;
  name: string;
  status: 'registered' | 'attended' | 'completed' | 'noShow';
  score?: number;
  feedback?: string;
  certificateIssued?: boolean;
}

// Feedback related types
export type FeedbackType = 'complaint' | 'suggestion' | 'compliment' | 'query';
export type FeedbackStatus = 'new' | 'inProgress' | 'resolved' | 'closed';

export interface Feedback {
  id: string;
  type: FeedbackType;
  source: 'patient' | 'staff' | 'visitor' | 'other';
  department: string;
  description: string;
  submittedBy?: string;
  submittedAt: Date;
  status: FeedbackStatus;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  resolution?: string;
  resolvedAt?: Date;
  satisfactionScore?: number; // 1-5
}

// Incident related types
export type IncidentSeverity = 'minor' | 'moderate' | 'major' | 'severe' | 'critical';
export type IncidentStatus = 'reported' | 'underInvestigation' | 'actionRequired' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  description: string;
  department: string;
  reportedBy: string;
  reportedAt: Date;
  incidentDate: Date;
  location?: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  category: string;
  rootCause?: string;
  immediateAction?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  assignedTo?: string;
  witnesses?: string[];
  attachments?: string[];
  closedAt?: Date;
  followUpDate?: Date;
}

// Meeting related types
export type MeetingStatus = 'scheduled' | 'inProgress' | 'completed' | 'cancelled';

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  organizer: string;
  department: string;
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  status: MeetingStatus;
  attendees?: MeetingAttendee[];
  agenda?: MeetingAgendaItem[];
  minutes?: string;
  actions?: MeetingAction[];
}

export interface MeetingAttendee {
  userId: string;
  name: string;
  status: 'invited' | 'confirmed' | 'declined' | 'attended';
}

export interface MeetingAgendaItem {
  id: string;
  title: string;
  duration?: number; // minutes
  presenter?: string;
  notes?: string;
}

export interface MeetingAction {
  id: string;
  description: string;
  assignedTo: string;
  dueDate?: Date;
  status: 'pending' | 'inProgress' | 'completed' | 'overdue';
  completedAt?: Date;
}

// Project related types
export type ProjectStatus = 'planning' | 'inProgress' | 'onHold' | 'completed' | 'cancelled';

export interface Project {
  id: string;
  title: string;
  description?: string;
  manager: string;
  department: string;
  startDate: Date;
  targetEndDate: Date;
  actualEndDate?: Date;
  status: ProjectStatus;
  progress: number; // 0-100
  budget?: number;
  actualCost?: number;
  risks?: Risk[];
  tasks?: ProjectTask[];
  stakeholders?: string[];
  attachments?: string[];
}

export interface ProjectTask {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  assignedTo?: string;
  startDate?: Date;
  dueDate?: Date;
  completedDate?: Date;
  status: 'notStarted' | 'inProgress' | 'completed' | 'blocked';
  progress: number; // 0-100
  priority: 'low' | 'medium' | 'high';
  dependencies?: string[]; // IDs of tasks this task depends on
}

// Department and Role types
export interface Department {
  id: string;
  name: string;
  description?: string;
  manager?: string;
  parentDepartment?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  createdAt: Date;
  updatedAt?: Date;
}