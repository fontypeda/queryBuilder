import { Component } from '@angular/core';
import { QueryService } from '../services/query.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SEARCH_CONFIG } from 'src/search-config';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  // FormGroup für das Formular
  searchForm: FormGroup;

  // Array von spezifischen Feldern aus der Konfiguration
  specificFields = SEARCH_CONFIG.specificFields;

  // Array für die Chips
  fruits: string[] = [];

  constructor(private fb: FormBuilder, private queryService: QueryService) {
    // Initialisieren des Formulars mit FormBuilder
    this.searchForm = this.fb.group({
      fullTextSearch: [''], // Textfeld für Volltextsuche
      specificFieldGroups: this.fb.array([this.createSpecificFieldGroup()]) // FormArray für spezifische Feldgruppen
    });

    // Abonnieren von Änderungen am Formular, um die Chips zu aktualisieren
    this.searchForm.valueChanges.subscribe(val => {
      this.updateChips();
    });
  }

  // Erstellen einer neuen FormGroup für eine spezifische Feldgruppe
  createSpecificFieldGroup() {
    return this.fb.group({
      specificField: [''], // Dropdown für spezifische Felder
      specificFieldSearch: [''] // Textfeld für die Suche in spezifischen Feldern
    });
  }



  // Getter für das FormArray der spezifischen Feldgruppen
  get specificFieldGroups(): FormArray {
    return this.searchForm.get('specificFieldGroups') as FormArray;
  }

  // Hinzufügen einer neuen spezifischen Feldgruppe
  addSpecificFieldGroup() {
    this.specificFieldGroups.push(this.createSpecificFieldGroup());
  }

  // Entfernen des Volltextsuchfeldes und Aktualisieren der Chips
  removeFullTextSearch() {
    this.searchForm.get('fullTextSearch')?.setValue('');
    this.updateChips();
  }

  // Entfernen einer spezifischen Feldgruppe und Aktualisieren der Chips
  removeSpecificFieldGroup(index: number) {
    this.specificFieldGroups.removeAt(index);
    this.updateChips();
  }

  // Aktualisieren der Chips basierend auf den Werten im Formular
  updateChips() {
    this.fruits = [];
    
    // Chip für fullTextSearch
    const fullTextValue = this.searchForm.get('fullTextSearch')?.value;
    if (fullTextValue) {
      this.fruits.push(`Volltext: ${fullTextValue}`);
    }
  
    // Chips für specificFieldGroups
    this.specificFieldGroups.controls.forEach((group) => {
      const fieldTitle = this.getFieldUiTitle(group.get('specificField')?.value);
      const searchValue = group.get('specificFieldSearch')?.value;
      if (fieldTitle && searchValue) {
        this.fruits.push(`${fieldTitle}: ${searchValue}`);
      }
    });
  }
  
  // Methode, um den uiTitle basierend auf dem fieldName zu erhalten
  getFieldUiTitle(fieldName: string): string | undefined {
    const field = this.specificFields.find(f => f.fieldName === fieldName);
    return field?.uiTitle;
  }
  

  // Entfernen eines Chips und Aktualisieren des Formulars entsprechend
  removeChip(chip: string) {
    if (chip.startsWith('Volltext:')) {
      this.searchForm.get('fullTextSearch')?.setValue('');
    } else {
      // Extract the UI title from the chip
      const [fieldUiTitle, _] = chip.split(':').map(part => part.trim());
  
      // Find the index of the group where the uiTitle matches
      const groupIndex = this.specificFieldGroups.controls.findIndex(group => {
        const fieldName = group.get('specificField')?.value;
        const fieldUiTitleMatch = this.getFieldUiTitle(fieldName) === fieldUiTitle;
        return fieldUiTitleMatch;
      });
  
      if (groupIndex !== -1) {
        this.specificFieldGroups.removeAt(groupIndex);
      }
    }
  
    this.updateChips(); // Update the chip list
    this.submitSearch();
  }
  // Absenden der Suchanfrage
  submitSearch() {
    this.queryService.setQuery(this.searchForm.value);
  }

  // Zurücksetzen des Formulars und der Chips
  resetSearch() {
    this.searchForm.reset();
    this.queryService.resetQuery();
  }
}
