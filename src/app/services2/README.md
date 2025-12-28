# Services Documentation

## 📦 Available Services

All services are now using the centralized API URL from `environment.ts` files.

### Configuration
- **Development**: `http://localhost:3000/Freelancing/api/v1`
- **Production**: Update in `src/environments/environment.ts`

---

## 🔐 Authentication Services

### **LoginService**
Handles user authentication and token management.

**Location**: `services2/loginService/login-service.ts`

**Methods**:
- `login(email, password)` - User login
- `logout()` - Clear session
- `getToken()` - Get JWT token
- `isLoggedIn()` - Check auth status
- `getCurrentUser()` - Get current user
- `getUserIdFromToken()` - Extract user ID from token
- `fetchUserProfile()` - Fetch full user profile

---

## 📊 Statistics Services

### **StatisticsService**
Platform and user statistics.

**Location**: `services2/statisticsService/statistics.service.ts`

**Methods**:
- `getPlatformStatistics()` - Admin platform stats
- `getGrowthData(period)` - Growth charts data
- `getUserDashboard()` - User personal stats

---

## 👥 User Management Services

### **UserService**
User CRUD operations and profile management.

**Location**: `services2/userService/user.service.ts`

**Methods**:
- `getAllUsers()` - Get all users (Admin)
- `getUserById(id)` - Get user details
- `getMyProfile()` - Get current user profile
- `updateUser(id, data)` - Update user
- `updateMyProfile(data)` - Update own profile
- `deleteUser(id)` - Delete user
- `changePassword(old, new)` - Change password
- `updateProfilePicture(formData)` - Update avatar
- `deleteProfilePicture()` - Remove avatar
- `getUserStatistics(userId?)` - Get user stats

---

## 💼 Job Management Services

### **JobService**
Job posting and management.

**Location**: `services2/jobService/job.service.ts`

**Methods**:
- `getAllJobs()` - Get all jobs
- `getJobById(id)` - Get job details
- `searchJobs(params)` - Search with filters
- `createJob(data)` - Create new job
- `updateJob(id, data)` - Update job
- `deleteJob(id)` - Delete job
- `getJobsByClient(clientId?)` - Get client jobs
- `getFeaturedJobs(limit)` - Get featured jobs
- `closeJob(id)` - Close job
- `reopenJob(id)` - Reopen job
- `incrementViews(id)` - Track views

---

## 📝 Proposal Services

### **ProposalService**
Proposal submission and management.

**Location**: `services2/proposalService/proposal.service.ts`

**Methods**:
- `getAllProposals()` - Get all (Admin)
- `getProposalById(id)` - Get details
- `getMyProposals()` - My proposals
- `getProposalsByJob(jobId)` - Job proposals
- `createProposal(data)` - Submit proposal
- `updateProposal(id, data)` - Edit proposal
- `deleteProposal(id)` - Delete proposal
- `hireProposal(id)` - Accept proposal
- `rejectProposal(id, reason?)` - Reject
- `withdrawProposal(id, reason?)` - Withdraw

---

## 📋 Contract Services

### **ContractService**
Contract lifecycle management.

**Location**: `services2/contractService/contract.service.ts`

**Methods**:
- `getAllContracts()` - Get all (Admin)
- `getContractById(id)` - Get details
- `getMyContracts()` - My contracts
- `createContract(data)` - Create contract
- `updateContract(id, data)` - Update
- `deleteContract(id)` - Delete
- `completeContract(id)` - Mark complete
- `terminateContract(id, reason)` - Terminate
- `pauseContract(id)` - Pause
- `resumeContract(id)` - Resume
- `submitDeliverable(id, data)` - Submit work

---

## 💰 Payment Services

### **PaymentService**
Payment processing and management.

**Location**: `services2/paymentService/payment.service.ts`

**Methods**:
- `getAllPayments()` - Get all (Admin)
- `getPaymentById(id)` - Get details
- `getMyPayments()` - My payments
- `createPayment(data)` - Create payment
- `processPayment(id)` - Process payment
- `refundPayment(id, reason)` - Refund
- `cancelPayment(id)` - Cancel

---

## ⭐ Review Services

### **ReviewService**
Review and rating management.

**Location**: `services2/reviewService/review.service.ts`

**Methods**:
- `getAllReviews()` - Get all (Admin)
- `getReviewById(id)` - Get details
- `getReviewsByReviewer(reviewerId)` - Reviews by user
- `getReviewsByReviewee(revieweeId)` - Reviews received
- `getReviewsByContract(contractId)` - Contract reviews
- `createReview(data)` - Create review
- `updateReview(id, data)` - Update review
- `deleteReview(id)` - Delete review

---

## 🔔 Notification Services

### **NotificationService**
User notification management.

**Location**: `services2/notificationService/notification.service.ts`

**Methods**:
- `getMyNotifications()` - Get notifications
- `getUnreadCount()` - Unread count
- `markAsRead(id)` - Mark as read
- `markAllAsRead()` - Mark all read
- `deleteNotification(id)` - Delete one
- `deleteAllNotifications()` - Delete all
- `getNotificationsByType(type)` - Filter by type

---

## 💬 Chat Services

### **ChatService**
Messaging and conversations.

**Location**: `services2/chatService/chat.service.ts`

**Methods**:
- `getMyConversations()` - Get conversations
- `getConversationById(id)` - Get details
- `createConversation(data)` - Start conversation
- `getMessages(convId, page, limit)` - Get messages
- `sendMessage(convId, content, attachments?)` - Send message
- `markMessageAsRead(messageId)` - Mark read
- `deleteMessage(messageId)` - Delete message
- `archiveConversation(convId)` - Archive
- `muteConversation(convId)` - Mute

---

## 📁 Portfolio Services

### **PortfolioService**
Portfolio item management.

**Location**: `services2/portfolioService/portfolio.service.ts`

**Methods**:
- `getAllPortfolioItems()` - Get all (Admin)
- `getPortfolioItemById(id)` - Get details
- `getPortfolioByFreelancer(freelancerId)` - User portfolio
- `getMyPortfolio()` - My portfolio
- `createPortfolioItem(data)` - Create item
- `updatePortfolioItem(id, data)` - Update
- `deletePortfolioItem(id)` - Delete
- `likePortfolioItem(id)` - Like
- `unlikePortfolioItem(id)` - Unlike

---

## 🏷️ Category, Specialty & Skill Services

### **CategoryService**
**Location**: `services2/categoryService/category.service.ts`

### **SpecialityService**
**Location**: `services2/specialityService/speciality.service.ts`

### **SkillService**
**Location**: `services2/skillService/skill.service.ts`

**Common Methods**:
- `getAll()` - Get all items
- `getById(id)` - Get single item
- `create(data)` - Create new
- `update(id, data)` - Update existing
- `delete(id)` - Delete item

**Special Methods**:
- `SpecialityService.getSpecialtiesByCategory(categoryId)`

---

## 🌍 Country Services

### **CountryService**
Country data management.

**Location**: `services2/countryService/country.service.ts`

**Methods**:
- `getAllCountries()` - Get all
- `getCountryById(id)` - Get details
- `createCountry(data)` - Create
- `updateCountry(id, data)` - Update
- `deleteCountry(id)` - Delete

---

## ❤️ Favorite Services

### **FavoriteService**
User favorites management.

**Location**: `services2/favoriteService/favorite.service.ts`

**Methods**:
- `getMyFavorites()` - Get all favorites
- `getFavoritesByType(itemModel)` - Filter by type
- `addToFavorites(itemId, itemModel)` - Add favorite
- `removeFromFavorites(favoriteId)` - Remove
- `isFavorite(itemId, itemModel)` - Check status

---

## 🔧 Collection Service (Admin)

### **CollectionService**
Generic admin collection operations.

**Location**: `services2/collectionService/collection-service.ts`

**Methods**:
- `getAllCollections()` - List all collections
- `selectCollection(name)` - Select collection
- `getAll(collectionName)` - Get documents
- `createDocument(collection, payload)` - Create
- `updateDocument(collection, payload)` - Update
- `deleteDocument(collection, id)` - Delete
- `refresh(collection?)` - Refresh data

---

## 📖 Usage Examples

### Import Services
```typescript
import { 
  LoginService, 
  StatisticsService,
  JobService 
} from '../../services2';

// Or specific import
import { StatisticsService } from '../../services2/statisticsService/statistics.service';
```

### Use in Component
```typescript
export class DashboardComponent implements OnInit {
  constructor(
    private statsService: StatisticsService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.statsService.getPlatformStatistics().subscribe({
      next: (data) => {
        console.log('Platform stats:', data);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
```

---

## 🔑 Authentication

All services automatically include JWT token in headers via `LoginService.getToken()`.

**Token Storage**: `localStorage.getItem('auth_token')`

**Auto-included Headers**:
```typescript
Authorization: Bearer <token>
```

---

## 🌐 Environment Configuration

Update API URLs in:
- `src/environments/environment.development.ts` (Dev)
- `src/environments/environment.ts` (Production)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/Freelancing/api/v1',
  baseUrl: 'http://localhost:3000'
};
```

---

## ✅ All Services List

1. ✅ LoginService - Authentication
2. ✅ StatisticsService - Platform stats
3. ✅ UserService - User management
4. ✅ JobService - Job management
5. ✅ ProposalService - Proposals
6. ✅ ContractService - Contracts
7. ✅ PaymentService - Payments
8. ✅ ReviewService - Reviews
9. ✅ NotificationService - Notifications
10. ✅ ChatService - Messaging
11. ✅ PortfolioService - Portfolio
12. ✅ CategoryService - Categories
13. ✅ SpecialityService - Specialties
14. ✅ SkillService - Skills
15. ✅ CountryService - Countries
16. ✅ FavoriteService - Favorites
17. ✅ CollectionService - Admin generic

---

**Created**: December 2025  
**Last Updated**: December 24, 2025
