Architecture Overview

## Backend Architecture (Python + FastAPI)

### **Technology Stack**
- **Framework**: FastAPI (modern, fast web framework)
- **Database**: SQLite with SQLAlchemy ORM
- **Data Processing**: Pandas for CSV handling

### **Project Structure**
```
backend/
├── main.py              # FastAPI application & endpoints for the API
├── models.py            # SQLAlchemy database models for the database
├── schemas.py           # Pydantic data validation schemas
├── services.py          # Business logic & AI processing for the copilot and the categorization
├── requirements.txt     # Python dependencies for the project
└── finance.db          # SQLite database (auto-generated) for the database (gets created when the app is run)
```

### **Core Components**

#### **1. Database Models (`models.py`)**
```python
# Key Entities
- Category: Expense categories with keywords
- Transaction: Financial transactions with relationships
```

#### **2. API Endpoints (`main.py`)**
```python
# Authentication (Mocked - Frontend Only)
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/me          # Current user info

# Transaction Management
POST /api/transactions/upload    # CSV upload & processing
GET  /api/transactions           # List transactions
PUT  /api/transactions/{id}      # Update transaction

# Categories
GET  /api/categories             # List categories
POST /api/categories             # Create category

# Dashboard & Analytics
GET  /api/dashboard/summary      # Dashboard data
POST /api/copilot/query          # AI copilot queries
```

#### **3. Business Logic (`services.py`)**
```python
# CategorizationService
- auto_categorize_transaction(): Keyword-based categorization when keyword is supplied
- create_default_categories(): Initialize default categories with standard wordings

# CopilotService
- process_query(): Natural language processing
- extract_time_period(): Date/time parsing
- extract_category(): Category identification
```

### **Data Flow**
1. **CSV Upload** → Pandas processing → Auto-categorization → Database storage
2. **User Queries** → NLP processing → Database queries → Structured responses
3. **Dashboard** → Aggregated queries → Chart data → Frontend visualization

---

## Frontend Architecture (React + TypeScript)

### **Technology Stack**
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **Charts**: Recharts for data visualization
- **State Management**: React Context (Auth + Theme)
- **HTTP Client**: Axios for API communication

### **Project Structure**
```
frontend/
├── src/
│   ├── components/           # React components
│   │   ├── Dashboard.tsx     # Analytics dashboard 
│   │   ├── TransactionTable.tsx # Transaction management
│   │   ├── Copilot.tsx       # AI chat interface
│   │   ├── FileUpload.tsx    # CSV upload
│   │   ├── Login.tsx         # Authentication, Added for mocking authentication
│   │   └── UserProfile.tsx   # User settings, Added for mocking authentication
│   ├── contexts/             # React Context providers
│   │   ├── AuthContext.tsx   # Authentication state ,Added for mocking authentication
│   │   └── ThemeContext.tsx  # Dark/light mode,Added now
│   ├── services/             # API services
│   │   └── api.ts           # HTTP client & endpoints
│   ├── types/               # TypeScript definitions
│   │   └── index.ts         # Shared types
│   ├── utils/               # Utility functions
│   │   └── authTest.ts      # Authentication testing
│   ├── App.tsx              # Main application
│   └── index.tsx            # Entry point
├── package.json             # Dependencies
└── tailwind.config.js       # Tailwind configuration
```

### **Core Components**

#### **1. State Management**
```typescript
// Authentication Context
- user: User | null
- login(): Promise<boolean>
- register(): Promise<boolean>
- logout(): void

// Theme Context
- theme: 'light' | 'dark'
- toggleTheme(): void
- isDark: boolean
```

#### **2. Component Architecture**
```typescript
// Layout Components
App.tsx → AuthProvider → ThemeProvider → AppContent
├── Header (navigation + user info)
├── Navigation (tab switching)
├── Main Content (conditional rendering)
└── Footer

// Feature Components
- Dashboard: Charts + analytics
- TransactionTable: Transactions Data representation
- Copilot: Chat interface for generic queries
- FileUpload: File upload and handling
- Login: Authentication with email
- UserProfile: User information + theme toggle
```

#### **3. API Integration (`services/api.ts`)**
```typescript
// HTTP Client
- axios.create(): Base configuration
- Interceptors: Error handling
- Endpoints: RESTful API calls

// Service Methods
- uploadCSV(): File upload
- getTransactions(): Data fetching
- updateTransaction(): Data updates
- queryCopilot(): AI interactions
```

### **Data Flow**
1. **Authentication** → Context state → Protected routes
2. **File Upload** → API call → State update → Dashboard refresh
3. **User Queries** → API call → Response processing → Chat display
4. **Theme Toggle** → Context update → CSS class application

---

## �� System Integration

### **API Communication**
```typescript
// Frontend → Backend
POST /api/transactions/upload
├── Multipart form data
├── CSV validation
└── Response: { message, count }

// Backend → Frontend
GET /api/dashboard/summary
├── Database aggregation
├── JSON response
└── Chart data formatting
```


---


#### **1. Database**
- Connection pooling
- Read replicas
- Database migrations
- Backup strategies

#### **2. API**
- Load balancing
- API versioning
- Documentation automation
- GraphQL consideration

#### **3. Frontend**
- CDN for static assets
- Image optimization
- Bundle optimization
- Caching strategies

This architecture provides a solid foundation for a personal finance application with room for significant growth and enhancement! 🚀