import { Component, Injector, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { CollectionService } from '../../services2/collectionService/collection-service';
import { JobService } from '../../services2/jobService/job.service';
import { componentRegistry } from '../../configs/cards-registry';
import { ModalRegistry, ViewModalRegistry } from '../../configs/modal-registry';
import { ToastService } from '../../services2/toastService/toast-service';
import { Loader } from '../../core/loader/loader';

@Component({
  selector: 'app-collection-page',
  standalone: true,
  imports: [CommonModule, Loader],
  templateUrl: './collection-page.html',
  styleUrls: ['./collection-page.scss'],
})
export class CollectionPage implements OnInit {
  specialties: any[] = [];
  categories: any[] = [];
  countries: any[] = [];
  skills: any[] = [];
  documents: any[] = [];
  filteredDocuments: any[] = [];
  currentComponent: Type<any> | null = null;
  collectionName: string = '';
  
  creatableCollections = ['skills', 'categories', 'specialties', 'countries', 'users', 'jobs', 'proposals', 'contracts', 'portfolio'];
  isCreatable = false;
  
  // Loading state
  isLoading: boolean = false;
  
  // Search & Pagination
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 1;
  
  // Modal State
  currentModalComponent: Type<any> | null = null;
  currentModalData: any = null;
  isModalOpen = false;
  modalInjector?: Injector;
  
  // Card Injectors
  cardInjectors = new Map<string, Injector>();
  
  // Action Registry
  actionRegistry: Record<string, (data: any) => void> = {};
  
  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private jobService: JobService,
    private injector: Injector,
    private toastService: ToastService
  ) {}
  
  ngOnInit(): void {
    // Register actions
    this.actionRegistry['view'] = this.openViewModal.bind(this);
    this.actionRegistry['update'] = this.openUpdateModal.bind(this);
    this.actionRegistry['delete'] = this.confirmDelete.bind(this);
    this.actionRegistry['cancel'] = this.confirmCancelJob.bind(this);
    
    // Get collection name from route
    this.route.params.subscribe(params => {
      this.collectionName = params['collection'];
      this.isCreatable = this.creatableCollections.includes(this.collectionName);
      this.loadData();
    });
  }
  
  async loadData() {
    this.isLoading = true;
    
    try {
      // Load card component
      await this.loadComponent();
      
      // Load documents
      this.collectionService.getAll(this.collectionName).subscribe({
        next: (docs) => {
          this.documents = Array.isArray(docs) ? docs : [];
          this.applySearchAndPagination();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading documents:', err);
          this.documents = [];
          this.applySearchAndPagination();
          this.isLoading = false;
        }
      });
      
      // Reference data (specialties, categories, etc.) will be loaded on-demand when modals are opened
    } catch (error) {
      console.error('Error in loadData:', error);
      this.isLoading = false;
    }
  }
  
  /**
   * Load reference data only when opening modals that need them
   */
  private async loadReferenceDataIfNeeded(): Promise<void> {
    const promises: Promise<void>[] = [];
    
    // Only load if arrays are empty
    if (this.specialties.length === 0) {
      promises.push(this.loadSpecialties());
    }
    if (this.categories.length === 0) {
      promises.push(this.loadCategories());
    }
    if (this.countries.length === 0) {
      promises.push(this.loadCountries());
    }
    if (this.skills.length === 0) {
      promises.push(this.loadSkills());
    }
    
    await Promise.all(promises);
  }
  
  private async loadSpecialties(): Promise<void> {
    try {
      this.specialties = await firstValueFrom(this.collectionService.getAll('specialties'));
    } catch {
      this.specialties = [];
    }
  }
  
  private async loadCategories(): Promise<void> {
    try {
      this.categories = await firstValueFrom(this.collectionService.getAll('categories'));
    } catch {
      this.categories = [];
    }
  }

  private async loadCountries(): Promise<void> {
    try {
      this.countries = await firstValueFrom(this.collectionService.getAll('countries'));
    } catch {
      this.countries = [];
    }
  }

  private async loadSkills(): Promise<void> {
    try {
      this.skills = await firstValueFrom(this.collectionService.getAll('skills'));
    } catch {
      this.skills = [];
    }
  }

  /**
   * Apply search filter and pagination
   */
  applySearchAndPagination(): void {
    // Apply search filter
    let filtered = this.documents;
    
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = this.documents.filter(doc => {
        // Search in all string properties
        return Object.values(doc).some(value => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          return false;
        });
      });
    }
    
    // Calculate pagination
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    
    // Ensure current page is valid
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }
    
    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredDocuments = filtered.slice(startIndex, endIndex);
    
    // Build card injectors for filtered documents
    this.buildCardInjectors();
  }

  /**
   * Handle search input change
   */
  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1; // Reset to first page
    this.applySearchAndPagination();
  }

  /**
   * Go to specific page
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applySearchAndPagination();
    }
  }

  /**
   * Get array of page numbers for pagination
   */
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
  
  private buildCardInjectors(): void {
    this.cardInjectors.clear();
    
    for (const doc of this.filteredDocuments) {
      const docId = doc._id || doc.id;
      if (docId) {
        this.cardInjectors.set(
          docId,
          Injector.create({
            providers: [
              { provide: 'data', useValue: doc },
              {
                provide: 'onAction',
                useValue: (event: { action: string; data: any }) =>
                  this.handleCardAction(event),
              },
            ],
            parent: this.injector,
          })
        );
      }
    }
  }
  
  getCardInjector(id: string): Injector | undefined {
    return this.cardInjectors.get(id);
  }
  
  trackById(_: number, item: any) {
    return item._id || item.id;
  }
  
  handleCardAction(event: { action: string; data: any }) {
    const fn = this.actionRegistry[event.action];
    if (fn) {
      fn(event.data);
    }
  }
  
  confirmDelete(doc: any) {
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.deleteDocument(doc);
    }
  }
  
  deleteDocument(doc: any) {
    this.collectionService
      .deleteDocument(this.collectionName, doc._id || doc.id)
      .subscribe({
        next: () => {
          this.documents = this.documents.filter(d => (d._id || d.id) !== (doc._id || doc.id));
          this.cardInjectors.delete(doc._id || doc.id);
          this.applySearchAndPagination();
          this.toastService.success(`${this.collectionName} deleted successfully!`);
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.toastService.error(`Failed to delete ${this.collectionName}`);
        }
      });
  }

  confirmCancelJob(doc: any) {
    if (window.confirm('Are you sure you want to cancel this job? This will set its status to cancelled.')) {
      this.cancelJob(doc);
    }
  }

  cancelJob(doc: any) {
    this.jobService.closeJob(doc._id || doc.id).subscribe({
      next: (response) => {
        // Update the job status in the local array
        const index = this.documents.findIndex(d => (d._id || d.id) === (doc._id || doc.id));
        if (index !== -1) {
          this.documents[index] = { ...this.documents[index], status: 'cancelled' };
          // Recreate the injector for the updated card
          this.cardInjectors.delete(doc._id || doc.id);
          this.applySearchAndPagination();
        }
        this.toastService.success('Job cancelled successfully!');
      },
      error: (err) => {
        console.error('Cancel job error:', err);
        this.toastService.error(err.error?.message || 'Failed to cancel job');
      }
    });
  }
  
  async loadComponent() {
    // Try the collection name as-is first
    let loader = componentRegistry[this.collectionName];
    
    // If not found, try with 's' added (singular to plural mapping)
    if (!loader && !this.collectionName.endsWith('s')) {
      loader = componentRegistry[this.collectionName + 's'];
    }
    
    // If still not found, try removing 's' (plural to singular mapping)
    if (!loader && this.collectionName.endsWith('s')) {
      loader = componentRegistry[this.collectionName.slice(0, -1)];
    }
    
    this.currentComponent = loader ? await loader() : null;
    
    if (!this.currentComponent) {
      console.warn(`No component found for collection: ${this.collectionName}`);
    }
  }
  
  async openCreateModal() {
    if (!this.collectionName) return;
    
    console.log('🔵 openCreateModal called for collection:', this.collectionName);
    console.log('🔵 Available modals in registry:', Object.keys(ModalRegistry));
    
    // Try the collection name as-is first
    let modalLoader = ModalRegistry[this.collectionName];
    
    // If not found, try with 's' added (singular to plural mapping)
    if (!modalLoader && !this.collectionName.endsWith('s')) {
      modalLoader = ModalRegistry[this.collectionName + 's'];
      console.log('🔵 Trying with "s":', this.collectionName + 's');
    }
    
    // If still not found, try removing 's' (plural to singular mapping)
    if (!modalLoader && this.collectionName.endsWith('s')) {
      modalLoader = ModalRegistry[this.collectionName.slice(0, -1)];
    }
    
    if (!modalLoader) {
      console.warn(`No modal found for collection: ${this.collectionName}`);
      return;
    }
    
    console.log('🔵 Modal loader found, loading component...');
    
    // Load reference data before opening modal
    await this.loadReferenceDataIfNeeded();
    
    console.log('🔵 Reference data loaded, creating modal component...');
    
    this.currentModalComponent = await modalLoader();
    
    console.log('🔵 Modal component loaded:', this.currentModalComponent);
    
    this.currentModalData = {
      mode: 'create',
      specialties: this.specialties,
      categories: this.categories,
      countries: this.countries,
      skills: this.skills
    };
    
    console.log('🔵 Modal data prepared:', this.currentModalData);
    
    this.modalInjector = Injector.create({
      providers: [
        { provide: 'data', useValue: this.currentModalData },
        { provide: 'onClose', useValue: () => this.closeModal() },
        {
          provide: 'onSubmit',
          useValue: (formData: any) => this.handleModalSubmit(formData),
        },
      ],
      parent: this.injector,
    });
    
    console.log('🔵 Injector created, setting isModalOpen = true');
    
    this.isModalOpen = true;
    
    console.log('🔵 Modal should be visible now!');
  }
  
  async openUpdateModal(doc: any) {
    // Load reference data if needed
    await this.loadReferenceDataIfNeeded();
    
    this.openModal({
      mode: 'update',
      document: doc,
      specialties: this.specialties,
      categories: this.categories,
      countries: this.countries,
      skills: this.skills
    });
  }

  async openViewModal(doc: any) {
    // Try ViewModalRegistry first for view mode
    let loader = ViewModalRegistry[this.collectionName];
    
    // If not found, try with 's' added (singular to plural mapping)
    if (!loader && !this.collectionName.endsWith('s')) {
      loader = ViewModalRegistry[this.collectionName + 's'];
    }
    
    // If still not found, try removing 's' (plural to singular mapping)
    if (!loader && this.collectionName.endsWith('s')) {
      loader = ViewModalRegistry[this.collectionName.slice(0, -1)];
    }
    
    // If no view modal exists, fall back to regular modal registry
    if (!loader) {
      this.openModal({
        mode: 'view',
        document: doc,
        specialties: this.specialties,
        categories: this.categories,
        countries: this.countries,
        skills: this.skills
      });
      return;
    }
    
    // Load and open the view modal
    this.currentModalComponent = await loader();
    this.currentModalData = doc;
    
    this.modalInjector = Injector.create({
      providers: [
        { provide: 'data', useValue: doc },
        { provide: 'onClose', useValue: () => this.closeModal() },
      ],
      parent: this.injector,
    });
    
    this.isModalOpen = true;
  }
  
  async openModal(data: any) {
    // Try the collection name as-is first
    let loader = ModalRegistry[this.collectionName];
    
    // If not found, try with 's' added (singular to plural mapping)
    if (!loader && !this.collectionName.endsWith('s')) {
      loader = ModalRegistry[this.collectionName + 's'];
    }
    
    // If still not found, try removing 's' (plural to singular mapping)
    if (!loader && this.collectionName.endsWith('s')) {
      loader = ModalRegistry[this.collectionName.slice(0, -1)];
    }
    
    if (!loader) {
      console.warn(`No modal found for collection: ${this.collectionName}`);
      return;
    }
    
    this.currentModalComponent = await loader();
    this.currentModalData = data;
    
    this.modalInjector = Injector.create({
      providers: [
        { provide: 'data', useValue: data },
        { provide: 'onClose', useValue: () => this.closeModal() },
        {
          provide: 'onSubmit',
          useValue: (formData: any) => this.handleModalSubmit(formData),
        },
      ],
      parent: this.injector,
    });
    
    this.isModalOpen = true;
  }
  
  handleModalSubmit(formData: any) {
    const isUpdate = this.currentModalData?.mode === 'update';
    const request$ = isUpdate
        ? this.collectionService.updateDocument(this.collectionName, formData)
        : this.collectionService.createDocument(this.collectionName, formData);
    
    request$.subscribe({
      next: () => {
        this.closeModal();
        this.loadData();
        const message = isUpdate 
          ? `${this.collectionName} updated successfully!` 
          : `${this.collectionName} created successfully!`;
        this.toastService.success(message);
      },
      error: (err) => {
        console.error('Submit error:', err);
        const message = isUpdate 
          ? `Failed to update ${this.collectionName}` 
          : `Failed to create ${this.collectionName}`;
        this.toastService.error(message);
      }
    });
  }
  
  closeModal() {
    this.isModalOpen = false;
    this.currentModalComponent = null;
    this.currentModalData = null;
    this.modalInjector = undefined;
  }
}
