import { Component } from '@angular/core';
import { CollectionService } from '../../services2/collectionService/collection-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar2',
  imports: [CommonModule],
  templateUrl: './sidebar2.html',
  styleUrl: './sidebar2.scss',
})
export class Sidebar2 {
  /****/
  collections: string[] = [];
  constructor(private collectionService: CollectionService) { }
  ngOnInit(): void {
    this.collectionService.getAllCollections().subscribe(names => {
      this.collections = names;
      console.log(names);
    });
  }
  onCollectionClick(name: string) {
    this.collectionService.selectCollection(name);
    console.log(name);

  }

  /****/
  isOpen = false;
  toggleCollections() {
    this.isOpen = !this.isOpen;
  }



}
