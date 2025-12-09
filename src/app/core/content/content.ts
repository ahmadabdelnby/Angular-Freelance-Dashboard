import { Component, inject, Injector, Input, OnChanges } from '@angular/core';
import { CollectionService } from '../../services/collectionServices/collection-service';
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { componentRegistry } from '../../configs/cards-registry';
import { ModalRegistry } from '../../configs/modal-registry';
import { UserService } from '../../services/userService/user-service';
import { ProposalService } from '../../services/proposalService/proposal-service';
import { ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { SkillService } from '../../services/skillService/skill-service';
import { SpecialityService } from '../../services/specialityService/speciality-service';

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
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true })
  modalContainer!: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private dataService: CollectionService,
    private userService: UserService,
    private proposalService: ProposalService,
    private skillService: SkillService,
    private specialtyService: SpecialityService) { }

  /*first thing to happen when a component renders*/
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const collection = params['collection'];
      if (collection && collection !== this.collectionName) {
        // Clear previous state first
        this.collectionName = collection;
        this.documents = [];
        this.dynamicComponent = null;

        this.fetchDocuments(collection);
      }
    });
  }

  /*fetch the db and return the Docs in a specific collection*/
  async fetchDocuments(collectionName: string) {
    this.dataService.getCollectionDocs(collectionName).subscribe({
      next: async docs => {
        this.documents = docs;
        const loader = componentRegistry[collectionName];
        if (loader) {
          this.dynamicComponent = await loader();
        } else {
          this.dynamicComponent = null; // fallback if collection not registered
        }
        console.log('Docs fetched:', docs);
        console.log('Loader found:', componentRegistry[collectionName]);
        console.log('Component loaded:', this.dynamicComponent);

      },
      error: err => {
        console.error('Error fetching documents:', err);
        this.documents = [];
        this.dynamicComponent = null;
      }
    });
  }

  /*delete a user*/
  // onDelete(userId: string) {
  //   if (!confirm('Are you sure you want to delete this user?')) return;

  //   this.userService.deleteUser(userId).subscribe({
  //     next: () => {
  //       //alert('User deleted successfully');
  //       // Option 1: Refresh collection
  //       this.fetchDocuments(this.collectionName!);
  //     },
  //     error: err => {
  //       alert(err.error?.message || 'Something went wrong');
  //     }
  //   });
  // }

  /**/
  onDelete(docId: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    switch (this.collectionName) {
      case 'users':
        this.userService.deleteUser(docId).subscribe({
          next: () => this.fetchDocuments(this.collectionName!),
          error: err => alert(err.error?.message || 'Something went wrong')
        });
        break;

      case 'proposals':
        this.proposalService.deleteProposal(docId).subscribe({
          next: () => this.fetchDocuments(this.collectionName!),
          error: err => alert(err.error?.message || 'Something went wrong')
        });
        break;

      // case 'skill':
      //   this.skillService.deleteSkill(docId).subscribe({
      //     next: () => this.fetchDocuments(this.collectionName!),
      //     error: err => alert(err.error?.message || 'Something went wrong')
      //   });
      //   break;

      default:
        alert('Delete operation not supported for this collection.');
    }
  }
  /**/

  /*this is an injector*/
  createInjector(data: any) {
    return Injector.create({
      providers: [
        { provide: 'data', useValue: data },
        { provide: 'deleteCallback', useValue: (id: string) => this.onDelete(id) }
      ],
      parent: this.injector
    });
  }

  // Add this array: only collections listed here will show the + button
  creatableCollections = ['skills', 'specialties']; // adjust as needed

  get canCreate(): boolean {
    // Only return true if collectionName is not null and included in array
    return this.collectionName != null && this.creatableCollections.includes(this.collectionName);
  }

  async openModal() {
  if (!this.collectionName) return;
  if (!this.creatableCollections.includes(this.collectionName)) return;

  // For skills, fetch specialties first
  if (this.collectionName === 'skills') {
    try {
      this.specialties = await this.specialtyService.getAllSpecialities().toPromise();
    } catch (err) {
      console.error('Error fetching specialties', err);
      return; // don't open modal if fetch failed
    }
  }

  const loader = ModalRegistry[this.collectionName];
  if (!loader) return;

  const ModalComponent = await loader();
  this.modalContainer.clear();

  const componentRef: ComponentRef<any> = this.modalContainer.createComponent(ModalComponent);

  componentRef.instance.collectionName = this.collectionName;

  if (this.collectionName === 'skills') {
    componentRef.instance.dropdownOptions = this.specialties;
  }

  componentRef.instance.submit.subscribe((data: any) => {
    this.handleCreate(data);
    componentRef.destroy();
  });

  componentRef.instance.cancel.subscribe(() => componentRef.destroy());
}
  handleCreate(data: any) {
    throw new Error('Method not implemented.');
  }



}
