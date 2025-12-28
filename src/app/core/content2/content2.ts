// import {
//   Component,
//   Injector,
//   OnInit,
//   Type,

// } from '@angular/core';
// import { CollectionService } from '../../services2/collectionService/collection-service';
// import { componentRegistry } from '../../configs/cards-registry';
// import { ModalRegistry } from '../../configs/modal-registry';
// import { CommonModule } from '@angular/common';
// import { firstValueFrom } from 'rxjs';

// @Component({
//   selector: 'app-content2',
//   imports: [CommonModule],
//   templateUrl: './content2.html',
//   styleUrls: ['./content2.scss'],
// })
// export class Content2 implements OnInit {
//   // Documents for *ngFor
//   documents: any[] = [];

//   // Current dynamically loaded card component
//   currentComponent: Type<any> | null = null;

//   // Selected collection name
//   selectedCollection: string | null = null;

//   // Collections that allow creating new documents
//   creatableCollections: string[] = ['skills', 'categories', 'specialties'];
//   isCreatable: boolean = false;

//   // Modal state
//   currentModalComponent: Type<any> | null = null;
//   currentModalData: any = null;
//   isModalOpen: boolean = false;

//   // Action registry for scalable child actions
//   actionRegistry: Record<string, (data: any) => void> = {};

//   constructor(private collectionService: CollectionService, private injector: Injector) { }

//   //*********************** */
//   async openCreateModal() {
//     if (!this.selectedCollection) return;

//     const specialties = await firstValueFrom(this.collectionService.getAll('specialties'));
//     console.log(specialties);

//     this.currentModalComponent = await ModalRegistry[this.selectedCollection]();
//     this.currentModalData = { mode: 'create', specialties };
//     this.isModalOpen = true;
//   }

//   openUpdateModal(doc: any) {
//     this.openModal({
//       mode: 'update',
//       document: doc
//     });
//   }

//   handleModalSubmit(formData: any) {
//     if (!this.selectedCollection) return;

//     if (this.currentModalData?.mode === 'update') {
//       this.collectionService
//         .updateDocument(this.selectedCollection, formData)
//         .subscribe(() => {
//           this.closeModal();
//           this.collectionService.refresh(this.selectedCollection);
//         });
//     } else {
//       this.collectionService
//         .createDocument(this.selectedCollection, formData)
//         .subscribe(() => {
//           this.closeModal();
//           this.collectionService.refresh(this.selectedCollection);
//         });
//     }
//   }

//   /********************************* */

//   ngOnInit(): void {
//     // Register default actions
//     this.actionRegistry['view'] = this.openModal.bind(this);
//     this.actionRegistry['delete'] = this.confirmDelete.bind(this);
//     this.actionRegistry['update'] = this.openUpdateModal.bind(this);
//     // Listen for selected collection changes
//     this.collectionService.getSelectedCollection().subscribe(name => {
//       this.selectedCollection = name;
//       this.loadComponent(name);
//       this.isCreatable = !!name && this.creatableCollections.includes(name);

//     });

//     // Listen for documents from the service
//     this.collectionService.getDocuments().subscribe(docs => {
//       this.documents = Array.isArray(docs) ? docs : Object.values(docs || {});
//       console.log(this.documents);

//     });
//   }

//   /** Dynamically load card component based on collection */
//   async loadComponent(collectionName: string | null) {
//     if (!collectionName) {
//       this.currentComponent = null;
//       return;
//     }
//     const loader = componentRegistry[collectionName];
//     if (!loader) {
//       this.currentComponent = null;
//       return;
//     }
//     const componentClass = await loader();
//     this.currentComponent = componentClass;
//   }

//   /** Generic handler for all child actions */
//   async handleCardAction(event: { action: string; data: any }) {
//     const actionFn = this.actionRegistry[event.action];
//     if (!actionFn) {
//       console.warn(`No handler registered for action: ${event.action}`);
//       return;
//     }
//     actionFn(event.data);
//   }

//   /** Open modal dynamically */
//   async openModal(data: any) {
//     if (!this.selectedCollection) return;
//     const loader = ModalRegistry[this.selectedCollection];
//     if (!loader) return;

//     this.currentModalComponent = await loader();
//     this.currentModalData = data;
//     this.isModalOpen = true;
//   }

//   /** Close modal */
//   closeModal() {
//     this.isModalOpen = false;
//     this.currentModalComponent = null;
//     this.currentModalData = null;
//   }

//   /** Create an Injector for cards */
//   createInjector(doc: any): Injector {
//     return Injector.create({
//       providers: [
//         { provide: 'data', useValue: doc },
//         { provide: 'onAction', useValue: (event: { action: string; data: any }) => this.handleCardAction(event) },
//       ],
//       parent: this.injector,
//     });
//   }

//   /** Create an Injector for modals */
//   createModalInjector(data: any): Injector {
//     return Injector.create({
//       providers: [
//         { provide: 'data', useValue: data },
//         { provide: 'onClose', useValue: () => this.closeModal() },
//         { provide: 'onSubmit', useValue: (formData: any) => this.handleModalSubmit(formData) }
//       ],
//       parent: this.injector,
//     });
//   }

//   /** Confirm deletion using a modal */
//   confirmDelete(doc: any) {
//     // You can replace this with a proper confirmation modal
//     const confirmed = window.confirm('Are you sure you want to delete this item?');
//     if (confirmed) {
//       this.deleteDocument(doc);
//     }
//   }

//   /** Delete document from backend and update local array */
//   deleteDocument(doc: any) {
//     if (!this.selectedCollection) return;

//     this.collectionService.deleteDocument(this.selectedCollection, doc._id).subscribe({
//       next: () => {
//         // Remove deleted document from local state
//         this.documents = this.documents.filter(d => d._id !== doc._id);
//         console.log('Deleted successfully:', doc);
//       },
//       error: (err) => console.error('Delete failed', err),
//     });
//   }
// }
// /*************************************************************************************************** */

import {
  Component,
  Injector,
  OnInit,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { CollectionService } from '../../services2/collectionService/collection-service';
import { componentRegistry } from '../../configs/cards-registry';
import { ModalRegistry } from '../../configs/modal-registry';

@Component({
  selector: 'app-content2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content2.html',
  styleUrls: ['./content2.scss'],
})
export class Content2 implements OnInit {
  specialties: any[] = [];
  categories: any[] = [];

  /* ================================
     State
     ================================ */

  documents: any[] = [];
  currentComponent: Type<any> | null = null;
  selectedCollection: string | null = null;

  creatableCollections = ['skills', 'categories', 'specialties', 'countries'];
  isCreatable = false;

  /* ================================
     Modal State
     ================================ */

  currentModalComponent: Type<any> | null = null;
  currentModalData: any = null;
  isModalOpen = false;

  /** 🔥 Cached modal injector */
  modalInjector?: Injector;

  /* ================================
     Card Injectors
     ================================ */

  cardInjectors = new Map<string, Injector>();

  /* ================================
     Action Registry
     ================================ */

  actionRegistry: Record<string, (data: any) => void> = {};

  constructor(
    private collectionService: CollectionService,
    private injector: Injector
  ) { }

  /* ================================
     Lifecycle
     ================================ */

  ngOnInit(): void {

    this.actionRegistry['view'] = this.openModal.bind(this);
    this.actionRegistry['update'] = this.openUpdateModal.bind(this);
    this.actionRegistry['delete'] = this.confirmDelete.bind(this);

    this.collectionService.getSelectedCollection().subscribe(name => {
      this.selectedCollection = name;
      this.isCreatable = !!name && this.creatableCollections.includes(name);
      this.loadComponent(name);
      
      // Load specialties and categories only once when needed
      // Don't load them on every collection change
      if (name && this.specialties.length === 0) {
        this.loadSpecialties();
      }
      
      if (name && this.categories.length === 0) {
        this.loadCategories();
      }

    });

    this.collectionService.getDocuments().subscribe(docs => {
      this.documents = Array.isArray(docs) ? docs : Object.values(docs || {});
      this.buildCardInjectors();
      console.log('📦 Documents received:', this.documents.length, 'items');
      console.log('🎴 Current component:', this.currentComponent);
      console.log('💉 Card injectors built:', this.cardInjectors.size);
    });

  }

  /* ================================
     Load Helper Methods
     ================================ */

  private loadSpecialties(): void {
    firstValueFrom(this.collectionService.getAll('specialties'))
      .then(list => {
        this.specialties = list;
        console.log('Specialties loaded:', list);
      })
      .catch(err => {
        console.warn('Could not load specialties:', err.status, err.statusText);
        // Try alternative endpoint name
        if (err.status === 400 || err.status === 404) {
          console.log('Specialties endpoint not available, using empty array');
          this.specialties = [];
        }
      });
  }

  private loadCategories(): void {
    firstValueFrom(this.collectionService.getAll('categories'))
      .then(list => {
        this.categories = list;
        console.log('Categories loaded:', list);
      })
      .catch(err => {
        console.error('Error loading categories:', err);
        this.categories = [];
      });
  }

  /* ================================
     Card Injector Logic (FIX)
     ================================ */

  private buildCardInjectors(): void {
    this.cardInjectors.clear();

    for (const doc of this.documents) {
      console.log('🔑 Building injector for document:', doc);
      console.log('🆔 Document ID:', doc._id, 'Type:', typeof doc._id);
      
      const docId = doc._id || doc.id || JSON.stringify(doc);
      
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

  getCardInjector(id: string): Injector | undefined {
    const injector = this.cardInjectors.get(id);
    console.log(`🔍 Getting injector for ID: ${id}, Found: ${!!injector}`);
    return injector;
  }

  trackById(_: number, item: any) {
    const id = item._id || item.id || JSON.stringify(item);
    console.log('🎯 TrackBy ID:', id);
    return id;
  }

  /* ================================
     Card Actions
     ================================ */

  handleCardAction(event: { action: string; data: any }) {
    const fn = this.actionRegistry[event.action];
    if (!fn) {
      console.warn(`No handler for action: ${event.action}`);
      return;
    }
    fn(event.data);
  }

  confirmDelete(doc: any) {
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.deleteDocument(doc);
    }
  }

  deleteDocument(doc: any) {
    if (!this.selectedCollection) return;

    this.collectionService
      .deleteDocument(this.selectedCollection, doc._id)
      .subscribe(() => {
        this.documents = this.documents.filter(d => d._id !== doc._id);
        this.cardInjectors.delete(doc._id);
      });
  }

  /* ================================
     Dynamic Card Component
     ================================ */

  async loadComponent(collectionName: string | null) {
    if (!collectionName) {
      this.currentComponent = null;
      console.log('❌ No collection selected');
      return;
    }

    const loader = componentRegistry[collectionName];
    if (!loader) {
      console.warn(`⚠️ No card component registered for: ${collectionName}`);
      this.currentComponent = null;
      return;
    }
    
    try {
      this.currentComponent = await loader();
      console.log(`✅ Card component loaded for: ${collectionName}`, this.currentComponent);
    } catch (error) {
      console.error(`❌ Failed to load component for ${collectionName}:`, error);
      this.currentComponent = null;
    }
  }

  /* ================================
     Modal Logic (FIX)
     ================================ */

  async openCreateModal() {
    if (!this.selectedCollection) return;

    const specialties = await firstValueFrom(
      this.collectionService.getAll('specialties')
    );
    const categories = await firstValueFrom(
      this.collectionService.getAll('categories')
    );
    this.currentModalComponent =
      await ModalRegistry[this.selectedCollection]();

    this.currentModalData = { mode: 'create', specialties, categories };

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

    this.isModalOpen = true;
  }

  openUpdateModal(doc: any) {

    this.openModal({
      mode: 'update',
      document: doc,
      specialties: this.specialties,
      categories: this.categories
    });
  }

  async openModal(data: any) {
    if (!this.selectedCollection) return;

    const loader = ModalRegistry[this.selectedCollection];
    if (!loader) return;

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
    if (!this.selectedCollection) return;

    const request$ =
      this.currentModalData?.mode === 'update'
        ? this.collectionService.updateDocument(
          this.selectedCollection,
          formData
        )
        : this.collectionService.createDocument(
          this.selectedCollection,
          formData
        );

    request$.subscribe(() => {
      this.closeModal();
      this.collectionService.refresh(this.selectedCollection);
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentModalComponent = null;
    this.currentModalData = null;
    this.modalInjector = undefined;
  }
}

