import {
  Component
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import {
  Title
} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './plot-it.component.html',
  styleUrls: ['./plot-it.component.css']
})
export class PlotItComponent {
  chapters: Group[] = [];
  elements: Group[] = [];
  details: Detail[] = [];
  showChapter: boolean = true;
  showElement: boolean = true;

  constructor() {}

  //Ajout d'une ligne de groupe
  addChapterGroup(name?:string, hasDetail?:boolean) {
    this.chapters.push(new Group(name,hasDetail));
  }

  addElementGroup(name?:string, hasDetail?:boolean) {
    this.elements.push(new Group(name, hasDetail));
  }

  //Suppression de la ligne de chapitre désirée
  //Dès-association des détails à ce chapitre
  deleteChapterGroup(groupIndex: number) {
    for (const detail of this.details) {
      if(detail.associatedChapter){
        if (detail.associatedChapter.id === this.chapters[groupIndex].id) {
          detail.associatedChapter = undefined;
        }
      }
    }
    this.chapters.splice(groupIndex, 1);
  }

  //Suppression de la ligne d'élément désirée
  //Suppression des détails associés des Chapitres
  deleteElementGroup(groupIndex: number) {
    console.log("Egal à :" + this.elements[groupIndex].id);
    let toDelete = [];
    for (const detail of this.details) {
      if(detail.associatedElement && detail.associatedElement.id === this.elements[groupIndex].id) {
          toDelete.push(detail);
      }
    }

    for(const detail of toDelete){
      const relatedIndex = this.details.indexOf(detail);
      this.deleteDetail(relatedIndex, "suppress");
    }
    this.elements.splice(groupIndex, 1);
  }

  //Faire apparaitre ou disparaitre les groupes d'un tableau
  toggleChapterGroups() {
    this.showChapter = !this.showChapter;
  }

  toggleElementGroups() {
    this.showElement = !this.showElement;
  }

  //Drag and drop les groupes dans le tableau
  dropChapter(event: CdkDragDrop < string[] > ) {
    moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);
  }

  dropElement(event: CdkDragDrop < string[] > ) {
    moveItemInArray(this.elements, event.previousIndex, event.currentIndex);
  }

  //Ajout d'une ligne de détail
  addDetail(category: string, group1: Group, group2?:Group, name?:string) {
    this.details.push(new Detail(category, group1, group2, name));
  }

  //Suppression de la ligne de détail désirée
  deleteDetail(detailIndex: number, action: string) {
    if(action==="dissociate"){
      console.log("patate");
      console.log(this.details[detailIndex]);
      this.details[detailIndex].associatedChapter = undefined;
    } else if(action==="suppress") {
      this.details.splice(detailIndex, 1);
    }
  }

  //Drag and drop les détails
  dropDetail(event: CdkDragDrop < string[] > ) {
    moveItemInArray(this.details, event.previousIndex, event.currentIndex);
  }

  saveData() {
    let data = new Array(3);
    data[0]=this.chapters;
    data[1]=this.elements;
    data[2]=this.details;
    let dataJSON = JSON.stringify(data);
    console.log(dataJSON);

    let blob = new Blob([dataJSON], {
      type: 'application/json'
    });
    let JSONFile = window.URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.setAttribute('download', 'plot-it.json');
    link.href = JSONFile;
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
  }

  loadData(fileInput: any) {
    if (fileInput.target.files) {
      if (fileInput.target.files[0] && !fileInput.target.files[1]) {
        if (fileInput.target.files[0].type === "application/json") {
            //On vide les tables des éléments existants
            this.chapters = [];
            this.elements = [];
            this.details = [];
            this.showChapter = true;
            this.showElement = true;

            let fileReader = new FileReader();

            let file = fileInput.target.files[0];

            let data = [];

            /*let schemaJson: string = @"{
              'description': 'A person',
              'type': 'object',
              'properties':
              {
                'name': {'type':'string'},
                'hobbies': {
                  'type': 'array',
                  'items': {'type':'string'}
                }
              }
            }";

            let schema: JsonSchema  = JsonSchema.Parse(schemaJson);*/

            fileReader.onloadend = (evt: any) => {
              if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                data = JSON.parse(evt.target.result);
                console.log(data);
                console.log(data[0]);
                console.log(data[1]);
                console.log(data[2]);
                //if(data.IsValid(schema){
                  for(const detail of data[2]){
                    this.addDetail("chapter", detail.associatedChapter, detail.associatedElement, detail.name);
                  }
                  for(const chapter of data[0]){
                    this.addChapterGroup(chapter.name, chapter.showDetail);
                  }
                  for(const element of data[1]){
                    this.addElementGroup(element.name, element.showDetail);
                  }
                //}
                /*else
                {
                  alert("Le format des données est incorrect.");
                }*/

              }
            };
            fileReader.readAsText(file);
        } else {
          alert("Le format d'un ou plusieurs fichier est incorrect. Format attendu : JSON");
        }
      } else {
        alert("Le nombre de fichiers est incorrect");
      }
    } else {
      alert("Aucun fichier choisi !");
    }
  }

  dropNote(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.details, event.previousIndex, event.currentIndex);
  }
}

class Group {
  static nbGroup:number = 0;

  id: number;
  name: string;
  showDetail: boolean = false;

  constructor(name?:string, hasDetail?:boolean) {
    this.id = Group.nbGroup;
    Group.nbGroup++;
    if (hasDetail !== undefined) {
      this.showDetail = hasDetail;
    }
    if(name !== undefined){
      this.name = name;
    }
  }


  //Faire apparaitre ou disparaitre les groupes d'un tableau
  toggleDetails() {
    this.showDetail = !this.showDetail;
  }

}

class Detail {
  static nbDetail:number = 0;
  id:number;
  name: string;
  associatedChapter: Group = null;
  associatedElement: Group = null;

  constructor(category: string, group1: Group, group2?: Group, name?:string) {
    this.id=Detail.nbDetail;
    Detail.nbDetail++;
    if (category === "chapter") {
      this.associatedChapter = group1;
      this.associatedElement = group2;
    } else if (category === "element") {
      this.associatedElement = group1;
      this.associatedChapter = group2;
    }

    if(name !== undefined) {
      this.name = name;
    }
  }

  selectNewAssociatedElement(newElement: Group) {
    this.associatedElement = newElement;
  }

  selectNewAssociatedChapter(newChapter: Group) {
    this.associatedChapter = newChapter;
  }

}
