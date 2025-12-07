import { Component, inject, Injector, Input, OnChanges } from '@angular/core';
import { CollectionService } from '../../services/collectionServices/collection-service';
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { componentRegistry } from '../../configs/component-registry';

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

  constructor(private route: ActivatedRoute, private dataService: CollectionService) { }

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

  createInjector(data: any) {
    return Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector
    });
  }

}
