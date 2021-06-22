import { Component, OnInit } from '@angular/core';

export interface INodeItem {
  name: string;
  score: number;
  isWinner: boolean;
}

export interface INodeCompareItem {
  compareItem1: string;
  compareItem2: string;
  selected: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tech-uklon';
  public itemName: string;
  public items: INodeItem[] = [
    {
      name: 'A',
      score: 0,
      isWinner: false,
    },
    {
      name: 'B',
      score: 0,
      isWinner: false,
    },
    {
      name: 'C',
      score: 0,
      isWinner: false,
    },
  ];
  public compareItems: INodeCompareItem[] = [];

  ngOnInit() {
    this.createComparisonList();
  }

  private createComparisonList(): void {
    this.compareItems = [];
    this.items.forEach((item: INodeItem, index: number) => {
      this.items.forEach((item2: INodeItem, index2: number) => {
        if (index2 > index) {
          this.compareItems.push({
            compareItem1: item.name,
            compareItem2: item2.name,
            selected: item.name,
          });
        }
      });
    });
    this.countScore();
  }

  private updateComparisonList(itemName: string): void {
    this.items.forEach((item: INodeItem) => {
      this.compareItems.push({
        compareItem1: item.name,
        compareItem2: itemName,
        selected: item.name,
      });
    });
    this.countScore();
  }

  public countScore(): void {
    this.items.forEach((item: INodeItem) => {
      item.score = this.compareItems.filter(
        (comp: INodeCompareItem) => comp.selected === item.name
      ).length;
    });
    this.items.sort((a: INodeItem, b: INodeItem) => b.score - a.score);
  }

  public addItem(): void {
    if (this.itemName) {
      const isExist = this.items.find(
        (item: INodeItem) =>
          item.name.toUpperCase() === this.itemName.toUpperCase()
      );
      if (!isExist) {
        const payload = {
          name: this.itemName,
          score: 0,
          isWinner: false,
        };
        this.updateComparisonList(this.itemName);
        this.items.push(payload);
      }
      this.itemName = '';
    }
  }
}
