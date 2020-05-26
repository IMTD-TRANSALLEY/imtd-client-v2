import { Component, OnInit } from '@angular/core';
import {
  LocationForm,
  sectors,
  types,
  TYPE_ENTREPRISE,
  TYPE_LABORATOIRE,
  TYPE_FORMATION,
  TYPE_ASSOCIATION_INSTITUTION,
} from '../../models/Location';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
})
export class AddLocationComponent implements OnInit {
  readonly types = types;
  readonly sectors = sectors;
  readonly TYPE_ENTREPRISE = TYPE_ENTREPRISE;
  readonly TYPE_LABORATOIRE = TYPE_LABORATOIRE;
  readonly TYPE_FORMATION = TYPE_FORMATION;
  readonly TYPE_ASSOCIATION_INSTITUTION = TYPE_ASSOCIATION_INSTITUTION;

  selectedType = '';
  selectedSector = '';
  selectedSectors = [];

  formName: string = 'Test Name';
  formShortName: string = 'Test Short name';
  formLabCode: string = 'Test Lab code';
  formAddress: string = 'Test address';
  formPostCode: string = 'Test post code';
  formCity: string = 'test city';
  formPhone: string = 'test phone';
  formWebsite: string = 'test website';
  formNumbers: number = 0;
  formDescription: string = 'test description';
  formLogo: string = 'logo_default.jpg';
  formLatitude: number = 51.534963;
  formLongitutde: number = 3.462845;
  formFormationLevel: string[];
  formFormationType: string[];

  formKeywords: string = '';

  fileData: File = null;
  previewLogo: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  isLogoValid = false;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(types, sectors);
  }

  onChangeType(type: string) {
    console.log(this.selectedType);
    // console.log(type);
  }

  onChangeSectors(sector: string) {
    if (this.selectedSectors.includes(sector)) {
      this.selectedSectors = this.selectedSectors.filter((el) => el !== sector);
    } else {
      this.selectedSectors.push(sector);
    }

    console.log(this.selectedSector, this.selectedSectors);
    this.selectedSector = '';
  }

  onClickRemoveSector(sector: string) {
    console.log(sector);
    this.selectedSectors = this.selectedSectors.filter((el) => el !== sector);
  }

  /************************ */
  uploadLogo(fileInput: any) {
    // Get first file from uploaded files
    this.fileData = <File>fileInput.target.files[0];

    // Check if mimeType matches image/..
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.isLogoValid = true;

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewLogo = reader.result;
    };
  }

  onSubmit() {
    // 5ecd438daf01084684d7cbfb
    const newLocation: LocationForm = {
      type: this.selectedType,
      sectors: this.selectedSectors,
      name: this.formName,
      // shortName:this.formShortName,
      street: this.formAddress,
      postCode: this.formPostCode,
      city: this.formCity,
      description: this.formDescription,
      logo: this.formLogo,
      latitude: this.formLatitude,
      longitude: this.formLongitutde,
    };
    console.log(newLocation);

    this.locationService.createLocation(newLocation).subscribe(
      (res) => {
        console.log(res);

        const id = res.data._id;
        const formData = new FormData();
        formData.append('logo', this.fileData); // append the file to 'logo field' in request body

        // If updated file is valid
        if (this.isLogoValid) {
          console.log('Logo valid');
          this.locationService.updateLocationLogo(id, formData).subscribe(
            (res) => {
              console.log(res);
              alert('Localisation avec logo ajoutée avec succès');
              this.router.navigate([`/locations/${id}`]);
            },
            (err) => {
              alert('Erreur. Voir console');
              console.log(err);
            }
          );
        } else {
          console.log('Logo invalid');
          alert('Localisation sans logo ajoutée avec succès');
        }
      },
      (err) => {
        alert('Erreur. Voir console');
        console.log(err);
      }
    );
  }

  resetForm() {
    this.isLogoValid = false;
  }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('file', this.fileData);
  //   this.http.post('url/to/your/api', formData).subscribe((res) => {
  //     console.log(res);
  //     this.uploadedFilePath = res.data.filePath;
  //     alert('SUCCESS !!');
  //   });
  // }

  // preview() {
  //   // Show preview
  //   var mimeType = this.fileData.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }

  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.fileData);
  //   reader.onload = (_event) => {
  //     this.previewLogo = reader.result;
  //   };
  // }
}
