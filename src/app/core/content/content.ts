// import { Component, inject, Injector, Input, OnChanges } from '@angular/core';
// import { CollectionService } from '../../services/collectionServices/collection-service';
// import { CommonModule, JsonPipe } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { componentRegistry } from '../../configs/cards-registry';
// import { ModalRegistry } from '../../configs/modal-registry';
// import { UserService } from '../../services/userService/user-service';
// import { ProposalService } from '../../services/proposalService/proposal-service';
// import { ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
// import { SkillService } from '../../services/skillService/skill-service';
// import { SpecialityService } from '../../services/specialityService/speciality-service';
// import { firstValueFrom } from 'rxjs';

// @Component({
//   selector: 'app-content',
//   imports: [CommonModule],
//   templateUrl: './content.html',
//   styleUrl: './content.scss',
// })
// export class Content {

//   collectionName: string | null = null;
//   documents: any[] = [];
//   dynamicComponent: any = null;
//   private injector = inject(Injector);
//   specialties: any[] = [];
//   @ViewChild('modalContainer', { read: ViewContainerRef, static: true })
//   modalContainer!: ViewContainerRef;

//   constructor(
//     private route: ActivatedRoute,
//     private dataService: CollectionService,
//     private userService: UserService,
//     private proposalService: ProposalService,
//     private skillService: SkillService,
//     private specialtyService: SpecialityService) { }

//   /**first thing to happen when a component renders**/
//   ngOnInit() {
//     this.route.queryParams.subscribe(params => {
//       const collection = params['collection'];
//       if (collection && collection !== this.collectionName) {
//         // Clear previous state first
//         this.collectionName = collection;
//         this.documents = [];
//         this.dynamicComponent = null;

//         this.fetchDocuments(collection);
//       }
//     });
//   }

//   /**fetch the db and return the Docs in a specific collection**/
//   async fetchDocuments(collectionName: string) {
//     this.dataService.getCollectionDocs(collectionName).subscribe({
//       next: async docs => {
//         this.documents = docs;
//         const loader = componentRegistry[collectionName];
//         if (loader) {
//           this.dynamicComponent = await loader();
//         } else {
//           this.dynamicComponent = null; // fallback if collection not registered
//         }
//         console.log('Docs fetched:', docs);
//         console.log('Loader found:', componentRegistry[collectionName]);
//         console.log('Component loaded:', this.dynamicComponent);

//       },
//       error: err => {
//         console.error('Error fetching documents:', err);
//         this.documents = [];
//         this.dynamicComponent = null;
//       }
//     });
//   }

//   /** **/
//   onDelete(docId: string) {
//     if (!confirm('Are you sure you want to delete this item?')) return;

//     switch (this.collectionName) {
//       case 'users':
//         this.userService.deleteUser(docId).subscribe({
//           next: () => this.fetchDocuments(this.collectionName!),
//           error: err => alert(err.error?.message || 'Something went wrong')
//         });
//         break;

//       case 'proposals':
//         this.proposalService.deleteProposal(docId).subscribe({
//           next: () => this.fetchDocuments(this.collectionName!),
//           error: err => alert(err.error?.message || 'Something went wrong')
//         });
//         break;

//       case 'skills':
//         this.skillService.deleteSkill(docId).subscribe({
//           next: () => this.fetchDocuments(this.collectionName!),
//           error: err => alert(err.error?.message || 'Something went wrong')
//         });
//         break;

//       default:
//         alert('Delete operation not supported for this collection.');
//     }
//   }

//   /**this is an injector**/
//   createInjector(data: any) {
//     return Injector.create({
//       providers: [
//         { provide: 'data', useValue: data },
//         { provide: 'deleteCallback', useValue: (id: string) => this.onDelete(id) },
//         { provide: 'updateCallback', useValue: (skill: any) => this.openModal(skill) }
//       ],
//       parent: this.injector
//     });
//   }

//   // Add this array: only collections listed here will show the + button
//   creatableCollections = ['skills', 'specialties', 'categories']; // adjust as needed

//   get canCreate(): boolean {
//     // Only return true if collectionName is not null and included in array
//     return this.collectionName != null && this.creatableCollections.includes(this.collectionName);
//   }

//   /** **/
//   async openModal(initialData?: any) {
//     if (!this.collectionName) return;
//     if (!this.creatableCollections.includes(this.collectionName)) return;
//     if (this.collectionName === 'skills') {
//       try {
//         this.specialties = await firstValueFrom(this.specialtyService.getAllSpecialities());
//       } catch (err) {
//         console.error('Error fetching specialties', err);
//         return; // don't open modal if fetch failed
//       }
//     }

//     const loader = ModalRegistry[this.collectionName];
//     if (!loader) return;

//     const ModalComponent = await loader();
//     this.modalContainer.clear();

//     const componentRef: ComponentRef<any> = this.modalContainer.createComponent(ModalComponent);

//     componentRef.instance.collectionName = this.collectionName;

//     if (this.collectionName === 'skills') {
//       componentRef.instance.dropdownOptions = this.specialties;
//     }

//     if (initialData) {
//       // Pre-fill form
//       componentRef.instance.initialData = {
//         ...initialData,
//         specialty: initialData.specialty?._id || ''
//       };
//     }

//     componentRef.instance.submit.subscribe((data: any) => {
//       if (initialData) {
//         // UPDATE flow
//         this.skillService.updateSkill(initialData._id, data).subscribe({
//           next: () => {
//             this.fetchDocuments(this.collectionName!);
//             componentRef.destroy();
//           },
//           error: err => alert(err.error?.message || 'Failed to update skill')
//         });
//       } else {
//         // CREATE flow
//         this.handleCreate(data, componentRef);
//       }
//     });

//     componentRef.instance.cancel.subscribe(() => componentRef.destroy());
//   }

//   /** **/
//   handleCreate(data: any, componentRef?: ComponentRef<any>) {
//     if (!this.collectionName) return;

//     switch (this.collectionName) {
//       case 'skills':
//         this.skillService.createSkill(data).subscribe({
//           next: () => {
//             this.fetchDocuments(this.collectionName!);
//             componentRef?.destroy();
//           },
//           error: err => {
//             alert(err.error?.message || 'Failed to create skill');
//             console.error(err);
//           }
//         });
//         break;
//     }
//   }

// }
/****************************************************************************/
/**skill and speciality version**/
import { Component, inject, Injector, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { CollectionService } from '../../services/collectionServices/collection-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { componentRegistry } from '../../configs/cards-registry';
import { ModalRegistry } from '../../configs/modal-registry';
import { UserService } from '../../services/userService/user-service';
import { ProposalService } from '../../services/proposalService/proposal-service';
import { SkillService } from '../../services/skillService/skill-service';
import { SpecialityService } from '../../services/specialityService/speciality-service';
import { firstValueFrom } from 'rxjs';
import { CategoryService } from '../../services/categoryService/category-service';

@Component({
  selector: 'app-content',
  imports: [CommonModule],
  templateUrl: './content.html',
  styleUrl: './content.scss',
})
export class Content {

  collectionName: string | null = null;
  documents: any[] = [];
  dynamicComponent: any = null;
  private injector = inject(Injector);
  specialties: any[] = [];
  categories: any[] = []; // needed for speciality modal dropdown
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true })
  modalContainer!: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private dataService: CollectionService,
    private userService: UserService,
    private proposalService: ProposalService,
    private skillService: SkillService,
    private specialtyService: SpecialityService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const collection = params['collection'];
      if (collection && collection !== this.collectionName) {
        this.collectionName = collection;
        this.documents = [];
        this.dynamicComponent = null;
        this.fetchDocuments(collection);
      }
    });
  }

  async fetchDocuments(collectionName: string) {
    this.dataService.getCollectionDocs(collectionName).subscribe({
      next: async docs => {
        this.documents = docs;
        const loader = componentRegistry[collectionName];
        this.dynamicComponent = loader ? await loader() : null;
        console.log('Docs fetched:', docs);
        console.log('Loader found:', loader);
        console.log('Component loaded:', this.dynamicComponent);
      },
      error: err => {
        console.error('Error fetching documents:', err);
        this.documents = [];
        this.dynamicComponent = null;
      }
    });
  }

  onDelete(docId: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    switch (this.collectionName) {
      case 'users':
        this.userService.deleteUser(docId).subscribe(() => this.fetchDocuments(this.collectionName!));
        break;
      case 'proposals':
        this.proposalService.deleteProposal(docId).subscribe(() => this.fetchDocuments(this.collectionName!));
        break;
      case 'skills':
        this.skillService.deleteSkill(docId).subscribe(() => this.fetchDocuments(this.collectionName!));
        break;
      case 'specialties':
        this.specialtyService.deleteSpeciality(docId).subscribe(() => this.fetchDocuments(this.collectionName!));
        break;
      case 'categories':
        this.categoryService.deleteCategory(docId).subscribe(() => this.fetchDocuments(this.collectionName!));
        break;
      default:
        alert('Delete operation not supported for this collection.');
    }
  }

  createInjector(data: any) {
    return Injector.create({
      providers: [
        { provide: 'data', useValue: data },
        { provide: 'deleteCallback', useValue: (id: string) => this.onDelete(id) },
        { provide: 'updateCallback', useValue: (item: any) => this.openModal(item) }
      ],
      parent: this.injector
    });
  }

  creatableCollections = ['skills', 'specialties', 'categories'];

  get canCreate(): boolean {
    return this.collectionName != null && this.creatableCollections.includes(this.collectionName);
  }

  async openModal(initialData?: any) {
    if (!this.collectionName || !this.creatableCollections.includes(this.collectionName)) return;

    // Fetch dropdowns for modals
    if (this.collectionName === 'skills') {
      try {
        this.specialties = await firstValueFrom(this.specialtyService.getAllSpecialities());
      } catch (err) {
        console.error('Error fetching specialties', err);
        return;
      }
    }

    if (this.collectionName === 'specialties') {
      try {
        this.categories = await firstValueFrom(this.dataService.getCollectionDocs('categories'));
      } catch (err) {
        console.error('Error fetching categories', err);
        return;
      }
    }

    const loader = ModalRegistry[this.collectionName];
    if (!loader) return;

    const ModalComponent = await loader();
    this.modalContainer.clear();

    const componentRef: ComponentRef<any> = this.modalContainer.createComponent(ModalComponent);

    componentRef.instance.collectionName = this.collectionName;

    // Provide dropdown data
    if (this.collectionName === 'skills') {
      componentRef.instance.dropdownOptions = this.specialties;
    } else if (this.collectionName === 'specialties') {
      componentRef.instance.dropdownOptions = this.categories;
    }

    if (initialData) {

      if (this.collectionName === 'skills') {
        componentRef.instance.initialData = {
          ...initialData,
          specialty: initialData.specialty?._id || ''
        };
      }
      if (this.collectionName === 'categories') {
        componentRef.instance.initialData = {
          ...initialData,
          name: initialData.name,
          description: initialData.description,
          isActive: Boolean(initialData.isActive)
        };
      }
      else if (this.collectionName === 'specialties') {
        componentRef.instance.initialData = {
          ...initialData,
          name: initialData.name,
          description: initialData.description,
          isActive: Boolean(initialData.isActive),
          category: initialData.Category?._id || ''
        };
      }

    }



    // Subscribe to submit
    componentRef.instance.submit.subscribe((data: any) => {
      if (initialData) {
        // UPDATE flow
        if (this.collectionName === 'skills') {
          this.skillService.updateSkill(initialData._id, data).subscribe({
            next: () => { this.fetchDocuments(this.collectionName!); componentRef.destroy(); },
            error: err => alert(err.error?.message || 'Failed to update skill')
          });
        }
        if (this.collectionName === 'categories') {
          this.categoryService.updateCategory(initialData._id, data).subscribe({
            next: () => { this.fetchDocuments(this.collectionName!); componentRef.destroy(); },
            error: err => alert(err.error?.message || 'Failed to update skill')
          });
        } else if (this.collectionName === 'specialties') {
          this.specialtyService.updateSpeciality(initialData._id, data).subscribe({
            next: () => { this.fetchDocuments(this.collectionName!); componentRef.destroy(); },
            error: err => alert(err.error?.message || 'Failed to update specialty')
          });
        }
      } else {
        // CREATE flow
        this.handleCreate(data, componentRef);
      }
    });

    componentRef.instance.cancel.subscribe(() => componentRef.destroy());
  }

  handleCreate(data: any, componentRef?: ComponentRef<any>) {
    if (!this.collectionName) return;

    switch (this.collectionName) {
      case 'skills':
        this.skillService.createSkill(data).subscribe({
          next: () => { this.fetchDocuments(this.collectionName!); componentRef?.destroy(); },
          error: err => { alert(err.error?.message || 'Failed to create skill'); console.error(err); }
        });
        break;
      case 'specialties':
        this.specialtyService.createSpeciality(data).subscribe({
          next: () => { this.fetchDocuments(this.collectionName!); componentRef?.destroy(); },
          error: err => { alert(err.error?.message || 'Failed to create specialty'); console.error(err); }
        });
        break;
      case 'categories':
        this.categoryService.createCategory(data).subscribe({
          next: () => { this.fetchDocuments(this.collectionName!); componentRef?.destroy(); },
          error: err => { alert(err.error?.message || 'Failed to create specialty'); console.error(err); }
        });
        break;
    }
  }

}






