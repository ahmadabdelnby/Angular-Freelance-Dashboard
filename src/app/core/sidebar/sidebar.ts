import { Component } from '@angular/core';
import { CollectionService } from '../../services/collectionServices/collection-service';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize-pipe';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, CapitalizePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  collections: string[] = [];
  selectedCollection: string | null = null;

  constructor(
    private collectionService: CollectionService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe({
      next: (data) => this.collections = data,
      error: (err) => console.error('Error fetching collections', err)
    });
  }


    selectCollection(collection: string) {
    // Updates the URL with a query param like ?collection=Books
    this.router.navigate([], { queryParams: { collection } });
  }

  // selectCollection(collection: string) {
  //   // Update the browser URL without reloading the page
  //   const newUrl = `${window.location.origin}?collection=${collection}`;
  //   window.history.pushState({ collection }, '', newUrl);

  //   // Optionally, update the selected collection in the component
  //   this.selectedCollection = collection;

  //   // Notify the content component if needed, e.g., via a service or EventEmitter
  // }

  
}
