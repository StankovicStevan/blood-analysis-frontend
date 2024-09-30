import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blood-report',
  templateUrl: './blood-report.component.html',
  styleUrl: './blood-report.component.css'
})
export class BloodReportComponent {
  selectedFile: File | null = null;
  analysisData: any = null;

  constructor(private http: HttpClient) {}

  // Function to handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Function to handle form submission
  onSubmit(): void {
    if (!this.selectedFile) return;

    // Create a form data object to send the file
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Send file to the endpoint for good/bad value recognition
    this.http.post('http://localhost:5000/analyze-report', formData)
      .subscribe({
        next: (data: any) => {
          this.analysisData = {
            goodValues: data.analysis_within_range,
            badValues: data.analysis_out_of_range.map((badValue: any) => {
              return { ...badValue, associatedCondition: null };
            })
          };
          
          // For each bad value, fetch the associated condition
          this.analysisData.badValues.forEach((badValue: any, index: number) => {
            this.http.post('http://localhost:5001/consume', { parameter: badValue.parameter, value: badValue.value })
              .subscribe((response: any) => {
                this.analysisData.badValues[index].associatedCondition = response.condition;
              });
          });
        },
        error: (error) => {
          console.error('Error during analysis:', error);
        }
      });
  }
}
