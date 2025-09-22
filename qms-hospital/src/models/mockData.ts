import { 
  User, UserRole, Document, DocumentStatus, DocumentType,
  KPI, KPIFrequency, KPIStatus, Risk, RiskSeverity, RiskLikelihood, RiskStatus,
  Audit, AuditFinding, Training, TrainingAttendee, Feedback, FeedbackType, FeedbackStatus,
  Incident, IncidentSeverity, IncidentStatus, Meeting, MeetingStatus, Project, ProjectStatus, ProjectTask,
  Department, Role
} from './types';

// Helper function to generate random IDs
const generateId = (): string => Math.random().toString(36).substring(2, 15);

// Helper function to generate random date within a range
const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper function to pick a random item from an array
const randomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Helper function to generate random number within a range
const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmed Al-Mansour',
    email: 'ahmed.almansour@hospital.com',
    role: 'ceo',
    avatar: '/assets/avatars/avatar1.png'
  },
  {
    id: '2',
    name: 'Fatima Al-Zahra',
    email: 'fatima.alzahra@hospital.com',
    role: 'qualityAdmin',
    department: 'Quality Management',
    avatar: '/assets/avatars/avatar2.png'
  },
  {
    id: '3',
    name: 'Mohammed Al-Harbi',
    email: 'mohammed.alharbi@hospital.com',
    role: 'hod',
    department: 'Cardiology',
    avatar: '/assets/avatars/avatar3.png'
  },
  {
    id: '4',
    name: 'Layla Al-Otaibi',
    email: 'layla.alotaibi@hospital.com',
    role: 'hod',
    department: 'Pediatrics',
    avatar: '/assets/avatars/avatar4.png'
  },
  {
    id: '5',
    name: 'Omar Al-Qahtani',
    email: 'omar.alqahtani@hospital.com',
    role: 'staff',
    department: 'Cardiology',
    avatar: '/assets/avatars/avatar5.png'
  },
  {
    id: '6',
    name: 'Nora Al-Saud',
    email: 'nora.alsaud@hospital.com',
    role: 'staff',
    department: 'Pediatrics',
    avatar: '/assets/avatars/avatar6.png'
  },
  {
    id: '7',
    name: 'Khalid Al-Dossary',
    email: 'khalid.aldossary@hospital.com',
    role: 'staff',
    department: 'Emergency',
    avatar: '/assets/avatars/avatar7.png'
  },
  {
    id: '8',
    name: 'Aisha Al-Ghamdi',
    email: 'aisha.alghamdi@hospital.com',
    role: 'hod',
    department: 'Nursing',
    avatar: '/assets/avatars/avatar8.png'
  },
];

// Mock Departments
export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Executive Management',
    description: 'Hospital leadership and executive decisions',
    createdAt: new Date('2020-01-01')
  },
  {
    id: '2',
    name: 'Quality Management',
    description: 'Ensuring quality standards and continuous improvement',
    manager: '2',
    parentDepartment: '1',
    createdAt: new Date('2020-01-15')
  },
  {
    id: '3',
    name: 'Cardiology',
    description: 'Heart and cardiovascular system care',
    manager: '3',
    parentDepartment: '9',
    createdAt: new Date('2020-02-01')
  },
  {
    id: '4',
    name: 'Pediatrics',
    description: 'Medical care for children and adolescents',
    manager: '4',
    parentDepartment: '9',
    createdAt: new Date('2020-02-15')
  },
  {
    id: '5',
    name: 'Emergency',
    description: 'Urgent and emergency medical care',
    parentDepartment: '9',
    createdAt: new Date('2020-03-01')
  },
  {
    id: '6',
    name: 'Nursing',
    description: 'Nursing services across all departments',
    manager: '8',
    parentDepartment: '9',
    createdAt: new Date('2020-03-15')
  },
  {
    id: '7',
    name: 'Administration',
    description: 'Administrative services and operations',
    parentDepartment: '1',
    createdAt: new Date('2020-04-01')
  },
  {
    id: '8',
    name: 'IT Department',
    description: 'Information technology and systems support',
    parentDepartment: '7',
    createdAt: new Date('2020-04-15')
  },
  {
    id: '9',
    name: 'Medical Services',
    description: 'All medical departments and services',
    parentDepartment: '1',
    createdAt: new Date('2020-05-01')
  },
];

// Mock Roles
export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'CEO',
    description: 'Chief Executive Officer with full system access',
    permissions: ['all'],
    createdAt: new Date('2020-01-01')
  },
  {
    id: '2',
    name: 'Quality Admin',
    description: 'Quality management administrator with access to all quality modules',
    permissions: ['quality.all', 'documents.all', 'audits.all', 'risks.all', 'incidents.all', 'kpis.all'],
    createdAt: new Date('2020-01-15')
  },
  {
    id: '3',
    name: 'Department Head',
    description: 'Head of department with access to department data',
    permissions: ['department.view', 'department.edit', 'documents.view', 'documents.create', 'risks.view', 'risks.create', 'kpis.view', 'kpis.create'],
    createdAt: new Date('2020-02-01')
  },
  {
    id: '4',
    name: 'Staff',
    description: 'Regular staff with limited access',
    permissions: ['documents.view', 'risks.view', 'incidents.create', 'feedback.create'],
    createdAt: new Date('2020-02-15')
  },
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Infection Control Policy',
    documentNumber: 'POL-IC-001',
    version: '2.1',
    status: 'published',
    type: 'policy',
    department: 'Quality Management',
    owner: '2',
    createdBy: '2',
    createdAt: new Date('2022-01-15'),
    updatedBy: '2',
    updatedAt: new Date('2022-06-20'),
    approvedBy: '1',
    approvedAt: new Date('2022-06-25'),
    publishedAt: new Date('2022-07-01'),
    expiryDate: new Date('2023-07-01'),
    tags: ['infection', 'control', 'hygiene'],
    fileUrl: '/documents/infection-control-policy.pdf'
  },
  {
    id: '2',
    title: 'Patient Admission Procedure',
    documentNumber: 'PRO-ADM-001',
    version: '1.3',
    status: 'published',
    type: 'procedure',
    department: 'Administration',
    owner: '7',
    createdBy: '7',
    createdAt: new Date('2022-02-10'),
    updatedBy: '7',
    updatedAt: new Date('2022-05-15'),
    approvedBy: '1',
    approvedAt: new Date('2022-05-20'),
    publishedAt: new Date('2022-06-01'),
    expiryDate: new Date('2023-06-01'),
    tags: ['admission', 'patient', 'registration'],
    fileUrl: '/documents/patient-admission-procedure.pdf'
  },
  {
    id: '3',
    title: 'Medication Administration Form',
    documentNumber: 'FRM-MED-001',
    version: '1.0',
    status: 'published',
    type: 'form',
    department: 'Nursing',
    owner: '8',
    createdBy: '8',
    createdAt: new Date('2022-03-05'),
    approvedBy: '1',
    approvedAt: new Date('2022-03-15'),
    publishedAt: new Date('2022-04-01'),
    expiryDate: new Date('2023-04-01'),
    tags: ['medication', 'nursing', 'administration'],
    fileUrl: '/documents/medication-administration-form.pdf'
  },
  {
    id: '4',
    title: 'Emergency Response Manual',
    documentNumber: 'MAN-ER-001',
    version: '2.0',
    status: 'review',
    type: 'manual',
    department: 'Emergency',
    owner: '7',
    createdBy: '7',
    createdAt: new Date('2021-11-10'),
    updatedBy: '7',
    updatedAt: new Date('2022-07-15'),
    tags: ['emergency', 'response', 'protocol'],
    fileUrl: '/documents/emergency-response-manual.pdf'
  },
  {
    id: '5',
    title: 'Patient Discharge Guidelines',
    documentNumber: 'GDL-DIS-001',
    version: '1.1',
    status: 'draft',
    type: 'guideline',
    department: 'Medical Services',
    owner: '3',
    createdBy: '3',
    createdAt: new Date('2022-06-20'),
    updatedBy: '3',
    updatedAt: new Date('2022-07-25'),
    tags: ['discharge', 'patient', 'guidelines'],
    fileUrl: '/documents/patient-discharge-guidelines.pdf'
  },
];

// Mock KPIs
export const mockKPIs: KPI[] = [
  {
    id: '1',
    name: 'Patient Satisfaction Rate',
    description: 'Percentage of patients reporting satisfaction with hospital services',
    owner: '2',
    department: 'Quality Management',
    target: 90,
    actual: 87,
    unit: '%',
    frequency: 'monthly',
    status: 'atRisk',
    trend: 'up',
    startDate: new Date('2022-01-01'),
    history: [
      { date: new Date('2022-01-31'), value: 82 },
      { date: new Date('2022-02-28'), value: 84 },
      { date: new Date('2022-03-31'), value: 85 },
      { date: new Date('2022-04-30'), value: 86 },
      { date: new Date('2022-05-31'), value: 87 },
    ]
  },
  {
    id: '2',
    name: 'Average Wait Time',
    description: 'Average time patients wait before being seen by a doctor',
    owner: '5',
    department: 'Emergency',
    target: 15,
    actual: 22,
    unit: 'minutes',
    frequency: 'weekly',
    status: 'offTrack',
    trend: 'down',
    startDate: new Date('2022-01-01'),
    history: [
      { date: new Date('2022-06-05'), value: 25 },
      { date: new Date('2022-06-12'), value: 24 },
      { date: new Date('2022-06-19'), value: 23 },
      { date: new Date('2022-06-26'), value: 22 },
    ]
  },
  {
    id: '3',
    name: 'Hand Hygiene Compliance',
    description: 'Percentage of staff complying with hand hygiene protocols',
    owner: '2',
    department: 'Quality Management',
    target: 95,
    actual: 96,
    unit: '%',
    frequency: 'monthly',
    status: 'onTrack',
    trend: 'stable',
    startDate: new Date('2022-01-01'),
    history: [
      { date: new Date('2022-01-31'), value: 94 },
      { date: new Date('2022-02-28'), value: 95 },
      { date: new Date('2022-03-31'), value: 95 },
      { date: new Date('2022-04-30'), value: 96 },
      { date: new Date('2022-05-31'), value: 96 },
    ]
  },
  {
    id: '4',
    name: 'Medication Errors',
    description: 'Number of medication errors per 1000 prescriptions',
    owner: '8',
    department: 'Nursing',
    target: 2,
    actual: 2.5,
    unit: 'errors/1000 prescriptions',
    frequency: 'monthly',
    status: 'atRisk',
    trend: 'down',
    startDate: new Date('2022-01-01'),
    history: [
      { date: new Date('2022-01-31'), value: 3.2 },
      { date: new Date('2022-02-28'), value: 3.0 },
      { date: new Date('2022-03-31'), value: 2.8 },
      { date: new Date('2022-04-30'), value: 2.6 },
      { date: new Date('2022-05-31'), value: 2.5 },
    ]
  },
  {
    id: '5',
    name: 'Staff Turnover Rate',
    description: 'Percentage of staff leaving the organization annually',
    owner: '1',
    department: 'Executive Management',
    target: 10,
    actual: 12,
    unit: '%',
    frequency: 'quarterly',
    status: 'atRisk',
    trend: 'stable',
    startDate: new Date('2022-01-01'),
    history: [
      { date: new Date('2022-03-31'), value: 11 },
      { date: new Date('2022-06-30'), value: 12 },
    ]
  },
];

// Mock Risks
export const mockRisks: Risk[] = [
  {
    id: '1',
    title: 'Medication Administration Errors',
    description: 'Risk of errors in medication administration leading to patient harm',
    department: 'Nursing',
    owner: '8',
    severity: 'high',
    likelihood: 'possible',
    impact: 4,
    riskScore: 12, // 3 (possible) * 4 (impact)
    status: 'mitigated',
    identifiedAt: new Date('2022-02-15'),
    updatedAt: new Date('2022-04-20'),
    mitigationPlan: 'Implement double-check protocol and barcode scanning system',
    mitigationStatus: 'completed',
    reviewDate: new Date('2022-10-15')
  },
  {
    id: '2',
    title: 'Patient Falls',
    description: 'Risk of patient falls causing injury, particularly among elderly patients',
    department: 'Nursing',
    owner: '8',
    severity: 'high',
    likelihood: 'likely',
    impact: 4,
    riskScore: 16, // 4 (likely) * 4 (impact)
    status: 'mitigated',
    identifiedAt: new Date('2022-01-10'),
    updatedAt: new Date('2022-03-15'),
    mitigationPlan: 'Implement fall risk assessment and prevention protocols',
    mitigationStatus: 'inProgress',
    reviewDate: new Date('2022-09-10')
  },
  {
    id: '3',
    title: 'Data Breach',
    description: 'Risk of unauthorized access to patient data',
    department: 'IT Department',
    owner: '7',
    severity: 'critical',
    likelihood: 'unlikely',
    impact: 5,
    riskScore: 10, // 2 (unlikely) * 5 (impact)
    status: 'assessed',
    identifiedAt: new Date('2022-03-20'),
    updatedAt: new Date('2022-05-25'),
    mitigationPlan: 'Enhance cybersecurity measures and staff training',
    mitigationStatus: 'inProgress',
    reviewDate: new Date('2022-11-20')
  },
  {
    id: '4',
    title: 'Equipment Failure',
    description: 'Risk of critical medical equipment failure during procedures',
    department: 'Cardiology',
    owner: '3',
    severity: 'critical',
    likelihood: 'rare',
    impact: 5,
    riskScore: 5, // 1 (rare) * 5 (impact)
    status: 'monitored',
    identifiedAt: new Date('2022-04-05'),
    updatedAt: new Date('2022-06-10'),
    mitigationPlan: 'Regular preventive maintenance and backup equipment availability',
    mitigationStatus: 'completed',
    reviewDate: new Date('2022-10-05')
  },
  {
    id: '5',
    title: 'Infection Outbreak',
    description: 'Risk of hospital-acquired infection outbreak',
    department: 'Quality Management',
    owner: '2',
    severity: 'critical',
    likelihood: 'possible',
    impact: 5,
    riskScore: 15, // 3 (possible) * 5 (impact)
    status: 'mitigated',
    identifiedAt: new Date('2022-01-25'),
    updatedAt: new Date('2022-03-30'),
    mitigationPlan: 'Enhanced infection control protocols and surveillance',
    mitigationStatus: 'completed',
    reviewDate: new Date('2022-07-25')
  },
];

// Mock Audits
export const mockAudits: Audit[] = [
  {
    id: '1',
    title: 'Annual Quality Management System Audit',
    type: 'internal',
    standard: 'ISO 9001:2015',
    department: 'Quality Management',
    auditor: '2',
    startDate: new Date('2022-03-15'),
    endDate: new Date('2022-03-25'),
    status: 'completed',
    score: 87,
    report: '/reports/qms-audit-2022.pdf',
    findings: [
      {
        id: '101',
        auditId: '1',
        description: 'Document control process not consistently followed',
        type: 'nonConformity',
        severity: 'minor',
        status: 'closed',
        responsiblePerson: '2',
        dueDate: new Date('2022-04-25'),
        closedDate: new Date('2022-04-20'),
        evidence: '/evidence/doc-control-fix.pdf'
      },
      {
        id: '102',
        auditId: '1',
        description: 'Staff training records incomplete in some departments',
        type: 'nonConformity',
        severity: 'minor',
        status: 'closed',
        responsiblePerson: '7',
        dueDate: new Date('2022-04-30'),
        closedDate: new Date('2022-04-28'),
        evidence: '/evidence/training-records-update.pdf'
      }
    ]
  },
  {
    id: '2',
    title: 'Medication Management Audit',
    type: 'internal',
    department: 'Pharmacy',
    auditor: '2',
    startDate: new Date('2022-05-10'),
    endDate: new Date('2022-05-12'),
    status: 'completed',
    score: 92,
    report: '/reports/medication-audit-2022.pdf',
    findings: [
      {
        id: '201',
        auditId: '2',
        description: 'Opportunity to improve medication reconciliation process',
        type: 'opportunity',
        severity: 'minor',
        status: 'open',
        responsiblePerson: '8',
        dueDate: new Date('2022-07-10')
      }
    ]
  },
  {
    id: '3',
    title: 'Joint Commission Accreditation',
    type: 'external',
    standard: 'Joint Commission International Standards',
    department: 'Executive Management',
    auditor: 'External Auditor Team',
    startDate: new Date('2022-09-15'),
    endDate: new Date('2022-09-25'),
    status: 'planned'
  },
  {
    id: '4',
    title: 'Infection Control Practices Audit',
    type: 'internal',
    department: 'Quality Management',
    auditor: '2',
    startDate: new Date('2022-02-08'),
    endDate: new Date('2022-02-10'),
    status: 'completed',
    score: 95,
    report: '/reports/infection-control-audit-2022.pdf',
    findings: []
  },
  {
    id: '5',
    title: 'Patient Safety Culture Survey',
    type: 'internal',
    department: 'Quality Management',
    auditor: '2',
    startDate: new Date('2022-06-01'),
    endDate: new Date('2022-06-15'),
    status: 'inProgress'
  },
];

// Generate mock data for other entities
export const generateMockData = () => {
  // Generate mock incidents
  const mockIncidents: Incident[] = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Incident ${i + 1}`,
    description: `Description for incident ${i + 1}`,
    department: randomItem(mockDepartments).name,
    reportedBy: randomItem(mockUsers).id,
    reportedAt: randomDate(new Date('2022-01-01'), new Date('2022-07-31')),
    incidentDate: randomDate(new Date('2022-01-01'), new Date('2022-07-31')),
    location: `Room ${randomNumber(100, 500)}`,
    severity: randomItem(['minor', 'moderate', 'major', 'severe', 'critical']) as IncidentSeverity,
    status: randomItem(['reported', 'underInvestigation', 'actionRequired', 'resolved', 'closed']) as IncidentStatus,
    category: randomItem(['medication', 'fall', 'equipment', 'procedure', 'communication']),
    assignedTo: randomItem(mockUsers).id,
  }));

  // Generate mock feedback
  const mockFeedback: Feedback[] = Array.from({ length: 15 }, (_, i) => ({
    id: (i + 1).toString(),
    type: randomItem(['complaint', 'suggestion', 'compliment', 'query']) as FeedbackType,
    source: randomItem(['patient', 'staff', 'visitor', 'other']),
    department: randomItem(mockDepartments).name,
    description: `Feedback description ${i + 1}`,
    submittedAt: randomDate(new Date('2022-01-01'), new Date('2022-07-31')),
    status: randomItem(['new', 'inProgress', 'resolved', 'closed']) as FeedbackStatus,
    priority: randomItem(['low', 'medium', 'high']),
  }));

  // Generate mock projects
  const mockProjects: Project[] = Array.from({ length: 5 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Project ${i + 1}`,
    description: `Description for project ${i + 1}`,
    manager: randomItem(mockUsers).id,
    department: randomItem(mockDepartments).name,
    startDate: randomDate(new Date('2022-01-01'), new Date('2022-04-01')),
    targetEndDate: randomDate(new Date('2022-08-01'), new Date('2022-12-31')),
    status: randomItem(['planning', 'inProgress', 'onHold', 'completed', 'cancelled']) as ProjectStatus,
    progress: randomNumber(0, 100),
    tasks: Array.from({ length: randomNumber(3, 8) }, (_, j) => ({
      id: `${i + 1}-${j + 1}`,
      projectId: (i + 1).toString(),
      title: `Task ${j + 1} for Project ${i + 1}`,
      assignedTo: randomItem(mockUsers).id,
      startDate: randomDate(new Date('2022-01-01'), new Date('2022-06-01')),
      dueDate: randomDate(new Date('2022-06-02'), new Date('2022-12-31')),
      status: randomItem(['notStarted', 'inProgress', 'completed', 'blocked']),
      progress: randomNumber(0, 100),
      priority: randomItem(['low', 'medium', 'high']),
    })),
  }));

  return {
    incidents: mockIncidents,
    feedback: mockFeedback,
    projects: mockProjects,
  };
};

// Export all mock data
export const mockData = {
  users: mockUsers,
  departments: mockDepartments,
  roles: mockRoles,
  documents: mockDocuments,
  kpis: mockKPIs,
  risks: mockRisks,
  audits: mockAudits,
  ...generateMockData(),
};

export default mockData;